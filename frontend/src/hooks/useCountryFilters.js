// src/hooks/useCountryFilters.js
import { useMemo, useState } from "react";

export const useCountryFilters = (searchResults = []) => {
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Filter the searchResults by selected region/language
  const filteredCountries = useMemo(() => {
    return searchResults.filter((country) => {
      const matchesRegion = regions.length
        ? regions.includes(country.region)
        : true;

      const countryLanguages = Object.values(country.languages || {});
      const matchesLanguage = languages.length
        ? countryLanguages.some((lang) => languages.includes(lang))
        : true;

      return matchesRegion && matchesLanguage;
    });
  }, [searchResults, regions, languages]);

  // Extract available filter options dynamically
  const availableRegions = useMemo(() => {
    return Array.from(
      new Set(searchResults.map((c) => c.region).filter(Boolean))
    ).sort();
  }, [searchResults]);

  const availableLanguages = useMemo(() => {
    return Array.from(
      new Set(searchResults.flatMap((c) => Object.values(c.languages || {})))
    ).sort();
  }, [searchResults]);

  return {
    regions,
    setRegions,
    languages,
    setLanguages,
    filteredCountries,
    availableRegions,
    availableLanguages,
  };
};
