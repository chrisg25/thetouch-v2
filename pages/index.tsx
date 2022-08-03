import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
interface HomePageProps {
  pathname: string;
}

const Home: NextPage<HomePageProps> = ({ pathname }) => {
  return (
    <>
      <header className="header">
        <div className="header__banner">
          <div className="header__logo-container">
            <Image
              height={"100%"}
              width={"100%"}
              src="https://thetouchpublication.site/static/media/logo.a995b84f.png"
              alt="Logo"
            />
          </div>
          <h1 className="header__banner-title">
            The Touch
            {/* | <span className="header__current-path">Home</span> */}
          </h1>
        </div>
        <nav className="header__nav">
          <ul>
            <li className="header__nav-item ">
              <Link href="/">Home</Link>
            </li>
            <li className="header__nav-item">About</li>
          </ul>
        </nav>
      </header>
      <section className="home">
        <div className="home__featured">
          <div
            className="home__featured-photo-container"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636900952/thetouchpub_article_banners/nqiremtx9snvetc2xlms.jpg)",
            }}
          ></div>
          <div className="home__featured-details">
            <h1 className="home__featured-headline">
              NEWS | Engr. Honculada on reviving pub
            </h1>
            <hr />
            <h3 className="home__featured-writer">by Lester Janito</h3>
            <div className="home__featured-date-button-container">
              <p className="home__featured-date">November 14, 10:42 PM</p>
              <button className="home__featured-read-button">READ</button>
            </div>
          </div>
        </div>
        <h3 className="home__recently-added-articles-description">
          Recently added articles
        </h3>
        <div className="home__featured-articles-container">
          <div className="home__featured-articles">
            <div className="home__featured-articles-photo-container">
              <Image
                src="https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636900975/thetouchpub_article_banners/rwtfnhih1ftxaaplaaur.jpg"
                alt=""
                width={"295px"}
                height={"120%"}
              />
              <h1 className="home__featured-articles-headline">
                NEWS | Pub renewal: Ex adviser Malongo speaks
              </h1>
            </div>

            <div className="home__featured-articles-footer">
              <p className="home__featured-articles-writer">by Lester Janito</p>
              <Link
                className="home__featured-articles-read-button"
                href={"/articles/some-id"}
              >
                Read
              </Link>
            </div>
          </div>

          <div className="home__featured-articles">
            <div className="home__featured-articles-photo-container">
              <Image
                src="https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901134/thetouchpub_article_banners/wqj4rzvy1tl8umjynm5b.jpg"
                alt=""
                width={"295px"}
                height={"120%"}
              />
              <h1 className="home__featured-articles-headline">
                Feature | Elijah and his Series of Unfortunate Events
              </h1>
            </div>

            <div className="home__featured-articles-footer">
              <p className="home__featured-articles-writer">by Lester Janito</p>
              <Link
                className="home__featured-articles-read-button"
                href={"/articles/some-id"}
              >
                Read
              </Link>
            </div>
          </div>

          <div className="home__featured-articles">
            <div className="home__featured-articles-photo-container">
              <Image
                src="https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901157/thetouchpub_article_banners/nvjsswa2prwgv2kkqfr4.jpg"
                alt=""
                width={"295px"}
                height={"120%"}
              />
              <h1 className="home__featured-articles-headline">
                NEWS | TAMBAYAYONG &apos;21: First Online Leadership Training of
                SGCD - II
              </h1>
            </div>

            <div className="home__featured-articles-footer">
              <p className="home__featured-articles-writer">by Lester Janito</p>
              <Link
                className="home__featured-articles-read-button"
                href={"/articles/some-id"}
              >
                Read
              </Link>
            </div>
          </div>
        </div>
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
      <footer className="footer">
        <div className="footer__container">
          <h1>All Rights Reserved</h1>
        </div>
      </footer>
    </>
  );
};

export default Home;
