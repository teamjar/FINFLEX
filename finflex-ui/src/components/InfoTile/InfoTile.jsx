import "./InfoTile.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";
import { useNavigate } from "react-router-dom";

const InfoTile = () => {
    const [earnings, setEarnings] = useState(0.00);
    const [spent, setSpent] = useState(0.00);
    const [budget, setBudget] = useState(0.00);
    const [due, setDue] = useState(0.00);
    const [balance, setBalance] = useState(0.00);
    const [newEarnings, setNewEarnings] = useState(0.00);
    const [newBudget, setNewBudget] = useState(0.00);
    const [newBalance, setNewBalance] = useState(0.00);
    const [showModal1, setShowModal1] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` 
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

      const openModal1 = () => {
        setShowModal1(true);
      };
    
      const closeModal1 = () => {
        setShowModal1(false);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setShowModal1(false);

        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header as 'Bearer <token>'
              }
            };

          await axios.post(`${remoteHostURL}/budget`, {
            userId: localStorage.getItem('userId'),
            earnings: newEarnings,
            budget: newBudget
          }, config);
          await axios.post(`${remoteHostURL}/balance`, {
            userId: localStorage.getItem('userId'),
            balance: newBalance
          }, config)
          const earn = await axios.get(`${remoteHostURL}/budget/earnings/${userId}`, config);
          const bud = await axios.get(`${remoteHostURL}/budget/total/${userId}`, config);
          const balance = await axios.get(`${remoteHostURL}/balance/${userId}`, config);

          setEarnings(earn.data.database[0].sum);
          setBudget(bud.data.database[0].sum);
          setBalance(balance.data.database[0].balance);

        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div className="tile2">
            <div className="tile square" onClick={openModal1}>
            <h3>Earnings</h3>
            <h1 style={{fontSize:"30px"}}>${earnings}</h1>
            </div>
            
            <div className="tile square2">
            <h3>Transactions</h3>
            <h1 style={{fontSize:"30px"}}>${spent}</h1>
            </div>

            <div className="tile square3" onClick={openModal1}>
            <h3>Budget</h3>
            <h1 style={{fontSize:"30px"}}>${budget}</h1>
            </div>

            <div className="tile square4">
            <h3>Due</h3>
            <h1 style={{fontSize:"30px"}}>${due}</h1>
            </div>

            <div className="tile square5" onClick={openModal1}>
            <h3>Balance</h3>
            <h1 style={{fontSize:"30px"}}>${balance}</h1>
            </div>

      {showModal1 && (
      <div className="clock">
        <div className="modal4">
          <div className="modal-content4">
            <span onClick={closeModal1} className="close-button1">
            ✕</span>
            <h2 style={{color:"black", fontSize:"30px", textAlign:"center", backgroundColor:"#ece8df"}}>Update Your Finances</h2>
   
              <form>
              <div className="form-group1">
              <div className="lol">

              <label style={{marginTop:"10px", fontWeight:"bolder"}}>Set your new earnings:</label>
              <input
              type="text"
              value={newEarnings}
              onChange={(e) => setNewEarnings(e.target.value)}
              />
              
              <label style={{marginTop:"10px", fontWeight:"bolder"}}>Set a new weekly budget:</label>
              <input 
              type="text"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              />

              <label style={{marginTop:"10px", fontWeight:"bolder"}}>Update your account balance:</label>
              <input
              type="text"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              />

              </div>
              </div>
              </form>

              <button type="submit" onClick={handleSubmit} className="btn" style={{marginTop:"10px"}}>Submit</button>

          </div>
        </div>
      </div>
      )}




      

        </div>
    )
}

export default InfoTile