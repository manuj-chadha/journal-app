import { Link } from "react-router-dom";
import { Home, FolderOpen, User, PenBox } from "lucide-react";
import { useSelector } from "react-redux";

function BottomNav() {
  const { user } = useSelector((store) => store.auth);

  const navItem = (to, Icon, label) => (
    <Link
      to={to}
      className="flex flex-col items-center text-xs text-gray-800 hover:text-pink-600 transition"
    >
      <Icon size={20} />
      {label}
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/60 backdrop-blur-md border-t shadow-sm flex justify-around items-center py-2 z-50 md:hidden">
      {navItem("/", Home, "Home")}
      {user && navItem("/dashboard#collections", FolderOpen, "Collections")}
      {navItem("/journal/write", PenBox, "Write")}
      {navItem(user ? "/profile" : "/login", User, user ? "Profile" : "Login")}
    </nav>
  );
}

export default BottomNav;
