// src/contexts/ChatContext.js
import React, { createContext, useState, useEffect } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messageHistory, updateMessageHistory] = useState(() => {
        const savedMessages = localStorage.getItem('conversations');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [dialogHistory, setDialogHistory] = useState([]);
    const [userFeedbacks, setUserFeedbacks] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');

    useEffect(() => {
        localStorage.setItem('conversations', JSON.stringify(messageHistory));
    }, [messageHistory]);

    return (
        <ChatContext.Provider value={{ 
            messageHistory, 
            updateMessageHistory, 
            dialogHistory, 
            setDialogHistory, 
            userFeedbacks, 
            setUserFeedbacks, 
            userRating, 
            setUserRating, 
            userComment, 
            setUserComment 
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };


