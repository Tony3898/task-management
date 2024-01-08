import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import Theme from './components/wrapper/theme.tsx';
import {ToastContainer} from "react-toastify";
import AppContainer from "./routes";
import "./style/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <AppContainer/>
            <ToastContainer/>
        </ThemeProvider>
    </React.StrictMode>,
);