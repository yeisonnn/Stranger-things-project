import React, { useState } from 'react';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Profile from './Profile';
import Logout from './Logout';
import fetchPost from '../api';
import LogIn from './LogIn';
import SignUp from './SignUp';
import AddPost from './AddPost';
import ViewPost from './ViewPost';

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
          <Route path="/Posts" element={<Posts />} />
          <Route
            path="/Posts/:id"
            element={<ViewPost setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/AddPost" element={<AddPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
