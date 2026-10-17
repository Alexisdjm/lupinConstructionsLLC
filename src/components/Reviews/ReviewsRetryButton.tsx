"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ReviewsRetryButton({ retry, loading }: { retry: string; loading: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => router.refresh())}
      className="mt-4 inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? loading : retry}
    </button>
  );
}

