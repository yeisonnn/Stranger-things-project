import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';

import classes from './Post.module.css';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const user = getCurrentData('username');
  const token = getCurrentData('token');
  const navigate = useNavigate();

  const postFetch = async (url) => {
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error('There was a Problem!!');
      }
      const data = await response.json();
      setPosts(data.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postFetch(url);
  }, []);

  console.log(posts, ' this is the posts');

  const viewPostFetch = async (id) => {
    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${id}`
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const viewPostHandler = () => {
  //   console.log('this is a view button');
  // };

  const sendMessageHandler = () => {
    console.log('this is a messaGE BUTTON');
  };

  return (
    <div>
      <div className={classes['posts-search']}>
        <h2>Posts</h2>
        <label htmlFor="searchPost">
          <input id="searchPost" type="text" placeholder="Search a Post" />
        </label>
        <Link to="/AddPost">ADD POST</Link>
      </div>
      <div className={classes['posts-info']}>
        {posts.map((post) => {
          return (
            <div key={post._id} className={classes.post} id={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <p>Seller: {post.author.username}</p>
              <p>Location: {post.location}</p>
              {post.author.username === user ? (
                <button
                  onClick={() => {
                    navigate(`/posts/${post._id}`);
                  }}
                >
                  VIEW
                </button>
              ) : null}
              {post.author.username !== user ? (
                <button onClick={sendMessageHandler}>SEND A MESSAGE</button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
