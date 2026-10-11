import Link from "next/link";
import { BrandLockup } from "@/src/components/Header/BrandLockup";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07111c] py-8 text-white">
      <div className="page-shell flex">
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
