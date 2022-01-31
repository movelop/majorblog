import React, { useContext } from 'react';
import { Topbar } from './components';
import { Home, Login, Post, Register, Settings, Write } from './containers';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from './context/Context';

const App = () => {
  const { user } = useContext(Context); 
  return (
    <>
      <Topbar />
      <Routes>
        <Route path = '/' element = { <Home /> } />
        <Route path = '/posts' element = { <Home /> } />
        <Route path = '/post/:id' element = { <Post /> } />
        <Route path = '/write' element = { user ? <Write /> : <Navigate to = '/register' /> } />
        <Route path = '/settings' element = { user ? <Settings /> : <Navigate to = '/register' /> } />
        <Route path = '/login' element = { !user ? <Login /> : <Navigate to="/" /> } />
        <Route path = '/register' element = { !user ? <Register /> : <Navigate to="/" /> } />
      </Routes>
    </>
    
  )
};

export default App;
