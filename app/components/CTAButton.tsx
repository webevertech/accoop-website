'use client';
import { ReactNode, CSSProperties } from 'react';

interface CTAButtonProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function CTAButton({ className, style, children }: CTAButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('openFormModal'))}
      className={className}
      style={{ touchAction: 'manipulation', cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
}
