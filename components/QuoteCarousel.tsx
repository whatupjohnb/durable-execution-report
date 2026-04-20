"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";

type Quote = {
  quote: string;
  attribution?: string;
};

type Props = {
  quotes: Quote[];
};

export function QuoteCarousel({ quotes }: Props) {
  const [index, setIndex] = useState(0);

  function go(next: number) {
    setIndex(next);
  }

  const prev = () => go((index - 1 + quotes.length) % quotes.length);
  const next = () => go((index + 1) % quotes.length);

  const q = quotes[index];

  return (
    <div className="my-10 select-none">
      {/* Card — identical structure and padding to PullQuote */}
      <div className="rounded-tr-[24px] rounded-bl-[24px] border border-carbon-700 bg-[#242424] px-7 py-7 sm:px-10 sm:py-8">
        <div className="mb-[-0.25em] select-none font-heading text-7xl leading-none text-carbon-500">&ldquo;</div>
        <div
          key={index}
          className="font-heading text-xl font-normal leading-snug tracking-tight text-carbon-50 sm:text-2xl animate-quote-in"
        >
          {q.quote}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to quote ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-matcha-500" : "w-1.5 bg-carbon-700 hover:bg-carbon-500",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous quote"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-carbon-700 text-carbon-400 transition hover:border-matcha-500 hover:text-matcha-400"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next quote"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-carbon-700 text-carbon-400 transition hover:border-matcha-500 hover:text-matcha-400"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
