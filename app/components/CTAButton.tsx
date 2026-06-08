'use client';
import { ReactNode, CSSProperties } from 'react';

export type FormType = 'inquiry' | 'vendor' | 'sponsor';

interface CTAButtonProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  formType?: FormType;
  /** Optional explicit heading shown in the modal. Defaults to the button's text label. */
  label?: string;
}

export default function CTAButton({ className, style, children, formType = 'inquiry', label }: CTAButtonProps) {
  const heading = label ?? (typeof children === 'string' ? children : undefined);
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('openFormModal', { detail: { formType, heading } }))}
      className={className}
      style={{ touchAction: 'manipulation', cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
}
