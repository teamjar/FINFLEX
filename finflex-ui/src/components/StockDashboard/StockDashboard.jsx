import React, { useState } from "react";
import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar2 from '../Navbar2/Navbar2';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';
import StockCarousel from '../StockCarousel/StockCarousel';
import MarketOverview from '../MarketOverview/MarketOverview';
import Balance from '../Balance/Balance';
import PortfolioChart from '../PortfolioChart/PortfolioChart';
import StockChat from "../StockChat/StockChat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BalanceProvider } from '../../Context/BalanceContext.jsx';

function StockDashboard() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <StockSide />
      <div className='plz'>
        <StockProvider>
          <div className='stock-dashboard'>
            <div className="Navbar fuh"><Navbar2/></div>
            <div className="StockSearch"> <StockSearch/></div>
            <div className="StockCarousel"> <StockCarousel/></div>

            <div className='market'>
              <div className="MarketOverview"><MarketOverview/></div> 
              <div className="Balance"><Balance/></div>
              <div className="PortfolioChart"><PortfolioChart/></div>
            </div>
          </div>
        </StockProvider>
        <br/>
      </div>

      {showChat ? (
        <div className="chat-icon-container" onClick={() => setShowChat(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        <div className="chat-icon-container" onClick={() => setShowChat(true)}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      )}

      {showChat && <StockChat onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default StockDashboard;
