"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setFormattedTime(
        new Date().toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "medium",
        }),
      );
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        hello greg
      </h1>
      <p
        className="text-lg text-zinc-600 dark:text-zinc-400"
        aria-live="polite"
      >
        {formattedTime ?? "—"}
      </p>
    </main>
  );
}
