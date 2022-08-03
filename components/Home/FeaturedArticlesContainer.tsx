import FeaturedArticlesCard from "./FeaturedArticlesCard";

const FeaturedArticlesContainer = () => {
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
  ];
  return (
    <div className="home__featured-articles-container">
      {data.map(({ backgroundImage, headline, writer }) => (
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
