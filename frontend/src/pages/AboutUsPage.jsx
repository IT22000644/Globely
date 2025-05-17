import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Globe,
  Server,
  Users,
  Database,
  Cloud,
  Heart,
  ArrowRight,
  Github,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-background via-background to-blue-50 dark:to-blue-950/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 z-10 relative">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
            About Globely
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-br from-blue-600 to-cyan-400 text-transparent bg-clip-text mb-6">
            Our Global Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connecting the world through data and visualization, providing
            comprehensive insights about countries across the globe.
          </p>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <Tabs
            defaultValue="mission"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
            </TabsList>

            <TabsContent value="mission" className="pt-4">
              <motion.div
                initial="hidden"
                animate={activeTab === "mission" ? "visible" : "hidden"}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <motion.div variants={itemVariant}>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Exploring Our World
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">
                    At Globely, we believe knowledge breaks barriers. Our
                    mission is to provide comprehensive, accessible information
                    about every country on Earth, empowering users to explore,
                    compare, and understand the rich diversity of our world.
                  </p>
                  <p className="text-base text-muted-foreground mb-4">
                    Whether you're a student researching for a project, a
                    traveler planning your next adventure, or simply curious
                    about the world, Globely brings the globe to your fingertips
                    with accurate, up-to-date information.
                  </p>
                  <Button variant="outline" size="lg" className="mt-4" asChild>
                    <Link to="/countries">
                      Start Exploring
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={itemVariant}
                  className="relative flex justify-center"
                >
                  <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    <Globe
                      className="h-64 w-64 md:h-80 md:w-80 text-blue-600 dark:text-blue-400"
                      strokeWidth={1}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="technology" className="pt-4">
              <motion.div
                initial="hidden"
                animate={activeTab === "technology" ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.div variants={itemVariant} className="mb-8">
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Our Tech Stack
                  </h3>
                  <p className="text-base text-muted-foreground mb-6">
                    Globely is built using modern technologies to ensure
                    reliability, performance, and scalability. Our platform
                    leverages the power of:
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <motion.div variants={itemVariant}>
                    <Card className="h-full border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          <Code className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold">Frontend</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Built with React for a responsive and dynamic user
                          interface, featuring smooth animations and interactive
                          elements.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariant}>
                    <Card className="h-full border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          <Server className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold">Backend</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Powered by Express and Node.js, our backend delivers
                          fast, reliable API responses while handling complex
                          data operations.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariant}>
                    <Card className="h-full border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold">REST Countries API</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Our custom REST Countries API provides comprehensive
                          data about countries, including demographics,
                          geography, economics, and cultural information.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariant}>
                    <Card className="h-full border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          <Cloud className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold">Infrastructure</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Hosted on AWS with EC2 instances, ensuring high
                          availability, scalability, and performance for users
                          worldwide.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="team" className="pt-4">
              <motion.div
                initial="hidden"
                animate={activeTab === "team" ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.div
                  variants={itemVariant}
                  className="text-center mb-12"
                >
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Meet Our Team
                  </h3>
                  <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                    The passionate minds behind Globely, dedicated to bringing
                    the world closer through technology and information.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariant}
                  className="flex flex-col items-center"
                >
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/initials/svg?seed=MD"
                      alt="Manilka Navod Dikkumbura"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>

                  <h4 className="text-xl font-bold mb-2">
                    Manilka Navod Dikkumbura
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Founder & Lead Developer
                  </p>

                  <p className="text-base text-muted-foreground max-w-2xl text-center mb-6">
                    Passionate about combining technology with global insights,
                    Manilka created Globely to make country information
                    accessible to everyone. With expertise in full-stack
                    development, he leads the technical direction of the
                    platform.
                  </p>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href="https://github.com/IT22000644"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/manilka-dikkumbura/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* API Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <Card className="border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge className="mb-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
                    Developer Resources
                  </Badge>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Our REST Countries API
                  </h3>
                </div>
                <p className="text-base text-muted-foreground mb-4">
                  Access comprehensive information about countries worldwide
                  through our powerful REST Countries API. Built with developers
                  in mind, our API provides:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Detailed country data including demographics, geography,
                      economics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Fast and reliable responses with high availability
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Comprehensive documentation and examples
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Regular updates with the latest country information
                    </span>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <a href="https://restcountries.com/">
                    Explore API Docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs w-full overflow-hidden">
                    <code>{`// Example API Response
                            {
                            "name": "Japan",
                            "capital": "Tokyo",
                            "region": "Asia",
                            "subregion": "Eastern Asia",
                            "population": 126476461,
                            "area": 377930,
                            "languages": [
                                {
                                "name": "Japanese",
                                "nativeName": "日本語"
                                }
                            ],
                            "currencies": [
                                {
                                "code": "JPY",
                                "name": "Japanese yen",
                                "symbol": "¥"
                                }
                            ],
                            "flag": "https://api.globely.com/flags/jp.svg"
                            }`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Get In Touch
          </h3>
          <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have questions about Globely or want to collaborate? We'd love to
            hear from you!
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white">
            Contact Us
          </Button>
          <div className="flex justify-center mt-12">
            <motion.div
              className="flex items-center text-sm text-muted-foreground"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart
                className="h-4 w-4 mr-2 text-red-500"
                fill="currentColor"
              />
              Made with passion by Manilka Navod Dikkumbura
            </motion.div>
          </div>
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
    </div>
  );
};

export default AboutUsPage;
