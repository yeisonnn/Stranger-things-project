import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import classes from './SendMessage.module.css';
import Layout from './Layout';

const SendMessage = (props) => {
  const ref = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const token = getCurrentData('token');
  const url = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${params.id}/messages`;

  const sendMessageFetch = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: ref.current.value,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('The post was not sent it');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await sendMessageFetch(url);
    navigate('/Posts');
  };

  return (
    <Layout>
      <form onSubmit={sendMessageHandler} className={classes['form-message']}>
        <h2>Send a Message</h2>
        <textarea
          ref={ref}
          rows="10"
          cols="50"
          placeholder="Send a Message...."
        />
        <button type="submit">Send Message</button>
      </form>
    </Layout>
  );
};

export default SendMessage;
