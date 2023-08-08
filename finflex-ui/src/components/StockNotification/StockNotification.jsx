import React, { useEffect, useState } from "react";
import axios from "axios";

const StockNotification = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Define an async function
    const getNotification = async () => {
      try {
        const gptResponse = await axios.post("/api/notification", {
          engine: "text-davinci-002",
          prompt: "Generate a notification about the latest stock market trend for a user.",
          max_tokens: 60,
        });
        
        // Set the response text to state
        setNotification(gptResponse.data.choices[0].text.trim());
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function
    getNotification();
  }, []);

  return <div>{notification}</div>;
};

export default StockNotification;
