import { Suspense } from "react";
import Loading from "./Loading.jsx"
import { Link } from "react-router-dom";

export default function EntryLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8 text-left">
        <Link
          to="/dashboard"
          className="text-sm text-pink-700 text-left hover:text-pink-800"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
