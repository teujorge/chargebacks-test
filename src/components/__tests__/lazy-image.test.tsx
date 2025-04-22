import { render, screen, fireEvent } from "@testing-library/react";
import { LazyImage } from "../lazy-image";
import type { ImageProps } from "next/image";
import * as React from "react";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image({
    src,
    alt,
    onLoad,
    onError,
    className,
  }: Pick<ImageProps, "src" | "alt" | "onLoad" | "onError" | "className">) {
    return (
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={className}
        data-testid="next-image"
      />
    );
  },
}));

describe("LazyImage", () => {
  const mockProps = {
    src: "https://example.com/image.jpg",
    alt: "Test image",
    width: 100,
    height: 100,
  };

  it("renders in loading state initially", () => {
    render(<LazyImage {...mockProps} />);
    const image = screen.getByTestId("next-image");
    const wrapper = image.parentElement;
    expect(wrapper).toHaveClass("animate-pulse");
    expect(image).toHaveClass("opacity-0");
  });

  it("shows loaded state after image loads", () => {
    render(<LazyImage {...mockProps} />);
    const image = screen.getByTestId("next-image");
    fireEvent.load(image);

    const wrapper = image.parentElement;
    expect(wrapper).not.toHaveClass("animate-pulse");
    expect(image).not.toHaveClass("opacity-0");
  });

  it("shows loaded state after image errors", () => {
    render(<LazyImage {...mockProps} />);
    const image = screen.getByTestId("next-image");
    fireEvent.error(image);

    const wrapper = image.parentElement;
    expect(wrapper).not.toHaveClass("animate-pulse");
    expect(image).not.toHaveClass("opacity-0");
  });

  it("does not render image when src or alt is missing", () => {
    const { rerender } = render(<LazyImage {...mockProps} src={undefined} />);
    expect(screen.queryByTestId("next-image")).not.toBeInTheDocument();

    rerender(<LazyImage {...mockProps} alt={undefined} />);
    expect(screen.queryByTestId("next-image")).not.toBeInTheDocument();
  });

  it("applies custom class names correctly", () => {
    render(
      <LazyImage
        {...mockProps}
        className="test-class"
        imageClassName="image-class"
        wrapperClassName="wrapper-class"
      />,
    );

    const image = screen.getByTestId("next-image");
    const wrapper = image.parentElement;

    expect(image).toHaveClass("test-class", "image-class");
    expect(wrapper).toHaveClass("test-class", "wrapper-class");
  });

  it("handles already loaded images", async () => {
    // Mock useRef to return a ref with complete=true
    const mockRef = { current: { complete: true } };
    jest.spyOn(React, "useRef").mockReturnValue(mockRef);

    render(<LazyImage {...mockProps} />);

    // Trigger load event to set isReady
    const image = screen.getByTestId("next-image");
    fireEvent.load(image);

    expect(image).not.toHaveClass("opacity-0");
  });
});
