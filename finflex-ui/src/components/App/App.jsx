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
import WelcomeOnboard from '../WelcomeOnboard/WelcomeOnboard'
import PerosnalOnboard from '../PersonalOnboard/PerosnalOnbaord'
import StockOnboard from '../StockOnboard/StockOnboard'
import { BalanceProvider } from '../../Context/BalanceContext';


const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const updateGoalsForWeeklyExpenses = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const userId = localStorage.getItem('userId');
  
      // Fetch the goals with due dates
      const goalsResponse = await axios.get(`${remoteHostURL}/goals/${userId}`, config);
      const goals = goalsResponse?.data?.database || [];
  
      const expenses = await axios.get(`${remoteHostURL}/expenses/${userId}`, config);
  
      for (const ex in expenses.data.database) {
        const expenseDate = new Date(expenses.data.database[ex].pdate);
  
        for (const goal of goals) {
          const goalDueDate = new Date(goal.datedue);
  
          // Check if the expense is within 7 days before the goal's due date
          const oneWeekBeforeGoal = new Date(goalDueDate);
          oneWeekBeforeGoal.setDate(oneWeekBeforeGoal.getDate() - 7);
          console.log(expenses.data.database[ex].pname, expenseDate >= oneWeekBeforeGoal && expenseDate <= goalDueDate, expenseDate);
          
          if (expenseDate >= oneWeekBeforeGoal && expenseDate <= goalDueDate && expenses.data.database[ex].category !== 'Bill') {
            const res = await axios.get(
              `${remoteHostURL}/expense/spent/${expenses.data.database[ex].category}/${userId}/${expenseDate.toISOString()}/${goalDueDate.toISOString()}`,
              config
            );
  
            if (res?.data?.database) {
              await axios.put(
                `${remoteHostURL}/goals`,
                {
                  userId: userId,
                  category: expenses.data.database[ex].category,
                  towardsGoal: res.data.database[0].sum
                },
                config
              );
            }
          }
        }
      }
    };
  
    updateGoalsForWeeklyExpenses();
  }, []);
  
  
  return (
    <BalanceProvider>
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
            <Route path="/onboard/financials" element={<OnboardPage />} />
            <Route path="/onboard/goals" element={<OnboardPage2 />} />
            <Route path="/onboard/bills" element={<OnboardPage3 />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/help-chat" element={<HelpChat/>} />
            <Route path="/welcome-onboard" element={<WelcomeOnboard/>} />
            <Route path="/personal-onboard" element={<PerosnalOnboard/>} />
            <Route path="/stock-onboard" element={<StockOnboard/>} />


          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
    </BalanceProvider>
  )
}

export default App;

