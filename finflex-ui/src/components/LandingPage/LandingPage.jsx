import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import LandingPageNavBar from "../LandingPageNavBar/LandingPageNavBar";
import { motion } from "framer-motion";
import { useState } from "react";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/welcome-onboard');
    }

    useEffect(() => {
        console.log('Token: ', localStorage.getItem('token'));
    }, [])

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    useEffect(() => {
        if (isInitialLoad) setIsInitialLoad(false);
    }, [isInitialLoad]);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div className='landing-page' initial={isInitialLoad ? 'hidden' : 'visible'} animate="visible" variants={variants}>
            <LandingPageNavBar />
            <div className='container'>
                <motion.div className='info' initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.5 }}>
                    <h1 style={{fontSize:"70px"}}>Empower Your Finances</h1>
                    <h1 style={{fontSize:"70px"}}>with FinFlex</h1>
                    <motion.button className="get-started-button" whileHover={{scale: 1.05}} onClick={handleClick}>Get Started</motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default LandingPage;

