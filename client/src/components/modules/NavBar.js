import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.css";
const GOOGLE_CLIENT_ID = "597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com";
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">What to eat today?</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to={`/profile/${props.userId}`} className="NavBar-link">
          Profile
        </Link>
        <Link to="/feed/" className="NavBar-link">
          Feed
        </Link>
        <Link to="/chat/" className="NavBar-link">
          Chat
        </Link>
      </div>
      {props.userId ? (
        <button
          onClick={() => {
            googleLogout();
            props.handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
      )}
    </nav>
  );
};

export default NavBar;
