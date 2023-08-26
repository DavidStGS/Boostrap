const express = require('express');
const itemsController = require('../controllers/Items');
const app = express();
const { verificarToken } = require('../middlewares/auth');
const { stateItems } = require('../variables/globals');

app.get( '/', verificarToken, async (req, res) => {
    const dbItems = itemsController;
    try {
        const response = await dbItems.getItems(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error items " + error
        })
    }
});

app.post( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbItems = itemsController;
    try {
        const response = await dbItems.createItem(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error items " + error
        })
    }
});

app.put( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbItems = itemsController;
    try {
        const response = await dbItems.updateItem(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error items " + error
        })
    }
});

app.delete( '/', verificarToken, async (req, res) => {
    const dbItems = itemsController;
    try {
        const response = await dbItems.deleteItem(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error items " + error
        })
    }
});

app.get( '/states', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: stateItems
    })
});

module.exports = app;