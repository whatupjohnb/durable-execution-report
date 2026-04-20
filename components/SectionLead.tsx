import { clsx } from "@/lib/clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Lead callout used at the top of each content section. Renders a large
 * tracked-tight paragraph with a small emoji glyph, matching the editorial
 * "👉 key insight" treatment from the report draft.
 */
export function SectionLead({ children, className }: Props) {
  return (
    <aside
      className={clsx(
        "my-6 flex gap-4 border-l-2 border-matcha-400 pl-5 text-carbon-100",
        className,
      )}
    >
      <span aria-hidden="true" className="mt-1 select-none text-xl leading-none">
        👉
      </span>
      <p className="font-heading text-xl font-medium leading-snug tracking-tight sm:text-2xl">
        {children}
      </p>
    </aside>
  );
}
