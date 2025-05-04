import {
  useGetCountryByNameQuery,
  useGetByRegionQuery,
  useGetByLanguageQuery,
  useGetByCurrencyQuery,
  useGetByCapitalQuery,
  useGetByDemonymQuery,
  useGetBySubregionQuery,
  useGetByTranslationQuery,
} from "@/api/countriesApi";

export const useSearchCountries = ({ type, term, skip = false }) => {
  const nameQuery = useGetCountryByNameQuery(term, {
    skip: skip || type !== "name",
  });
  const regionQuery = useGetByRegionQuery(term, {
    skip: skip || type !== "region",
  });
  const languageQuery = useGetByLanguageQuery(term, {
    skip: skip || type !== "language",
  });
  const currencyQuery = useGetByCurrencyQuery(term, {
    skip: skip || type !== "currency",
  });
  const capitalQuery = useGetByCapitalQuery(term, {
    skip: skip || type !== "capital",
  });
  const demonymQuery = useGetByDemonymQuery(term, {
    skip: skip || type !== "demonym",
  });
  const subregionQuery = useGetBySubregionQuery(term, {
    skip: skip || type !== "subregion",
  });
  const translationQuery = useGetByTranslationQuery(term, {
    skip: skip || type !== "translation",
  });

  switch (type) {
    case "name":
      return nameQuery;
    case "region":
      return regionQuery;
    case "language":
      return languageQuery;
    case "currency":
      return currencyQuery;
    case "capital":
      return capitalQuery;
    case "demonym":
      return demonymQuery;
    case "subregion":
      return subregionQuery;
    case "translation":
      return translationQuery;
    default:
      return { data: [], isLoading: false, error: null };
  }
};
