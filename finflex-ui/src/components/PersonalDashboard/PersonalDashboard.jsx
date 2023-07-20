import "./PersonalDashboard.css"
import Navbar from '../Navbar/Navbar'
import InfoTile from "../InfoTile/InfoTile"
import PersonalSide from "../PersonalSide/PersonalSide"
import Expense from "../Expense/Expense"
import ExpenseDetail from "../ExpenseDetail/ExpenseDetail"


const PersonalDashboard = () => {
    return (
        <div className="personal">
            <div className="random">
            <PersonalSide />
            </div>
            <div className="plz">
            <Navbar />
        <div className="top">
            <div className="welcome">
            <h2 style={{color:"#031D44"}}>Hello, Hardcoded Name</h2>
            </div>
            
            <div className="top1">
            <div className="search-bar">
                <input type="text" className="enter" placeholder="Search for transactions and more" />
                <button type="submit" className="btn">Search</button>
            </div>
            <div className="pic2">
            <img style={{width:"40px", marginLeft:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" />
            </div>
            <div className="pic2">
            <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
            </div>
            </div>
        </div>
        <InfoTile />

       <h2 style={{color:"#031D44", margin:"15px", padding:"15px"}} className="head"><span>Expenses and Purchases</span></h2>
       <Expense />
        <ExpenseDetail />
        
        <div className="personal2">
       
        </div>

        </div>
    </div>
    )
 }

 export default PersonalDashboard;