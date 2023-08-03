import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import moment from 'moment';
import { remoteHostURL } from '../../apiClient';
import Card from "../Card/Card";

function PortfolioChart() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.get(`${remoteHostURL}/stocks/${userId}`, config);
      const stocksData = res.data.database.map(stock => ({
        ...stock,
        timestamp: moment(stock.timestamp).format('YYYY-MM-DD HH:mm'),
      }));
  

      const aggregatedData = Object.values(stocksData.reduce((acc, stock) => {
        const existingStock = acc[stock.timestamp] || {
          timestamp: stock.timestamp,
          balance: 0,
          investment: 0,
        };
  
        existingStock.balance += stock.balance;
        existingStock.investment += stock.investment;
  
        acc[stock.timestamp] = existingStock;
        return acc;
      }, {}));
  
      setData(aggregatedData);
    
   
      console.log(aggregatedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); 
    return () => clearInterval(intervalId); 
  }, []);


  return (
//     <Card>
// <h2 style={{color: 'black', textAlign: 'center'}}>Portfolio Analysis</h2>
// <div className = "portfoliochart-container">
//     <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//         }}
//         >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="timestamp" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="investment" stroke="#8884d8" activeDot={{ r: 8 }} />

//         <Line type="monotone" dataKey="balance" stroke="#82ca9d" />
   
//         </LineChart>
// </div>     
// </Card>

<Card>
<h2 style={{color: 'black', textAlign: 'center'}}>Portfolio Analysis</h2>
<div className="portfoliochart-container">
  <AreaChart
    width={500}
    height={300}
    data={data}
    margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="timestamp" />
    <YAxis />
    <Tooltip />
    <Legend />
    <defs>
      <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <Area type="monotone" dataKey="investment" stroke="#8884d8" fill="url(#colorInvestment)" activeDot={{ r: 8 }} />
    <Area type="monotone" dataKey="balance" stroke="#82ca9d" fill="url(#colorBalance)" />
  </AreaChart>
</div>
</Card>

  );
}

export default PortfolioChart;




