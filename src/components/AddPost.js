import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Form.module.css";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  return (
    <form className={classes["form"]}>
      <h2>Add New Post</h2>
      <label htmlFor="Title">
        <input
          id="Title"
          type="text"
          placeholder="enter a Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label htmlFor="Description">
        <input
          id="Description"
          type="Description"
          placeholder="enter a Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label htmlFor="Price">
        <input
          id="Price"
          type="Price"
          placeholder="enter a Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label htmlFor="Location">
        <input
          id="Location"
          type="Location"
          placeholder="enter a Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button type="submit">CREATE</button>
    </form>
  );
};

export default AddPost;
