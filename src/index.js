import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './custom.css';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.querySelector('body'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
