const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        //if (docs.length >= 0) {
        res.status(200).json(response);
        //} else {
            //res.status(404).json({
                //message: 'No entries found'
            //});
        //}
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                });
            } else {
                res.status(404).json({message: 'No Valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

//router.patch('/:productId', (req, res, next) => {
    //res.status(200).json({
        //message: 'Updated Product!'
    //});
//});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true})
      .then(result => { 
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
        }
      });
    })
      .catch(err => res.status(500).json({ error: err}))
  })

router.delete('/:productId', (req, res, next) => {
    id = req.params.productId;

    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log();
            if (result.deletedCount > 0) {
                res.status(200).json({ 
                    message: "Product Deleted Successfully",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                    body: { name: 'String', price: 'Number' }
                }
                });
            } else
                res.status(500).json({ error: "No ID Found" });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});


module.exports = router;