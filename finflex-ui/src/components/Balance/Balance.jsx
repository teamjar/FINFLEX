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

                <h1>Your Portfolio</h1>
                <h2>Total Investment: ${totalInvestment}</h2>
                {stocks.map((stock, index) => (
                    <div key={index}>
                        <h3>{stock.companyName}</h3>
                        <p>Ticker: {stock.ticker}</p>
                        <p>Investment: ${stock.investment}</p>
                        <p>Quantity: {stock.quantity}</p>
                        <p>Stock Price: ${stock.stockPrice}</p>
                    </div>
                ))}
  
        </div>
    );
}

export default Balance;
