"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const BEFORE = "/Repairs/before.webp";
const AFTER = "/Repairs/after.webp";

type BeforeAfterProps = {
  before: string;
  after: string;
  beforeAlt: string;
  slider: string;
  value: string;
};

export function BeforeAfter({ before, after, beforeAlt, slider, value }: BeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  function moveTo(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    if (bounds.width === 0) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    moveTo(event.clientX);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  }

  return (
    <div
      ref={frameRef}
      data-compare
      className="relative mt-10 touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <div className="relative aspect-2/1 overflow-hidden rounded-[20px] bg-[#e7eef1] shadow-[0_18px_40px_rgba(16,24,40,0.08)]">
        <Image
          src={BEFORE}
          alt={beforeAlt}
          fill
          quality={90}
          sizes="(min-width: 1445px) 1300px, 90vw"
          draggable={false}
          className="pointer-events-none object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={AFTER}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1445px) 1300px, 90vw"
            draggable={false}
            className="object-cover object-center"
          />
        </div>

        <span className="absolute top-4 left-4 z-10 rounded-full bg-[#102433]/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase">
          {before}
        </span>
        <span className="absolute top-4 right-4 z-10 rounded-full bg-[#2ad9c3] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#062018] uppercase">
          {after}
        </span>

        <div
          className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(16,24,40,0.12)]"
          style={{ left: `${position}%` }}
        />
      </div>

      <button
        type="button"
        role="slider"
        aria-label={slider}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={value.replace("{percent}", String(Math.round(position)))}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-30 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-[#5c6b76] shadow-[0_8px_24px_rgba(16,24,40,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
        style={{ left: `${position}%` }}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M9 7 5 12l4 5M15 7l4 5-4 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
