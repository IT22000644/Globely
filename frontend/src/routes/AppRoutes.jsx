import MainLayout from "@/layouts/MainLayout";
import AboutUsPage from "@/pages/AboutUsPage";
import CompareCountriesPage from "@/pages/CompareCountriesPage";
import CountriesPage from "@/pages/CountriesPage";
import CountryDetailsPage from "@/pages/CountryDetailsPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import WorldMap from "@/pages/WorldMap";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="countries/:cc3" element={<CountryDetailsPage />} />
        <Route path="compare" element={<CompareCountriesPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="map" element={<WorldMap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
