import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import CardSwipe from "./CardSwipe";
import "../../utilities.css";
import "./Skeleton.css";
import NavBar from "../modules/NavBar";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <h1>Good luck on your project :)</h1>
        <CardSwipe></CardSwipe>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;
