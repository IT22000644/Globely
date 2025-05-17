import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Heart, MapPin, Globe2, Star, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "@/api/backendApi";
import { useGetCountriesByCodesQuery } from "@/api/countriesApi";
import { useState } from "react";
import { toast } from "sonner";

const FavoritesDrawer = ({
  openFavorites,
  setOpenFavorites,
  setIsAuthOpen,
}) => {
  const {
    data,
    isLoading: favoritesLoading,
    error: favoritesError,
  } = useGetFavoritesQuery();
  const favoriteCodes = data?.favorites?.map((fav) => fav.cca3) ?? [];
  const [selectedCountry, setSelectedCountry] = useState(null);
  const isAuthenticated =
    !favoritesError?.status || favoritesError?.status !== 401;

  const { data: favoriteCountries, isLoading: countriesLoading } =
    useGetCountriesByCodesQuery(favoriteCodes, {
      skip: favoriteCodes.length === 0 || !isAuthenticated,
    });

  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleRemoveFavorite = async (countryCode) => {
    try {
      await deleteFavorite(countryCode).unwrap();
      console.log(`Removing ${countryCode} from favorites`);
      toast.success(`${countryCode} removed from favorites`);
    } catch (error) {
      toast.error(
        `Error removing favorites: ${error.message || "Please try again"}`
      );
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700">No favorites yet</h3>
      <p className="text-gray-500 mt-2 max-w-xs">
        Add countries to your favorites to see them here
      </p>
      <DrawerClose asChild>
        <Button className="mt-6">Explore Countries</Button>
      </DrawerClose>
    </div>
  );

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-blue-200 border-r-blue-200 animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading your favorites...</p>
    </div>
  );

  const CountryCard = ({ country }) => {
    const isSelected = selectedCountry?.cca3 === country.cca3;

    return (
      <div
        className={`border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
          isSelected ? "ring-2 ring-blue-500 shadow-md" : ""
        }`}
      >
        <div className="relative h-32 overflow-hidden bg-gray-100">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedCountry(country)}
          />
          <button
            onClick={() => handleRemoveFavorite(country.cca3)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 z-10 cursor-pointer"
            aria-label={`Remove ${country.name.common} from favorites`}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
        <div
          className="p-4 cursor-pointer"
          onClick={() => setSelectedCountry(country)}
        >
          <h3 className="font-semibold text-lg text-gray-900">
            {country.name.common}
          </h3>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{country.region}</span>
          </div>
          {country.capital && (
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Star className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{country.capital[0]}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CountryDetail = ({ country }) => (
    <div className="p-4 bg-white rounded-lg mt-4 border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          {country.name.common}
        </h3>
        <button
          className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
          onClick={() => setSelectedCountry(null)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full rounded border bg-white"
          />
        </div>

        <div className="col-span-1 flex flex-col space-y-3 text-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-500">Official Name</p>
            <p className="font-medium">{country.name.official}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Region</p>
            <p className="font-medium">{country.region}</p>
          </div>

          {country.capital && (
            <div>
              <p className="text-sm font-medium text-gray-500">Capital</p>
              <p className="font-medium">{country.capital[0]}</p>
            </div>
          )}

          {country.population && (
            <div>
              <p className="text-sm font-medium text-gray-500">Population</p>
              <p className="font-medium">
                {country.population.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedCountry(null)}
        >
          Back to List
        </Button>
      </div>
    </div>
  );

  const NotAuthenticatedState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-blue-50 rounded-full p-4 mb-4">
        <Globe2 className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        Sign in to view favorites
      </h3>
      <p className="text-gray-600 mt-2 max-w-xs">
        Create an account or sign in to save and view your favorite countries
      </p>
      <div className="flex gap-3 mt-6">
        <Button
          onClick={() => {
            setIsAuthOpen(true);
            setOpenFavorites(false);
          }}
        >
          Sign In
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!isAuthenticated) {
      return <NotAuthenticatedState />;
    }

    if (favoritesLoading || countriesLoading) {
      return <LoadingState />;
    }

    if (!favoriteCountries?.length) {
      return <EmptyState />;
    }

    if (selectedCountry) {
      return <CountryDetail country={selectedCountry} />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoriteCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    );
  };

  return (
    <Drawer open={openFavorites} onOpenChange={setOpenFavorites}>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="text-red-500 w-5 h-5" />
                <span>My Favorite Countries</span>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription>
              {favoriteCodes.length > 0
                ? `You have ${favoriteCodes.length} favorite ${
                    favoriteCodes.length === 1 ? "country" : "countries"
                  }`
                : "Add countries to your favorites collection"}
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="h-[65vh] px-4">{renderContent()}</ScrollArea>

          {isAuthenticated && (
            <DrawerFooter className="flex flex-row justify-between items-center pt-2 border-t mt-4">
              <p className="text-sm text-gray-500">
                <Globe2 className="inline w-4 h-4 mr-1" />
                Explore the world of countries
              </p>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesDrawer;
