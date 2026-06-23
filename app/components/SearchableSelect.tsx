'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import type { Option } from '../lib/registrationApi';

interface SearchableSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

const fieldBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/25';

/**
 * Select2-style searchable dropdown: a trigger button that opens a panel with a
 * type-to-filter search box, a scrollable option list, and keyboard navigation.
 * Dependency-free; styled to match the native form fields.
 */
export default function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  disabled,
  hasError,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  // Focus the search box when the menu opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => searchRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  const openMenu = () => {
    if (disabled) return;
    setQuery('');
    setActiveIndex(0);
    setOpen(true);
  };

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt) choose(opt.value);
    } else if (e.key === 'Escape') {
      e.stopPropagation(); // keep the surrounding modal open
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        data-invalid={hasError || undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className={`${fieldBase} ${hasError ? 'border-red-400' : 'border-gray-300'} flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:bg-gray-50`}
      >
        <span className={selected ? 'truncate' : 'truncate text-foreground/40'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-foreground/40" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-foreground/40" aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              placeholder={searchPlaceholder}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onSearchKeyDown}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3.5 py-2 text-sm text-foreground/40">No matches</li>
            ) : (
              filtered.map((o, i) => {
                const isSelected = o.value === value;
                return (
                  <li key={o.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => choose(o.value)}
                      className={`flex w-full items-center justify-between gap-2 px-3.5 py-2 text-left text-sm ${
                        i === activeIndex ? 'bg-primary/10' : ''
                      } ${isSelected ? 'font-medium text-primary' : 'text-foreground'}`}
                    >
                      <span className="truncate">{o.label}</span>
                      {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
