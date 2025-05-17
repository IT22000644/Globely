import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header.jsx";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import StickyFavorites from "@/features/favorites/StickyFavorites";
import FavoritesDrawer from "@/features/favorites/FavoritesDrawer";
import ScrollToTop from "@/components/common/ScrollToTop";

const MainLayout = () => {
  const [openFavorites, setOpenFavorites] = useState(false); // Sticky favorites toggle
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />

      {/* Header */}
      <Header isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />

      {/* Page Content */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      <Toaster />

      <StickyFavorites
        openFavorites={openFavorites}
        setOpenFavorites={setOpenFavorites}
      />

      <FavoritesDrawer
        openFavorites={openFavorites}
        setOpenFavorites={setOpenFavorites}
        setIsAuthOpen={setIsAuthOpen}
      />
    </div>
  );
};

export default MainLayout;
