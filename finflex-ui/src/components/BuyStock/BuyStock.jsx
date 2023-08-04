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
    const [investment, setInvestment] = useState("");
    const [stockPrice, setStockPrice] = useState(0);
    const [companyName, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [change, setChange] = useState(0.0);
    const [array, setArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quote = await fetchQuote(symbol);
                const details = await fetchStockDetails(symbol);
                setLogo(details.logo);
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
        let investmentValue = e.target.value;
        if (investmentValue === "") {  // if input is empty
            setInvestment("");
            setQuantity(0);
        } else {
            investmentValue = parseFloat(investmentValue);
            if (!isNaN(investmentValue)) { // ensure the parsed value is a valid number
                setInvestment(investmentValue);
                setQuantity(Math.floor(investmentValue / stockPrice));
            } else {
                // handle the error
                console.error('Invalid input: not a number');
                setInvestment(""); // reset investment
                setQuantity(0); // reset quantity
            }
        }
    }
    
    


    const handleBuyClick = async (e) => {
        e.preventDefault();


        console.log(`Purchasing ${quantity} shares with an investment of ${investment}...`);
        try {
            const userId = localStorage.getItem('userId');
            console.log(typeof investment); // check the type of investment
            console.log(typeof quantity); // check the type of quantity

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await axios.post(`${remoteHostURL}/stocks`, {
                userId: userId,
                ticker: symbol,
                companyName: companyName,
                stockPrice: stockPrice,
                quantity: quantity,
                change: change,
                investment: investment,
                logo: logo
            }, config).then(async () => {
                await axios.post(`${remoteHostURL}/expenses`, {
                    userId: userId,
                    pName: symbol,
                    pDesc: `Purchased ${quantity} shares of ${companyName} stock`,
                    pPrice: investment,
                    category: "Investments"
                }, config)
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
        <div className='bff'>
             <h1 style={{textAlign:"center"}}>Buy Stocks</h1>
            <div className="BuyStock">
                <form onSubmit={handleBuyClick}>
                    <label htmlFor="investment">Investment Amount</label>
                <div className='lol'>
                    <input 
                        type="number"
                        id="investment"
                        min="1"
                        value={investment}
                        onChange={handleInvestmentChange}
                    />
                </div>
                    <label htmlFor="quantity">Quantity Amount</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        readOnly
                    />
                    <button type="submit" className='login-btn'>Buy</button>
                </form>
            </div>
     
           
            
        </div>
    </div>
    )
}

export default BuyStock;