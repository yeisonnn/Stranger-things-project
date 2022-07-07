import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import LogIn from "./LogIn";

const Nav = (props) => {
  const { isLoggedIn } = props;
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>STRANGER'S THINGS</div>
      <div>
        {isLoggedIn ? (
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

            <li>
              <Link to="/">LOGOUT</Link>
            </li>
          </ul>
        ) : (
          <p>Please LogIn</p>
        )}
      </div>
    </nav>
  );
};

export default Nav;
