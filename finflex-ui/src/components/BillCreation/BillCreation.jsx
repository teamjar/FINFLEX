
import "./BillCreation.css"

export default function BillCreation() {
  return (
    <div className="add-transaction">
      <BillCreationForm />
    </div>
  )
}

export function BillCreationForm() {
  return (
    <div>
    <div className="flow">

    <div className="si"> 
      <label className="ti">Bill Name</label>
      <input className="el" placeholder="Enter the associated bill name"/>
    </div>

    <div className="si"> 
        <label className="ti">Pay Description</label>
          <input className="el" placeholder="Enter a description of payment"/>
    </div>

    <div className="si"> 
        <label className="ti">Price</label>
          <input className="el" placeholder="Enter the necessary total"/>
    </div>

    <div className="si"> 
        <label className="ti">Due Date</label>
          <input className="el" type="datetime-local" placeholder="Enter a deadline"/>
    </div>

    <div className="si"> 
        <label className="ti">Status</label>
    <select id="status" name="status">
        <option value="unpaid">Unpaid</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
  </select>
    </div>
    <button type="submit" className="btn2">Add</button>
    </div>
    </div>
  )
}