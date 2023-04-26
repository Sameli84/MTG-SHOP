import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import NavLinks from "./NavLinks";

describe("The Navigation Links, Unauthorized", () => {
  test("Should only show ALL CARDS and AUTHENTICATE when not authorized", async () => {
    render(
      <BrowserRouter>
        <NavLinks />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toHaveClass("navbar");
    expect(screen.getByText("ALL CARDS")).toBeInTheDocument();
    expect(screen.getByText("ALL CARDS")).toHaveAttribute("href", "/");
    expect(screen.queryByText("MY CARDS")).toBeNull();
    expect(screen.queryByText("ADD CARD")).toBeNull();

    const dropdown = fireEvent.click(screen.getByText("Dropdown"));
    // Wait for the "AUTHENTICATE" link to be added to the DOM
    await waitFor(() => {
      expect(
        screen.getByText("AUTHENTICATE", { container: dropdown })
      ).toBeInTheDocument();
      expect(
        screen.getByText("AUTHENTICATE", { container: dropdown })
      ).toHaveAttribute("href", "/auth");
      expect(screen.queryByText("LOGOUT", { container: dropdown })).toBeNull();
    });
  });
});

describe("The Navigation Links, Authorized", () => {
  test("Should show MY CARDS and LOGOUT instead of AUTHENTICATE when authorized", async () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: "1234567890-0987654321",
          userId: "userId1",
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />;
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole("navigation")).toHaveClass("navbar");
    expect(screen.getByText("ALL CARDS")).toBeInTheDocument();
    expect(screen.getByText("ALL CARDS")).toHaveAttribute("href", "/");
    expect(screen.queryByText("MY CARDS")).toBeInTheDocument();
    expect(screen.queryByText("MY CARDS")).toHaveAttribute("href", "/mycards");

    const dropdown = fireEvent.click(screen.getByText("Dropdown"));
    // Wait for the "AUTHENTICATE" link to be added to the DOM
    await waitFor(() => {
      expect(
        screen.getByText("LOGOUT", { container: dropdown })
      ).toBeInTheDocument();
      expect(
        screen.getByText("LOGOUT", { container: dropdown })
      ).toHaveAttribute("href", "#");
      expect(screen.queryByText("AUTHENTICATE", { container: dropdown })).toBeNull();
    });
  });
});
