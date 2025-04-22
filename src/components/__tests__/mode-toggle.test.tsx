import { render, screen, fireEvent } from "@testing-library/react";
import { ModeToggle } from "../mode-toggle";
import { ThemeProvider, useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("ModeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });
  });

  it("renders the light mode icon by default", () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );

    const lightIcon = screen.getByText("light_mode");
    expect(lightIcon).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("shows dark mode icon when in dark theme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );

    const darkIcon = screen.getByText("dark_mode");
    expect(darkIcon).toBeInTheDocument();
  });
});
