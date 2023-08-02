import React, { useEffect } from 'react';
import Card from '../Card/Card';

const MarketOverview = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "title": "Stocks",
            "tabs": [
                {
                    "title": "Financial",
                    "symbols": [
                        {
                            "s": "NYSE:JPM",
                            "d": "JPMorgan Chase"
                        },
                        {
                            "s": "NYSE:WFC",
                            "d": "Wells Fargo Co New"
                        },
                        {
                            "s": "NYSE:BAC",
                            "d": "Bank Amer Corp"
                        },
                        {
                            "s": "NYSE:HSBC",
                            "d": "Hsbc Hldgs Plc"
                        },
                        {
                            "s": "NYSE:C",
                            "d": "Citigroup Inc"
                        },
                        {
                            "s": "NYSE:MA",
                            "d": "Mastercard Incorporated"
                        }
                    ]
                },
                {
                    "title": "Technology",
                    "symbols": [
                        {
                            "s": "NASDAQ:AAPL",
                            "d": "Apple"
                        },
                        {
                            "s": "NASDAQ:GOOGL",
                            "d": "Alphabet"
                        },
                        {
                            "s": "NASDAQ:MSFT",
                            "d": "Microsoft"
                        },
                        {
                            "s": "NASDAQ:FB",
                            "d": "Meta Platforms"
                        },
                        {
                            "s": "NYSE:ORCL",
                            "d": "Oracle Corp"
                        },
                        {
                            "s": "NASDAQ:INTC",
                            "d": "Intel Corp"
                        }
                    ]
                },
                {
                    "title": "Services",
                    "symbols": [
                        {
                            "s": "NASDAQ:AMZN",
                            "d": "Amazon"
                        },
                        {
                            "s": "NYSE:BABA",
                            "d": "Alibaba Group Hldg Ltd"
                        },
                        {
                            "s": "NYSE:T",
                            "d": "At&t Inc"
                        },
                        {
                            "s": "NYSE:WMT",
                            "d": "Walmart"
                        },
                        {
                            "s": "NYSE:V",
                            "d": "Visa"
                        }
                    ]
                }
            ],
            "width": 400,
            "height": 500,
            "showChart": true,
            "showFloatingTooltip": false,
            "locale": "en",
            "plotLineColorGrowing": "#2962FF",
            "plotLineColorFalling": "#2962FF",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(120, 123, 134, 1)",
            "showSymbolLogo": true,
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "colorTheme": "light"
        });

        const container = document.querySelector('.market-overview-container__widget');
        container.appendChild(script);

        script.onerror = () => {
            console.error('Failed to load TradingView script');
        };

        return () => {
            if (container.contains(script)) {
                container.removeChild(script);
            }
        };
        
    }, []);  

    return (
        <Card className="card-container">
            <div className="market-overview-container">
                {/* <h2 style={{color: 'black'}}>Market Overview</h2> */}
                <h2 style={{color: 'black', textAlign: 'center'}}>Market Overview</h2>
                <div className="market-overview-container__widget"></div>
             </div>

        </Card>
        
    );
};

export default MarketOverview;
