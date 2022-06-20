import React from "react";
import "../css/Card.css"

export default function Card({ name, image, rating, genres }) {
  return (
    <div>
      <li className="card">
        <h3>{name}</h3>
        <img className="imgCard" src={image} alt="image_not_found" />
        <h3 >⭐Rating: {rating}</h3>
        <h5>{genres}</h5>
      </li>
    </div>
  )
}
