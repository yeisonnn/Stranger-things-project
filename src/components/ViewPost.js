import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Post.module.css';
import { getCurrentData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

const ViewPost = (props) => {
  const { setIsLoggedIn } = props;
  const [postsId, setPostsId] = useState({});
  const params = useParams();
  const token = getCurrentData('token')
  setIsLoggedIn(true);

  const navigate = useNavigate()

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

const deleteFetch = async (id) => {
  try{
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${id}`, {
      method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  }
  
    });
    if (!response.ok) {
      throw new Error('Could not delete post!');
    }
    const data = await response.json();
  console.log(data)
  }catch (error) {
    console.error(error)
  }
}

  return (
    <div className={classes.post}>
      <h1>{postsId.title}</h1>
      <h2>{postsId.description}</h2>
      <p>{postsId.price}</p>
      <div className={classes.viewButtons}>
        <button onClick={() => {deleteFetch(params.id)}}>Delete</button>
        <button onClick={() => {navigate(`/Posts/${params.id}/Update`)}}>Edit</button>
      </div>
    </div>
  );
};

export default ViewPost;
