import { useState } from 'react'
import './LoginForm.css';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(remoteHostURL + "/login", {
                email: email,
                password: password
            });

            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem("name", response.data.user.firstName);
            navigate('/personal');

        } catch(err) {
            console.log(err);
        }
    }

    return (
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
    )
}

export default LoginForm
