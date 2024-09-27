// src/contexts/FeedbackContext.js
import React, { createContext, useState } from "react";

const FeedbackContext = createContext();

const FeedbackProvider = ({ children }) => {
  const [userFeedback, setUserFeedback] = useState([]);

  return (
    <FeedbackContext.Provider value={{ userFeedback, setUserFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
export { FeedbackContext, FeedbackProvider };
