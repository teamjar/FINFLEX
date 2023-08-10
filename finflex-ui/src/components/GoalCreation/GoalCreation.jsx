import "./GoalCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import GoalDetail from "../GoalDetail/GoalDetail";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';

export default function GoalCreation({ searchQuery }) {
  const [gName, setName] = useState('');
  const [gDesc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCat] = useState('');
  const [array, setArray] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

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

          const uniqueCategories = Array.from(new Set(res.data.database.map(item => item.category)));
          setFilterCategory('');
          setCategoriesForFilter(uniqueCategories);

          res.data.database.forEach(async (item) => {

            console.log(item);

            const dueDate = new Date(item.datedue);
            const currentDate = new Date();
            const timeDifference = dueDate.getTime() - currentDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference <= 3 && daysDifference > 0) {
              toast.info(`Due date is approaching for ${item.gname} in ${daysDifference} days. You currently have 
              $${item.towardsgoal} towards that goal.`, {autoClose: false})
            }
            if(daysDifference == 0 && item.towardsgoal <= item.target && item.towardsgoal != 0) {
              const name = localStorage.getItem('name');
              Swal.fire(`Congratulations ${name}!`, `You completed your ${item.gname} goal with only $${item.target - item.towardsgoal} to spare! We will set the same goal for next week!`)
              setIsConfettiActive(true);
              setTimeout(() => {
                setIsConfettiActive(false);
              }, 4000);

              await axios.delete(`${remoteHostURL}/goals/${userId}/${item.gname}/${item.gdesc}/${item.category}`, config)

              const nextWeekDate = new Date(dueDate);
              nextWeekDate.setDate(nextWeekDate.getDate() + 7);

              await axios.post(`${remoteHostURL}/goals`, {
                userId: userId,
                gName: item.gname,
                gDesc: item.gdesc,
                target: item.target,
                dateDue: nextWeekDate.toISOString(),
                category: item.category
              }, config);

              const resp = await axios.get(`${remoteHostURL}/goals/${userId}`, config);
              if (resp?.data?.database) {
                setArray(resp.data.database);
              }
            }
            if(daysDifference == 0 && item.towardsgoal > item.target) {
              const name = localStorage.getItem('name');
              Swal.fire(`I'm sorry ${name}`, `You went over your ${item.gname} goal by $${item.towardsgoal - item.target}. I know you can do better next week!`);

              await axios.delete(`${remoteHostURL}/goals/${userId}/${item.gname}/${item.gdesc}/${item.category}`, config)

              const nextWeekDate = new Date(dueDate);
              nextWeekDate.setDate(nextWeekDate.getDate() + 7);

              await axios.post(`${remoteHostURL}/goals`, {
                userId: userId,
                gName: item.gname,
                gDesc: item.gdesc,
                target: item.target,
                dateDue: nextWeekDate.toISOString(),
                category: item.category
              }, config);

              const resp = await axios.get(`${remoteHostURL}/goals/${userId}`, config);
              if (resp?.data?.database) {
                setArray(resp.data.database);
              }
            }
          })
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
      const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            };
      const res = await axios.post(`${remoteHostURL}/goals`, {
        userId: userId,
        gName: gName,
        gDesc: gDesc,
        target: amount,
        dateDue: deadline,
        category: category
      }, config);

      console.log(res.data);

      const newArray = [...array, res.data.user];
      setArray(newArray);
      console.log(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = (gName, gDesc, category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            };
  
          await axios.delete(`${remoteHostURL}/goals/${userId}/${gName}/${gDesc}/${category}`, config);

          const res = await axios.get(`${remoteHostURL}/goals/${userId}`, config);

          if(res?.data?.database) {
            setArray(res.data.database);
          }
          Swal.fire('Deleted!', 'Your goal has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting goal:', error);
          Swal.fire('Error', 'An error occurred while deleting the goal.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User cancelled
        Swal.fire('Cancelled', 'Your goal is safe :)', 'error');
      }
    });
  };
  

  return (
    <div className="what">
      <ToastContainer/>
      {isConfettiActive && <Confetti wind={0.1} gravity={2} />}
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

        {/* Description Input */}
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

        {/* Amount Input */}
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

        {/* Deadline Input */}
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

        {/* Category Dropdown */}
        <div className="si">
          <label className="ti">Category</label>
          <select
            id="status"
            name="category"
            value={category}
            onChange={(e) => setCat(e.target.value)}
          >
            <option></option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Education">Education</option>
            <option value="Health">Health-Medical</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Personal">Personal Care</option>
            <option value="Debt">Debt-Loans</option>
            <option value="Misc">Miscellaneous</option>
          </select>
        </div>

        {/* Add Button */}
        <button type="submit" className="btn2" onClick={handleSubmit}>
          Add
        </button>
      </div>

      {/* Filter Dropdown */}
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
              <tbody>
                <tr
                  style={{
                    border: "2px solid rgb(4, 57, 94)",
                    backgroundColor:
                      selectedRowIndex === idx ? "lightgray" : "transparent",
                    cursor: "pointer", // Add this line to set the cursor style
                  }}
                  onClick={() => setSelectedRowIndex(selectedRowIndex === idx ? -1 : idx)}
                >
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}>
                    <span>{a.category}</span>
                  </th>
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}>
                    <span>{a.gname}</span>
                  </th>
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}> 
                    <span>{a.gdesc}</span>
                  </th>
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}>
                    <span>${a.target}</span>
                  </th>
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}>
                    <span>{a.datedue.substring(0, a.datedue.indexOf('T'))}</span>
                  </th>
                  <th style={{border: "2px solid rgb(4, 57, 94)"}}> 
                    <span>${a.towardsgoal}</span>
                  </th>
                </tr>
                {selectedRowIndex === idx && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", border: "2px solid rgb(4, 57, 94)" }}>
                      <button type="button" onClick={() => confirmDelete(a.gname, a.gdesc, a.category)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      <br></br>
    </div>
  );
}
