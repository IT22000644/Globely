/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StickyFavorites from "@/features/favorites/StickyFavorites";

describe("StickyFavorites", () => {
  it("renders the heart button", () => {
    render(
      <StickyFavorites openFavorites={false} setOpenFavorites={() => {}} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls setOpenFavorites with toggled value when clicked", async () => {
    const setOpenFavorites = vi.fn();
    render(
      <StickyFavorites
        openFavorites={false}
        setOpenFavorites={setOpenFavorites}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(setOpenFavorites).toHaveBeenCalledWith(true);
  });

  it("has filled heart when openFavorites is true", () => {
    render(
      <StickyFavorites openFavorites={true} setOpenFavorites={() => {}} />
    );
    const icon = screen.getByTestId("heart-icon");
    expect(icon).toHaveClass("fill-red-500");
  });
});
