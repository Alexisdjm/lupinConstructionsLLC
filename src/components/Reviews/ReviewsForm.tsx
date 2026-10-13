"use client";

import { useState, type FormEvent } from "react";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { SecondaryCTA } from "@/src/components/UXUI/SecondaryTSX";
import type { Dictionary } from "@/src/i18n/getDictionary";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Lupin+Construction+LLC+South+Florida";

type ReviewField = "rating" | "name" | "email" | "review" | "consent";
type ReviewErrors = Partial<Record<ReviewField, string>>;

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#0F2438] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#2ad9c3]";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M12 3.2 14.7 8.8l6.1.6-4.6 4 1.4 6-5.6-3.2-5.6 3.2 1.4-6-4.6-4 6.1-.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ReviewsCopy = Dictionary["reviews"];

export function ReviewsForm({ copy }: { copy: ReviewsCopy }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function clearError(field: ReviewField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ReviewErrors = {};
    if (rating < 1) nextErrors.rating = copy.errors.rating;
    if (name.trim().length < 2) nextErrors.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = copy.errors.email;
    }
    if (review.trim().length < 12) {
      nextErrors.review = copy.errors.review;
    }
    if (!consent) nextErrors.consent = copy.errors.consent;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto mt-10 max-w-235 rounded-[20px] border border-white/10 bg-[#162636] p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-white">
        {copy.formTitle}
      </h3>

      {submitted ? (
        <div className="mt-6">
          <p className="text-sm leading-6 text-white/75">
            {copy.thanks}
          </p>
          <SecondaryCTA href={GOOGLE_REVIEW_URL} external className="mt-6">
            {copy.google}
            <ExternalIcon />
          </SecondaryCTA>
        </div>
      ) : (
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-white/80">
              {copy.name}
              <input
                name="name"
                autoComplete="name"
                value={name}
                placeholder={copy.namePlaceholder}
                onChange={(event) => {
                  setName(event.target.value);
                  clearError("name");
                }}
                className={`${fieldClass} mt-2`}
                aria-invalid={errors.name ? true : undefined}
              />
              {errors.name ? (
                <span className="mt-1 block text-xs text-[#ffb4b4]">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label className="block text-sm text-white/80">
              {copy.email}
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                placeholder="name@example.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                className={`${fieldClass} mt-2`}
                aria-invalid={errors.email ? true : undefined}
              />
              {errors.email ? (
                <span className="mt-1 block text-xs text-[#ffb4b4]">
                  {errors.email}
                </span>
              ) : null}
            </label>
          </div>

          <label className="mt-3 block text-sm text-white/80">
            {copy.review}
            <textarea
              name="review"
              rows={5}
              value={review}
              placeholder={copy.reviewPlaceholder}
              onChange={(event) => {
                setReview(event.target.value);
                clearError("review");
              }}
              className={`${fieldClass} mt-2 resize-y`}
              aria-invalid={errors.review ? true : undefined}
            />
            {errors.review ? (
              <span className="mt-1 block text-xs text-[#ffb4b4]">
                {errors.review}
              </span>
            ) : null}
          </label>

          <div className="mt-3">
            <div
              role="radiogroup"
              aria-labelledby="review-rating-label"
              className="mt-2 flex gap-1 text-[#7f8b96]"
              onMouseLeave={() => setHovered(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const active = (hovered || rating) >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={value === 1 ? copy.starOne : copy.starMany.replace("{count}", String(value))}
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    onClick={() => {
                      setRating(value);
                      clearError("rating");
                    }}
                    className={`rounded-md p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] ${
                      active ? "text-[#2ad9c3]" : "hover:text-[#2ad9c3]"
                    }`}
                  >
                    <Star filled={active} />
                  </button>
                );
              })}
            </div>
            {errors.rating ? (
              <p className="mt-1 text-xs text-[#ffb4b4]">{errors.rating}</p>
            ) : null}
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm leading-5 text-white/70">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                clearError("consent");
              }}
              className="mt-0.5 size-4 shrink-0 accent-[#2ad9c3]"
            />
            <span>
              {copy.consent}
            </span>
          </label>
          {errors.consent ? (
            <p className="mt-1 text-xs text-[#ffb4b4]">{errors.consent}</p>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <PrimaryCTA hoverColor="#C4FCFA" type="submit" className="w-full justify-center">
              {copy.submit}
            </PrimaryCTA>
            <SecondaryCTA
              href={GOOGLE_REVIEW_URL}
              external
              className="w-full justify-center"
            >
              {copy.google}
              <ExternalIcon />
            </SecondaryCTA>
          </div>
        </form>
      )}
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M14 5h5v5M19 5l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6H7.5A2.5 2.5 0 0 0 5 8.5v8A2.5 2.5 0 0 0 7.5 19h8a2.5 2.5 0 0 0 2.5-2.5V13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
