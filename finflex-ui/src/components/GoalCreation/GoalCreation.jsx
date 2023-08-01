import "./GoalCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import GoalDetail from "../GoalDetail/GoalDetail";

export default function GoalCreation({ searchQuery }) {
  const [gName, setName] = useState('');
  const [gDesc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCat] = useState('');
  const [array, setArray] = useState([]); // gname, gdesc, target(amount), datedue(deadline), category
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
        const res = await axios.get(`${remoteHostURL}/goals/${userId}`, config);
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

    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${remoteHostURL}/goals`, {
        userId: userId,
        gName: gName,
        gDesc: gDesc,
        target: amount,
        dateDue: deadline,
        category: category
      });

      console.log(res.data);

      const newArray = [...array, res.data.user];
      setArray(newArray);
      console.log(newArray);
    } catch (err) {
      console.log(err);
    }
  };

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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Description</label>
          <input
            className="el"
            placeholder="Enter a short goal description"
            name="gDesc"
            value={gDesc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Amount</label>
          <input
            className="el"
            placeholder="Enter a specific goal amount"
            name="target"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="si">
          <label className="ti">Category</label>
          <select
            id="status"
            name="category"
            value={category}
            onChange={(e) => setCat(e.target.value)}
          >
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
      {/* Add the new filter dropdown */}
      <div className="si">
        <div className="flow">
          <select
            id="filter"
            name="filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categoriesForFilter.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        </div>
      <GoalDetail />
      {array
        .filter(
          (a) =>
            (a.gname.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.gdesc.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (filterCategory === '' || a.category === filterCategory)
        )
        .map((a, idx) => (
          <div key={idx}>
            <table>
              <tr>
                <th style={{ border: "2px solid rgb(4, 57, 94)" }}>
                  <span>{a.category}</span>
                </th>
                <th style={{ border: "2px solid rgb(4, 57, 94)" }}>
                  <span>{a.gname}</span>
                </th>
                <th style={{ border: "2px solid rgb(4, 57, 94)" }}>
                  <span>{a.gdesc}</span>
                </th>
                <th style={{ border: "2px solid rgb(4, 57, 94)" }}>
                  <span>${a.target}</span>
                </th>
                <th style={{ border: "2px solid rgb(4, 57, 94)" }}>
                  <span>{a.datedue.substring(0, a.datedue.indexOf('T'))}</span>
                </th>
              </tr>
            </table>
          </div>
        ))}
      <br></br>
    </div>
  );
}



