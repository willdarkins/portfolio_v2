"use client";

import { useId, useState } from "react";

/*
  Newsletter sign-up band. Phase 1: the form renders and validates but posts
  nowhere (no action, no network request). Substack wiring is Phase 3.
*/
export function SubscribeBand({ heading, body }: { heading: string; body: string }) {
  const headingId = useId();
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4.5 rounded-md border border-line bg-paper-warm px-7.5 py-8"
    >
      <div className="flex-[1_1_340px]">
        <h3 id={headingId} className="font-serif text-title font-semibold">
          {heading}
        </h3>
        <p className="mt-1.5 font-serif text-body text-ink-soft">{body}</p>
      </div>
      <div className="flex flex-[1_1_340px] flex-wrap items-end gap-2.5">
        <label className="flex flex-[1_1_200px] flex-col gap-1.5 text-meta font-semibold text-ink-soft">
          Email address
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="min-h-11 rounded border border-input-line bg-white px-3.5 py-3 font-sans text-body font-normal text-ink placeholder:text-muted"
          />
        </label>
        <button
          type="submit"
          className="min-h-11 cursor-pointer rounded bg-navy px-5.5 text-label font-semibold text-white hover:bg-navy-deep motion-safe:transition-colors"
        >
          Subscribe
        </button>
      </div>
      <p role="status" className={submitted ? "basis-full text-meta text-ink-soft" : "sr-only"}>
        {submitted ? "Thanks! Subscriptions open when the newsletter launches." : ""}
      </p>
    </form>
  );
}
