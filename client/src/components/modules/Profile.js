import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const { usersId } = useParams();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { usersid: usersId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }
  return (
    <>
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
      <hr className="Profile-linejj" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">Loremadacv adfadfcda asdeada asdawd </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
