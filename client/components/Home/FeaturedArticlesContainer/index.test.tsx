import React from "react";
import FeaturedArticlesContainer from ".";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
describe("Featured Articles Container Component Test", () => {
  it("Should render Mock Articles Length <FeaturedArticlesCard />", () => {
    let mockArticles = [
      {
        backgroundImage:
          "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636900975/thetouchpub_article_banners/rwtfnhih1ftxaaplaaur.jpg",
        writer: "writer 1",
        headline: "headline 1",
      },
      {
        backgroundImage:
          "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901134/thetouchpub_article_banners/wqj4rzvy1tl8umjynm5b.jpg",
        writer: "writer 2",
        headline: "headline 2",
      },
      {
        backgroundImage:
          "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901157/thetouchpub_article_banners/nvjsswa2prwgv2kkqfr4.jpg",
        writer: "writer 3",
        headline: "headline 3",
      },
      {
        backgroundImage:
          "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901157/thetouchpub_article_banners/nvjsswa2prwgv2kkqfr4.jpg",
        writer: "writer 4",
        headline: "headline 4",
      },
    ];
    render(<FeaturedArticlesContainer articles={mockArticles} />);
    const container = screen.getByTestId("articles-container");
    const featuredArticlesInside = within(container).getAllByTestId("article");
    expect(featuredArticlesInside.length).toBe(mockArticles.length);
  });
});
