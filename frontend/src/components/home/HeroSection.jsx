import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const [currentCountry, setCurrentCountry] = useState(0);
  const countries = [
    "Japan",
    "Brazil",
    "France",
    "Kenya",
    "Australia",
    "Canada",
    "Egypt",
    "Thailand",
    "Italy",
  ];

  // Rotate through countries for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCountry((prev) => (prev + 1) % countries.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [countries.length]);

  // Variants for animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const rotateGlobe = {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  };

  const textChange = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-blue-50 dark:to-blue-950/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Left content - Text and CTA */}
        <div className="flex flex-col max-w-xl">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
              Discover the World With Globely
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-br from-blue-600 to-cyan-400 text-transparent bg-clip-text mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Explore Every Corner <br />
            of Our World
          </motion.h1>

          <motion.div
            className="flex h-12 items-baseline mb-8 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={slideIn}
          >
            <span className="text-xl font-medium mr-2">Discover</span>
            <motion.div
              className="relative h-full overflow-hidden"
              key={currentCountry}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textChange}
            >
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {countries[currentCountry]}
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Unlock comprehensive information about every country on Earth.
            Compare, explore, and discover fascinating facts about cultures,
            economies, and landscapes from around the globe.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
              asChild
            >
              <Link to="/countries">
                Explore Countries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link to="/countries">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right content - Globe visualization */}
        <motion.div
          className="relative flex-1 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <motion.div className="relative z-10" animate={rotateGlobe}>
            <Globe
              className="h-64 w-64 md:h-80 md:w-80 text-blue-600 dark:text-blue-400"
              strokeWidth={1}
            />
          </motion.div>

          {/* Animated dots floating around the globe */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-blue-500"
              initial={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0.5,
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Country highlight boxes that float in and out */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`box-${i}`}
              className="absolute px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-blue-200 dark:border-blue-900"
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
              }}
              transition={{
                duration: 8,
                delay: i * 3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <p className="text-sm font-medium">
                {countries[(currentCountry + i + 3) % countries.length]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background dark:text-background"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,154.7C672,171,768,181,864,165.3C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
