import { useState } from 'react'
import { Link } from 'react-router-dom'; 
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                email: email,
                password: password
            });
            localStorage.setItem('userId', response.data.users.id);
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
                    <Link to="/registration" style={{color:"rgba( 69, 162, 158)"}}> Register here.</Link> 
                </p>
            </div>
        </div>
    )
}

export default LoginForm;
