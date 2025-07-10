import { Suspense } from "react";
import Loading from "./loading";
import { Link } from "react-router-dom";

export default function EntryLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8 text-left">
        <Link
          to="/dashboard"
          className="text-sm text-orange-600 text-left hover:text-orange-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
