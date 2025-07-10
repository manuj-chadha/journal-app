import React from "react";
import { Button } from "../ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

// ⚠️ Dummy flag simulating signed-in status (you can toggle it manually)
const isUserSignedIn = true;

function Header() {
  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Reflct Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {isUserSignedIn && (
            <Link to="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          )}

          <Link to="/journal/write">
            <Button variant="outline" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          {!isUserSignedIn ? (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <Button variant="ghost" className="font-semibold">
              <span>User Menu</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
