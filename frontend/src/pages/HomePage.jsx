import { useEffect, useState } from "react";

import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
// import FeaturedCountries from "./HomeComponents/FeaturedCountries";
// import RegionsSection from "./HomeComponents/RegionsSection";
// import StatsSection from "./HomeComponents/StatsSection";
// import TestimonialsSection from "./HomeComponents/TestimonialsSection";
// import NewsletterSection from "./HomeComponents/NewsletterSection";

const HomePage = () => {
  // Detect scroll for animations
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <HeroSection />

      <SearchSection />

      {/* <FeaturedCountries />

      <RegionsSection />

      <StatsSection />

      <TestimonialsSection />

      <NewsletterSection /> */}
    </main>
  );
};

export default HomePage;
