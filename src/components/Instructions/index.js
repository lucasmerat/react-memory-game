import React from "react";
import "./Instructions.css";

export default function Instrutions({ closed, instructionsMessage }) {
  return (
    <div
      className={`${
        closed ? "closed" : ""
      } instructions text-center center-align`}
    >
      <div className="container container-instructions">
        <h3 className={`white-text ${closed ? "none" : ""}`}>{instructionsMessage}</h3>
      </div>
    </div>
  );
}
