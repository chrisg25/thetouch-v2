import React from "react";
import FeaturedArticlesCard from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Tests For Featured Articles Component", () => {
  it("Should display a headline", () => {
    render(
      <FeaturedArticlesCard
        headline="headline 1"
        writer="writer 1"
        backgroundImage="/background1"
      />
    );
    expect(screen.getByTestId("headline")).toHaveTextContent("headline 1");
  });
  it("Should display a writer", () => {
    render(
      <FeaturedArticlesCard
        headline="headline 1"
        writer="writer 1"
        backgroundImage="/background1"
      />
    );
    expect(screen.getByTestId("writer")).toHaveTextContent("by writer 1");
  });
});
