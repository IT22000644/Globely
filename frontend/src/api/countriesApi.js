import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: (fields = "") => (fields ? `all?fields=${fields}` : "all"),
    }),

    getIndependentCountries: builder.query({
      query: ({ status = true, fields = "" }) =>
        fields
          ? `independent?status=${status}&fields=${fields}`
          : `independent?status=${status}`,
    }),

    getCountryByName: builder.query({
      query: (name) => `name/${name}`,
    }),
    getCountryByFullName: builder.query({
      query: (name) => `name/${name}?fullText=true`,
    }),

    getCountryByCode: builder.query({
      query: (code) => `alpha/${code}`,
    }),
    getCountriesByCodes: builder.query({
      query: (codesArray) => `alpha?codes=${codesArray.join(",")}`,
    }),

    // 💱 By Currency
    getByCurrency: builder.query({
      query: (currency) => `currency/${currency}`,
    }),

    // 👥 By Demonym
    getByDemonym: builder.query({
      query: (demonym) => `demonym/${demonym}`,
    }),

    // 🗣️ By Language
    getByLanguage: builder.query({
      query: (language) => `lang/${language}`,
    }),

    // 🏙️ By Capital
    getByCapital: builder.query({
      query: (capital) => `capital/${capital}`,
    }),

    // 🌍 By Region
    getByRegion: builder.query({
      query: (region) => `region/${region}`,
    }),

    // 🌎 By Subregion
    getBySubregion: builder.query({
      query: (subregion) => `subregion/${subregion}`,
    }),

    // 🌐 By Translation
    getByTranslation: builder.query({
      query: (translation) => `translation/${translation}`,
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetIndependentCountriesQuery,
  useGetCountryByNameQuery,
  useGetCountryByFullNameQuery,
  useGetCountryByCodeQuery,
  useGetCountriesByCodesQuery,
  useGetByCurrencyQuery,
  useGetByDemonymQuery,
  useGetByLanguageQuery,
  useGetByCapitalQuery,
  useGetByRegionQuery,
  useGetBySubregionQuery,
  useGetByTranslationQuery,
} = countriesApi;
