import Link from "next/link";
import type { CSSProperties } from "react";

const DEFAULT_COLOR = "#2ad9c3";
const DEFAULT_HOVER = "#5ee8d4";

type PrimaryCTAProps = {
  children: React.ReactNode;
  href?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  form?: string;
};

export function PrimaryCTA({
  children,
  href,
  color = DEFAULT_COLOR,
  hoverColor = DEFAULT_HOVER,
  className = "",
  onClick,
  type = "button",
  disabled,
  form,
}: PrimaryCTAProps) {
  const classes = `primary-cta inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`;
  const style = {
    "--cta-bg": color,
    "--cta-hover": hoverColor,
  } as CSSProperties;
  const content = (
    <>
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
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={style} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {content}
    </button>
  );
}
