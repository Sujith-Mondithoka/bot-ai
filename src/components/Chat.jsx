import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import FeedbackForm from './FeedbackForm';
import aiResponses from '../data/aiResponses.json';
import { Button, TextField, Typography, Paper, IconButton, Box, Rating, Grid } from '@mui/material';
import Sidebar from './sidebar';
import logo from '../assets/image 29.png';
import you from '../assets/you.png';
import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeToggle from "./ThemeToggle";

const ChatComponent = () => {
    const { messageHistory, updateMessageHistory } = useContext(ChatContext);
    const [userInput, setUserInput] = useState('');
    const [dialogHistory, setDialogHistory] = useState([]);
    const [feedbackIndex, setFeedbackIndex] = useState(null);
    const [userFeedbacks, setUserFeedbacks] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const storedConversations = JSON.parse(localStorage.getItem('messageHistory'));
        if (storedConversations) {
            updateMessageHistory(storedConversations);
        }
    }, [updateMessageHistory]);

    const getResponse = (query) => {
        const matchedResponse = aiResponses.find(item => item.question.toLowerCase() === query.toLowerCase());
        return matchedResponse ? matchedResponse.response : "I don’t understand.";
    };

    const handleSendMessage = () => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageFromUser = { sender: 'user', text: userInput, time: currentTime };
        const messageFromAI = { sender: 'ai', text: getResponse(userInput), time: currentTime };
        const updatedDialog = [...dialogHistory, messageFromUser, messageFromAI];
        setDialogHistory(updatedDialog);
        setUserInput('');
    };

    const handleUserFeedback = (index, feedback) => {
        const updatedFeedbacks = [...userFeedbacks];
        updatedFeedbacks[index] = feedback;
        setUserFeedbacks(updatedFeedbacks);
    };

    const handleFeedbackFormOpen = (index) => {
        setFeedbackIndex(index);
    };

    const handleFeedbackFormClose = () => {
        setFeedbackIndex(null);
    };

    const handleSaveDialog = (onSave) => {
        console.log(onSave)
        const updatedConversations = [...messageHistory, { messages: dialogHistory, rating: userRating, comment: onSave }];
        updateMessageHistory(updatedConversations);
        localStorage.setItem('messageHistory', JSON.stringify(updatedConversations));
    };

    return (
        <Grid container sx={{ height: '100vh', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)' }}>
            <Sidebar />
            <Grid item xs={12} md={9} lg={10} sx={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '700', fontSize: '26px', color: '#9785BA', marginTop: '25px', textAlign: 'left', marginLeft: isMobile ? 0 : 30 }}>
                    Bot AI
                </Typography>
                <Box sx={{ flex: 1, overflowY: 'auto', paddingBottom: '120px', marginLeft: isMobile ? 0 : 30 }}>
                    {dialogHistory.map((msg, index) => (
                        <Box key={index} sx={{ width: '100%', mb: 1 }}>
                            <Paper sx={{ p: 2, background: '#D7C7F421', width: isMobile ? '90%' : '95%', marginLeft: isMobile ? '5%' : '2.5%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={msg.sender === 'user' ? you : logo} alt="" style={{ marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{msg.sender === 'user' ? 'You' : 'Soul AI'}:</Typography>
                                        <Typography variant="body1">{msg.text}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="caption" sx={{ display: 'block' }}>{msg.time}</Typography>
                                            {msg.sender === 'ai' && (
                                                <>
                                                    <IconButton color="primary" onClick={() => handleUserFeedback(index, 'thumbs-up')}>
                                                        <IoMdThumbsUp color="grey" />
                                                    </IconButton>
                                                    <IconButton color="primary" onClick={() => handleFeedbackFormOpen(index)}>
                                                        <IoMdThumbsDown color="grey" />
                                                    </IconButton>
                                                </>
                                            )}
                                        </Box>
                                        {userFeedbacks[index] === 'thumbs-up' && (
                                            <Typography variant="body2" color="primary">
                                                <Rating
                                                    name="userRating"
                                                    value={userRating}
                                                    onChange={(e, newValue) => setUserRating(newValue)}
                                                />
                                            </Typography>
                                        )}
                                        {feedbackIndex === index && (
                                            <FeedbackForm
                                                open={feedbackIndex !== null}
                                                handleClose={handleFeedbackFormClose}
                                                onSave={handleSaveDialog}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ position: 'fixed', bottom: 0, left: isMobile ? 0 : 240, width: isMobile ? '100%' : `calc(100% - ${240}px)`, backgroundColor: '#fff', padding: '10px', boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        fullWidth
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        sx={{ width: '70%', backgroundColor: '#fff', borderRadius: '4px' }}
                    />
                    <Button variant="contained" sx={{ margin: '10px', padding: '10px', backgroundColor: '#D7C7F4', color: 'black', minWidth: isMobile ? '10%' : '15%' }} onClick={handleSendMessage}>
                        Ask
                    </Button>
                    <Button variant="contained" sx={{ margin: '10px', padding: '10px', backgroundColor: '#D7C7F4', color: 'black', minWidth: isMobile ? '10%' : '15%' }} onClick={() => handleSaveDialog(userComment)}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ChatComponent;

