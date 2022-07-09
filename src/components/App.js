import React, { useState } from 'react';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Profile from './Profile';
import LogIn from './LogIn';
import SignUp from './SignUp';
import AddPost from './AddPost';
import ViewPost from './ViewPost';
import UpdatePost from './UpdatePost';
import SendMessage from './SendMessage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} />
      <main className="main">
        <Routes>
          <Route path="/" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/Home"
            element={<Home setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Profile"
            element={<Profile setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Posts"
            element={<Posts setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Posts/:id/*"
            element={<ViewPost setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Posts/:id/messages"
            element={<SendMessage setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="/Posts/:id/Update"
            element={<UpdatePost setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="/AddPost" element={<AddPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
