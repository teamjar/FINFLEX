import React from 'react';
import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar from '../Navbar/Navbar';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';
import StockCarousel from '../StockCarousel/StockCarousel';
import axios from 'axios';
import Card from '../Card/Card';




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
           </div>
         </StockProvider>
       </div>
     </div>

    
   );
}

export default StockDashboard;
