import React from "react";
import FeaturedArticlesCard from "../FeaturedArticlesCard";
import { ArticleType } from "../../../types";
import { NextPage } from "next";

interface FeaturedArticlesContainerProp {
  articles: Array<ArticleType>;
}

const FeaturedArticlesContainer: NextPage<FeaturedArticlesContainerProp> = ({
  articles,
}) => {
  return (
    <div
      className="home__featured-articles-container"
      data-testid="articles-container"
    >
      {articles.map(({ backgroundImage, headline, writer }) => (
        <FeaturedArticlesCard
          backgroundImage={backgroundImage}
          headline={headline}
          writer={writer}
          key={headline}
        />
      ))}
    </div>
  );
};

export default FeaturedArticlesContainer;
