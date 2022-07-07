import { getCurrentData } from "../utils/auth";
import React from "react";

//const url = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${id}/messages`;

const Profile = () => {
  const user = getCurrentData("username");
  return (
    <div>
      <h1>welcome</h1>
      <h2>{user}</h2>
    </div>
  );
};

export default Profile;
