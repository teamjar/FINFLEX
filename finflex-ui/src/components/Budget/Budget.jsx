import "./Budget.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";

export default function Budget() {
  return (
    <div className="add-transaction">
      <BudgetForm />
    </div>
  );
}

export function BudgetForm() {
  const [earnings, setEarnings] = useState('');
  const [budget, setBudget] = useState('');
  const [array, setArray] = useState([]); //earnings, budget

  useEffect(() => {
    const authUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`${remoteHostURL}/budget/:${userId}`);
        if (res?.data?.database) {
          setArray(res.data.database);
        }
      } catch (err) {
        console.log(err);
      }
    };

    authUser();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${remoteHostURL}/budget`, {
        userId: userId,
        earnings: earnings,
        budget: budget
      })

      console.log(res.data);

      const newArray = [...array, res.data.user];
      setArray(newArray);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flow">
        <div className="si">
          <label className="ti">Weekly Earnings</label>
          <input
            className="el2"
            name="earnings"
            placeholder="Enter your weekly earnings"
            value={earnings}
            onChange={e => setEarnings(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Set Aside</label>
          <input
            className="el2"
            name="budget"
            placeholder="Enter a budget amount"
            value={budget}
            onChange={e => {setBudget(e.target.value)}}
          />
        </div>

        <button type="submit" className="btn2" onClick={handleSubmit}>
          Set
        </button>
      </div>
    </div>
  );
}
