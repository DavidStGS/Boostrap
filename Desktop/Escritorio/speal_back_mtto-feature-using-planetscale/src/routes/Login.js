const express = require('express');
const LoginController = require('../controllers/Login');
const { verificarToken } = require('../middlewares/auth');
let app = express();
const { roles, generatePermissionsFront } = require('../variables/validateRol');

app.post( '/', async (req, res) => {
    let body = req.body;
    const loginController = new LoginController();
    try {
        const response = await loginController.login(body);
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

app.get( '/roles', verificarToken, (req, res) => {
    res.status(200).json({
        status: true,
        result: roles
    })
});

app.get( '/permissions', verificarToken, (req, res) => {
    const result = generatePermissionsFront(req.body.userdb);
    res.status(200).json({
        status: true,
        result
    })
});

module.exports = app;