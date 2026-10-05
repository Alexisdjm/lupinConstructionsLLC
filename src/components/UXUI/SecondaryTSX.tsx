import Link from "next/link";

type SecondaryCTAProps = {
  href: string;
  children: React.ReactNode;
};

export function SecondaryCTA({ href, children }: SecondaryCTAProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </Link>
  );
}
