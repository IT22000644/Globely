import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { useGetAllCountriesQuery } from "../api/countriesApi";
import { Loader2, Search, Info, X, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Map configuration
const geoUrl =
  "https://raw.githubusercontent.com/subyfly/topojson/refs/heads/master/world-countries.json";

// Define explicit colors instead of CSS variables
const mapColors = {
  active: "#e0f2fe", // Light blue for active countries
  inactive: "#cbd5e1", // Light gray for inactive countries
  selected: "#3b82f6", // Primary blue for selected country
  hovered: "#93c5fd", // Lighter blue for hovered country
  stroke: "#ffffff", // White stroke
};

const WorldMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [activeRegion, setActiveRegion] = useState("All");

  // Fetch countries data
  const {
    data: countries,
    isLoading,
    error,
  } = useGetAllCountriesQuery(
    "name,capital,population,flags,region,cca3,latlng"
  );

  // Filter countries based on search term and region
  useEffect(() => {
    if (countries) {
      let filtered = [...countries];

      if (activeRegion !== "All") {
        filtered = filtered.filter(
          (country) => country.region === activeRegion
        );
      }

      if (searchTerm) {
        filtered = filtered.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredCountries(filtered);
    }
  }, [countries, searchTerm, activeRegion]);

  // Handle map zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  // Handle country selection
  const handleCountryClick = (geo) => {
    const countryData = countries?.find((c) => c.cca3 === geo.id);
    if (countryData) {
      setSelectedCountry(countryData);

      // Center map on the selected country
      if (countryData.latlng && countryData.latlng.length >= 2) {
        setPosition({
          coordinates: [countryData.latlng[1], countryData.latlng[0]],
          zoom: 4,
        });
      }
    }
  };

  // Region filters
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg font-medium">Loading world data...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-100 dark:bg-red-900/20 p-6 text-center text-red-700 dark:text-red-300">
          <h2 className="mb-2 text-xl font-bold">Error Loading Data</h2>
          <p>Failed to load countries data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-background via-background to-blue-50 dark:to-blue-950/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Interactive World Map</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-72 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-r border-border/40 p-4">
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search countries..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-foreground">Regions</h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Badge
                  key={region}
                  variant={activeRegion === region ? "default" : "outline"}
                  className={`cursor-pointer ${
                    activeRegion === region
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-background hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  }`}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-full overflow-y-auto">
            <h3 className="mb-2 font-semibold text-foreground">Countries</h3>
            {filteredCountries.length > 0 ? (
              <ul className="space-y-2">
                {filteredCountries.map((country) => (
                  <li
                    key={country.cca3}
                    className={`cursor-pointer rounded-md p-2 hover:bg-accent ${
                      selectedCountry?.cca3 === country.cca3
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCountry(country);
                      if (country.latlng && country.latlng.length >= 2) {
                        setPosition({
                          coordinates: [country.latlng[1], country.latlng[0]],
                          zoom: 4,
                        });
                      }
                    }}
                  >
                    <div className="flex items-center">
                      {country.flags && (
                        <img
                          src={country.flags.svg || country.flags.png}
                          alt={`${country.name.common} flag`}
                          className="mr-2 h-6 w-10 object-cover rounded-sm"
                        />
                      )}
                      <span className="text-foreground">
                        {country.name.common}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No countries found</p>
            )}
          </div>
        </div>

        {/* Map container */}
        <div className="relative flex-1 bg-blue-50/50 dark:bg-blue-950/10">
          {/* Decorative elements like in the AboutUs page */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl"></div>
          </div>

          <div className="absolute right-4 top-4 z-10 flex flex-col space-y-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8 bg-white dark:bg-background shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/20"
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8 bg-white dark:bg-background shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/20"
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            className="w-full h-full"
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              maxZoom={8}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isActive =
                      activeRegion === "All" ||
                      countries?.find((c) => c.cca3 === geo.id)?.region ===
                        activeRegion;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          selectedCountry?.cca3 === geo.id
                            ? mapColors.selected
                            : hoveredCountry?.cca3 === geo.id
                            ? mapColors.hovered
                            : isActive
                            ? mapColors.active
                            : mapColors.inactive
                        }
                        stroke={mapColors.stroke}
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            fill: mapColors.hovered,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: mapColors.selected,
                            outline: "none",
                          },
                        }}
                        onMouseEnter={() => {
                          const countryData = countries?.find(
                            (c) => c.cca3 === geo.id
                          );
                          if (countryData) {
                            setHoveredCountry(countryData);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(null);
                        }}
                        onClick={() => handleCountryClick(geo)}
                      />
                    );
                  })
                }
              </Geographies>

              {selectedCountry && selectedCountry.latlng && (
                <Marker
                  coordinates={[
                    selectedCountry.latlng[1],
                    selectedCountry.latlng[0],
                  ]}
                >
                  <g transform="translate(-6, -6)">
                    <circle
                      r={4}
                      fill={mapColors.selected}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    <circle
                      r={6}
                      fill={mapColors.selected}
                      fillOpacity={0.3}
                      stroke="none"
                    />
                  </g>
                </Marker>
              )}
            </ZoomableGroup>
          </ComposableMap>

          {hoveredCountry && (
            <div className="absolute left-4 top-4 rounded-lg bg-white dark:bg-gray-900/90 p-3 shadow-lg border border-border/40 backdrop-blur-sm">
              <div className="flex items-center">
                {hoveredCountry.flags && (
                  <img
                    src={hoveredCountry.flags.svg || hoveredCountry.flags.png}
                    alt={`${hoveredCountry.name.common} flag`}
                    className="mr-2 h-6 w-10 object-cover rounded-sm"
                  />
                )}
                <h3 className="font-semibold text-foreground">
                  {hoveredCountry.name.common}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Country details panel */}
        {selectedCountry && (
          <div className="w-80 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-l border-border/40 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {selectedCountry.name.common}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent"
                onClick={() => setSelectedCountry(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {selectedCountry.flags && (
              <img
                src={selectedCountry.flags.svg || selectedCountry.flags.png}
                alt={`${selectedCountry.name.common} flag`}
                className="mb-4 h-32 w-full object-contain rounded-md shadow-sm border border-border/40"
              />
            )}

            <Card className="bg-white/50 dark:bg-gray-900/50 border-blue-100 dark:border-blue-900/40 mb-4">
              <CardContent className="p-4 space-y-3">
                <div>
                  <span className="font-semibold text-foreground">
                    Capital:
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {selectedCountry.capital
                      ? selectedCountry.capital.join(", ")
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Region:</span>{" "}
                  <span className="text-muted-foreground">
                    {selectedCountry.region}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    Population:
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {selectedCountry.population.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    Country Code:
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {selectedCountry.cca3}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
              onClick={() => {
                window.open(
                  `https://en.wikipedia.org/wiki/${selectedCountry.name.common}`,
                  "_blank"
                );
              }}
            >
              <Info className="mr-2 h-4 w-4" />
              More Information
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
