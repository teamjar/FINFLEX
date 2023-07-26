import React, { useState, useEffect } from 'react';
import './BuyStock.css';
import { useParams } from "react-router-dom";
import { fetchQuote } from '../api/stock-api';

function BuyStock() {
    const { symbol } = useParams();
    const [quantity, setQuantity] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quote = await fetchQuote(symbol);
                setStockPrice(quote.c);
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

    const handleBuyClick = (e) => {
        e.preventDefault();
        console.log(`Purchasing ${quantity} shares with an investment of ${investment}...`);
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
