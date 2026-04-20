import { Reveal } from "./Reveal";

type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <Reveal as="figure" className="my-10 rounded-tr-[24px] rounded-bl-[24px] bg-[#353535] px-8 py-10 sm:px-12 sm:py-12">
      <span className="mb-4 block font-heading text-3xl leading-none text-matcha-600 select-none">
        &ldquo;
      </span>
      <blockquote className="font-heading text-xl font-normal leading-snug tracking-tight text-carbon-50 sm:text-2xl">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-carbon-500">
          — {attribution}
        </figcaption>
      ) : null}
      <span className="mt-4 block text-right font-heading text-3xl leading-none text-matcha-600 select-none">
        &rdquo;
      </span>
    </Reveal>
  );
}
