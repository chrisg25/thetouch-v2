import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
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
  );
};

export default Header;
