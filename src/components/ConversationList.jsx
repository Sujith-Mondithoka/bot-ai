import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import Sidebar from './sidebar';
import Rating from '@mui/material/Rating';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../assets/image 29.png';
import you from '../assets/you.png';

const PastConversations = () => {
    const { messageHistory, updateMessageHistory, userFeedbacks } = useContext(ChatContext);
    const [filteredConversations, setFilteredConversations] = useState([]);
    const [filterStarRating, setFilterStarRating] = useState('');
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations'));
        if (savedConversations) {
            updateMessageHistory(savedConversations);
        }
    }, [updateMessageHistory]);

    useEffect(() => {
        if (filterStarRating) {
            setFilteredConversations(
                messageHistory.filter(conv => conv.rating === parseFloat(filterStarRating))
            );
        } else {
            setFilteredConversations(messageHistory);
        }
    }, [messageHistory, filterStarRating]);

    const handleClearHistory = () => {
        localStorage.clear();
        updateMessageHistory([]);
        setFilteredConversations([]);
    };

    return (
        <Grid container sx={{ height: '100vh', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)' }}>
            <Sidebar />
            <Grid item xs={12} md={9} lg={10} sx={{ padding: isMobile ? '16px' : '24px', marginLeft: isMobile ? '0' : '25px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4" sx={{ marginBottom: '10px', fontWeight: '700', fontSize: '26px', color: '#9785BA' }}>
                        Conversation History
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <FormControl sx={{ marginBottom: '20px', minWidth: 200 }}>
                        <InputLabel id="rating-filter-label">Rating</InputLabel>
                        <Select
                            labelId="rating-filter-label"
                            id="rating-filter"
                            value={filterStarRating}
                            label="Rating"
                            onChange={(e) => setFilterStarRating(e.target.value)}
                            sx={{ color: 'black', borderRadius: '20px' }}
                        >
                            <MenuItem value=""><em>All</em></MenuItem>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <MenuItem key={rating} value={rating}>{rating}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {filteredConversations.map((conversation, index) => (
                    <Paper key={index} sx={{ padding: '1em', marginBottom: '1em', background: 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)', marginLeft: isMobile ? 0 : 25 }}>
                        {conversation.messages.map((msg, msgIndex) => (
                            <Box key={msgIndex} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                <img 
                                    src={msg.sender === 'user' ? you : logo} 
                                    alt={msg.sender === 'user' ? 'You' : 'Soul AI'} 
                                    style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} 
                                />
                                <Typography variant="body1" sx={{ fontWeight: 'bolder', marginRight: '10px' }}>
                                    {msg.sender === 'user' ? 'You:' : 'Soul AI:'}
                                </Typography>
                                <Typography variant="body1">{msg.text}</Typography>
                            </Box>
                        ))}
                        <Typography variant="body2" color="black" sx={{ mt: 1 }}>Rating:</Typography>
                        <Rating
                            name="text-feedback"
                            value={conversation.rating}
                            readOnly
                            precision={0.5}
                            sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="black">
                            Feedback: {userFeedbacks[index]?.comments || 'No feedback provided'}
                        </Typography>
                    </Paper>
                ))}
            </Grid>
        </Grid>
    );
};

export default PastConversations;


