import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Post.module.css';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

const ViewPost = (props) => {
  const { setIsLoggedIn } = props;
  const [postsId, setPostsId] = useState({});
  const params = useParams();
  setIsLoggedIn(true);

  console.log(params.id);
  const postFetch = async (url) => {
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error('There was a Problem!!');
      }
      const data = await response.json();
      const dataPostArray = data.data.posts;
      const filterIdPost = dataPostArray.find((post) => post._id === params.id);
      setPostsId(filterIdPost);
      console.log(filterIdPost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postFetch(url);
  }, []);

  return (
    <div className={classes.post}>
      <h1>{postsId.title}</h1>
      <h2>{postsId.description}</h2>
      <p>{postsId.price}</p>
      <div>
        <button className={classes.viewButtons}>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default ViewPost;
