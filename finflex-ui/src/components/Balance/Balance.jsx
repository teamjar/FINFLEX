import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient';
import './Balance.css'
import { useBalance } from '../../Context/BalanceContext';

function Balance() {
    const [stocks, setStocks] = useState([]);
    
    
    const { state: { totalInvestment, totalBalance }, dispatch } = useBalance();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const fetchUserStocks = async () => {
            try {
                const res = await axios.get(`${remoteHostURL}/stocks/${userId}`, config);
                if (res.data && res.data.user) {
                    setStocks(res.data.user);
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        const fetchTotalInvestment = async () => {
            try {
                const res = await axios.get(`${remoteHostURL}/stocks/investment/${userId}`, config);
                if (res.data && res.data.database) {
                    dispatch({ type: "SET_INVESTMENT", payload: (res.data.database[0].sum).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTotalBalance = async () => {
            try {
                const res = await axios.get(`${remoteHostURL}/stocks/balance/${userId}`, config);
                if (res.data && res.data.balance) {
                    dispatch({ type: "SET_BALANCE", payload: (res.data.balance[0].sum).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserStocks();
        fetchTotalInvestment();
        fetchTotalBalance();
    }, []);


    return (
     
            <div className='balance-container' >
            <div className='Portfolio'>
                <h2 style={{color: "black"}}>Your Portfolio</h2>
            </div>
            <div className='B_I'>
                <div className="balance">
                <p style={{color: "black"}}>Total Balance:</p>
                    <div className = "B-container">
                        <p style={{color: "black"}}>${totalBalance}</p>
                    </div>
                </div>
                <div className="investment">
                    <p style={{color: "black"}}>Total Investment:</p>
                    <div className = "I-container">
                        <p style={{color: "black"}}>${totalInvestment}</p>
                    </div>
                </div>
            </div>
        </div>

    
        
    );
}

export default Balance;
