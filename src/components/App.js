import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Logout from './Logout';
import fetchPost from '../api';
import LogIn from './LogIn';
import SignUp from './SignUp';

const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} />
      <main className="main">
        <Routes>
          <Route path="/" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
