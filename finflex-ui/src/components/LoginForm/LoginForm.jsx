import { useState } from 'react'
import { Link } from 'react-router-dom'; 
import './LoginForm.css';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const expirationTimeInHours = 3;
            const currentTime = new Date();
            const expirationTimestamp = currentTime.getTime() + expirationTimeInHours * 60 * 60 * 1000;
            const response = await axios.post(`${remoteHostURL}/login`, {
                email: email,
                password: password
            });
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('name', response.data.user.firstName);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiredTime', expirationTimestamp);
            nav('/personal');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <h1 style={{ textAlign: "center" }}>Sign In</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <div className='lol'>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
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
                                name="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p style={{ textAlign: "center" }}>
                Don't have an account yet? 
                </p>
                <Link to="/registration" style={{color:"rgba( 69, 162, 158)"}}> Register here.</Link> 
            </div>
        </div>
    )
}

export default LoginForm;
