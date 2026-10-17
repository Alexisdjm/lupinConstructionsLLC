"use client";

import { useRef, useState } from "react";
import { API_BASE_URL } from "@/src/lib/api";

export type ReviewRequest = {
  name: string;
  email: string;
  rating: number;
  message: string;
  consent: boolean;
};

export type ReviewSubmitError =
  | "validation"
  | "forbidden"
  | "rateLimit"
  | "providerUnavailable"
  | "serviceUnavailable"
  | "timeout"
  | "network"
  | "generic";

export type ReviewField = "rating" | "name" | "email" | "review" | "consent";

type SubmitResult =
  | { ok: true }
  | { ok: false; error: ReviewSubmitError; fields: ReviewField[] };

type Status = "idle" | "submitting" | "success" | "error";

const backendFieldMap: Record<string, ReviewField> = {
  rating: "rating",
  name: "name",
  email: "email",
  message: "review",
  consent: "consent",
};

function errorForStatus(status: number): ReviewSubmitError {
  if (status === 400) return "validation";
  if (status === 403) return "forbidden";
  if (status === 429) return "rateLimit";
  if (status === 502) return "providerUnavailable";
  if (status === 503) return "serviceUnavailable";
  if (status === 504) return "timeout";
  return "generic";
}

async function knownErrorFields(response: Response): Promise<ReviewField[]> {
  if (response.status !== 400) return [];

  try {
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("fields" in body)) return [];
    const { fields } = body as { fields?: unknown };
    const keys = Array.isArray(fields)
      ? fields.filter((field): field is string => typeof field === "string")
      : fields && typeof fields === "object"
        ? Object.keys(fields)
        : [];

    return [
      ...new Set(
        keys
          .map((key) => backendFieldMap[key])
          .filter((field): field is ReviewField => field !== undefined),
      ),
    ];
  } catch {
    return [];
  }
}

export function useReviewSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const inFlight = useRef(false);

  async function submit(payload: ReviewRequest): Promise<SubmitResult> {
    if (inFlight.current) {
      return { ok: false, error: "generic", fields: [] };
    }

    inFlight.current = true;
    setStatus("submitting");

    try {
      const response = await fetch(`${API_BASE_URL}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        setStatus("success");
        return { ok: true };
      }

      const fields = await knownErrorFields(response);
      setStatus("error");
      return { ok: false, error: errorForStatus(response.status), fields };
    } catch {
      setStatus("error");
      return { ok: false, error: "network", fields: [] };
    } finally {
      inFlight.current = false;
    }
  }

  return { status, submit };
}
