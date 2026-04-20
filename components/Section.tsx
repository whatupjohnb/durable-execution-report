import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { clsx } from "@/lib/clsx";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: Props) {
  return (
    <section
      id={id}
      className={clsx("scroll-mt-20 py-28 sm:py-36", className)}
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
        {eyebrow ? (
          <div className="mb-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h2 className="mb-12 font-heading text-4xl font-medium tracking-tight text-carbon-50 sm:text-5xl">
          {title}
        </h2>
        </Reveal>
        <div className="report-prose">{children}</div>
      </div>
    </section>
  );
}
