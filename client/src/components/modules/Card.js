import React, { useState, useEffect } from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <div className="Card">
      <img src={props.image} alt={props.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{props.name}</h2>
        <p className="text-gray-600 mb-2">{props.description}</p>
        <div className="mt-auto">
          <span className="text-sm text-gray-500">营养价值: {props.nutritionalValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
