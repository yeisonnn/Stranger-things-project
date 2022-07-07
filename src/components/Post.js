import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url =
  "https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const postFetch = async (url) => {
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error("There was a Problem!!");
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
  console.log(posts, " this is the posts");
  return (
    <div>
      <div>
        <h1>Post</h1>
        <input type="text" placeholder="Search Posts" />
        <Link to="/AddPost">ADD POST</Link>
      </div>

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            <p>Seller: {post.author.username}</p>
            <p>Location: {post.location}</p>
            <button>SEND MESSAGE</button>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
