import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import classes from './Form.module.css';

const LogIn = (props) => {
  const { setIsLoggedIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  setIsLoggedIn(false);

  // From local storage
  const token = getCurrentData('token');
  const user = getCurrentData('username');
  const userPassword = getCurrentData('password');

  const URL = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/me`;

  const userLoginFetch = async (url) => {
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
      if (data.data) {
        navigate('/profile');
      }
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    if (username === user && password === userPassword) {
      await userLoginFetch(URL);
      setIsLoggedIn(true);
    }
  };

  console.log(URL);

  return (
    <form className={classes['form']} onSubmit={loginUserHandler}>
      <h2>LOG IN</h2>
      <label htmlFor="username">
        <input
          id="username"
          type="text"
          placeholder="enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <input
          id="password"
          type="password"
          placeholder="enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">LOG IN</button>
      <p className={classes.signUp}>
        <Link to="/signUp">Don't Have a account? Sign Up</Link>
      </p>
    </form>
  );
};

export default LogIn;

/*
<form className="login-form" onSubmit={loginUserHandler}>
      <h2>LOG IN</h2>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        placeholder="enter a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">LOG IN</button>
      <p>
        <Link to="/signUp">Don't Have a account? Sign Up</Link>
      </p>
    </form>
*/
