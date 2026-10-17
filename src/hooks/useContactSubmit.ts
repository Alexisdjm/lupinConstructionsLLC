"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/src/lib/api";

const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`;

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  address?: string;
  service?: string;
  budget?: string;
  timeline?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function useContactSubmit() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(payload: ContactRequest) {
    setStatus("submitting");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return false;
      }

      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  return { status, submit };
}
