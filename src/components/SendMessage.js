import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentData } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const SendMessage = (props) => {
  const { setIsLoggedIn } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const token = getCurrentData("token");
  const url = `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${params.id}/messages`;
  setIsLoggedIn(true);
  const sendMessageFetch = async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("The post was not sent it");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await sendMessageFetch(url);
        navigate("/Posts");
      }}
    >
      <h2>Send a Message</h2>
      <label htmlFor="Title">
        <input
          id="message"
          type="text"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default SendMessage;
