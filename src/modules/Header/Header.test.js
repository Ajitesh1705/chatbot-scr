/* eslint-disable no-undef */
import { screen } from "@testing-library/react";
import Header from "modules/Header";
import React from "react";
import { render } from "test/test-utils";

describe("Header Component", () => {
  test("should render header component correctly", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("should render logo image correctly", () => {
    render(<Header />);
    const logoImage = screen.getByRole("img");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("alt");
  });
});
