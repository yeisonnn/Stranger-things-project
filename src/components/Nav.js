import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import LogIn from "./LogIn";

const Nav = (props) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>STRANGER'S THINGS</div>
      <div>
        {localStorage.length ? (
          <ul>
            <li>
              <Link to="/Home">HOME</Link>
            </li>
            <li>
              <Link to="/Posts">POSTS</Link>
            </li>
            <li>
              <Link to="/Profile">PROFILE</Link>
            </li>

            {localStorage.length ? (
              <li>
                <Link to="/">LOGOUT</Link>
              </li>
            ) : (
              <li>
                <Link to="/">LOGIN</Link>
              </li>
            )}
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/Home">HOME</Link>
            </li>
            <li>
              <Link to="/Posts">POSTS</Link>
            </li>
            <li>
              <Link to="/">LOGIN</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
