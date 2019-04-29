import React from "react";

export default function Character({ id, name, image, clicked, checkIfClicked, incorrect }) {
  return (
      <div className="col s3">
        <img className={`character ${incorrect ? "shake" : ""}`} clicked= {clicked.toString()} src={image} alt={name} onClick={() => {checkIfClicked(id)}} />
      </div>
  );
}
