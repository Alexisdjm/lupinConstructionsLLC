import type { Dictionary } from "@/src/i18n/getDictionary";
import type { Locale } from "@/src/i18n/locales";
import { API_BASE_URL } from "@/src/lib/api";
import { ReviewsRetryButton } from "./ReviewsRetryButton";

type ReviewsCopy = Dictionary["reviews"];

export type ApprovedReview = {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string | null;
};

export type ReviewsResponse = {
  reviews: ApprovedReview[];
};

function normalizeReview(value: unknown): ApprovedReview | null {
  if (!value || typeof value !== "object") return null;
  const review = value as Record<string, unknown>;
  if (
    typeof review.id !== "string" ||
    typeof review.name !== "string" ||
    typeof review.rating !== "number" ||
    !Number.isFinite(review.rating) ||
    typeof review.message !== "string"
  ) {
    return null;
  }

  return {
    id: review.id,
    name: review.name,
    rating: Math.min(5, Math.max(1, Math.round(review.rating))),
    message: review.message,
    date: typeof review.date === "string" ? review.date : null,
  };
}

async function getReviews(): Promise<ReviewsResponse> {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) throw new Error("Reviews request failed");
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !("reviews" in body)) {
    throw new Error("Invalid reviews response");
  }

  const reviews = (body as { reviews?: unknown }).reviews;
  if (!Array.isArray(reviews)) throw new Error("Invalid reviews response");
  return { reviews: reviews.map(normalizeReview).filter((review) => review !== null) };
}

function formatDate(date: string | null, locale: Locale) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    dateStyle: "medium",
  }).format(parsed);
}

function RatingStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex gap-1 text-[#2ad9c3]" aria-label={label}>
      {[1, 2, 3, 4, 5].map((value) => (
        <svg key={value} viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M12 3.2 14.7 8.8l6.1.6-4.6 4 1.4 6-5.6-3.2-5.6 3.2 1.4-6-4.6-4 6.1-.6z"
            fill={rating >= value ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export async function ReviewsList({ copy, locale }: { copy: ReviewsCopy; locale: Locale }) {
  let reviews: ApprovedReview[];

  try {
    ({ reviews } = await getReviews());
  } catch {
    return (
      <div className="mt-10 rounded-[20px] border border-white/10 bg-[#162636] p-6 text-center" role="status">
        <p className="text-sm text-[#ffb4b4]">{copy.listError}</p>
        <ReviewsRetryButton retry={copy.retry} loading={copy.listLoading} />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-white/60" role="status">
        {copy.listEmpty}
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-center text-xl font-semibold text-white">{copy.listTitle}</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const date = formatDate(review.date, locale);
          const ratingLabel = review.rating === 1
            ? copy.starOne
            : copy.starMany.replace("{count}", String(review.rating));

          return (
            <article key={review.id} className="rounded-[20px] border border-white/10 bg-[#162636] p-6">
              <RatingStars rating={review.rating} label={ratingLabel} />
              <p className="mt-4 text-sm leading-6 text-white/75">{review.message}</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{review.name}</p>
                {date ? <time dateTime={review.date ?? undefined} className="mt-1 block text-xs text-white/45">{date}</time> : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ReviewsListLoading({ copy }: { copy: ReviewsCopy }) {
  return (
    <p className="mt-10 text-center text-sm text-white/60" role="status" aria-live="polite">
      {copy.listLoading}
    </p>
  );
}
