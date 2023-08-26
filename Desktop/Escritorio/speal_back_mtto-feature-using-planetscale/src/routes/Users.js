const express = require('express');
let app = express();
const UserController = require('../controllers/Users');
const { verificarToken } = require('../middlewares/auth');
// const { validateRolMiddleware } = require('../middlewares/validateRol');
// const { permissions } = require('../variables/validateRol');

app.get( '/', verificarToken,  async (req, res) => {

    const dbUser = new UserController();
    try {
        const response = await dbUser.getUsers(req.query);
        res.status(200).json({
            status: 'ok',
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            mss: "Error al crear el registro " + error
        })
    }
});

app.get( '/getuser', verificarToken, async (req, res) => {
    const dbUser = new UserController();
    const { userdb } = req.body;
    try {
        const response = await dbUser.getUserId(userdb);
        res.status(200).json({
            status: 'ok',
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            mss: "Error al crear el registro " + error
        })
    }
});

app.get( '/getuserid', verificarToken, async (req, res) => {
    const dbUser = new UserController();
    try {
        const response = await dbUser.getUserId(req.query);
        res.status(200).json({
            status: 'ok',
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            mss: "Error al crear el registro " + error
        })
    }
});

app.post( '/create', verificarToken,  async (req, res) => {
    let body = req.body;
    const dbUser = new UserController();
    try {
        const response = await dbUser.createUser(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error al crear el registro " + error
        })
    }
});

app.put( '/update', verificarToken,  async (req, res) => {
    let body = req.body;
    const dbUser = new UserController();
    try {
        const response = await dbUser.updateUser(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error al crear el registro " + error
        })
    }
});

app.delete( '/', verificarToken,  async (req, res) => {
    const dbUser = new UserController();
    try {
        const response = await dbUser.deleteUser(req.query);
        res.status(200).json({
            status: 'ok',
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            mss: "Error al crear el registro " + error
        })
    }
});

module.exports = app;