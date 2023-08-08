import React from 'react';
import './PersonalOnboard.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function PersonalOnboard() {
 const navigate = useNavigate();

 return (
  <motion.div className='personal-onboard' initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}} transition={{ duration: 0.7 }}>
      <div className='container'>
          <motion.div className='info' initial={{x: -20}} animate={{x: 0}} transition={{ delay: 0.3 }}>
              <h1 style={{fontSize:"70px"}}>Personal Finance Dashboard: Your Financial Health Hub</h1>
              <h1 style={{fontSize:"50px"}}>Keep tabs on your income and expenses in one place.</h1>
              <motion.button className="onboard-button" whileHover={{scale: 1.05}} onClick={() => navigate("/stock-onboard")}>Next</motion.button>
          </motion.div>
      </div>
  </motion.div>
);
}

export default PersonalOnboard;
