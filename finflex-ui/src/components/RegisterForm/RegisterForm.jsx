import { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'
import { remoteHostURL } from '../../apiClient';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    setPasswordError('');

    const user = {
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    };

    try {
      const expirationTimeInHours = 3;
      const currentTime = new Date();
      const expirationTimestamp = currentTime.getTime() + expirationTimeInHours * 60 * 60 * 1000;
      const response = await axios.post(`${remoteHostURL}/api/register`, {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
      });
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('name', response.data.user.firstName);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiredTime', expirationTimestamp);
      
      nav('/onboard');
    } catch(err) {
      console.log(err);
    }

    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className='haha'>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      {passwordError && <p className="error-msg" style={{fontWeight:"bolder"}}>{passwordError}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="firstName">User Name</label>
            <input
              type="text"
              id="firstName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className='lol'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="login-btn">Register</button>
      </form>
    
      <p style={{ textAlign: "center" }}>
        Already have an account? 
      </p>
      <Link to="/login" style={{color:"rgba(69, 162, 158)"}}> Sign in here.</Link> 
    </div>
  );
};

export default RegisterForm;
