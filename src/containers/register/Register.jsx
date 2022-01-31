import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
                
            });
            res.data && navigate('/login')
        } catch (error) {
            setError(false);
        }
    }

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username..." onChange={ (e) => setUsername(e.target.value) } />
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." onChange={ (e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." onChange={ (e) => setPassword(e.target.value)} />
            <button className="registerButton">Register</button>
        </form>
            <button className="registerLoginButton">Login</button>
            {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
    </div>
  );
};

export default Register;
