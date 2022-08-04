import React from "react";
import FeaturedArticlesCard from "../../components/Home/FeaturedArticlesCard";
import { articles } from "../../data/articles";

const Articles = () => {
  return (
    <div className="articles">
      <div className="articles__container">
        {articles.map(({ backgroundImage, dateTime, writer, headline, id }) => (
          <FeaturedArticlesCard
            backgroundImage={backgroundImage}
            dateTime={dateTime}
            writer={writer}
            headline={headline}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
