import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { PrismicProvider } from '@prismicio/react'
import { client } from './prismic'
import { CartProvider } from './store/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrismicProvider client={client}>
        <CartProvider>
            <App />
        </CartProvider>
    </PrismicProvider>
);

