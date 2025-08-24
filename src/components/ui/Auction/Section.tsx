import React from "react";

export default function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 ${className}`}>{children}</section>;
}
