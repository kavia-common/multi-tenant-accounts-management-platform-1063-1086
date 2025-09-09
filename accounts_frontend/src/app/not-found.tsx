import React from "react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 p-6 dark:bg-neutral-950">
      <section className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900" role="alert" aria-live="assertive">
        <header className="mb-2">
          <h1 className="text-xl font-semibold">404 – Page Not Found</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
