/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { vi } from "vitest";

import { store } from "@/app/store";
import AuthSheet from "@/features/auth/AuthSheet";

vi.mock("@/api/backendApi", () => ({
  backendApi: {
    reducerPath: "backendApi",
    middleware: () => (next) => (action) => next(action),
    endpoints: {},
  },
  useLoginMutation: () => [vi.fn(), {}],
  useRegisterMutation: () => [vi.fn(), {}],
  useGetMeQuery: vi.fn(),
  useAddFavoriteMutation: () => [vi.fn(), {}],
  useGetFavoritesQuery: vi.fn(),
  useDeleteFavoriteMutation: () => [vi.fn(), {}],
}));

describe("AuthSheet", () => {
  it("renders the login form by default", () => {
    render(
      <Provider store={store}>
        <AuthSheet isAuthOpen={true} setIsAuthOpen={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('switches to sign up form on "Create one"', async () => {
    render(
      <Provider store={store}>
        <AuthSheet isAuthOpen={true} setIsAuthOpen={() => {}} />
      </Provider>
    );

    await userEvent.click(screen.getByText(/create one/i));

    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });
});
