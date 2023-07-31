import "./InfoTile.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";

const InfoTile = () => {
    const [earnings, setEarnings] = useState(0.00);
    const [spent, setSpent] = useState(0.00);
    const [budget, setBudget] = useState(0.00);
    const [due, setDue] = useState(0.00);

    useEffect(() => {
        const authUser = async () => {
          try {
            const userId = localStorage.getItem('userId');
            const earn = await axios.get(`${remoteHostURL}/budget/earnings/${userId}`);
            const bud = await axios.get(`${remoteHostURL}/budget/total/${userId}`);
            const bills = await axios.get(`${remoteHostURL}/bills/due/${userId}`);
            const expenses = await axios.get(`${remoteHostURL}/expense/spent/${userId}`);
            if (earn?.data?.database && bud?.data?.database && bills?.data?.database) {
              setEarnings(earn.data.database[0].sum);
              setSpent(expenses.data.database[0].sum);
              setBudget(bud.data.database[0].sum);
              setDue(bills.data.database[0].sum);
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
            <h3>Total Earnings</h3>
            <h1>${earnings}</h1>
            </div>
            
            <div className="tile square2">
            <h3>Total Spent</h3>
            <h1>${spent}</h1>
            </div>

            <div className="tile square3">
            <h3>Budget</h3>
            <h1>${budget}</h1>
            </div>

            <div className="tile square4">
            <h3>Due Amount</h3>
            <h1>${due}</h1>
            </div>

        </div>

        

    )
}

export default InfoTile