"use client";

import { useEffect, useState } from "react";
import { clsx } from "@/lib/clsx";

export type TOCItem = { id: string; label: string };

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observers: IntersectionObserver[] = [];
    const handler = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };
    const observer = new IntersectionObserver(handler, {
      rootMargin: "-40% 0px -55% 0px",
    });
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    observers.push(observer);
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-8 hidden w-56 shrink-0 self-start pt-20 sm:pt-24 lg:block print-hide"
    >
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-carbon-500">
        Contents
      </div>
      <ol className="space-y-3 border-l border-carbon-800">
        {items.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={clsx(
                  "-ml-px block border-l-2 pl-4 text-sm leading-snug transition-colors",
                  isActive
                    ? "border-matcha-400 text-carbon-50"
                    : "border-transparent text-carbon-500 hover:text-carbon-200",
                )}
              >
                <span className="mr-2 font-mono text-xs text-carbon-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
