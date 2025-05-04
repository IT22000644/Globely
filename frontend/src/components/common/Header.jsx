import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Info,
  User,
  Heart,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "@/assets/logo.svg";
import AuthSheet from "@/features/auth/AuthSheet";
import MobileMenu from "./MobileMenu";
import { useTheme } from "@/hooks/useTheme";
import { logout } from "@/features/auth/authSlice";
import { backendApi } from "@/api/backendApi";

export default function Header({ isAuthOpen, setIsAuthOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { theme, setTheme } = useTheme();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Navigation links for consistency
  const navLinks = [
    {
      to: "/countries",
      label: "Countries",
      icon: <Globe className="h-4 w-4 mr-2" />,
    },
    {
      to: "/regions",
      label: "Regions",
      icon: <Globe className="h-4 w-4 mr-2" />,
    },
    { to: "/about", label: "About", icon: <Info className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-black/20 border-b border-border shadow-sm">
      <div className="container  mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-xl font-bold transition-transform hover:scale-105"
        >
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
            Globely
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Regular nav links */}
          {navLinks.map((link) => (
            <Link to={link.to} key={link.to}>
              <Button
                variant="ghost"
                className="hover:bg-muted/50 hover:text-primary transition-colors"
              >
                {link.label}
              </Button>
            </Link>
          ))}

          {/* Countries dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center hover:bg-muted/50 hover:text-primary transition-colors"
              >
                Explore
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/trending" className="flex cursor-pointer">
                  Trending
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/compare" className="flex cursor-pointer">
                  Compare
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/map" className="flex cursor-pointer">
                  World Map
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Separator for visual hierarchy */}
          <div className="h-6 w-px bg-border mx-2"></div>

          {/* Auth button/Avatar */}
          {authStatus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-9 w-9">
                  <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2 border-b border-border">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">
                      {user?.username || "U"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || "U"}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/favorites")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(backendApi.util.invalidateTags(["Favorites"]));
                    console.log("Logging out");
                    toast.success("Logged out successfully!");
                  }}
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setIsAuthOpen(true)}
              variant="outline"
              className="ml-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Login
            </Button>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-1 hover:bg-muted/50 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile nav + Theme toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme toggle on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-muted/50 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile menu */}
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsAuthOpen={setIsAuthOpen}
          />
        </div>
      </div>

      {/* Auth Sheet */}
      <AuthSheet isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />
    </header>
  );
}
