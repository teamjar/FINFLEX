import "./BillCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";

export default function BillCreation() {
  return (
    <div className="add-transaction">
      <BillCreationForm />
    </div>
  );
}

export function BillCreationForm() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [due, setDue] = useState('');
  const [status, setStatus] = useState('');
  const [array, setArray] = useState([]); //billname, billdesc, due, status, price

  useEffect(() => {
    const authUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`${remoteHostURL}/bills/${userId}`);
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
      const res = await axios.post(`${remoteHostURL}/bills`, {
        userId: userId,
        billName: name,
        billDesc: desc,
        due: due,
        status: status,
        price: price
      })
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
          <label className="ti">Bill Name</label>
          <input
            className="el"
            placeholder="Enter the associated bill name"
            name="billName" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Pay Description</label>
          <input
            className="el"
            placeholder="Enter a description of payment"
            name="description"
            value={desc}
            onChange={e => setDesc(e.target.value)} 
          />
        </div>

        <div className="si">
          <label className="ti">Price</label>
          <input
            className="el"
            placeholder="Enter the necessary total"
            name="price" 
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Due Date</label>
          <input
            className="el"
            type="date"
            placeholder="Enter a deadline"
            name="due"
            value={due}
            onChange={e => setDue(e.target.value)} 
          />
        </div>

        <div className="si">
          <label className="ti">Status</label>
          <select id="status" name="status" defaultValue="unpaid" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <button type="submit" className="btn2" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}
