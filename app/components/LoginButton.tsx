'use client';
import { ReactNode, CSSProperties } from 'react';

interface LoginButtonProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function LoginButton({ className, style, children }: LoginButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))}
      className={className}
      style={{ touchAction: 'manipulation', cursor: 'pointer', ...style }}
    >
      {children}
    </button>
  );
}
