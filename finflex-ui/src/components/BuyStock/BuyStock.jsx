import React, { useState, useEffect } from 'react';
import './BuyStock.css';
import { useParams, useNavigate } from "react-router-dom";
import { fetchStockDetails, fetchQuote } from '../api/stock-api';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient'
import Swal from 'sweetalert2';

function BuyStock() {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);
    const [companyName, setName] = useState('');
    const [change, setChange] = useState(0.0);
    const [array, setArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quote = await fetchQuote(symbol);
                const details = await fetchStockDetails(symbol);
                setName(details.name);
                setStockPrice(quote.c);
                setChange(quote.dp);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [symbol]);

    const handleInvestmentChange = (e) => {
        setInvestment(e.target.value);
        setQuantity(Math.floor(e.target.value / stockPrice));
    }

    const handleBuyClick = async (e) => {
        e.preventDefault();
        console.log(`Purchasing ${quantity} shares with an investment of ${investment}...`);
        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.post(`${remoteHostURL}/stocks`, {
                userId: userId,
                ticker: symbol,
                companyName: companyName,
                stockPrice: stockPrice,
                quantity: quantity,
                change: change
            })
            if (res.data && res.data.user) {
                const newArray = [...array, res.data.user];
                setArray(newArray);
                Swal.fire({
                    title: 'Purchase Complete!',
                    text: `You purchased ${quantity} shares.`,
                    icon: 'success'
                }).then(() => {
                    navigate('/stocks'); // Navigate to stocks route after closing the Swal alert
                });
            } else {
                console.error('Data is not available in the response');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error processing your purchase.',
                icon: 'error'
            });
        }
    }

    return (
        <div className="container">
            <div className="BuyStock">
                <h1>Buy Stocks</h1>
                <form onSubmit={handleBuyClick}>
                    <label htmlFor="investment">Investment Amount</label>
                    <input 
                        type="number"
                        id="investment"
                        min="1"
                        value={investment}
                        onChange={handleInvestmentChange}
                    />
                    <label htmlFor="quantity">Quantity Amount</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        readOnly
                    />
                    <button type="submit">Buy</button>
                </form>
            </div>
            
        </div>

    )
}

export default BuyStock;
