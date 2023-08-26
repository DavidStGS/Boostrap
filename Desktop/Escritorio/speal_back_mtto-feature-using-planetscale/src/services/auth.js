const jwt = require('jsonwebtoken');
const { EXPIRES, SEED } = require("../config/config");

const getToken = (usuario) => {
    return jwt.sign({ usuario }, SEED, { expiresIn: EXPIRES }) 
}

module.exports = getToken;
