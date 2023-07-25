import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function PersonalSide() {
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem('userId');
    nav('/');
  }

  return (
    <div className="side">
      <h2 style={{color:"#031D44", textAlign:"center", fontSize:"30px"}}>FinFlex™</h2>
      <ul>
        <div className='one'>
        <img className='icon' src="https://clipart-library.com/newhp/kissclipart-dashboard-icon-png-clipart-computer-icons-dashboar-dcb8014117ab1ea8.png" />
        <li><Link to="/stocks" style={{color:"#031D44"}}>Dashboard</Link></li>
        </div>

        <div className='one'>
        <img className='icon' src="https://www.pngarts.com/files/17/Finance-Silhouette-PNG-Picture.png"/>
        <li><Link to="/mystocks" style={{color:"#031D44"}}>My Stocks</Link></li>
        </div>

        <div className='one'>
        <img className='icon' src="https://cdn-icons-png.flaticon.com/128/1118/1118301.png" />
        <li><Link to="/watch" style={{color:"#031D44"}}>Watch List</Link></li>
        </div>

        <div className='one' style={{position:"absolute", bottom:"0"}}>
        <img className='icon3' src="https://static-00.iconduck.com/assets.00/log-out-icon-2048x2048-cru8zabe.png" />
        <li><Link onClick={handleLogOut} to={'/'}  style={{color:"#031D44"}}>Log Out</Link></li>
        </div>

      </ul>
    </div>
  );
}

export default PersonalSide;
