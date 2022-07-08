import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import classes from './ViewPost.module.css';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

const ViewPost = (props) => {
  const { setIsLoggedIn } = props;
  const [postsId, setPostsId] = useState({});
  const params = useParams();
  const token = getCurrentData('token');
  setIsLoggedIn(true);

  const navigate = useNavigate();

  const postFetch = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('There was a Problem!!');
      }
      const data = await response.json();
      const dataPostArray = data.data.posts;
      const filterIdPost = dataPostArray.find((post) => post._id === params.id);
      console.log(filterIdPost);
      setPostsId(filterIdPost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postFetch(url);
  }, []);

  const deleteFetch = async (id) => {
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Could not delete post!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.viewPost}>
      <h2>{postsId.title}</h2>
      <p>Description: {postsId.description}</p>
      <p>Price: {postsId.price}</p>
      <p>Location: {postsId.location}</p>

      <div className={classes.viewButtons}>
        <button
          onClick={async () => {
            await deleteFetch(params.id);
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
  );
};

export default ViewPost;
