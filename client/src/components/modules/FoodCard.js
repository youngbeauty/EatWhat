import React, { useState, useEffect } from "react";
import "./FoodCard.css";
const FoodCard = (props) => {
  return (
    <div className="Card">
      <img src={props.image} alt={props.name} />
      <div>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <div>
          <span>营养价值: {props.nutritionalValue}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
