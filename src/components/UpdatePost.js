import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Update.module.css";
import { getCurrentData } from "../utils/auth";
import { useParams } from "react-router-dom";

const UpdatePost = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = props;
  const params = useParams();
  setIsLoggedIn(true);
  const token = getCurrentData("token");

  const updateFetch = async (id) => {
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title: title,
              description: description,
              price: price,
              location: location,
              willDeliver: true,
            },
          }),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className={classes["form-updatePost"]}
      onSubmit={async (e) => {
        e.preventDefault();
        await updateFetch(params.id);
        navigate("/Posts");
      }}
    >
      <h2>Update Post</h2>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePost;
