'use client';
import { ReactNode, CSSProperties } from 'react';

export type FormType = 'inquiry' | 'vendor';

interface CTAButtonProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  formType?: FormType;
}

export default function CTAButton({ className, style, children, formType = 'inquiry' }: CTAButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('openFormModal', { detail: { formType } }))}
      className={className}
      style={{ touchAction: 'manipulation', cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
}
