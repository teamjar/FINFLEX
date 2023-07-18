import LoginForm from '../LoginForm/LoginForm.jsx';
import { Link } from 'react-router-dom'; 

const LoginPage = () => {
    return (
        <div className='font'>
            <h1 style={{ textAlign: "center" }}>Sign In</h1>
            <LoginForm />
            <p style={{ textAlign: "center" }}>
                Don't have an account yet? 
                <Link to="/registration" style={{color:"rgba( 69, 162, 158)"}}> Register here.</Link> 
            </p>
        </div>
    );
}

export default LoginPage;



