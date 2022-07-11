import classes from "./Home.module.css";
import { getCurrentData } from "../utils/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const url =
  "https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts";

const Home = (props) => {
  // const { setIsLoggedIn } = props;
  const [numberOfPosts, setNumberOfPosts] = useState([]);

  const numberOfPostFetch = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("There was a Problem!!");
      }
      const data = await response.json();
      setNumberOfPosts(data.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    numberOfPostFetch(url);
  }, []);

  // setIsLoggedIn(true);

  const user = getCurrentData("username");
  return (
    <Layout>
      {localStorage.length ? (
        <div className={classes.home}>
          <div className={classes.title}>
            <h1>WELCOME TO STRANGER'S THINGS</h1>
          </div>
          <h5>
            You have logged in as <span>{user}</span>{" "}
          </h5>
          <p>There are {numberOfPosts.length} Posts</p>
          <Link to="/Posts">See All Posts</Link>
        </div>
      ) : (
        <div className={classes.home}>
          <div className={classes.title}>
            <h1>WELCOME TO STRANGER'S THINGS</h1>
          </div>
          <p>There are {numberOfPosts.length} Posts</p>
          <Link to="/Posts">See All Posts</Link>
        </div>
      )}
    </Layout>
  );
};

export default Home;
