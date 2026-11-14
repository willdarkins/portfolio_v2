import { useId } from "react";
import { MarginNote } from "./ink/MarginNote";

/* "How I got here": a handwritten label and an ordered list of career steps joined by arrows. */
export function PathStrip({
  label,
  steps,
}: {
  label: string;
  steps: { strong: string; rest: string }[];
}) {
  const labelId = useId();
  return (
    <div className="flex flex-wrap items-center gap-x-5.5 gap-y-3.5 rounded-md border border-line bg-paper-warm px-6.5 py-row">
      <MarginNote id={labelId} size="large">
        {label}
      </MarginNote>
      <ol aria-labelledby={labelId} className="flex flex-wrap items-center gap-x-5.5 gap-y-3.5">
        {steps.map((step, i) => (
          <li key={step.strong} className="flex items-center gap-x-5.5 font-serif text-path text-ink-soft">
            {i > 0 && (
              <span aria-hidden="true" className="font-sans text-lede text-navy">
                →
              </span>
            )}
            <span>
              <b className="font-semibold text-ink">{step.strong}</b>
              {/^[,.;:]/.test(step.rest) ? "" : " "}
              {step.rest}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
