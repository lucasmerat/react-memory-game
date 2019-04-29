import React from "react";

export default function Character({ id, name, image, markClicked }) {
  return (
      <div className="col s3">
        <img src={image} alt={name} onClick={() => {markClicked(id)}} />
      </div>
  );
}
