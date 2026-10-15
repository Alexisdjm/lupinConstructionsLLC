"use client";

import { useState, type FormEvent } from "react";
import { useContactSubmit, type ContactRequest } from "@/src/hooks/useContactSubmit";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import type { Dictionary } from "@/src/i18n/getDictionary";

type ContactCopy = Dictionary["contact"];
type RequiredField = "name" | "email" | "message";
type FormErrors = Partial<Record<RequiredField, string>>;

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#dce3e8] bg-white px-4 py-3 text-sm text-[#182532] outline-none transition placeholder:text-[#8a96a1] focus:border-[#149e90] focus:ring-3 focus:ring-[#2ad9c3]/15";

export function ContactForm({ copy }: { copy: ContactCopy }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const { status, submit } = useContactSubmit();

  function clearError(field: RequiredField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const value = (field: string) => String(form.get(field) ?? "").trim();
    const nextErrors: FormErrors = {};

    if (value("name").length < 2) nextErrors.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) {
      nextErrors.email = copy.errors.email;
    }
    if (!value("message")) nextErrors.message = copy.errors.message;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload: ContactRequest = {
      name: value("name"),
      email: value("email"),
      message: value("message"),
    };
    for (const field of ["phone", "location", "service", "budget", "timeline"] as const) {
      const text = value(field);
      if (text) payload[field] = text;
    }

    await submit(payload);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#2ad9c3]/35 bg-[#effcf9] px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#2ad9c3] text-[#062018]">
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path d="m6 12.5 4 4L18.5 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-[#172330]">{copy.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#5f6974]">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[#e1e7eb] bg-white p-5 shadow-[0_20px_60px_rgba(6,27,45,0.08)] sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.name} error={errors.name}>
          <input name="name" autoComplete="name" placeholder={copy.namePlaceholder} onChange={() => clearError("name")} aria-invalid={errors.name ? true : undefined} className={fieldClass} />
        </Field>
        <Field label={copy.email} error={errors.email}>
          <input name="email" type="email" autoComplete="email" placeholder="name@example.com" onChange={() => clearError("email")} aria-invalid={errors.email ? true : undefined} className={fieldClass} />
        </Field>
        <Field label={copy.phone} hint={copy.optional}>
          <input name="phone" type="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} className={fieldClass} />
        </Field>
        <Field label={copy.location} hint={copy.optional}>
          <input name="location" autoComplete="address-level2" placeholder={copy.locationPlaceholder} className={fieldClass} />
        </Field>
        <Field label={copy.service} hint={copy.optional}>
          <select name="service" defaultValue="" className={fieldClass}>
            <option value="">{copy.selectOption}</option>
            {copy.services.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
        <Field label={copy.budget} hint={copy.optional}>
          <select name="budget" defaultValue="" className={fieldClass}>
            <option value="">{copy.selectOption}</option>
            {copy.budgets.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
        <Field label={copy.timeline} hint={copy.optional}>
          <select name="timeline" defaultValue="" className={fieldClass}>
            <option value="">{copy.selectOption}</option>
            {copy.timelines.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={copy.message} error={errors.message}>
          <textarea name="message" rows={5} placeholder={copy.messagePlaceholder} onChange={() => clearError("message")} aria-invalid={errors.message ? true : undefined} className={`${fieldClass} resize-y`} />
        </Field>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-[#b42318]">{copy.submitError}</p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-[#75808a]">{copy.privacy}</p>
        <PrimaryCTA type="submit" hoverColor="#C4FCFA" disabled={status === "submitting"} className="justify-center sm:min-w-48 disabled:cursor-not-allowed disabled:opacity-60">
          {status === "submitting" ? copy.sending : copy.submit}
        </PrimaryCTA>
      </div>
    </form>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-[#293744]">
      <span>{label}{hint ? <span className="ml-1 font-normal text-[#8a96a1]">({hint})</span> : null}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs font-normal text-[#b42318]">{error}</span> : null}
    </label>
  );
}
