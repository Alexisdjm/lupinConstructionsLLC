import Link from "next/link";
import { BrandLockup } from "@/src/components/Header/BrandLockup";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07111c] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl">
        <Link
          href="/"
          className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
        >
          <BrandLockup />
        </Link>
      </div>
    </footer>
  );
}
