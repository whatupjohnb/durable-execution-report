type Props = {
  value: string;
  label: string;
  source?: string;
};

export function StatCallout({ value, label, source }: Props) {
  return (
    <figure className="my-8 border-l-2 border-matcha-400 pl-6">
      <div className="font-heading text-5xl font-semibold tracking-tight text-carbon-50 sm:text-6xl">
        {value}
      </div>
      <figcaption className="mt-2 max-w-md text-sm leading-relaxed text-carbon-300">
        {label}
        {source ? (
          <span className="mt-1 block font-mono text-xs text-carbon-500">
            {source}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
