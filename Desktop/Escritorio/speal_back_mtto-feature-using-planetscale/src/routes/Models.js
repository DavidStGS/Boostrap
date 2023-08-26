const express = require('express');
const modelsController = require('../controllers/Models');
const app = express();
const { verificarToken } = require('../middlewares/auth');
// const { validateRolMiddleware } = require('../middlewares/validateRol');
const { units } = require('../variables/globals');
// const { permissions } = require('../variables/validateRol');

app.get( '/', verificarToken, async (req, res) => {
    const dbModels = modelsController;
    try {
        const response = await dbModels.getModels(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error modelos " + error
        })
    }
});

app.get( '/getmodel', verificarToken, async (req, res) => {
    const dbModels = modelsController;
    try {
        const response = await dbModels.getModelId(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error modelos " + error
        })
    }
});

app.post( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbModels = modelsController;
    try {
        const response = await dbModels.createModel(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error modelos " + error
        })
    }
});

app.put( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbModels = modelsController;
    try {
        const response = await dbModels.updateModel(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error modelos " + error
        })
    }
});

app.delete( '/', verificarToken, async (req, res) => {
    const dbModels = modelsController;
    try {
        const response = await dbModels.deleteModel(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error modelos " + error
        })
    }
});

app.get( '/units', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: units
    })    
});

module.exports = app;