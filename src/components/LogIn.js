import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import { userLoginFetch } from '../api/index';
import classes from './Form.module.css';
import styles from './Nav.module.css';

const LogIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    } else {
      setError(true);
    }
  };

  return (
    <section className={classes.formContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>STRANGER'S THINGS</div>
        <div>
          <ul>
            <li>
              <Link to="/Posts">POSTS</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={classes['main-content']}>
        <form className={classes['form']} onSubmit={loginUserHandler}>
          <h2>LOG IN</h2>
          <label htmlFor="username">
            <input
              id="username"
              type="text"
              placeholder="enter a username"
              value={username}
              onChange={(e) => {
                setError(false);
                setUsername(e.target.value);
              }}
            />
          </label>

          <label htmlFor="password">
            <input
              id="password"
              type="password"
              placeholder="enter a password"
              value={password}
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
          </label>
          {error && (
            <p className={classes.error}>Username & password do not match</p>
          )}
          <button type="submit">LOG IN</button>
          <p className={classes.signUp}>
            <Link to="/signUp">Don't Have a account? Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
