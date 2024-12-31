import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
const GOOGLE_CLIENT_ID = "597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com";
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">What to eat today?</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/profile/" className="NavBar-link">
          Profile
        </Link>
      </div>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
    </nav>
  );
};

export default NavBar;
