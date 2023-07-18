import "./LandingPage.css"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => { 
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }
//
    return (
        <div className = 'landing-page'>
            <div className ='container'>
                <div className = 'info'> 
                    <h1 style={{fontSize:"150px"}}>FinFlex</h1>
                    <h2> <span>Empower Your Finances with FinFlex: Flexibility for Financial Success!</span></h2>
                    <p style={{marginLeft:"120px", marginRight:"120px"}}>Welcome to FinFlex, your trusted financial application designed with your needs in mind. Created by a talented team of four junior developers hailing from the bustling streets of New York City, we are passionate about empowering individuals to take control of their financial well-being. At FinFlex, we understand that managing your finances can be a daunting task. That's why we have developed a user-friendly platform that combines simplicity with powerful features, ensuring a seamless experience for all users. Whether you're tracking expenses, setting budgets, viewing your stocks, or planning for the future, our application provides the tools and insights you need to make informed decisions. Let us help you achieve your goals, one step at a time.</p>
                    <button className="get-started-button" onClick={handleClick}>Get Started</button>
                </div>
            </div> 
        </div>
    )
}

export default LandingPage


