import { useGetFavoritesQuery } from "@/api/backendApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FavoritesPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { refetch } = useGetFavoritesQuery();

  const { data: favorites = [], isLoading, error } = useGetFavoritesQuery();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  console.log("Favorites: ", favorites);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading favorites</p>;
  return <></>;
};

export default FavoritesPage;
