"use client";

import { FormEvent, ReactNode, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function formDataToObject(formData: FormData) {
  const result: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    const strValue = String(value);
    if (key in result) {
      const existing = result[key];
      result[key] = Array.isArray(existing) ? [...existing, strValue] : [existing, strValue];
    } else {
      result[key] = strValue;
    }
  }
  return result;
}

export function InquiryFormShell({
  action,
  children,
  submitLabel = "Submit",
}: {
  action: string;
  children: ReactNode;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttemptedSubmit(true);
    const form = e.currentTarget;
    const data = formDataToObject(new FormData(form));

    setStatus("submitting");
    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900">Thank you for your submission</h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-emerald-800">
          We&apos;ve received your details. Our team will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setAttemptedSubmit(false);
          }}
          className="mt-6 inline-flex items-center rounded-full border border-emerald-600 bg-white px-5 py-2.5 text-sm font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInvalidCapture={() => setAttemptedSubmit(true)}
      className={`space-y-6 ${attemptedSubmit ? "attempted-submit" : ""}`}
    >
      {children}

      {status === "error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong submitting the form. Please try again.
        </p>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting..." : submitLabel}
        </button>
        <button
          type="reset"
          onClick={() => setAttemptedSubmit(false)}
          className="inline-flex items-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
