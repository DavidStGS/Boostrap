const express = require('express');
const setsController = require('../controllers/Sets');
const app = express();
const { verificarToken } = require('../middlewares/auth');
// const { validateRolMiddleware } = require('../middlewares/validateRol');
// const { permissions } = require('../variables/validateRol');

app.get( '/', verificarToken, async (req, res) => {
    const setsModels = setsController;
    try {
        const response = await setsModels.getSets(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error equipos " + error
        })
    }
});

app.get( '/getset', verificarToken, async (req, res) => {
    const dbSets = setsController;
    try {
        const response = await dbSets.getSetId(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error equipos " + error
        })
    }
});

app.post( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbSets = setsController;
    try {
        const response = await dbSets.createSet(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error equipos " + error
        })
    }
});

app.put( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbSets = setsController;
    try {
        const response = await dbSets.updateSet(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error equipos " + error
        })
    }
});

app.delete( '/', verificarToken, async (req, res) => {
    const dbSets = setsController;
    try {
        const response = await dbSets.deleteSet(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error equipos " + error
        })
    }
});

module.exports = app;