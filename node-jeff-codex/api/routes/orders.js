const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Order = require('../models/order');
const Product = require('../models/product');

const OrdersController = require ('../controllers/order');

//Handle incoming Get requests to /orders
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order );

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;


  //  Order.deleteOne({ _id: id })
//    .exec()
//    .then(result => {
//        res.status(200).json({
     //       message: 'Order deleted',
     //       request: {
    //            type:'POST',
   //             url: 'http://localhost:3000/orders/',
   //             body: { productId: "ID", quantity: "Number" }
           // }
        //});
   // })