import './SellStock.css';
import { useParams, useNavigate } from "react-router-dom";
import { fetchStockDetails, fetchQuote } from '../api/stock-api';
import axios from 'axios';
import { remoteHostURL } from '../../apiClient'
import Swal from 'sweetalert2';
import React, { useState, useEffect, useContext } from 'react';
import { BalanceContext } from '../../Context/BalanceContext';



function SellStock() {
   const { symbol } = useParams();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(0);
   const [stockPrice, setStockPrice] = useState(0);
   const [companyName, setName] = useState('');
   const [logo, setLogo] = useState('');
   const [change, setChange] = useState(0.0);
   const { state, dispatch } = useContext(BalanceContext);

   
   

   

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

   const handleQuantityChange = (e) => {
       const newQuantity = e.target.value;
       setQuantity(newQuantity);
   }

   const handleSellClick = async (e) => {
       e.preventDefault();
       const userId = localStorage.getItem('userId');
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               Authorization: `Bearer ${token}`
           }
       };

       try {
           const sellingPrice = stockPrice * quantity;
           await axios.post(`${remoteHostURL}/stocks/sell`, {
            userId: userId,
            ticker: symbol,
            quantity: quantity,
            sellingPrice: sellingPrice
        }, config);

        dispatch({
            type: 'SUBTRACT_FROM_BALANCE',
            payload: sellingPrice
        });

           await axios.put(`${remoteHostURL}/plus/balance`, {
               userId: userId,
               price: sellingPrice
           }, config);



           Swal.fire({
               title: 'Sale Complete!',
               text: `You sold ${quantity} shares for a total of ${sellingPrice}.`,
               icon: 'success'
           }).then(() => {
               navigate('/stocks');
           });

       } catch (error) {
           console.error(error);
           Swal.fire({
               title: 'Error!',
               text: 'There was an error processing your sale.',
               icon: 'error'
           });
       }
   }

   return (
       <div className="container">
           <div className='sff'>
               <h1 style={{textAlign:"center"}}>Sell Stocks</h1>
               <div className="SellStock">
                   <form onSubmit={handleSellClick}>
                       <label htmlFor="quantity">Quantity to Sell</label>
                       <input
                           type="number"
                           id="quantity"
                           min="1"
                           value={quantity}
                           onChange={handleQuantityChange}
                       />
                       <button type="submit" className='login-btn'>Sell</button>
                   </form>
               </div>
           </div>
       </div>
   )
}

export default SellStock;
