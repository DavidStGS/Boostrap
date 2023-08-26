const express = require('express');
const activityController = require('../controllers/Activities');
const { verificarToken } = require('../middlewares/auth');
let app = express();

app.post( '/', async (req, res, next) => {
    const activityCtrl = activityController;
    try {
        const response = await activityCtrl.getActivities(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status('404').json({
            status: false,
            mss: "Error Login " + error
        })
    }
});

module.exports = app;