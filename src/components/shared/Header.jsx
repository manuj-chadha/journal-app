// Header.jsx
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((store) => store.auth);
  const isUserSignedIn = !!user;

  return (
    <header className="md:sticky top-0 z-50">
      <nav className="container mx-auto py-2 px-2 md:px-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Reflct Logo" className="h-18 sm:h-22 object-contain" />
        </Link>
        <Link to="/journal/write">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 md:hidden">
              <PenBox size={18} />
              <span>Write New</span>
            </Button>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          {isUserSignedIn && (
            <Link to="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span>Collections</span>
              </Button>
            </Link>
          )}

          <Link to="/journal/write">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
              <PenBox size={18} />
              <span>Write New</span>
            </Button>
          </Link>

          {!isUserSignedIn ? (
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          ) : (
            <Button variant="secondary">Logout</Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
