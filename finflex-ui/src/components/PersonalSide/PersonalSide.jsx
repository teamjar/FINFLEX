import { Link } from 'react-router-dom'
import "./PersonalSide.css"
import { useNavigate } from 'react-router-dom';

function PersonalSide() {
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiredTime');
    nav('/');
  }
  return (
    <div className="side">
      <h2 style={{color:"#031D44", textAlign:"center", fontSize:"30px"}}>FinFlex™</h2>
      <ul>
        <div className='one'>
        <img className='icon' src="https://clipart-library.com/newhp/kissclipart-dashboard-icon-png-clipart-computer-icons-dashboar-dcb8014117ab1ea8.png" />
        <li><Link to="/personal" style={{color:"#031D44"}}>Dashboard</Link></li>
        </div>

        <div className='one'>
        <img className='icon' src="https://static.thenounproject.com/png/371327-200.png"/>
        <li><Link to="/goals" style={{color:"#031D44"}}>My Goals</Link></li>
        </div>

        <div className='one'>
        <img className='icon' src="https://cdn-icons-png.flaticon.com/512/3533/3533887.png" />
        <li><Link to="/bills" style={{color:"#031D44"}}>Bills</Link></li>
        </div>

        <div className='one'>
        <img className='icon2' src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Question_mark_alternate.svg" />
        <li><Link to="/help" style={{color:"#031D44"}}>Ask Help</Link></li>
        </div>


        <div className='one' style={{position:"absolute", bottom:"0"}}>
        <img className='icon3' src="https://static-00.iconduck.com/assets.00/log-out-icon-2048x2048-cru8zabe.png" />
        <li><Link onClick={handleLogOut} to="/" style={{color:"#031D44"}}>Log Out</Link></li>
        </div>

      </ul>
    </div>
  );
}

export default PersonalSide;

