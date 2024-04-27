// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Product from './Product';
import Order from './Order';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product" element={<Product />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
}

export default App;
