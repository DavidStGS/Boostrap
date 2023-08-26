const express = require('express');
const app = express();
const countriesController = require('../controllers/Countries');
const { verificarToken } = require('../middlewares/auth');

app.get( '/', verificarToken, async (req, res) => {
    const dbCountries = countriesController;
    try {
        const response = await dbCountries.getCountries();
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error paises " + error
        })
    }
});

app.get( '/states/', verificarToken, async (req, res) => {
    const countryId = req.query.id;
    const dbCountries = countriesController;
    try {
        const response = await dbCountries.getStates({countryId});
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error estados " + error
        })
    }
});

app.get( '/cities/', verificarToken, async (req, res) => {
    const stateId = req.query.id;
    const dbCountries = countriesController;
    try {
        const response = await dbCountries.getCities({stateId});
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error ciudades " + error
        })
    }
});

module.exports = app;
