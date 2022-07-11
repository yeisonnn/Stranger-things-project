import { getCurrentData } from "../utils/auth";
import React, { useEffect, useState } from "react";
import { userProfileFetch } from "../api/index";
import classes from "./Profile.module.css";
import Spinner from "./Spinner";
import msjLogo from "../icons/message.svg";

const Profile = (props) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = getCurrentData("username");
  const token = getCurrentData("token");
  // const { setIsLoggedIn } = props;
  // setIsLoggedIn(true);

  const options = {
    token: token,
    setInitialState: setMessages,
    setIsLoading: setIsLoading,
  };

  useEffect(() => {
    userProfileFetch(options);
  }, []);

  return (
    <div className={classes["profile-section"]}>
      {!localStorage.length ? (
        <h1>Please Sign In!!!</h1>
      ) : !messages.length && !isLoading ? (
        <>
          <h4>{user} have 0 Messages</h4>
        </>
      ) : (
        <div className={classes.profile}>
          <h1>welcome</h1>
          <h2>{user}</h2>
          <img src={msjLogo} alt="msj logo" />
          <div className={classes.information}>
            <span>You have {messages.length} Messages</span>
            <span>Your Messages</span>
          </div>
          {isLoading ? (
            <div className="spinner">
              <Spinner />
              <p>Loading....</p>
            </div>
          ) : (
            messages.map((msj, index) => {
              return (
                <div
                  key={`${msj.post._id}-${index}`}
                  className={`${classes.message} ${
                    classes[msj.fromUser.username === user ? "me" : ""]
                  }`}
                >
                  <h3>Post: {msj.post.title}</h3>
                  <p>{msj.content}</p>
                  <p>
                    From User:{" "}
                    {msj.fromUser.username === user
                      ? "Me"
                      : msj.fromUser.username}
                  </p>
                </div>
              );
            })
          )}
          {}
        </div>
      )}
    </div>
  );
};

export default Profile;
