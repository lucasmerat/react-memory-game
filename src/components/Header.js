import React from "react";

function Header({score, topScore, message}) {
  return (
    <div>
      <nav>
        <div className="nav-box row black">
            <div className="col s4 left-align"><a href="/"><img className="logo responsive-img" src="/assets/img/logo.png" alt=""/></a></div>
            <div className="header-box-center col s4 center-align">{message}</div>
            <div className="header-box-right col s4 right-align"><span>Guessed correctly: {score} | High Score: {topScore}</span></div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
