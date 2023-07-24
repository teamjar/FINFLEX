// import React from 'react'
// import StockSide from '../StockSide/StockSide'
// import Navbar from '../Navbar/Navbar'
// import './StockDashbord.css'
// import StockSearch from '../StockSearch/StockSearch'

// function StockDashboard() {
//   return (
//     <div className='stockcontainer'>
//       <div className="StockSearch"> <StockSearch /></div>

//         {/* <div className="Chart"></div>
//         <div className="Overview"></div>
//         <div className="Details"></div> */}
//       <div className="Navbar"> <Navbar /></div>
//       <div className="StockSide"> <StockSide /> </div> 
//     </div>




//   )
// }

// export default StockDashboard


import React from 'react';
import { StockProvider } from '../../Context/StockContext'; 
import StockSide from '../StockSide/StockSide';
import Navbar from '../Navbar/Navbar';
import './StockDashbord.css';
import StockSearch from '../StockSearch/StockSearch';

function StockDashboard() {
  return (
    <StockProvider>
      <div className='stockcontainer'>
        <div className="StockSearch"> <StockSearch /></div>
        {/* <div className="Chart"></div>
        <div className="Overview"></div>
        <div className="Details"></div> */}
        <div className="Navbar"> <Navbar /></div>
        <div className="StockSide"> <StockSide /> </div> 
      </div>
    </StockProvider>
  );
}

export default StockDashboard;
