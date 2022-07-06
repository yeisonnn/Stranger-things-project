import React from 'react';
import Nav from './Nav';
import {Route, Routes} from 'react-router-dom'
import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Logout from './Logout';


function App() {
  return (
    <div>
      <Nav />
    <main className='main'>
    <Routes>
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
