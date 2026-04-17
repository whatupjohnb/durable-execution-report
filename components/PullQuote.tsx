type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <figure className="my-10 border-y border-matcha-400/30 py-6">
      <blockquote className="font-heading text-2xl font-medium leading-snug tracking-tight text-carbon-50 sm:text-3xl">
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-matcha-400">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
