
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { MdBrightness4 } from "react-icons/md";
import { MdBrightness7 } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeToggle = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit" sx={{display:'flex', marginLeft:'auto',}} >
                {darkMode ? <MdBrightness7 /> : <MdBrightness4 />}
            </IconButton>
            {children}
        </ThemeProvider>
    );
};

export default ThemeToggle;


