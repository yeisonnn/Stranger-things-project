import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentData } from "../utils/auth";
import { postFetch } from "../api/index";
import classes from "./Post.module.css";
import Spinner from "./Spinner";
import plusLogo from "../icons/plus.svg";
import Layout from "./Layout";

const Posts = (props) => {
  // const { setIsLoggedIn } = props;
  const [filtered, setFiltered] = useState([]);
  const [posts, setPosts] = useState([]);
  const user = getCurrentData("username");
  const navigate = useNavigate();
  // setIsLoggedIn(true);

  const postOptions = {
    setInitialState: setPosts,
    setDataFiltered: setFiltered,
  };

  useEffect(() => {
    postFetch(postOptions);
  }, []);

  const filterPostsHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredSearch = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchString);
    });

    setFiltered(filteredSearch);
  };

  return (
    <div className={classes["posts-section"]}>
      {!posts.length ? (
        <div className="spinner">
          <Spinner />
          <p>Loading....</p>
        </div>
      ) : (
        <>
          <div>
            <div className={classes["posts-search"]}>
              <h2>Posts</h2>
              <form>
                <label htmlFor="searchPost">
                  <input
                    id="searchPost"
                    type="text"
                    placeholder="Search a Post Title....."
                    onChange={filterPostsHandler}
                  />
                </label>
              </form>
              {localStorage.length ? (
                <div className={classes.plus}>
                  <Link to="/AddPost">
                    ADD POST
                    <img src={plusLogo} alt="plus logo" />
                  </Link>
                </div>
              ) : null}
            </div>
            <div className={classes["posts-info"]}>
              {!filtered.length ? (
                <h2 className={classes.noFound}>NO POST FOUND!!</h2>
              ) : (
                filtered.map((post) => {
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
                          disabled={!localStorage.length}
                        >
                          SEND A MESSAGE
                        </button>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
