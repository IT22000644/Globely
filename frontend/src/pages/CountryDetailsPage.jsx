import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Globe2,
  MapPin,
  Phone,
  Languages,
  Coins,
  Calendar,
  Flag,
  Mountain,
  Hash,
  Building,
  Users,
  Map,
  Timer,
  Heart,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "@/api/backendApi";
import { useGetCountryByCodeQuery } from "@/api/countriesApi";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CountryDetails = () => {
  const { cc3 } = useParams();
  console.log("Country code:", cc3);
  const { data: countryData, isLoading, error } = useGetCountryByCodeQuery(cc3);

  const country = countryData?.[0];

  console.log("Country data:", country);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const { data: data = [] } = useGetFavoritesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = data?.favorites || [];
    if (!isAuthenticated || !country || !Array.isArray(favorites)) {
      setIsFavorite(false);
      return;
    }

    console.log();

    const isInFavorites = favorites.some((fav) => fav.cca3 === country.cca3);
    setIsFavorite(isInFavorites);
  }, [isAuthenticated, data, country]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add favorites");
      return;
    }

    try {
      if (!country) return;

      const favoriteData = {
        cca3: country?.cca3 || cc3,
        name: country?.name?.common || "Unknown",
        flag: country?.flags?.svg || country?.flags?.png || "",
      };

      if (!isFavorite) {
        // Add to favorites
        await addFavorite(favoriteData).unwrap();
        setIsFavorite(true);
        toast.success(`${country.name.common} added to favorites`);
      } else {
        // Remove from favorites
        await deleteFavorite(country.cca3).unwrap();
        setIsFavorite(false);
        toast.success(`${country.name.common} removed from favorites`);
      }
    } catch (error) {
      toast.error(
        `Error updating favorites: ${error.message || "Please try again"}`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-40 bg-muted rounded mb-4"></div>
            <div className="h-8 w-60 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-2">Error Loading Country</h1>
          <p className="text-muted-foreground">
            There was an error loading the country details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-2">Country Not Found</h1>
          <p className="text-muted-foreground">
            The country you're looking for doesn't exist in our database.
          </p>
        </div>
      </div>
    );
  }

  // If country is undefined or null, provide default values
  const {
    name = { common: "Unknown", official: "Unknown" },
    flags = {},
    coatOfArms = {},
    capital = [],
    region = "Unknown",
    subregion = "",
    population = 0,
    area = 0,
    languages = {},
    currencies = {},
    borders = [],
    timezones = [],
    continents = [],
    maps = {},
    landlocked = false,
    startOfWeek = "",
    idd = {},
    car = {},
    independent = false,
    unMember = false,
    altSpellings = [],
    demonyms = {},
    tld = [],
  } = country || {};

  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  const formatArea = (area) => {
    return `${formatNumber(area)} km²`;
  };

  const currencyItems =
    currencies && typeof currencies === "object"
      ? Object.entries(currencies).map(([code, details]) => ({
          code,
          name: details?.name || code,
          symbol: details?.symbol || "",
        }))
      : [];

  const languageItems =
    languages && typeof languages === "object"
      ? Object.entries(languages).map(([code, name]) => ({
          code,
          name: name || code,
        }))
      : [];

  const phoneCode =
    idd && idd.root ? `${idd.root || ""}${idd.suffixes?.[0] || ""}` : "N/A";

  const demonymText =
    demonyms && demonyms.eng && demonyms.eng.m
      ? `${demonyms.eng.m} (male), ${demonyms.eng.f || demonyms.eng.m} (female)`
      : "N/A";

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-muted/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Button
          variant="outline"
          onClick={handleFavoriteClick}
          className="flex items-center gap-2"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-muted-foreground"
            } transition-all`}
          />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>

      {/* Banner and profile image */}
      <div className="relative w-full h-48 md:h-60 lg:h-80 bg-muted rounded-t-lg overflow-hidden mb-20">
        {coatOfArms?.svg || coatOfArms?.png ? (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5">
            <img
              src={coatOfArms.svg || coatOfArms.png}
              alt="Coat of Arms"
              className="w-full h-full object-contain opacity-20"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
        )}

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-lg">
            <AvatarImage
              src={flags?.svg || flags?.png}
              alt={flags?.alt || `${name.common} flag`}
            />
            <AvatarFallback>{name.common.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Country name and basic details */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{name.common}</h1>
        <h2 className="text-xl text-muted-foreground mb-2">{name.official}</h2>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="outline" className="px-3 py-1">
            <Globe2 className="h-3.5 w-3.5 mr-1" />
            {region}
          </Badge>
          {subregion && (
            <Badge variant="outline" className="px-3 py-1">
              <Map className="h-3.5 w-3.5 mr-1" />
              {subregion}
            </Badge>
          )}
          {capital && capital.length > 0 && (
            <Badge variant="outline" className="px-3 py-1">
              <Building className="h-3.5 w-3.5 mr-1" />
              {capital[0]}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Key details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Key Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Population</p>
                    <p className="text-muted-foreground">
                      {formatNumber(population)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mountain className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Area</p>
                    <p className="text-muted-foreground">{formatArea(area)}</p>
                  </div>
                </div>

                {continents && continents.length > 0 && (
                  <div className="flex items-start">
                    <Globe2 className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Continent</p>
                      <p className="text-muted-foreground">
                        {continents.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Flag className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Independence</p>
                    <p className="text-muted-foreground">
                      {independent
                        ? "Independent country"
                        : "Dependent territory"}
                    </p>
                  </div>
                </div>

                {unMember !== undefined && (
                  <div className="flex items-start">
                    <Building className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">UN Member</p>
                      <p className="text-muted-foreground">
                        {unMember ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Landlocked</p>
                    <p className="text-muted-foreground">
                      {landlocked ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          {languageItems.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Languages className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languageItems.map((lang) => (
                    <Badge key={lang.code} className="px-3 py-1">
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Currencies */}
          {currencyItems.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Coins className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Currencies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currencyItems.map((currency) => (
                    <Badge
                      key={currency.code}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {currency.symbol ? `${currency.symbol} ` : ""}
                      {currency.code} - {currency.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Borders */}
          {borders.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Neighboring Countries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {borders.map((border) => (
                    <Badge
                      key={border}
                      variant="outline"
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => navigate(`/countries/${border}`)}
                    >
                      {border}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Additional details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
              <div className="space-y-3">
                {startOfWeek && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Week Starts On</p>
                      <p className="text-muted-foreground capitalize">
                        {startOfWeek}
                      </p>
                    </div>
                  </div>
                )}

                {car?.side && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Drives On</p>
                      <p className="text-muted-foreground capitalize">
                        {car.side} side
                      </p>
                    </div>
                  </div>
                )}

                {phoneCode && phoneCode !== "N/A" && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone Code</p>
                      <p className="text-muted-foreground">{phoneCode}</p>
                    </div>
                  </div>
                )}

                {demonymText && demonymText !== "N/A" && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Demonym</p>
                      <p className="text-muted-foreground">{demonymText}</p>
                    </div>
                  </div>
                )}

                {tld && tld.length > 0 && (
                  <div className="flex items-start">
                    <Globe2 className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Internet TLD</p>
                      <p className="text-muted-foreground">{tld.join(", ")}</p>
                    </div>
                  </div>
                )}

                {altSpellings && altSpellings.length > 0 && (
                  <div className="flex items-start">
                    <Hash className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Alternative Spellings</p>
                      <p className="text-muted-foreground">
                        {altSpellings.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timezones */}
          {timezones && timezones.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Timer className="h-5 w-5 mr-2 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Timezones</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {timezones.map((timezone, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {timezone}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Maps */}
          {maps && (maps.googleMaps || maps.openStreetMaps) && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Maps</h3>
                <div className="space-y-3">
                  {maps.googleMaps && (
                    <a
                      href={maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Google Maps
                    </a>
                  )}
                  {maps.openStreetMaps && (
                    <a
                      href={maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on OpenStreetMap
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {coatOfArms && (coatOfArms.svg || coatOfArms.png) && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Coat of Arms</h3>
                <div className="flex justify-center">
                  <img
                    src={coatOfArms.svg || coatOfArms.png}
                    alt="Coat of Arms"
                    className="h-40 object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
