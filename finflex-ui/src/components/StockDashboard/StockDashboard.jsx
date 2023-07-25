import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar from '../Navbar/Navbar';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';

function StockDashboard() {
  return (
  <div className='plz'>
    <Navbar />
    <StockProvider>
      <div className='stockcontainers'>
        <div> <StockSearch /></div>
        {/* <div className="Chart"></div>
        <div className="Overview"></div>
        <div className="Details"></div> */}
        <div className="StockSide"> <StockSide /> </div> 
      </div>
    </StockProvider>
  </div>
  );
}

export default StockDashboard;
