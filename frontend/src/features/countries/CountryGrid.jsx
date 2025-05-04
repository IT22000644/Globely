import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import CountryCard from "./CountryCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetFavoritesQuery } from "@/api/backendApi";

const CountryGrid = ({
  countries,
  isLoading,
  error,
  isSearching,
  setRegions,
  setLanguages,
  type,
  term,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;
  const gridRef = useRef(null);

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Conditionally fetch favorites if user is authenticated
  const { data: response = [], isLoading: isFavoritesLoading } =
    useGetFavoritesQuery(undefined, { skip: !isAuthenticated });

  const favorites = response?.favorites || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [countries]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load countries: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      if (gridRef.current) {
        const gridTop = gridRef.current.offsetTop - 20;
        window.scrollTo({
          top: gridTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Check if a country is in the user's favorites
  const isCountryFavorite = (countryCode) => {
    if (!isAuthenticated || isFavoritesLoading || !favorites.length) {
      return false;
    }

    return favorites.some((fav) => fav.cca3 === countryCode);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex-1 flex flex-col" ref={gridRef}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          {isSearching ? `Results for ${type}: "${term}"` : "All Countries"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {countries.length} {countries.length === 1 ? "country" : "countries"}
        </p>
      </div>

      {countries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {currentCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={isCountryFavorite(country.cca3)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="my-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {renderPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            No countries found matching your filters
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setRegions([]);
              setLanguages([]);
              if (isSearching) {
                navigate("/countries");
              }
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountryGrid;
