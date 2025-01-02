import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import CardSwipe from "./CardSwipe";
import "../../utilities.css";
import "./Skeleton.css";

const GOOGLE_CLIENT_ID = "597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <h2>Remember to eat well :)</h2>
        <CardSwipe></CardSwipe>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;
