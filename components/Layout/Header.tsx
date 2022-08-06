import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const [isNavHidden, setIsNavHidden] = useState<boolean>(false);
  const [pathName, setPathName] = useState<string>(pathname);
  const navStateHandler = () => {
    setIsNavHidden((prevState) => !prevState);
  };

  useEffect(() => {
    setPathName(() => pathname);
  }, [pathname]);

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
          The Touch |{" "}
          <span className="header__current-path">
            {pathName === "/" ? "Home" : pathName.substring(1, pathName.length)}
          </span>
        </h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li
            className={`header__nav-item ${
              pathname === "/" ? "header__nav-item-active" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`header__nav-item ${
              pathname === "/articles" ? "header__nav-item-active" : ""
            }`}
          >
            <Link href="/articles">Articles</Link>
          </li>
          <li
            className={`header__nav-item ${
              pathname === "/about" ? "header__nav-item-active" : ""
            }`}
          >
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      {!isNavHidden && (
        <nav className="header__mobile-nav">
          <ul>
            <li
              className={`header__nav-item ${
                pathname === "/" ? "header__nav-item-active" : ""
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`header__nav-item ${
                pathname === "/articles" ? "header__nav-item-active" : ""
              }`}
            >
              <Link href="/articles">Articles</Link>
            </li>
            <li
              className={`header__nav-item ${
                pathname === "/about" ? "header__nav-item-active" : ""
              }`}
            >
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      )}
      <div className="header__menu-icon-container" onClick={navStateHandler}>
        <Image
          className="header__menu-icon"
          src={"/bars-solid.svg"}
          height={20}
          width={30}
          alt="menu"
        />
      </div>
    </header>
  );
};

export default Header;
