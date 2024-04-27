// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Product from './Product';
import Order from './Order';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
