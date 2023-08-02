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
import NewsFeed from '../NewsFeed/NewsFeed'
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();

function App() {
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
            <Route path="/news" element={<NewsFeed />} />

          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App
