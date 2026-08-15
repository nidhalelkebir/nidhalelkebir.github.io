"use client";

import type { ReactNode } from "react";

/**
 * Card wrapper. The 3D tilt was removed in favour of a quiet hover state —
 * the props are kept so existing call sites stay unchanged.
 */
export default function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={`h-full ${className}`}>
      {children}
    </div>
  );
}
