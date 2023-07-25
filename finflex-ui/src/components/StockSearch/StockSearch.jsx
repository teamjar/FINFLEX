// import React, { useState } from "react";
// import { searchSymbol } from "../api/stock-api";
// import SearchResults from "../SearchResults/SearchResults";


// const StockSearch = () => {

//   const [input, setInput] = useState("");
//   const [bestMatches, setBestMatches] = useState([]);

//   const updateBestMatches = async () => {
//     try {
//       if (input) {
//         const searchResults = await searchSymbol(input);
//         const result = searchResults.result;
//         setBestMatches(result);
//       }
//     } catch (error) {
//       setBestMatches([]);
//       console.log(error);
//     }
//   };

//   const clear = () => {
//     setInput("");
//     setBestMatches([]);
//   };

//   return (
//     <div className="top">
//       <div className="welcome">
//         <h2 style={{color:"#031D44"}}>Hello, Hardcoded Name</h2>
//       </div>
//       <div className="top1">
//         <div className="search-bar">
//           <input 
//             type="text" 
//             value={input}
//             className="enter" 
//             placeholder="Search for transactions and more" 
//             onChange={(event) => setInput(event.target.value)}
//             onKeyPress={(event) => {
//               if (event.key === "Enter") {
//                 updateBestMatches();
//               }
//             }}
//           />
//           {input && (
//             // <button onClick={clear} className="btn">
//             //   <XIcon className="h-4 w-4 fill-gray-500" />
//             // </button>
//             <button type="submit" onClick={clear} className="btn"> X </button>
//           )}
//           <button type="submit" onClick={updateBestMatches} className="btn"> Search </button>
//         </div>
//         <div className="pic2">
//           <img style={{width:"40px", marginLeft:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" />
//         </div>
//         <div className="pic2">
//           <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
//         </div>
//       </div>
//       {input && bestMatches.length > 0 ? (
//         <SearchResults results={bestMatches} />
//       ) : null}
//     </div>
//   );
// };

// export default StockSearch;


import React, { useState, useEffect, useRef } from "react";
import { searchSymbol } from "../api/stock-api";
import SearchResults from "../SearchResults/SearchResults";

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
        <h2 style={{color:"#031D44"}}>Hello, </h2>
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
          {input && (
            // <button onClick={clear} className="btn">
            //   <XIcon className="h-4 w-4 fill-gray-500" />
            // </button>
            <button type="submit" onClick={clear} className="btn">Clear</button>
          )}
          <button type="submit" onClick={updateBestMatches} className="btn">Search</button>
        </div>
        <div className="pic2">
          <img style={{width:"40px", marginLeft:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" />
        </div>
        <div className="pic2">
          <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
        </div>
      </div>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
};

export default StockSearch;
