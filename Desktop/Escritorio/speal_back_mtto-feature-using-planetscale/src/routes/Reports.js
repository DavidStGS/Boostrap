const express = require('express');
const reportsController = require('../../controllers/Reports');
const app = express();
const { verificarToken } = require('../../middlewares/auth');
const { stateItems } = require('../../variables/globals');

app.get( '/', verificarToken, async (req, res) => {
    const dbReports = reportsController;
    try {
        const response = await dbReports.getReports(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error reportes " + error
        })
    }
});

app.post( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbReports = reportsController;
    try {
        const response = await dbReports.createReport(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error reportes " + error
        })
    }
});

app.put( '/', verificarToken, async (req, res) => {
    let body = req.body;
    const dbReports = reportsController;
    try {
        const response = await dbReports.updateReport(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error reportes " + error
        })
    }
});

app.delete( '/', verificarToken, async (req, res) => {
    const dbReports = reportsController;
    try {
        const response = await dbReports.deleteReport(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error reportes " + error
        })
    }
});

app.get( '/types', verificarToken, async (req, res) => {
    res.status(200).json({
        status: true,
        result: stateItems
    })
});

module.exports = app;