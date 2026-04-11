import { Link, NavLink } from "react-router-dom";
import Button from "../common/Button";
import logo from "../../assets/images/logo.png";
import logoIcon from "../../assets/images/logoIcon.png";

export default function Header() {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-blue-600"
        : "text-slate-600 hover:text-slate-900"
    }`;

  return (
   <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
    
    {/* LOGO */}
    <Link to="/" className="flex items-center gap-3">
      
      {/* Icon (mobile) */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-md sm:hidden">
        <img
          src={logoIcon}
          alt="SmartPrep"
          className="h-6 w-6 object-contain"
        />
      </div>

      {/* Full logo (desktop) */}
      <img
        src={logo}
        alt="SmartPrep"
        className="hidden h-12 w-auto object-contain sm:block"
      />
    </Link>


    {/* BUTTONS */}
    <div className="flex items-center gap-3">
      <Link to="/login">
        <Button variant="secondary" className="hidden sm:inline-flex">
          Sign In
        </Button>
      </Link>

      <Link to="/register">
        <Button>Create Account</Button>
      </Link>
    </div>
  </div>
</header>
  );
}