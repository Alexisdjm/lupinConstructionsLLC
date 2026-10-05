export function BrandLockup() {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[#2ad9c3] text-[#2ad9c3]">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M8 5.5v13h8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[15px] font-semibold tracking-tight text-white">
          Lupin Construction LLC
        </span>
        <span className="mt-0.5 block text-[10px] font-medium tracking-[0.2em] text-[#2ad9c3]">
          SOUTH FLORIDA
        </span>
      </span>
    </span>
  );
}
