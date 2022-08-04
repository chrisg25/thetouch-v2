import React from "react";
import Image from "next/image";
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
      <div className="articles__more-articles-button">
        <h1 className="articles__more-articles-button-description">
          Load More
        </h1>
        <Image
          src="/chevron-right-solid.svg"
          width={30}
          height={15}
          alt="articles button"
          className="articles__more-articles-button-icon"
        />
      </div>
    </div>
  );
};

export default Articles;
