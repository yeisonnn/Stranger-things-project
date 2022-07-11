import React from 'react';

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

import NotFound from './NotFound';

function App() {
  return (
    <div>
      <main className="main">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/Posts/:id/*" element={<ViewPost />} />
          <Route path="/Posts/:id/messages" element={<SendMessage />} />
          <Route path="/Posts/:id/Update" element={<UpdatePost />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
