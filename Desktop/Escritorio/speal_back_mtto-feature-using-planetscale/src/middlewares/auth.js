const jwt = require('jsonwebtoken');
const { SEED } = require('../config/config');

exports.verificarToken = function (req, res, next){
    var mytok = req.headers.token;
    jwt.verify(mytok , SEED, (err, decode)=>{
        if(err) {
            return res.status(401).json({
                status: false,
                mss: 'Token no valido',
                errors : err
            })
        }
        req.body.userdb = decode.usuario;
        next();
    });
}