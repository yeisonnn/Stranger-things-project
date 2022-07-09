import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import { userLoginFetch } from '../api/index';
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

  const loginOptions = {
    navigate: navigate,
    token: token,
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    if (username === user && password === userPassword) {
      await userLoginFetch(loginOptions);
      setIsLoggedIn(true);
    }
  };

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
