import "./GoalCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import GoalDetail from "../GoalDetail/GoalDetail";

export default function GoalCreation() {
  return (
    <div className="add-transaction">
      <GoalCreationForm />
    </div>
  );
}

export function GoalCreationForm() {
  const [gName, setName] = useState('');
  const [gDesc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCat] = useState('');
  const [array, setArray] = useState([]); //gname, gdesc, target(amount), datedue(deadline), category

  useEffect(() => {
    const authUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`${remoteHostURL}/goals/${userId}`);
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
      const res = await axios.post(`${remoteHostURL}/goals`, {
        userId: userId,
        gName: gName,
        gDesc: gDesc,
        target: amount,
        dateDue: deadline,
        category: category
      })

      console.log(res.data);

      const newArray = [...array, res.data.user];
      setArray(newArray);
      console.log(newArray)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flow">
        <div className="si">
          <label className="ti">Goal Name</label>
          <input
            className="el"
            placeholder="Enter a name for your goal"
            name="gName"
            value={gName}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Description</label>
          <input
            className="el"
            placeholder="Enter a short goal description"
            name="gDesc"
            value={gDesc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Amount</label>
          <input
            className="el"
            placeholder="Enter a specific goal amount"
            name="target"
            value={amount} 
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Deadline</label>
          <input
            className="el"
            type="date"
            placeholder="Enter a deadline"
            name="dateDue"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Category</label>
          <select id="status" name="category" value={category} onChange={e => setCat(e.target.value)}>
            <option></option>
          <option value="food">Food</option>
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="health">Health/Medical</option>
            <option value="entertainment">Entertainment</option>
            <option value="personal">Personal Care</option>
            <option value="debt">Debt/Loans</option>
            <option value="misc">Miscellaneous</option>
            
          </select>
        </div>

        <button type="submit" className="btn2" onClick={handleSubmit}>
          Add
        </button>
      </div>
      <GoalDetail/>
      {array.map((a,idx) => (
        <div key={idx}>
          <p>{a.gname}</p>
          <p>{a.gdesc}</p>
          <p>{a.target}</p>
          <p>{a.datedue}</p>
          <p>{a.category}</p>
        </div>
      ))}
    </div>
  );
}
