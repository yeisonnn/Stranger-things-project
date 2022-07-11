import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={classes['not-found']}>
      <h1>No Found page!!!</h1>
      <Link to="/">Go to Login</Link>
    </div>
  );
};

export default NotFound;
