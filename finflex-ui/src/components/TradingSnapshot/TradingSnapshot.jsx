import React, { useEffect } from 'react';

const TradingSnapshot = () => {

    useEffect(() => {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        scriptElement.async = true;
        scriptElement.innerHTML = JSON.stringify({
            "feedMode": "all_symbols",
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "regular",
            "width": "400",
            "height": "660",
            "locale": "en"
        });
        document.getElementsByClassName('trading-snapshot-container__widget')[0].appendChild(scriptElement);
    }, []);

    return (
        <div className="trading-snapshot-container">
            <div className="trading-snapshot-container__widget"></div>
        </div>
    );
}

export default TradingSnapshot;
