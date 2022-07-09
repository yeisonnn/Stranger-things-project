import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Update.module.css';
import { getCurrentData } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { updateFetch, singlePostFetch } from '../api';

const UpdatePost = (props) => {
  const [singlePost, setSinglePost] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = props;
  const params = useParams();
  setIsLoggedIn(true);
  const token = getCurrentData('token');

  const updateInputs = async () => {
    singlePostFetch({ initialState: setSinglePost, params });
  };

  console.log(singlePost, 'here in component');

  const updateOptions = {
    id: params.id,
    token: token,
    title: title,
    description: description,
    price: price,
    location: location,
  };

  return (
    <div className={classes['update-section']}>
      <form
        className={classes['form-updatePost']}
        onSubmit={async (e) => {
          e.preventDefault();
          await updateFetch(updateOptions);
          navigate('/Posts');
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
    </div>
  );
};

export default UpdatePost;
