import { Suspense } from "react";
import { getDictionary } from "@/src/i18n/getDictionary";
import { ReviewsForm } from "./ReviewsForm";
import { ReviewsList, ReviewsListLoading } from "./ReviewsList";

export async function Reviews() {
  const { locale, messages } = await getDictionary();
  const copy = messages.reviews;
  return (
    <section id="reviews" className="scroll-mt-24 bg-[#061B2D]">
      <svg
        viewBox="0 0 1440 230"
        preserveAspectRatio="none"
        className="block h-37.5 w-full sm:h-47.5"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="review-surf" gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="140">
            <stop offset="0%" stopColor="#d5dee4" />
            <stop offset="100%" stopColor="#7f9aab" />
          </linearGradient>
          <linearGradient id="review-deep" gradientUnits="userSpaceOnUse" x1="0" y1="110" x2="0" y2="220">
            <stop offset="0%" stopColor="#3d6278" />
            <stop offset="100%" stopColor="#061B2D" />
          </linearGradient>
        </defs>
        <path
          fill="url(#review-deep)"
          d="M0 183C69 213 137 178 206 146C274 115 343 140 411 163C480 185 549 152 617 132C686 111 754 154 823 183C891 213 960 178 1029 146C1097 115 1166 140 1234 163C1303 185 1371 152 1440 132V0H0Z"
        />
        <path
          fill="url(#review-surf)"
          d="M0 113C53 92 107 62 160 82C213 102 267 138 320 125C373 112 427 82 480 96C533 110 587 134 640 113C693 92 747 62 800 82C853 102 907 138 960 125C1013 112 1067 82 1120 96C1173 110 1227 134 1280 113C1333 92 1387 62 1440 82V0H0Z"
        />
        <path
          fill="#ffffff"
          d="M0 69C44 74 87 40 131 31C175 21 218 49 262 57C305 64 349 38 393 35C436 33 480 64 524 69C567 74 611 40 655 31C698 21 742 49 785 57C829 64 873 38 916 35C960 33 1004 64 1047 69C1091 74 1135 40 1178 31C1222 21 1265 49 1309 57C1353 64 1396 38 1440 35V0H0Z"
        />
      </svg>

      <div className="page-shell pt-4 pb-16 lg:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#2ad9c3] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/60 sm:text-base">
            {copy.subtitle}
          </p>
        </div>

        <Suspense fallback={<ReviewsListLoading copy={copy} />}>
          <ReviewsList copy={copy} locale={locale} />
        </Suspense>

        <ReviewsForm copy={copy} />
      </div>
    </section>
  );
}
