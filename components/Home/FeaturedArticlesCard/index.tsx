import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "../../../types";

const FeaturedArticlesCard: NextPage<ArticleType> = ({
  backgroundImage,
  headline,
  writer,
}) => {
  return (
    <div className="home__featured-articles">
      <div className="home__featured-articles-photo-container">
        <Image src={backgroundImage} alt="" width={"345px"} height={"120%"} />
        <h1 className="home__featured-articles-headline" data-testid="headline">
          {headline}
        </h1>
      </div>

      <div className="home__featured-articles-footer">
        <p className="home__featured-articles-writer" data-testid="writer">
          by {writer}
        </p>
        <Link
          className="home__featured-articles-read-button"
          href={"/articles/some-id"}
        >
          Read
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArticlesCard;
