/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSidebar from "@/features/countries/CountryFilter";
import { vi } from "vitest";

// Mock useMediaQuery to simulate desktop view by default
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => false,
}));

const setup = ({
  availableRegions = ["Africa", "Europe", "Asia"],
  availableLanguages = ["English", "French", "Arabic", "Spanish"],
  regions = [],
  languages = [],
  setRegions = vi.fn(),
  setLanguages = vi.fn(),
} = {}) => {
  render(
    <FilterSidebar
      availableRegions={availableRegions}
      availableLanguages={availableLanguages}
      regions={regions}
      setRegions={setRegions}
      languages={languages}
      setLanguages={setLanguages}
    />
  );
  return { setRegions, setLanguages };
};

describe("FilterSidebar", () => {
  it("renders filter headings", () => {
    setup();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Regions")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  it("displays active filters when selected", () => {
    setup({
      regions: ["Africa"],
      languages: ["French"],
    });
    expect(screen.getByText("Africa")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("calls setRegions when a region checkbox is clicked", () => {
    const { setRegions } = setup();
    const regionToggle = screen.getByText("Regions");
    fireEvent.click(regionToggle); // open section

    const africaCheckbox = screen.getByLabelText("Africa");
    fireEvent.click(africaCheckbox);
    expect(setRegions).toHaveBeenCalled();
  });

  it("calls setLanguages when a language checkbox is clicked", () => {
    const { setLanguages } = setup();
    const langToggle = screen.getByText("Languages");
    fireEvent.click(langToggle); // open section

    const frenchCheckbox = screen.getByLabelText("French");
    fireEvent.click(frenchCheckbox);
    expect(setLanguages).toHaveBeenCalled();
  });

  it("filters languages based on search input", () => {
    setup();
    fireEvent.click(screen.getByText("Languages")); // open section

    const input = screen.getByPlaceholderText("Search language...");
    fireEvent.change(input, { target: { value: "ara" } });

    expect(screen.getByText("Arabic")).toBeInTheDocument();
    expect(screen.queryByText("French")).not.toBeInTheDocument();
  });

  it("calls clearAllFilters when clear button is clicked", () => {
    const { setRegions, setLanguages } = setup({
      regions: ["Africa"],
      languages: ["French"],
    });

    fireEvent.click(screen.getByText("Clear all"));
    expect(setRegions).toHaveBeenCalledWith([]);
    expect(setLanguages).toHaveBeenCalledWith([]);
  });
});
