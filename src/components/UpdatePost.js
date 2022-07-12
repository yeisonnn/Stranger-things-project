import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './Update.module.css';
import { getCurrentData } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { updateFetch } from '../api';
import Layout from './Layout';

const UpdatePost = () => {
  const dataPost = useLocation()
  const postInfo = dataPost.state.postInfo
  const [title, setTitle] = useState(postInfo.title);
  const [description, setDescription] = useState(postInfo.description);
  const [price, setPrice] = useState(postInfo.price);
  const [location, setLocation] = useState(postInfo.location);
  const navigate = useNavigate();

  const params = useParams();

  const token = getCurrentData('token');

  const updateOptions = {
    id: params.id,
    token: token,
    title: title,
    description: description,
    price: price,
    location: location,
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default UpdatePost;
