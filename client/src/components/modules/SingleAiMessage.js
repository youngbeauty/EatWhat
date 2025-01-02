import React, { useState, useEffect } from "react";

import "./SingleMessage.css";
import "../../index.css";
/**
 * Renders a single Ai chat message
 *
 * Proptypes
 * @param {MessageObject} message
 */
const SingleAiMessage = (props) => {
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      {props.type ==="ai" ? (<span className=" SingleMessage-sender u-bold">{"Gemini" + " : "}</span>) : (<span className=" SingleMessage-sender u-bold">{"User" + " : "}</span>)}
      
      <span className="SingleMessage-content">{props.reply}</span>
    </div>
  );
};

export default SingleAiMessage;
