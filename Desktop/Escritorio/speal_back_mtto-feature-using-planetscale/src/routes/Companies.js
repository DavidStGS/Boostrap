const express = require('express');
const app = express();
const companyController = require('../controllers/Companies');
const { verificarToken } = require('../middlewares/auth');
const { validateRolMiddleware } = require('../middlewares/validateRol');
const { typeDocs } = require('../variables/globals');
const { permissions } = require('../variables/validateRol');

app.get( '/', verificarToken, async (req, res) => {
    const dbCompanies = companyController;
    try {
        const response = await dbCompanies.getCompanies(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.get( '/getcompany', verificarToken, async (req, res) => {
    const dbCompanies = companyController;
    const CompanyId = req.query.CompanyId ? req.query.CompanyId : req.body.userdb.CompanyId;
    try {
        const response = await dbCompanies.getCompanyId({CompanyId});
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.get( '/getcompanyid', verificarToken, async (req, res) => {
    const dbCompanies = companyController;
    const CompanyId = req.query.CompanyId ? req.query.CompanyId : req.body.userdb.CompanyId;
    try {
        const response = await dbCompanies.getCompanyId({CompanyId});
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.post( '/', verificarToken, validateRolMiddleware(permissions.write), async (req, res) => {
    let body = req.body;
    const dbCompanies = companyController;
    try {
        const response = await dbCompanies.createCompany(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.put( '/', verificarToken, validateRolMiddleware(permissions.write), async (req, res) => {
    let body = req.body;
    const dbCompanies = companyController;
    try {
        const response = await dbCompanies.updateCompany(body);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.delete( '/', verificarToken, validateRolMiddleware(permissions.write), async (req, res) => {
    const dbCompanies = companyController;
    try {
        const response = await dbCompanies.deleteCompany(req.query);
        res.status(200).json({
            status: true,
            result: response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            mss: "Error empresas " + error
        })
    }
});

app.get( '/typedocs', verificarToken, validateRolMiddleware(permissions.read), async (req, res) => {
    res.status(200).json({
        status: true,
        result: typeDocs
    })    
});

module.exports = app;
