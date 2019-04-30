import React from "react";
import "./Header.css"

function Header({score, topScore, message}) {
  return (
    <div>
      <nav>
        <div className="nav-box row black">
            <div className="header-box-left col s12 l4 left-align"><a href="/"><img className="logo responsive-img" src="/assets/img/logo.png" alt=""/></a></div>
            <div className="header-box-center col s12 l4 center-align">{message}</div>
            <div className="header-box-right col s12 l4 right-align"><span>Guessed correctly: {score} | High Score: {topScore}</span></div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
