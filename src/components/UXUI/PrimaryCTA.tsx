import Link from "next/link";

type PrimaryCTAProps = {
  href: string;
  children: React.ReactNode;
};

export function PrimaryCTA({ href, children }: PrimaryCTAProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#062018] transition-colors hover:bg-[#5ee8d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
