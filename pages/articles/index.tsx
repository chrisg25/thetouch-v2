import React from "react";
import FeaturedArticlesCard from "../../components/Home/FeaturedArticlesCard";
import { articles } from "../../data/articles";

const Articles = () => {
  return (
    <div className="articles">
      <div className="articles__container">
        {articles.map(({ backgroundImage, dateTime, writer, headline }) => (
          <FeaturedArticlesCard
            backgroundImage={backgroundImage}
            dateTime={dateTime}
            writer={writer}
            headline={headline}
            key={headline}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
