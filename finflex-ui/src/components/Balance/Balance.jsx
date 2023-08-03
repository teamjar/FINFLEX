import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient';
import './Balance.css'

function Balance() {
    const [stocks, setStocks] = useState([]);
    const [totalInvestment, setTotalInvestment] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const fetchUserStocks = async () => {
            try {
                const res = await axios.get(`${remoteHostURL}/stocks/${userId}`);
                if (res.data && res.data.user) {
                    setStocks(res.data.user);
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        const fetchTotalInvestment = async () => {
            try {
                const res = await axios.get(`${remoteHostURL}/stocks/investment/${userId}`);
                if (res.data && res.data.user) {
                    setTotalInvestment(res.data.user);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserStocks();
        fetchTotalInvestment();
    }, []);

    return (
        <div >
                <h2 style={{color:"black", textAlign:"center", margin:"5px"}}>Your Portfolio</h2>
                {/*<h2 style={{color:"black"}}>Total Investment: ${totalInvestment}</h2>*/}
                {stocks.map((stock, index) => (
                    <div key={index}>
                        <h3 style={{color:"black"}}>{stock.companyName}</h3>
                        <p style={{color:"black"}}>Ticker: {stock.ticker}</p>
                        <p style={{color:"black"}}>Investment: ${stock.investment}</p>
                        <p style={{color:"black"}}>Quantity: {stock.quantity}</p>
                        <p style={{color:"black"}}>Stock Price: ${stock.stockPrice}</p>
                    </div>
                ))}
  
        </div>
    );
}

export default Balance;
