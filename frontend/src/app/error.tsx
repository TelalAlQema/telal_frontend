"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-heading text-navy text-lg font-semibold">
        Something went wrong
      </p>
      <p className="text-ink max-w-md text-sm">
        We hit an unexpected error while rendering this page. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
