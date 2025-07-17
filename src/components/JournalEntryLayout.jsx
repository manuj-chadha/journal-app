import Link from "next/link";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function WriteLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          href="/dashboard"
          className="text-sm text-pink-700 hover:underline hover:text-pink-800 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<BarLoader color="#ec4899" width="100%" />}>
        {children}
      </Suspense>
    </div>
  );
}
