import React, { useEffect, useState } from 'react';

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/orders');
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <div>Product ID: {order.product}</div>
                        <div>Quantity: {order.quantity}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
