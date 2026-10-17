"use client";

import { useState, type FormEvent } from "react";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { SecondaryCTA } from "@/src/components/UXUI/SecondaryTSX";
import {
  useReviewSubmit,
  type ReviewField,
  type ReviewSubmitError,
} from "@/src/hooks/useReviewSubmit";
import type { Dictionary } from "@/src/i18n/getDictionary";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Lupin+Constructions+LLC+South+Florida";

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
  const { status, submit } = useReviewSubmit();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [submitError, setSubmitError] = useState<ReviewSubmitError | null>(null);

  function clearError(field: ReviewField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: ReviewErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedReview = review.trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      nextErrors.rating = copy.errors.rating;
    }
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      nextErrors.name = copy.errors.name;
    }
    if (
      trimmedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      nextErrors.email = copy.errors.email;
    }
    if (trimmedReview.length < 12 || trimmedReview.length > 2000) {
      nextErrors.review = copy.errors.review;
    }
    if (!consent) nextErrors.consent = copy.errors.consent;
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("validation");
      return;
    }

    const result = await submit({
      name: trimmedName,
      email: trimmedEmail,
      rating,
      message: trimmedReview,
      consent,
    });

    if (!result.ok) {
      const backendErrors: ReviewErrors = {};
      for (const field of result.fields) backendErrors[field] = copy.errors[field];
      setErrors((current) => ({ ...current, ...backendErrors }));
      setSubmitError(result.error);
      return;
    }

    setRating(0);
    setHovered(0);
    setName("");
    setEmail("");
    setReview("");
    setConsent(false);
  }

  const submitErrorMessage = submitError ? copy.submitErrors[submitError] : null;

  return (
    <div className="mx-auto mt-10 max-w-235 rounded-[20px] border border-white/10 bg-[#162636] p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-white">
        {copy.formTitle}
      </h3>

      {status === "success" ? (
        <div className="mt-6" role="status" aria-live="polite">
          <p className="text-sm leading-6 text-white/75">
            {copy.thanks}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/60">{copy.pending}</p>
          <SecondaryCTA href={GOOGLE_REVIEW_URL} external className="mt-6">
            {copy.google}
            <ExternalIcon />
          </SecondaryCTA>
        </div>
      ) : (
        <form className="mt-6" onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-white/80">
              {copy.name}
              <input
                name="name"
                autoComplete="name"
                maxLength={100}
                value={name}
                placeholder={copy.namePlaceholder}
                onChange={(event) => {
                  setName(event.target.value);
                  clearError("name");
                }}
                className={`${fieldClass} mt-2`}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "review-name-error" : undefined}
              />
              {errors.name ? (
                <span id="review-name-error" className="mt-1 block text-xs text-[#ffb4b4]">
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
                maxLength={254}
                value={email}
                placeholder="name@example.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                className={`${fieldClass} mt-2`}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "review-email-error" : undefined}
              />
              {errors.email ? (
                <span id="review-email-error" className="mt-1 block text-xs text-[#ffb4b4]">
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
              maxLength={2000}
              value={review}
              placeholder={copy.reviewPlaceholder}
              onChange={(event) => {
                setReview(event.target.value);
                clearError("review");
              }}
              className={`${fieldClass} mt-2 resize-y`}
              aria-invalid={errors.review ? true : undefined}
              aria-describedby={errors.review ? "review-message-error" : undefined}
            />
            {errors.review ? (
              <span id="review-message-error" className="mt-1 block text-xs text-[#ffb4b4]">
                {errors.review}
              </span>
            ) : null}
          </label>

          <div className="mt-3">
            <p id="review-rating-label" className="text-sm text-white/80">{copy.rating}</p>
            <div
              role="radiogroup"
              aria-labelledby="review-rating-label"
              aria-describedby={errors.rating ? "review-rating-error" : undefined}
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
              <p id="review-rating-error" className="mt-1 text-xs text-[#ffb4b4]">{errors.rating}</p>
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
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "review-consent-error" : undefined}
            />
            <span>
              {copy.consent}
            </span>
          </label>
          {errors.consent ? (
            <p id="review-consent-error" className="mt-1 text-xs text-[#ffb4b4]">{errors.consent}</p>
          ) : null}

          <div aria-live="polite" aria-atomic="true">
            {status === "submitting" ? (
              <p className="mt-4 text-sm text-white/60">{copy.submitting}</p>
            ) : submitErrorMessage ? (
              <p className="mt-4 text-sm text-[#ffb4b4]" role="alert">{submitErrorMessage}</p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <PrimaryCTA
              hoverColor="#C4FCFA"
              type="submit"
              disabled={status === "submitting"}
              className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? copy.submitting : copy.submit}
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
