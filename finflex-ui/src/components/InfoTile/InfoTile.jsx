import "./InfoTile.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";

const InfoTile = () => {
    const [earnings, setEarnings] = useState(0.00);
    const [spent, setSpent] = useState(0.00);
    const [budget, setBudget] = useState(0.00);
    const [due, setDue] = useState(0.00);
    const [balance, setBalance] = useState(0.00);

    useEffect(() => {
        const authUser = async () => {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header as 'Bearer <token>'
              }
            };

            const userId = localStorage.getItem('userId');
            const earn = await axios.get(`${remoteHostURL}/budget/earnings/${userId}`, config);
            const bud = await axios.get(`${remoteHostURL}/budget/total/${userId}`, config);
            const bills = await axios.get(`${remoteHostURL}/bills/due/${userId}`, config);
            const expenses = await axios.get(`${remoteHostURL}/expense/spent/${userId}`, config);
            const balance = await axios.get(`${remoteHostURL}/balance/${userId}`, config);
            //const put = await axios.put(`${remoteHostURL}/balance`, config);
            if (earn?.data?.database && bud?.data?.database && bills?.data?.database) {
              setEarnings(earn.data.database[0].sum);
              setSpent(expenses.data.database[0].sum);
              setBudget(bud.data.database[0].sum);
              setDue(bills.data.database[0].sum);
              setBalance(balance.data.database[0].balance);
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        authUser();
      }, [])

    return (
        <div className="tile2">
            <div className="tile square">
            <h3>Earnings</h3>
            <h1 style={{fontSize:"30px"}}>${earnings}</h1>
            </div>
            
            <div className="tile square2">
            <h3>Transactions</h3>
            <h1 style={{fontSize:"30px"}}>${spent}</h1>
            </div>

            <div className="tile square3">
            <h3>Budget</h3>
            <h1 style={{fontSize:"30px"}}>${budget}</h1>
            </div>

            <div className="tile square4">
            <h3>Due</h3>
            <h1 style={{fontSize:"30px"}}>${due}</h1>
            </div>

            <div className="tile square5">
            <h3>Balance</h3>
            <h1 style={{fontSize:"30px"}}>${balance}</h1>
            </div>

        </div>

        

    )
}

export default InfoTile