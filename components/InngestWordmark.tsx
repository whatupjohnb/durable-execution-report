import { clsx } from "@/lib/clsx";

type Props = {
  className?: string;
};

/**
 * Simple text-based Inngest wordmark. Uses the display font at medium-bold
 * weight with light tracking to feel close to the actual brand mark. Sits
 * in the chart footer so social-shared screenshots carry attribution.
 */
export function InngestWordmark({ className }: Props) {
  return (
    <span
      className={clsx(
        "select-none font-heading text-xl font-bold uppercase tracking-[0.22em]",
        className,
      )}
      aria-label="Inngest"
    >
      INNGEST
    </span>
  );
}
