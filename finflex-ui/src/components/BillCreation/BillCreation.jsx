import "./BillCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import BillDetail from '../BillDetail/BillDetail';
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';

export default function BillCreation({ searchQuery }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [due, setDue] = useState('');
  const [status, setStatus] = useState('');
  const [array, setArray] = useState([]);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  useEffect(() => {
    const handleNotPaidClick = () => {
      toast.dismiss();
    }

    const handlePaidClick = async (item) => {
      const name = localStorage.getItem('name');
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
      await axios.delete(`${remoteHostURL}/bills/${userId}/${item.billname}/${item.billdesc}`, config)
      .then(
        await axios.delete(`${remoteHostURL}/goals/${userId}/${item.billname}/${item.billdesc}/Bill`, config)
      );
      setIsConfettiActive(true);
      Swal.fire(`Congratulations ${name}!`, `You paid your bill! Keep up the good work!`);
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 4000);

      const res = await axios.get(`${remoteHostURL}/bills/${userId}`, config);
        
      if (res?.data?.database) {
        setArray(res.data.database);
      }

      const date = new Date(item.due);
      const nextMonthDate = new Date(date);
      nextMonthDate.setMonth(date.getMonth() + 1);

      const newBill = {
        userId: userId,
        billName: item.billname,
        billDesc: item.billdesc,
        due: nextMonthDate.toISOString(),
        status: "Unpaid",
        price: item.price
      };

      const newGoal = {
        userId: userId,
        gName: item.billname,
        gDesc: item.billdesc,
        target: item.price,
        dateDue: nextMonthDate.toISOString(),
        category: "Bill",
        
      }

      await axios.post(`${remoteHostURL}/bills`, newBill, config).then(
      await axios.post(`${remoteHostURL}/goals`, newGoal, config)
      ).then(axios.post(`${remoteHostURL}/expenses`, {
        userId: userId,
        pName: item.billname,
        pDesc: item.billdesc,
        pPrice: item.price,
        pDate: item.due,
        category: "Bill"
      }, config));

      const resp = await axios.get(`${remoteHostURL}/bills/${userId}`, config);

      if (resp?.data?.database) {
        setArray(resp.data.database);
      }

      toast.dismiss();
    }

    const authUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        };
        const res = await axios.get(`${remoteHostURL}/bills/${userId}`, config);
        
        if (res?.data?.database) {
          setArray(res.data.database);
          
          res.data.database.forEach(item => {
            const dueDate = new Date(item.due);
            const currentDate = new Date();
            const timeDifference = dueDate.getTime() - currentDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference <= 3) {
              toast.info(
                `Due date is approaching for ${item.billname} in ${daysDifference} days!`,
                { 
                  autoClose: false, 
                  closeOnClick: false,
                  closeButton: (
                    <div>
                      <button
                        onClick={() => handlePaidClick(item)}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleNotPaidClick()}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        Not Yet
                      </button>
                    </div>
                  )
                }
              );
            } else if (daysDifference < 0) {
              toast.info(
                `Due date is overdue for ${item.billname}!`,
                { 
                  autoClose: false, 
                  closeOnClick: false,
                  closeButton: (
                    <div>
                      <button
                        onClick={() => handlePaidClick(item)}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleNotPaidClick()}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        Not Yet
                      </button>
                    </div>
                  )
                }
              );
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    authUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            };
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${remoteHostURL}/bills`, {
        userId: userId,
        billName: name,
        billDesc: desc,
        due: due,
        status: status,
        price: price
      }, config);

      await axios.post(`${remoteHostURL}/goals`, {
        userId: userId,
        gName: name,
        gDesc: desc,
        target: price,
        dateDue: due,
        category: "Bill"
      }, config)

      console.log(res.data);

      const newArray = [...array, res.data.user];
      setArray(newArray);
    } catch (err) {
      console.log(err);
    }
  }

  const confirmDelete = (bName, bDesc) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Did you pay it or do you wish to simply remove it?',
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
  
          await axios.delete(`${remoteHostURL}/bills/${userId}/${bName}/${bDesc}`, config)
          .then(
            await axios.delete(`${remoteHostURL}/goals/${userId}/${bName}/${bDesc}/Bill`, config)
          );

          const res = await axios.get(`${remoteHostURL}/bills/${userId}`, config);

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
            <option></option>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <button type="submit" className="btn2" onClick={handleSubmit}>
          Add
        </button>
      </div>
      <BillDetail />
      {isConfettiActive && <Confetti wind={0.1} gravity={2} />}
      {array
        .filter(
          (a) =>
            a.billname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.billdesc?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((a, idx) => (
          <div key={idx}>
            <table>
              <tbody>
                <tr
                  style={{
                    border: "2px solid #dab785",
                    backgroundColor:
                      selectedRowIndex === idx ? "lightgray" : "transparent",
                  }}
                  onClick={() => setSelectedRowIndex(selectedRowIndex === idx ? -1 : idx)}
                >
                  <th style={{ border: "2px solid #dab785" }}><span>{a.status}</span></th>
                  <th style={{ border: "2px solid #dab785" }}><span>{a.billname}</span></th>
                  <th style={{ border: "2px solid #dab785" }}><span>{a.billdesc}</span></th>
                  <th style={{ border: "2px solid #dab785" }}><span>${a.price}</span></th>
                  <th style={{ border: "2px solid #dab785" }}><span>{a.due.substring(0, a.due.indexOf('T'))}</span></th>
                  <th style={{ border: "2px solid #dab785" }}><span>${a.towardsbill}</span></th>
                </tr>

                {selectedRowIndex === idx && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", border: "2px solid #dab785" }}>
                      <button type="button" onClick={() => confirmDelete(a.billname, a.billdesc)}>
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
