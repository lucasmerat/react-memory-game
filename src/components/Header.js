import React from "react";

function Header({score, topScore}) {
  return (
    <div>
      <nav>
        <div className="nav-wrapper row">
            <div className="col s4 text-left">CartoonNetwork</div>
            <div className="col s4 text-center">Click an image to begin!</div>
            <div className="col s4 text-right">Guessed correctly: {score} | High Score: {topScore}</div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
