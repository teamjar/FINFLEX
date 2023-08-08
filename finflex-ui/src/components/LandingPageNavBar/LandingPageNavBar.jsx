import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageNavBar.css';

const LandingPageNavBar = () => {
    const navigate = useNavigate(); 


    const handleSignInClick = () => {
        navigate('/login');  
    }

    const handleSignUpClick = () => {
        navigate('/registration');  
    }

    return (
        <div className='landingpagenavbar'>
            <div className='navbar__left'>
                <h1>FinFlex</h1>
            </div>
            <div className='navbar__right'>
                <button className='navbar__button' onClick={handleSignInClick}>Sign In</button>
                <button className='navbar__button' onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default LandingPageNavBar;
