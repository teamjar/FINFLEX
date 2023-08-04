import React, { useState, useEffect, useRef } from "react";
import { searchSymbol } from "../api/stock-api";
import SearchResults from "../SearchResults/SearchResults";
import "./StockSearch.css"

const useDebouncedEffect = (effect, delay, deps) => {
  const callback = useRef();

  useEffect(() => {
    callback.current = effect;
  }, [effect]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback.current();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps || [], delay]);
};

const StockSearch = () => {

  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const name = localStorage.getItem('name');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useDebouncedEffect(() => {
    updateBestMatches();
  }, 500, [input]);

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      } else {
        setBestMatches([]);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  return (
    <div className="top">
            <div className="welcome">
        <h2 style={{color:"#031D44"}}>Hello, {name}</h2>
      </div>
      <div className="top1">
        <div className="search-bar">
          <input 
            type="text" 
            value={input}
            className="enter" 
            placeholder="Search for stocks" 
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                updateBestMatches();
              }
            }}
          />
          
          <button type="submit" onClick={updateBestMatches} className="btn">Search</button>
        </div>
        <div className="pic2">
              <img
                style={{
                  width: "40px",
                  marginLeft: "10px",
                  padding: "10px",
                  cursor: "pointer",
                }}
                src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
                alt="Icon 1"
                onClick={openModal}
              />
            </div>
        <div className="pic2">
          <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
        </div>
      </div>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}

{showModal && (
      <div className="clock">
        <div className="modal2">
          <div className="modal-content2">
            <span onClick={closeModal} className="close-button2">
            ✕</span>
            <h2 style={{color:"black", fontSize:"30px", textAlign:"center", backgroundColor:"whitesmoke"}}>View Your Notification Center</h2>
   
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

export default StockSearch;
