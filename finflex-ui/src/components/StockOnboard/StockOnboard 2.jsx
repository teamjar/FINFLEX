import React from 'react';
import './StockOnboard.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function StockOnboard() {
 const navigate = useNavigate();

 return (
  <motion.div className='stock-onboard' initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} transition={{ duration: 0.7 }}>
      <div className='container'>
          <motion.div className='info' initial={{x: 20}} animate={{x: 0}} transition={{ delay: 0.3 }}>
              <h1 style={{fontSize:"70px"}}>Financial Dashboard: Stock Market Insights</h1>
              <h1 style={{fontSize:"50px"}}>Track the latest market trends and keep an eye on your favorite stocks.</h1>
              <motion.button className="onboard-button" whileHover={{scale: 1.05}} onClick={() => navigate("/registration")}>Finish</motion.button>
          </motion.div>
      </div>
  </motion.div>
);
}

export default StockOnboard;
