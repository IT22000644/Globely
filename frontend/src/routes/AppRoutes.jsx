import MainLayout from "@/layouts/MainLayout";
import CountriesPage from "@/pages/CountriesPage";
import CountryDetailsPage from "@/pages/CountryDetailsPage";
import FavoritesPage from "@/pages/FavoritesPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="countries/:cc3" element={<CountryDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
