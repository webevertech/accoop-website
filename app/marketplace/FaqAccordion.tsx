'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/**
 * WAI-ARIA accordion: each question is a <button> inside an <h3> with aria-expanded/aria-controls.
 * Enter/Space toggle (native button); ArrowUp/ArrowDown/Home/End move between questions.
 * Answers stay in the server-rendered HTML (toggled with `hidden`) so they remain crawlable.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const target =
      e.key === 'ArrowDown' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className="divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.q}>
            <h3 className="text-base sm:text-lg">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-heading font-semibold text-foreground transition-colors hover:bg-primary/5 hover:text-primary focus-visible:-outline-offset-2 sm:px-6"
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen} className="px-5 pb-5 leading-relaxed text-foreground/80 sm:px-6">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
