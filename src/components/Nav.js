import { Link } from 'react-router-dom';
import classes from './Nav.module.css';

const Nav = (props) => {
  const { isLoggedIn } = props;
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>STRANGER THINGS</div>
      <div>
        <ul>
          <li>
            <Link to="/Home">HOME</Link>
          </li>
          <li>
            <Link to="/Post">POST</Link>
          </li>
          <li>
            <Link to="/Profile">PROFILE</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/">LOGOUT</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
