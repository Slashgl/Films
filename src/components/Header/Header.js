import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__item search">Search</div>
          <div className="header__item rated">Rated</div>
        </div>
      </div>
    </>
  );
};

export default Header;
