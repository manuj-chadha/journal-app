import React from "react";
import { Button } from "../ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import UserPopover from "../UserPopover";

// ⚠️ Dummy flag simulating signed-in status (you can toggle it manually)
// const isUserSignedIn = true;

function Header() {
  const { user }=useSelector(store => store.auth);
  console.log(user);
  
  const isUserSignedIn=user!=null;
  return (
    <header className="container mx-auto">
      <nav className="py-2 px-4 flex justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Reflct Logo"
            width={300}
            height={80}
            className="h-28 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {isUserSignedIn && (
            <Link to="/dashboard#collections">
              <Button variant="journal" className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          )}

          <Link to="/journal/write">
            <Button variant="journal" className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          {!isUserSignedIn ? (
            <Link to="/login">
              <Button variant="journal">Login</Button>
            </Link>
          ) : (
            // <UserPopover />
            <Button variant="journal" className="font-semibold ">
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
