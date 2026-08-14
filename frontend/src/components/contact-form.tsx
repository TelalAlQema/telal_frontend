"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import Recaptcha from "@/components/recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/contact";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

const NAME_PATTERN = /^[A-Za-z\s]+$/;
const PHONE_PATTERN = /^[0-9]{7,15}$/;
const LINK_PATTERN = /(https?:\/\/|www\.|<a\s|url=)/i;

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type FieldName = "name" | "email" | "phone" | "services" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const MESSAGE_MAX = 1000;

function validateFields(values: {
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = "Name must be between 2 and 100 characters long.";
  } else if (!NAME_PATTERN.test(values.name)) {
    errors.name = "Name must contain only letters and spaces.";
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = "Phone must contain 7–15 digits only.";
  }

  if (!values.services) {
    errors.services = "Please select a service.";
  }

  if (values.message.length > MESSAGE_MAX) {
    errors.message = `Message must be at most ${MESSAGE_MAX} characters long.`;
  } else if (/[<>{}]/.test(values.message)) {
    errors.message = "Message contains invalid characters.";
  } else if (LINK_PATTERN.test(values.message)) {
    errors.message = "Links are not allowed in the message.";
  }

  return errors;
}

export function ContactForm() {
  const router = useRouter();
  const recaptchaRef = useRef<{ reset: () => void }>(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: FieldName) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const next = event.target.value;
      setValues((prev) => ({
        ...prev,
        [field]:
          field === "phone" ? next.replace(/\D/g, "").slice(0, 15) : next,
      }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError(null);
    };

  const handleVerified = useCallback((token: string | null) => {
    setRecaptchaToken(token);
    setFormError(null);
    setCaptchaError(false);
  }, []);

  const handleCaptchaError = useCallback(() => {
    setRecaptchaToken(null);
    setCaptchaError(true);
  }, []);

  const handleCaptchaExpired = useCallback(() => {
    setRecaptchaToken(null);
    setCaptchaError(false);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const clientErrors = validateFields(values);
    setErrors(clientErrors);
    if (Object.values(clientErrors).some(Boolean)) return;

    if (!recaptchaToken) {
      // When the widget failed to load, skip this client gate so the server
      // can surface the real reCAPTCHA problem instead of a dead button.
      if (!captchaError) {
        setFormError("Please verify that you are not a robot.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await submitContact({
        ...values,
        recaptchaToken: recaptchaToken ?? "",
      });

      if (result.ok) {
        router.push("/thank-you");
        return;
      }

      switch (result.kind) {
        case "validation": {
          const serverFields = result.fields;
          const mapped: FieldErrors = {};
          for (const field of [
            "name",
            "email",
            "phone",
            "services",
            "message",
          ] as const) {
            const value = serverFields[field];
            if (value) mapped[field] = value;
          }
          setErrors(mapped);
          if (Object.keys(mapped).length === 0) setFormError(result.message);
          break;
        }
        case "recaptcha":
          setFormError(result.message);
          recaptchaRef.current?.reset();
          break;
        default:
          setFormError(result.message);
          break;
      }
    } finally {
      setSubmitting(false);
    }
  }

  const captchaReady = captchaError
    ? true
    : RECAPTCHA_SITE_KEY
      ? recaptchaToken !== null
      : true;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <h2 className="font-heading text-navy text-lg font-semibold">
          Contact Us
        </h2>
        <p className="text-brand text-xs font-semibold tracking-wide uppercase">
          You can contact us if you have any query
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive flex items-start gap-2 rounded-lg border p-3 text-sm"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{formError}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            value={values.name}
            onChange={update("name")}
            maxLength={100}
            placeholder="Name"
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name ? <FieldError message={errors.name} /> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            name="email"
            value={values.email}
            onChange={update("email")}
            maxLength={254}
            placeholder="Email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email ? <FieldError message={errors.email} /> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={update("phone")}
            maxLength={15}
            placeholder="e.g. 5X XXX XXXX"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
          />
          {errors.phone ? <FieldError message={errors.phone} /> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-services">Service</Label>
          <Select
            id="contact-services"
            name="services"
            value={values.services}
            onChange={update("services")}
            aria-invalid={errors.services ? true : undefined}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
          {errors.services ? <FieldError message={errors.services} /> : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Short Description</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={update("message")}
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="Short Description"
          aria-invalid={errors.message ? true : undefined}
        />
        <div className="flex items-center justify-between gap-2">
          {errors.message ? <FieldError message={errors.message} /> : null}
          <p className="text-ink ml-auto text-xs">
            {values.message.length}/{MESSAGE_MAX}
          </p>
        </div>
      </div>

      {/* Honeypot — bots autofill this hidden field; backend drops them. */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="contact-hp">Website</Label>
        <Input
          id="contact-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1.5">
        {RECAPTCHA_SITE_KEY ? (
          <Recaptcha
            ref={recaptchaRef}
            siteKey={RECAPTCHA_SITE_KEY}
            onVerified={handleVerified}
            onExpired={handleCaptchaExpired}
            onError={handleCaptchaError}
          />
        ) : (
          <p className="text-ink text-xs">
            reCAPTCHA is not configured (NEXT_PUBLIC_RECAPTCHA_SITE_KEY).
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!captchaReady || submitting}
        className="w-full"
        size="lg"
      >
        {submitting ? <Loader2 className="animate-spin" /> : null}
        {submitting ? "Submitting…" : "Submit"}
      </Button>

      <p className="text-ink text-xs">
        We respect your privacy. By contacting us you agree to receive a
        response regarding your enquiry.
      </p>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="text-destructive text-xs" role="alert">
      {message}
    </p>
  );
}

function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "focus:border-ring focus:ring-ring/50 aria-invalid:border-destructive h-8 w-full min-w-0 rounded-lg border bg-white px-2.5 text-sm transition-[color,box-shadow] outline-none focus:ring-3 aria-invalid:ring-3 aria-invalid:ring-destructive/20 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
