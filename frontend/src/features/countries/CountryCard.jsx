import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, MapPin, Languages, Coins, Heart } from "lucide-react";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "@/api/backendApi";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications

const CountryCard = ({ country, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Update local state when prop changes
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    languages,
    currencies,
    cca3,
  } = country;

  // Get the top 2 languages (if available)
  const topLanguages = languages ? Object.values(languages).slice(0, 2) : [];

  // Get currency information (if available)
  const currencyItems = currencies
    ? Object.entries(currencies)
        .map(([code, details]) => ({
          code,
          name: details.name,
          symbol: details.symbol,
        }))
        .slice(0, 2)
    : [];

  const handleFavoriteClick = async (e) => {
    // Prevent clicking the heart from navigating to country details
    e.preventDefault();
    e.stopPropagation();

    // If user is not authenticated, show error toast and don't change state
    if (!isAuthenticated) {
      toast.error("Please log in to add favorites");
      return;
    }

    try {
      const favoriteData = {
        cca3: cca3,
        name: name.common,
        flag: flags?.svg || flags?.png,
      };

      if (!favorite) {
        // Add to favorites
        await addFavorite(favoriteData).unwrap();
        setFavorite(true);
        toast.success(`${name.common} added to favorites`);
      } else {
        // Remove from favorites
        await deleteFavorite(cca3).unwrap();
        setFavorite(false);
        toast.success(`${name.common} removed from favorites`);
      }
    } catch (error) {
      toast.error(
        `Error updating favorites: ${error.message || "Please try again"}`
      );
      // Keep state as it was before the failed request
    }
  };

  return (
    <Link
      data-testid="country-card"
      to={`/countries/${country.cca3}`}
      className="transition-all hover:scale-105 hover:shadow-lg group"
    >
      <Card className="h-full overflow-hidden border-2 border-border hover:border-primary/50 transition-all bg-card flex flex-col relative">
        {/* Favorite button moved to bottom right */}

        <div className="h-40 overflow-hidden relative">
          <img
            src={flags?.svg || flags?.png}
            alt={`${name.common} flag`}
            className="w-full h-full object-cover object-center transition-transform group-hover:scale-110 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {name.common}
          </CardTitle>
          <CardDescription className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" /> {capital?.[0] || "N/A"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-1 text-sm flex-grow">
          <div className="flex justify-between items-center mb-3">
            <span className="flex items-center">
              <Globe2 className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>
                {region}
                {subregion ? `, ${subregion}` : ""}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              {population?.toLocaleString()} people
            </span>
          </div>

          <div className="space-y-2">
            {topLanguages.length > 0 && (
              <div className="flex items-start gap-2">
                <Languages className="h-3 w-3 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {topLanguages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {language}
                    </Badge>
                  ))}
                  {Object.keys(languages || {}).length > 2 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{Object.keys(languages).length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {currencyItems.length > 0 && (
              <div className="flex items-start gap-2">
                <Coins className="h-3 w-3 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {currencyItems.map((currency, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {currency.symbol ? `${currency.symbol} ` : ""}
                      {currency.code}
                    </Badge>
                  ))}
                  {Object.keys(currencies || {}).length > 2 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      +{Object.keys(currencies).length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Favorite button positioned at bottom right */}
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-3 right-3 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 ${
                favorite
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-muted-foreground hover:text-primary"
              } transition-all`}
            />
          </button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
