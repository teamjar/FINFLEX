import "./Goals.css"
import Navbar from '../Navbar/Navbar'
import PersonalSide from "../PersonalSide/PersonalSide"
import Budget from "../Budget/Budget"
import GoalCreation from "../GoalCreation/GoalCreation"

const Goals = () => {
    const name = localStorage.getItem('name');

    return (
        <div className="personal">
            <div className="random">
            <PersonalSide />
            </div>
            <div className="plz">
            <Navbar />
        <div className="top">
            <div className="welcome">
            <h2 style={{color:"#031D44"}}>View Your Goals, {name}</h2>
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
        <div className="tiles">
        <h1 className="bruh">Ready, Set, Goal!</h1>
        <h3 style={{color:"white"}}>Financial goal setting and management for higher achievers.</h3>
        </div>

        
        
        <h2 style={{color:"#031D44", margin:"15px", padding:"15px"}} className="head"><span>Set a Weekly Budget:</span></h2>
        <div style={{backgroundColor:"#F2EFE9"}}>
        <Budget />
        <hr style={{marginTop:"30px"}}></hr>
        <h2 style={{color:"#031D44", margin:"15px", padding:"15px"}} className="head"><span>Create Your Goals:</span></h2>
        <GoalCreation />

    
            
        </div>

        </div>
    </div>
    )
 }

 export default Goals;