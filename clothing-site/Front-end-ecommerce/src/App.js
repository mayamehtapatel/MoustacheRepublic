

import React from 'react';
import './styles/globals.css'; // Adjust the path as needed
import Layout from "./components/layout";
import { CartProvider } from './context/CartContext';
import ProductPage from './pages/ProductDetailsPage';

const App = () => {
    return (
        <>
            <CartProvider>
            <Layout>
                <ProductPage/>

               </Layout>
            </CartProvider>
        </>
    );
};

export default App;