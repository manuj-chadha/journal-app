import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import LogoutConfirm from "./LogoutConfirm";
import { useState } from "react";
import { toast } from "sonner";

function Header() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
    
    toast.success("See you soooon... 👋")  
  };
  
  const renderLogoutButton = (extraClasses = "") => (
    <Button
      variant="outline"
      className={extraClasses}
      onClick={() => setShowConfirm(true)}
    >
      Logout
    </Button>
  );

  return (
    <header>
      <nav className="container mx-auto py-2 px-2 md:px-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Reflct Logo" className="h-18 sm:h-22 object-contain" />
        </Link>

        {!user ? (
          <Link to="/login">
            <Button variant="outline" className="md:hidden">Login</Button>
          </Link>
        ) : (
          renderLogoutButton("md:hidden")
        )}

        <div className="hidden md:flex items-center gap-3">
          {user && (
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

          {!user ? (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            renderLogoutButton()
          )}
        </div>
      </nav>

      {showConfirm && (
        <LogoutConfirm
          onConfirm={() => {
            handleLogout();
            setShowConfirm(false);
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </header>
  );
}

export default Header;
