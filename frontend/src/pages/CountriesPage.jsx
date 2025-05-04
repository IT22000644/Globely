import { useGetAllCountriesQuery } from "@/api/countriesApi";
import { useCountryFilters } from "@/hooks/useCountryFilters";
import { useSearchCountries } from "@/hooks/useSearchCountries";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CountryGrid from "@/features/countries/CountryGrid";
import CountryFilter from "@/features/countries/CountryFilter";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/common/SearchBar";

const CountriesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const term = searchParams.get("term");

  const isSearching = !!type && !!term;

  const [searchTerm, setSearchTerm] = useState(term ?? "");
  const [searchType, setSearchType] = useState(type ?? "");

  const {
    data: searchResults = [],
    isLoading: searchLoading,
    error: searchError,
  } = useSearchCountries({ type, term, skip: !isSearching });

  const {
    data: allCountries = [],
    isLoading: allLoading,
    error: allError,
  } = useGetAllCountriesQuery(undefined, {
    skip: isSearching,
  });

  const countries = isSearching ? searchResults : allCountries;
  const isLoading = isSearching ? searchLoading : allLoading;
  const error = isSearching ? searchError : allError;

  const {
    regions,
    setRegions,
    languages,
    setLanguages,
    filteredCountries,
    availableRegions,
    availableLanguages,
  } = useCountryFilters(countries);

  console.log("Countries: ", countries);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/countries?type=${searchType}&term=${searchTerm}`);
  };

  return (
    <div className="min-h-screen container mx-auto px-2 sm:px-4 py-6">
      {/* Search Bar - Enhanced with better mobile layout */}
      <SearchBar
        setSearchTerm={setSearchTerm}
        setSearchType={setSearchType}
        searchTerm={searchTerm}
        searchType={searchType}
        handleSearch={handleSearch}
      />

      <CountryFilter
        availableRegions={availableRegions}
        availableLanguages={availableLanguages}
        regions={regions}
        setRegions={setRegions}
        languages={languages}
        setLanguages={setLanguages}
      />

      <div className="my-6">
        <Separator />
      </div>

      <CountryGrid
        countries={filteredCountries}
        isLoading={isLoading}
        error={error}
        isSearching={isSearching}
        type={searchType}
        term={searchTerm}
        setRegions={setRegions}
        setLanguages={setLanguages}
      />
    </div>
  );
};

export default CountriesPage;
