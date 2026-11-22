import { content } from "@/content";

const F = content.form;

export function Progress({ current }: { current: number }) {
  const total = F.stepTitles.length;
  const pct = ((current + 1) / total) * 100;
  return (
    <nav aria-label="Form progress">
      <div className="flex items-baseline justify-between text-sm">
        <p className="font-medium tracking-wide text-gold-deep" aria-live="polite">
          {F.progress(current + 1, total)}
        </p>
        <p className="text-stone sm:hidden">{F.stepTitles[current]}</p>
      </div>
      <div className="mt-3 h-[3px] w-full bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1} aria-label={F.progress(current + 1, total)}>
        <div className="h-full bg-ink transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mt-4 hidden grid-cols-7 gap-2 sm:grid">
        {F.stepTitles.map((t, i) => (
          <li
            key={t}
            aria-current={i === current ? "step" : undefined}
            className={`text-xs leading-tight ${i === current ? "font-medium text-ink" : i < current ? "text-stone" : "text-stone/70"}`}
          >
            {t}
          </li>
        ))}
      </ol>
    </nav>
  );
}
