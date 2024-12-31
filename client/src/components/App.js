import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Chatbook from "./pages/Chatbook.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./modules/Profile.js";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "../utilities.css";
import "./App.css";
import Feed from "./pages/Feed.js";
/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout").then(() => {
      console.log("Logged out successfully!");
    });
  };

  return (
    <GoogleOAuthProvider clientId="597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com">
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}></NavBar>
      <div className="App-container">
        <Routes>
          <Route
            path="/"
            element={
              <Skeleton
                path="/"
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
            }
          />
          <Route path="/chat" element={<Chatbook userId={userId} />} />
          <Route path="/profile/:userId" element={<Profile userId={userId} />} />
          <Route path="/feed" element={<Feed userId={userId} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
