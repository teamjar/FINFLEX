import "./Expense.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import ExpenseDetail from "../ExpenseDetail/ExpenseDetail";

export default function Expense({ searchQuery }) {
  const [pName, setName] = useState('');
  const [pDesc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCat] = useState('');
  const [array, setArray] = useState([]); // pname, pdescription, pprice, pdate, category
  const [filterCategory, setFilterCategory] = useState('');

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
        const res = await axios.get(`${remoteHostURL}/expenses/${userId}`, config);
        if (res?.data?.database) {
          setArray(res.data.database);

          // Extract unique categories for filter dropdown
          const uniqueCategories = Array.from(new Set(res.data.database.map(item => item.category)));
          setFilterCategory(''); // Reset the filter category on new data load
          setCategoriesForFilter(uniqueCategories);
        }
      } catch (err) {
        console.log(err);
      }
    };

    authUser();
  }, []);

  const [categoriesForFilter, setCategoriesForFilter] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.location.reload();

    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${remoteHostURL}/expenses`, {
        userId: userId,
        pName: pName,
        pDesc: pDesc,
        pPrice: price,
        pDate: date,
        category: category
      });
      const newArray = [...array, res.data.user];
      setArray(newArray);
      console.log(newArray);

      setName('');
      setDesc('');
      setPrice('');
      setDate('');
      setCat('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flow">
        <div className="si">
          <label className="ti">Name</label>
          <input
            className="el"
            placeholder="Enter name of purchase"
            name="pName"
            value={pName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Description</label>
          <input
            className="el"
            placeholder="Enter a description"
            name="pDescription"
            value={pDesc}
            onChange={e => setDesc(e.target.value)} 
          />
        </div>

        <div className="si">
          <label className="ti">Amount</label>
          <input
            className="el"
            placeholder="Enter paid amount"
            name="pPrice"
            value={price}
            onChange={e => setPrice(e.target.value)} 
          />
        </div>

        <div className="si">
          <label className="ti">Date</label>
          <input
            className="el"
            type="date"
            name="pDate"
            value={date}
            onChange={e => setDate(e.target.value)} 
          />
        </div>

        <div className="si">
          <label className="ti">Category</label>
          <select id="status" name="category" value={category} onChange={e => setCat(e.target.value)}>
            <option></option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Education">Education</option>
            <option value="Health/Medical">Health/Medical</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Personal">Personal Care</option>
            <option value="Debt/Loans">Debt/Loans</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <button type="submit" className="btn2" onClick={handleSubmit}>
          Add
        </button>

        

      </div>

       {/* Add the new filter dropdown */}
       <div className="si">
        <div className="flow">
          <select id="filter" name="filter" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categoriesForFilter.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          </div>
        </div>

      <ExpenseDetail />
      {array
        .filter(
          (a) =>
            (a.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.pdescription.toLowerCase().includes(searchQuery.toLowerCase()))
            &&
            (filterCategory === '' || a.category === filterCategory)
        )
        .map((a, idx) => (
          <div key={idx}>
            <table>
              <tr>
                <th><span style={{ color: "#031D44" }}>{a.category}</span></th>
                <th><span style={{ color: "#031D44" }}>{a.pname}</span></th>
                <th><span style={{ color: "#031D44" }}>{a.pdescription}</span></th>
                <th><span style={{ color: "#031D44" }}>${a.pprice}</span></th>
                <th><span style={{ color: "#031D44" }}>{a.pdate.substring(0, a.pdate.indexOf('T'))}</span></th>
              </tr>
            </table>
          </div>
        ))}
      <br></br>
    </div>
  );
}
