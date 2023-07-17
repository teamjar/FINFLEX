import "./LandingPage.css"

const LandingPage = () => { 
    return (
        <div className = 'landing-page'>
            <div className ='container'>
                <div className = 'info'> 
                    <h1 style={{fontSize:"150px"}}>FinFlex</h1>
                    <h2> <span>Cute tagline </span></h2>
                    <p> Lorem ipsum dolor sit amet, consec tetur adipisicing elit.
                        Architecto iure fuga deleniti sit! Cum doloribus, nesciunt
                        laboriosam eos praesentium veritatis</p>
                    <button className="get-started-button">Get Started</button>
                </div>
            </div> 
        </div>
    )
}

export default LandingPage
