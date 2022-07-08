import { getCurrentData } from '../utils/auth';
import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';

const URL = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/me`;

const Profile = (props) => {
  const [messages, setMessages] = useState([]);
  const user = getCurrentData('username');
  const token = getCurrentData('token');

  const { setIsLoggedIn } = props;

  setIsLoggedIn(true);

  const userProfileFetch = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }
      const data = await response.json();
      setMessages(data.data.messages);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfileFetch(URL);
  }, []);

  return (
    <div className={classes.profile}>
      <h1>welcome</h1>
      <h2>{user}</h2>
      <div className={classes.information}>
        <span>You have {messages.length} Messages</span>
        <span>Your Messages</span>
      </div>

      {!messages.length ? (
        <h3>There are no messages</h3>
      ) : (
        messages.map((msj, index) => {
          return (
            <div
              key={`${msj.post._id}-${index}`}
              className={`${classes.message} ${
                classes[msj.fromUser.username === user ? 'me' : '']
              }`}
            >
              <h3>Post: {msj.post.title}</h3>
              <p>{msj.content}</p>
              <p>
                From User:{' '}
                {msj.fromUser.username === user ? 'Me' : msj.fromUser.username}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Profile;
