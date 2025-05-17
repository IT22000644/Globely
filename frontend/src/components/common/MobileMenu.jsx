import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  User,
  Heart,
  Settings,
  LogOut,
  Info,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { logout } from "@/features/auth/authSlice";
import { backendApi } from "@/api/backendApi";

const MobileMenu = ({ isOpen, setIsOpen, setIsAuthOpen }) => {
  const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user || {});

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* User Profile Section - Only shown when logged in */}
        {authStatus && (
          <>
            <div className="mt-4 mb-2">
              <Collapsible
                open={isUserMenuOpen}
                onOpenChange={setIsUserMenuOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-accent cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user?.name || "User"}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="flex flex-col space-y-1 ml-2 pl-10 mt-1">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/favorites" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Favorites
                      </Button>
                    </Link>
                    <Link to="/settings" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500"
                      onClick={() => {
                        dispatch(logout());
                        console.log("Logging out");
                        toast.success("Logged out successfully!");
                        dispatch(backendApi.util.invalidateTags(["Favorites"]));
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <Separator className="my-2" />
          </>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 mt-4">
          <Link to="/countries" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-2" />
              Countries
            </Button>
          </Link>
          <Link
            to="/countries?type=region&term=asia"
            onClick={() => setIsOpen(false)}
          >
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-2" />
              Regions
            </Button>
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
          </Link>

          {/* Explore Dropdown */}
          <Collapsible
            open={isExploreOpen}
            onOpenChange={setIsExploreOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center">Explore</div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col space-y-1 ml-2 pl-4 mt-1">
                <Link to="/trending" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Trending
                  </Button>
                </Link>
                <Link to="/compare" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Compare
                  </Button>
                </Link>
                <Link to="/map" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    World Map
                  </Button>
                </Link>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* Separator */}
        <Separator className="my-4" />

        {/* Auth Button - Only shown when logged out */}
        {!authStatus && (
          <div className="px-2">
            <Button
              variant="outline"
              className="w-full border-2 px-6 py-2 transition duration-300 hover:border-blue-500 hover:animate-pulse"
              onClick={() => {
                setIsOpen(false);
                setIsAuthOpen(true);
              }}
            >
              Login
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
