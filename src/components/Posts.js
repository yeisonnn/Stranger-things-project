import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';

import classes from './Post.module.css';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const user = getCurrentData('username');
  const navigate = useNavigate();

  const postFetch = async (url) => {
    try {
      const response = await fetch(url);
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
                <button
                  onClick={() => {
                    navigate(`/posts/${post._id}/messages`);
                  }}
                >
                  SEND A MESSAGE
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
