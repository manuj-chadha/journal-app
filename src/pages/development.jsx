import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function InDeveloping() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold gradient-title mb-4">
        Stay Tuned!
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-700">
        We&apos;re working hard to bring this feature to you!
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Stay tuned — exciting updates are on the way. Meanwhile, you can explore other features.
      </p>
      <Link to="/">
        <Button variant="default">Return Home</Button>
      </Link>
    </div>
  );
}
