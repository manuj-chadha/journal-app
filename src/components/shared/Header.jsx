import React from "react";
import { Button } from "../ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";

// ⚠️ Dummy flag simulating signed-in status (you can toggle it manually)
// const isUserSignedIn = true;

function Header() {
  const { user }=useSelector(store => store.auth);
  console.log(user);
  
  const isUserSignedIn=user!=null;
  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Reflct Logo"
            width={300}
            height={80}
            className="h-20 w-auto object-contain"
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
              <Button variant="outline" class>Login</Button>
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
