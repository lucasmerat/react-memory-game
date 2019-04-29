import React from "react";

export default function Character({ id, name, image, clicked, checkIfClicked }) {
  return (
      <div className="col s3">
        <img clicked= {clicked.toString()} src={image} alt={name} onClick={() => {checkIfClicked(id)}} />
      </div>
  );
}
