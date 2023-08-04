import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar2 from '../Navbar2/Navbar2';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';
import StockCarousel from '../StockCarousel/StockCarousel';
import MarketOverview from '../MarketOverview/MarketOverview';
import Balance from '../Balance/Balance';
import PortfolioChart from '../PortfolioChart/PortfolioChart';


function StockDashboard() {
  
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
  </div>
  );
}

export default StockDashboard;

