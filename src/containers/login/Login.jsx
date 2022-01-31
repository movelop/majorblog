import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isfetching } = useContext(Context) 

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START"});
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE"})
    }
  }

  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="loginInput" type="text" placeholder="Enter your email..." ref={usernameRef} />
            <label>Password</label>
            <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
            <button className="loginButton">Login</button>
        </form>
        <button className="loginRegisterButton" disabled= {isfetching} type='submit'>
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
    </div>
  );
};

export default Login;
