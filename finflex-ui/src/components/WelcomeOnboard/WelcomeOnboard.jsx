import React from 'react';
import './WelcomeOnboard.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function WelcomeOnboard() {
 const navigate = useNavigate();

 return (
  <motion.div className='welcome-onboard' initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.8 }}>
      <div className='container'>
          <motion.div className='info' initial={{y: 20}} animate={{y: 0}} transition={{ delay: 0.2 }}>
              <h1 style={{fontSize:"70px"}}>Welcome to FinFlex</h1>
              <h1 style={{fontSize:"50px"}}>Dive into a comprehensive suite of tools designed for both stock enthusiasts and personal finance management.</h1>
              <motion.button className="onboard-button" whileHover={{scale: 1.05}} onClick={() => navigate("/personal-onboard")}>Next</motion.button>
          </motion.div>
      </div>
  </motion.div>
);
}

export default WelcomeOnboard;
