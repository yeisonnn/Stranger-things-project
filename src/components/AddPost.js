import React, { useState } from 'react';

import classes from './AddPost.module.css';
import { getCurrentData } from '../utils/auth';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const token = getCurrentData('token');
  const URL = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts`;

  const addNewPostFecth = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: true,
            location: location,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('The post was not sent it');
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addNewPostHandler = async (e) => {
    e.preventDefault();
    await addNewPostFecth(URL);
    setTitle('');
    setLocation('');
    setPrice('');
    setDescription('');
  };

  return (
    <form className={classes['form-newPost']} onSubmit={addNewPostHandler}>
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
