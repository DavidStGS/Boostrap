const express = require('express');
const filesController = require('../controllers/Files');
const app = express();
const { verificarToken } = require('../middlewares/auth');
const { typeFiles } = require('../variables/globals');

app.get( '/', verificarToken, async (req, res) => {
    const dbFiles = filesController;
    try {
        const response = await dbFiles.getFiles(req.query);
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
    const dbFiles = filesController;
    try {
        const response = await dbFiles.createFile(body);
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
    const dbFiles = filesController;
    try {
        const response = await dbFiles.deleteFile(req.query);
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

app.get( '/types', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: typeFiles
    })
});

module.exports = app;