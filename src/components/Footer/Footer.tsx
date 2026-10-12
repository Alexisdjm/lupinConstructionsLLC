import Link from "next/link";
import { Invitation } from "./Invitation";

const EXPLORE = [
  { href: "/#services", label: "Services" },
  { href: "/#reviews", label: "Client Reviews" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#quote", label: "Contact" },
  { href: "/#process", label: "Our Process" },
  { href: "/#standard", label: "About Us" },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#061B2D] text-white">
      <section>
        <Invitation />

        <div className="page-shell pt-12 pb-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div>
              <Link
                href="/"
                className="inline-flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
              >
                <img
                  src="/svgs/lupin.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0"
                />
                <span className="text-[15px] font-semibold tracking-tight">
                  Lupin Construction LLC
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
                Bespoke pools, spas, and outdoor living environments designed
                for the South Florida lifestyle.
              </p>
              <p className="mt-6 text-sm text-white/80">
                Serving South Florida · Miami, Fort Lauderdale & Palm Beach
              </p>
            </div>

            <nav aria-label="Explore">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                Explore
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {EXPLORE.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                Visit our design studio
              </p>
              <p className="mt-4 text-sm leading-6 text-white/75">
                7300 Biscayne Boulevard, Suite 210
                <br />
                Miami, FL 33138
              </p>
              <a
                href="tel:3055550188"
                className="mt-4 inline-block text-lg font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                (305) 555-0188
              </a>
              <p className="mt-3 text-sm text-white/55">
                Mon–Fri 8:00 AM–6:00 PM · Sat by appointment
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Lupin Construction LLC · Florida Contractor License:
              CFC-XXXXXXX
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
