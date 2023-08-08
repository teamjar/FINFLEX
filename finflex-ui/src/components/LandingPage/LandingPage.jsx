import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import LandingPageNavBar from "../LandingPageNavBar/LandingPageNavBar";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    useEffect(() => {
        console.log('Token: ', localStorage.getItem('token'));
    }, [])

    return (
        <div className = 'landing-page'>
            <LandingPageNavBar />
            <div className ='container'>
                <div className = 'info'>
                    <h1 style={{fontSize:"70px"}}>Empower Your Finances</h1>
                    <h1 style={{fontSize:"70px"}}>with FinFlex</h1>
                    {/* <h1 style={{fontSize:"70px"}}>Flexibility for Financial Success!</h1> */}
                    <p style={{marginLeft:"120px", marginRight:"120px",}}>Flexibility for Financial Success </p>
                    <button className="get-started-button" onClick={handleClick}>Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

