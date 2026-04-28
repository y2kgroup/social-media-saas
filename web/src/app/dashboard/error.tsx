"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external service
    console.error("DASHBOARD ERROR:", error);
  }, [error]);

  return (
    <div className="p-8 text-red-500">
      <h2>Something went wrong in the dashboard!</h2>
      <pre className="mt-4 p-4 bg-red-100 rounded text-sm text-red-800 whitespace-pre-wrap">
        {error.message}
        {"\n\n"}
        {error.stack}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
