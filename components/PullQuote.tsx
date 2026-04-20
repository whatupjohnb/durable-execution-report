import { Reveal } from "./Reveal";

type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <Reveal as="figure" className="my-10 rounded-tr-[24px] rounded-bl-[24px] border border-carbon-700 bg-[#242424] px-7 py-7 sm:px-10 sm:py-8">
      <div className="font-heading text-xl font-normal leading-snug tracking-tight text-carbon-50 sm:text-2xl">
        <span className="mr-1 font-heading text-2xl leading-none text-matcha-600 select-none align-top">&ldquo;</span>
        {children}
      </div>
      {attribution ? (
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-carbon-500">
          — {attribution}
        </p>
      ) : null}
    </Reveal>
  );
}
