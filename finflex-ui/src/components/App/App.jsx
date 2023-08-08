import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import PersonalDashboard from '../PersonalDashboard/PersonalDashboard'
import Goals from '../Goals/Goals'
import Bills from '../Bills/Bills'
import Help from '../Help/Help'
import StockDashboard from '../StockDashboard/StockDashboard'
import StockDetails from '../StockDetails/StockDetails'
import BuyStockPage from '../BuyStockPage/BuyStockPage'
import OnboardPage from '../OnboardPage/OnboardPage'
import OnboardPage2 from '../OnboardPage2/OnboardPage2'
import OnboardPage3 from '../OnboardPage3/OnboardPage3'
//import NewsFeed from '../NewsFeed/NewsFeed'
import NewsPage from '../NewsPage/NewsPage'
import { QueryClient, QueryClientProvider } from "react-query"
import Watchlist from '../WatchList/WatchList.jsx'
import { useEffect } from 'react'
import { remoteHostURL } from '../../apiClient'
import axios from 'axios';
import HelpChat from '../../HelpChat/HelpChat'
import Swal from 'sweetalert2'

const queryClient = new QueryClient();

function App() {
  useEffect (() => {
    const first = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const userId = localStorage.getItem('userId');
      const expenses = await axios.get(`${remoteHostURL}/expenses/${userId}`, config);
      for(const ex in expenses.data.database) {
        const res = await axios.get(`${remoteHostURL}/expense/spent/${expenses.data.database[ex].category}/${userId}`, config);
        if(res?.data?.database) {
          const response = await axios.put(`${remoteHostURL}/goals`, {
            userId: userId,
            category: expenses.data.database[ex].category,
            towardsGoal: res.data.database[0].sum
          }, config)
        }
      }
    }

    first();

  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <div className='back'>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/personal" element={<PersonalDashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/help" element={<Help />} />
            <Route path="/stocks" element={<StockDashboard />} />
            <Route path="/stock-details/:symbol" element={<StockDetails />} />
            <Route path="/stock-details/:symbol/buy" element={<BuyStockPage />} /> 
            <Route path="/onboard" element={<OnboardPage />} />
            <Route path="/onboard/2" element={<OnboardPage2 />} />
            <Route path="/onboard/3" element={<OnboardPage3 />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/help-chat" element={<HelpChat/>} />


          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App;

// useEffect(() => {
//   const checkTokenExpiration = () => {
//     const token = localStorage.getItem('token');
//     const expirationTime = localStorage.getItem('expiredTime');

//     if (token && expirationTime) {
//       const currentTime = Date.now();
//       const expirationTimestamp = parseInt(expirationTime, 10);

//       if (currentTime > expirationTimestamp) {
//         Swal.fire({
//           title: 'Token Expired',
//           text: 'Your session has expired. Please log in again.',
//           icon: 'warning',
//           confirmButtonColor: '#3085d6',
//           confirmButtonText: 'OK',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate('/');
//           }
//         });
//       }
//     } else {
//       navigate('/');
//     }
//   };

//   checkTokenExpiration();

//   const interval = setInterval(checkTokenExpiration, 30000);

//   return () => clearInterval(interval);
// }, [navigate])
