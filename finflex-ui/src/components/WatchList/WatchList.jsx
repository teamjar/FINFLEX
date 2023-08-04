// TradingViewWidget.jsx

import StockSide from '../StockSide/StockSide';

import React, { useEffect, useRef } from 'react';
import Navbar2 from '../Navbar2/Navbar2';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_18b9e') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: 1200,
            height: 900,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            watchlist: ["NYSE:JPM","NYSE:WFC","NYSE:BAC","NYSE:HSBC","NYSE:C"],
            container_id: "tradingview_18b9e"
          });
        }
      }
    },
    []
  );

  return (


    <div className='tradingview-widget-container'>
    <div className='plz'>
      
      <div className="Navbar">
        <Navbar2 />
       </div>
       <br></br>
      <div id='tradingview_18b9e' />
      <br></br>
      <div className="StockSide">
          <StockSide />
        </div>
        
        </div>
    </div>



  );
}
