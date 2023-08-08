import "./BillCreation.css";
import { useEffect, useState } from "react";
import { remoteHostURL } from "../../apiClient";
import axios from "axios";
import BillDetail from '../BillDetail/BillDetail';
import Swal from "sweetalert2";

export default function BillCreation({ searchQuery }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [due, setDue] = useState('');
  const [status, setStatus] = useState('');
  const [array, setArray] = useState([]);

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

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
  
          await axios.delete(`${remoteHostURL}/goals/${userId}/${bName}/${bDesc}`, config);

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
      {array
        .filter(
          (a) =>
            a.billname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.billdesc.toLowerCase().includes(searchQuery.toLowerCase())
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
