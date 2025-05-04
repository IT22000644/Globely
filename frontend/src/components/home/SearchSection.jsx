import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, X, MapPin, Users, Languages, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();

  const suggestions = [
    { name: "Japan", capital: "Tokyo", region: "Asia" },
    { name: "France", capital: "Paris", region: "Europe" },
    { name: "Brazil", capital: "Brasília", region: "South America" },
    { name: "Kenya", capital: "Nairobi", region: "Africa" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log("Searching for:", searchTerm, "by", searchType);
    navigate(`/countries?type=${searchType}&term=${searchTerm}`);
  };

  return (
    <section ref={ref} className="relative py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Find Your Next Destination
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search from our comprehensive database of countries, regions, and
            territories to unlock detailed information.
          </p>
        </motion.div>

        {/* Improved search box with dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="bg-black/90 rounded-xl p-6 shadow-lg border border-gray-800">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 min-w-[200px] w-full h-12">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for a country, capital or region..."
                  className="pl-12 pr-4 text-base rounded-lg bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500/30 w-full h-12 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white h-8 w-8 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {/* This is the specific section that needs fixing */}
              <div className="flex gap-3 sm:flex-shrink-0 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none sm:w-40 flex items-stretch">
                  <Select
                    value={searchType}
                    onValueChange={(value) => setSearchType(value)}
                  >
                    <SelectTrigger
                      className="border border-gray-700 bg-gray-900/70 text-white focus:ring-blue-500/30 min-w-[100px] w-full"
                      style={{ height: "48px", lineHeight: "48px" }} // Force exact height
                    >
                      <SelectValue placeholder="Name" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border border-gray-700">
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="capital">Capital</SelectItem>
                      <SelectItem value="region">Region</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 font-medium"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search suggestions or featured categories */}
        {searchTerm ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {suggestions.map((country, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="border border-blue-100 dark:border-blue-900 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer overflow-hidden group">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{country.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {country.capital}, {country.region}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="border border-blue-100 dark:border-blue-900 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-4 mb-4 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">By Region</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse countries by their continental regions
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="border border-blue-100 dark:border-blue-900 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-4 mb-4 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">By Name</h3>
                  <p className="text-sm text-muted-foreground">
                    Search countries by their names or abbreviations
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="border border-blue-100 dark:border-blue-900 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-4 mb-4 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors">
                    <Languages className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">By Language</h3>
                  <p className="text-sm text-muted-foreground">
                    Find countries that speak specific languages
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="border border-blue-100 dark:border-blue-900 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-4 mb-4 group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors">
                    <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">By Capital</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore countries by their capital cities
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
