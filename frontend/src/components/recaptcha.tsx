"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    grecaptcha?: GrecaptchaApi;
    [recaptchaOnloadGlobal]?: () => void;
  }
}

interface GrecaptchaApi {
  render: (
    container: HTMLElement | string,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => number;

  reset: (widgetId?: number) => void;
}

export type RecaptchaHandle = {
  reset: () => void;
};

export type RecaptchaProps = {
  siteKey: string;
  onVerified: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  id?: string;
};

const SCRIPT_ID = "grecaptcha-script";
const recaptchaOnloadGlobal = "__recaptchaOnloadTelal";
const SCRIPT_SRC = `https://www.google.com/recaptcha/api.js?render=explicit&onload=${recaptchaOnloadGlobal}`;


const API_WAIT_TIMEOUT_MS = 8_000;

let scriptPromise: Promise<GrecaptchaApi> | null = null;

/** The Google API is only usable once the full `render` surface exists —
 *  `window.grecaptcha` can appear as a stub well before that. */
function isApiUsable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.grecaptcha?.render === "function"
  );
}

function clearRecaptchaScript() {
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  existing?.remove();
  delete window.grecaptcha;
  delete (window as unknown as Record<string, unknown>)[recaptchaOnloadGlobal];
  scriptPromise = null;
}

function waitForApiUsable(): Promise<GrecaptchaApi> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const poll = () => {
      if (isApiUsable()) {
        resolve(window.grecaptcha as GrecaptchaApi);
        return;
      }

      if (Date.now() - startedAt >= API_WAIT_TIMEOUT_MS) {
        reject(new Error("reCAPTCHA timed out while initialising."));
        return;
      }

      window.setTimeout(poll, 100);
    };

    poll();
  });
}

function loadRecaptchaScript(): Promise<GrecaptchaApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA requires a browser."));
  }

  if (isApiUsable()) {
    return Promise.resolve(window.grecaptcha as GrecaptchaApi);
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise<GrecaptchaApi>((resolve, reject) => {
    const script = document.createElement("script");

    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;

    // Google calls this only once the API is fully initialised, which is what
    // makes it more reliable than guessing on `script.onload`.
    window[recaptchaOnloadGlobal] = () => {
      waitForApiUsable()
        .then(resolve)
        .catch(reject);

      delete (window as unknown as Record<string, unknown>)[
        recaptchaOnloadGlobal
      ];
    };

    script.onload = () => {
      waitForApiUsable().then(resolve).catch(reject);
    };

    script.onerror = () => {
      reject(new Error("Failed to load reCAPTCHA script."));
    };

    document.head.appendChild(script);
  });

  return scriptPromise;
}

const Recaptcha = forwardRef<RecaptchaHandle, RecaptchaProps>(
  function Recaptcha({ siteKey, onVerified, onExpired, onError, id }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const widgetIdRef = useRef<number | null>(null);

    const [retryKey, setRetryKey] = useState(0);

    const [status, setStatus] = useState<"loading" | "ready" | "error">(
      "loading",
    );

    const callbacksRef = useRef({
      onVerified,
      onExpired,
      onError,
    });

    callbacksRef.current = {
      onVerified,
      onExpired,
      onError,
    };

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          if (widgetIdRef.current !== null && window.grecaptcha) {
            window.grecaptcha.reset(widgetIdRef.current);
          }

          callbacksRef.current.onVerified(null);
        },
      }),
      [],
    );

    useEffect(() => {
      let cancelled = false;

      async function initializeRecaptcha() {
        try {
          const grecaptcha = await loadRecaptchaScript();

          if (cancelled) return;

          if (typeof grecaptcha.render !== "function") {
            throw new Error("reCAPTCHA API was not fully initialised.");
          }

          const container = containerRef.current;

          if (!container) {
            console.error("reCAPTCHA container is not available.");
            return;
          }

          // Prevent duplicate rendering.
          if (widgetIdRef.current !== null) {
            return;
          }

          // Clear any existing children before (re)rendering the widget so the
          // widget can survive route transitions and failed reload attempts.
          container.innerHTML = "";

          const widgetId = grecaptcha.render(container, {
            sitekey: siteKey,

            callback: (token: string) => {
              callbacksRef.current.onVerified(token);
            },

            "expired-callback": () => {
              callbacksRef.current.onVerified(null);
              callbacksRef.current.onExpired?.();
            },

            "error-callback": () => {
              callbacksRef.current.onVerified(null);
              callbacksRef.current.onError?.();
            },
          });

          widgetIdRef.current = widgetId;

          if (!cancelled) {
            setStatus("ready");
          }
        } catch (error) {
          console.error("reCAPTCHA initialization failed:", error);

          if (!cancelled) {
            setStatus("error");
            callbacksRef.current.onError?.();
          }
        }
      }

      initializeRecaptcha();

      return () => {
        cancelled = true;
      };
    }, [siteKey, retryKey]);

    const handleRetry = () => {
      clearRecaptchaScript();
      containerRef.current?.replaceChildren();
      widgetIdRef.current = null;
      setRetryKey((key) => key + 1);
    };

    return (
      <div id={id} className="space-y-1.5">
        {/* IMPORTANT:
          The container must always exist in the DOM.
      */}
        <div ref={containerRef} className="max-w-full min-h-[78px] overflow-hidden" />

        {status === "loading" && (
          <p className="text-ink text-xs">Loading reCAPTCHA…</p>
        )}

        {status === "ready" && (
          <p className="text-ink text-xs">
            Complete the CAPTCHA to enable the Submit button.
          </p>
        )}

        {status === "error" && (
          <div className="text-destructive flex flex-wrap items-center gap-3 text-xs">
            <span>
              reCAPTCHA could not be loaded. Please check your site key and
              domain configuration.
            </span>
            <button
              type="button"
              onClick={handleRetry}
              className="text-navy border-ink/20 hover:border-brand hover:text-brand cursor-pointer rounded-md border px-2.5 py-1 font-semibold"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
  },
);

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;