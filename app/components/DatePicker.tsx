'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  id?: string;
  /** Date value as 'YYYY-MM-DD', or '' when unset. */
  value: string;
  onChange: (value: string) => void;
  /** Inclusive bounds as 'YYYY-MM-DD'. */
  min?: string;
  max?: string;
  placeholder?: string;
  hasError?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const fieldBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/25';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function parts(value: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Single-field date picker: a text-like trigger that opens a popup with Month/Year
 * dropdowns (native <select>, so jumping decades is a click-and-type-ahead away)
 * plus a day grid — avoids the native <input type="date"> year scroller entirely.
 */
export default function DatePicker({ id, value, onChange, min, max, placeholder = 'Select date', hasError }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = parts(value);
  const today = new Date();
  const fallback = { y: today.getFullYear(), m: today.getMonth() + 1 };
  const [viewYear, setViewYear] = useState(selected?.y ?? fallback.y);
  const [viewMonth, setViewMonth] = useState(selected?.m ?? fallback.m);

  // Re-sync the visible month/year to the current value each time the field opens.
  const openPicker = () => {
    setViewYear(selected?.y ?? fallback.y);
    setViewMonth(selected?.m ?? fallback.m);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const minParts = min ? parts(min) : null;
  const maxParts = max ? parts(max) : null;
  const yearFloor = minParts?.y ?? viewYear - 100;
  const yearCeil = maxParts?.y ?? viewYear + 100;
  const yearOptions = Array.from({ length: yearCeil - yearFloor + 1 }, (_, i) => yearCeil - i);

  const isOutOfRange = (dateStr: string) => Boolean((min && dateStr < min) || (max && dateStr > max));

  const label = selected
    ? `${MONTH_NAMES[selected.m - 1]} ${selected.d}, ${selected.y}`
    : placeholder;

  const dayCount = daysInMonth(viewYear, viewMonth);
  const leadingBlanks = new Date(viewYear, viewMonth - 1, 1).getDay();
  const cells: Array<{ day: number; dateStr: string } | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: dayCount }, (_, i) => {
      const day = i + 1;
      return { day, dateStr: `${viewYear}-${pad2(viewMonth)}-${pad2(day)}` };
    }),
  ];

  const pickDay = (dateStr: string) => {
    onChange(dateStr);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        data-invalid={hasError || undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className={`${fieldBase} ${hasError ? 'border-red-400' : 'border-gray-300'} flex items-center justify-between gap-2 text-left`}
      >
        <span className={selected ? 'truncate' : 'truncate text-foreground/40'}>{label}</span>
        <Calendar className="h-4 w-4 shrink-0 text-foreground/40" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center gap-2">
            <select
              aria-label="Month"
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
              className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {MONTH_NAMES.map((name, i) => (
                <option key={name} value={i + 1}>{name}</option>
              ))}
            </select>
            <select
              aria-label="Year"
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              className="w-24 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground/50">
            {WEEKDAY_LABELS.map((w) => (
              <div key={w} className="py-1 font-medium">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell) return <div key={`blank-${i}`} />;
              const isSelected = value === cell.dateStr;
              const isToday = toDateInputValue(today) === cell.dateStr;
              const disabled = isOutOfRange(cell.dateStr);
              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  disabled={disabled}
                  onClick={() => pickDay(cell.dateStr)}
                  className={`aspect-square rounded-md text-sm transition ${
                    disabled
                      ? 'cursor-not-allowed text-foreground/20'
                      : isSelected
                        ? 'bg-primary font-medium text-white'
                        : isToday
                          ? 'border border-primary/40 text-foreground hover:bg-primary/10'
                          : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function toDateInputValue(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
