import React from "react";
import { NextPage } from "next";

interface FeaturedProps {
  backgroundImage: string;
  headline: string;
  writer: string;
  dateTime: string;
}

const Featured: NextPage<FeaturedProps> = ({
  backgroundImage,
  headline,
  writer,
  dateTime,
}) => {
  return (
    <div className="home__featured">
      <div
        className="home__featured-photo-container"
        style={{
          backgroundImage,
        }}
      ></div>
      <div className="home__featured-details">
        <h1 className="home__featured-headline">{headline}</h1>
        <hr />
        <h3 className="home__featured-writer">by {writer}</h3>
        <div className="home__featured-date-button-container">
          <p className="home__featured-date">{dateTime}</p>
          <button className="home__featured-read-button">READ</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

//
//
//
//
