import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Featured from "../components/Home/Featured";
import FeaturedArticlesContainer from "../components/Home/FeaturedArticlesContainer";
import { ArticleType } from "../types";
interface HomePageProps {
  pathname: string;
}

const Home: NextPage<HomePageProps> = ({ pathname }) => {
  const data = [
    {
      backgroundImage:
        "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636900975/thetouchpub_article_banners/rwtfnhih1ftxaaplaaur.jpg",
      writer: "Lester Janito",
      headline: "NEWS | Pub renewal: Ex adviser Malongo speaks",
    },
    {
      backgroundImage:
        "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901134/thetouchpub_article_banners/wqj4rzvy1tl8umjynm5b.jpg",
      writer: "Lester Janito",
      headline: "Feature | Elijah and his Series of Unfortunate Events",
    },
    {
      backgroundImage:
        "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901157/thetouchpub_article_banners/nvjsswa2prwgv2kkqfr4.jpg",
      writer: "Lester Janito",
      headline:
        "NEWS | TAMBAYAYONG &apos;21: First Online Leadership Training of SGCD - II",
    },
  ] as ArticleType[];
  return (
    <section className="home">
      <Featured
        backgroundImage="url(https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636900952/thetouchpub_article_banners/nqiremtx9snvetc2xlms.jpg)"
        dateTime="November 14, 10:42 PM"
        writer="Lester Janito"
        headline="NEWS | Engr. Honculada on reviving pub"
        key={"NEWS | Engr. Honculada on reviving pub"}
      />
      <h3 className="home__recently-added-articles-description">
        Recently added articles
      </h3>
      <FeaturedArticlesContainer articles={data} />
      <p className="home__more-articles-button">
        <Link href={"/articles"}>More Articles</Link>
        <span className="home__more-articles-button-icon">
          <Image
            src={"/chevron-right-solid.svg"}
            height="20px"
            width={"11"}
            alt="right-icon"
            className=""
          />
        </span>
      </p>
    </section>
  );
};

export default Home;
