import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storeCurrentUser } from '../utils/auth';
import classes from './Form.module.css';
import { clearCurrentData } from '../utils/auth';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/register';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const userRegisterFetch = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });

      if (!response.ok) {
        setError(true);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const { token } = data.data;
      storeCurrentUser('token', token);
      storeCurrentUser('username', username);
      storeCurrentUser('password', password);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const registerUserHandler = async (e) => {
    e.preventDefault();
    await userRegisterFetch(url);
    if (!error && !deleteAccount) {
      navigate('/');
    }
    setUsername('');
    setPassword('');
  };

  const deleteAccountHandler = () => {
    if (localStorage.length > 0) {
      clearCurrentData();
      setDeleteAccount(true);
    } else {
      setDeleteAccount(false);
      return;
    }
  };

  return (
    <form className={classes['form']} onSubmit={registerUserHandler}>
      <h2>SIGN UP</h2>
      <label htmlFor="username">
        <input
          id="username"
          type="text"
          placeholder="enter a username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
            setDeleteAccount(false);
            setIsTyping(true);
          }}
        />
      </label>

      <label htmlFor="password">
        <input
          id="password"
          type="text"
          placeholder="enter a password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
            setIsTyping(true);
          }}
        />
      </label>

      <button type="submit" disabled={!isTyping}>
        SIGN UP
      </button>
      {deleteAccount && (
        <span className={classes.warning}>The Account was deleted</span>
      )}
      <p className={classes.signUp}>
        <Link to="/">Log In HERE!</Link>
        <button
          onClick={deleteAccountHandler}
          disabled={localStorage.length ? false : true}
        >
          Delete Account
        </button>
      </p>
    </form>
  );
};

export default SignUp;
