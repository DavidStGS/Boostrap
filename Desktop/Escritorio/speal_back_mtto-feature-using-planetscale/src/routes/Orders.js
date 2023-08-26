const express = require('express');
const app = express();
const { verificarToken } = require('../middlewares/auth');
const { typeOrders, statesOrders } = require('../variables/globals');
const ordersController = require('../controllers/Orders');

app.get( '/', verificarToken, async (req, res) => {
    const dbOrders = ordersController;
    try {
        const response = await dbOrders.getOrders(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error ordenes " + error
        })
    }
});

app.post( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbOrders = ordersController;
    try {
        const response = await dbOrders.createOrder(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error ordenes " + error
        })
    }
});

app.put( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbOrders = ordersController;
    try {
        const response = await dbOrders.updateOrder(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error ordenes " + error
        })
    }
});

app.delete( '/', verificarToken, async (req, res) => {
    const dbOrders = ordersController;
    try {
        const response = await dbOrders.deleteOrder(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error ordenes " + error
        })
    }
});

// app.get( '/getorder', verificarToken, async (req, res) => {
//     res.status(200).json({
//         status: true,
//         result: units
//     })    
// });

app.get( '/types', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: typeOrders
    })
});

app.get( '/states', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: statesOrders
    })
});

module.exports = app;