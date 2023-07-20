import { useState } from 'react';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const user = {
    //   username,
    //   email,
    //   firstName,
    //   lastName,
    //   password,
    //   confirmPassword,
    // };

    try {
      const response = await axios.post(remoteHostURL + "/register", {
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
      });

      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('name', response.data.user.firstName);
      console.log(response.data)
      navigate('/personal');
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
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
      <div className='lol'>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
    </div>
  </div>
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
  );
};

export default RegisterForm;
