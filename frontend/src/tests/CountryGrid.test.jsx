/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import CountryGrid from "@/features/countries/CountryGrid";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

// Proper partial mock for react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("@/api/backendApi", async () => {
  const actual = await vi.importActual("@/api/backendApi");
  return {
    ...actual,
    useGetFavoritesQuery: vi.fn(() => ({
      data: { favorites: [{ cca3: "FRA" }] },
      isLoading: false,
    })),
    useAddFavoriteMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  };
});

vi.mock("@/components/CountryCard", () => ({
  default: ({ country, isFavorite }) => (
    <div data-testid="country-card">
      {country.name.common} {isFavorite && "★"}
    </div>
  ),
}));

const customRender = (
  ui,
  { authState = { isAuthenticated: true }, ...options } = {}
) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: authState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
    options
  );
};

const sampleCountries = Array.from({ length: 15 }, (_, i) => ({
  cca3: `C${i}`,
  name: { common: `Country ${i}` },
}));

describe("CountryGrid", () => {
  it("displays loading state", () => {
    customRender(<CountryGrid isLoading countries={[]} />);
    expect(screen.getByText("Loading countries...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    customRender(
      <CountryGrid error={{ message: "Fetch failed" }} countries={[]} />
    );
    expect(
      screen.getByText("Failed to load countries: Fetch failed")
    ).toBeInTheDocument();
  });

  it("displays empty state with clear filters button", () => {
    const setRegions = vi.fn();
    const setLanguages = vi.fn();

    customRender(
      <CountryGrid
        countries={[]}
        setRegions={setRegions}
        setLanguages={setLanguages}
        isSearching
        type="region"
        term="Europe"
      />
    );

    expect(
      screen.getByText("No countries found matching your filters")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Clear filters"));
    expect(setRegions).toHaveBeenCalledWith([]);
    expect(setLanguages).toHaveBeenCalledWith([]);
  });

  it("displays country cards and pagination", () => {
    customRender(<CountryGrid countries={sampleCountries} />);
    expect(screen.getAllByTestId("country-card").length).toBe(12); // first page
    expect(screen.getByText("Country 0")).toBeInTheDocument();
  });

  it("navigates pages using pagination", () => {
    customRender(<CountryGrid countries={sampleCountries} />);
    const nextBtn = screen.getByLabelText("Go to next page");
    fireEvent.click(nextBtn);
    expect(screen.getByText("Country 12")).toBeInTheDocument();
  });

  it("highlights favorite countries when authenticated", () => {
    const favCountry = { cca3: "FRA", name: { common: "France" } };
    customRender(<CountryGrid countries={[favCountry]} />);
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  it("doesn't show favorites if unauthenticated", () => {
    const favCountry = { cca3: "FRA", name: { common: "France" } };
    customRender(<CountryGrid countries={[favCountry]} />, {
      authState: { isAuthenticated: false },
    });
    expect(screen.getByText("France")).not.toHaveTextContent("★");
  });

  it("resets page on country list change", () => {
    const { rerender } = customRender(
      <CountryGrid countries={sampleCountries.slice(0, 15)} />
    );
    fireEvent.click(screen.getByLabelText("Go to next page"));
    expect(screen.getByText("Country 12")).toBeInTheDocument();

    rerender(
      <Provider store={configureStore({ reducer: { auth: authReducer } })}>
        <MemoryRouter>
          <CountryGrid countries={sampleCountries.slice(0, 10)} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Country 0")).toBeInTheDocument(); // back to first page
  });
});
