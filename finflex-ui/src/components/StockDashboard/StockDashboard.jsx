import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar from '../Navbar/Navbar';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';
import StockCarousel from '../StockCarousel/StockCarousel';
import MarketOverview from '../MarketOverview/MarketOverview';
import Balance from '../Balance/Balance';
// import TradingSnapshot from '../TradingSnapshot/TradingSnapshot';

function StockDashboard() {
  return (
  <div>
    <StockSide />
    <div className='plz'>
      <StockProvider>
        <div className='stock-dashboard'>
          <div className="Navbar"><Navbar/></div>
          <div className="StockSearch"> <StockSearch/></div>
          <div className="StockCarousel"> <StockCarousel/></div>
          <div className='market'>
            <div className="MarketOverview"><MarketOverview/></div> 
            <div className="Balance"><Balance/></div>
          </div>
        </div>
      </StockProvider>
      <br/>
    </div>
  </div>
  );
}

export default StockDashboard;

