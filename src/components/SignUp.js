import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storeCurrentUser } from '../utils/auth';
import classes from './Form.module.css';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/register';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
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
      console.log(data.data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const registerUserHandler = async (e) => {
    e.preventDefault();
    await userRegisterFetch(url);
    if (!error) {
      navigate('/');
    }
    setUsername('');
    setPassword('');
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
          }}
        />
      </label>
      {error && <span>Try another user name</span>}

      <label htmlFor="password">
        <input
          id="password"
          type="text"
          placeholder="enter a password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
      </label>

      <button type="submit">SIGN UP</button>
      <p className={classes.signUp}>
        <Link to="/">Log In HERE!</Link>
      </p>
    </form>
  );
};

export default SignUp;
