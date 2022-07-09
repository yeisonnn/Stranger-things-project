import React, { useEffect, useState } from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { singlePostFetch, deleteFetch } from '../api';
import classes from './ViewPost.module.css';
import Spinner from './Spinner';
import UpdatePost from './UpdatePost';
import pen from '../icons/pen.svg';
import locationLogo from '../icons/location.svg';
import priceLogo from '../icons/price.svg';

const ViewPost = (props) => {
  const { setIsLoggedIn } = props;
  const [postsId, setPostsId] = useState('');
  const params = useParams();
  const token = getCurrentData('token');
  setIsLoggedIn(true);

  const navigate = useNavigate();

  const singlePostOptions = {
    initialState: setPostsId,
    params: params,
  };

  const deleteOptions = {
    id: params.id,
    token: token,
  };

  useEffect(() => {
    singlePostFetch(singlePostOptions);
  }, []);

  return (
    <div className={classes['view-section']}>
      {!postsId ? (
        <div className="spinner">
          <Spinner />
          <p>Loading....</p>
        </div>
      ) : (
        <div className={classes.viewPost}>
          <h2>{postsId.title}</h2>
          <p>
            {' '}
            <img src={pen} alt="pen" />
            <span>Description: </span> {postsId.description}
          </p>
          <p>
            <img src={priceLogo} alt="price" /> <span>Price: </span>{' '}
            {postsId.price}
          </p>
          <p>
            {' '}
            <img src={locationLogo} alt="locaTION" /> <span>Location: </span>
            {postsId.location}
          </p>

          <div className={classes.viewButtons}>
            <button
              onClick={async () => {
                await deleteFetch(deleteOptions);
                navigate('/Posts');
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/Posts/${params.id}/Update`);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path={`/Posts/${params.id}/Update`}
          element={
            <div>
              <UpdatePost />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default ViewPost;
