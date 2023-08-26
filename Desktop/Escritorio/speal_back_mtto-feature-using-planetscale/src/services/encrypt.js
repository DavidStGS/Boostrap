const bcrypt = require('bcrypt');
const saltRounds = 10;

const generatePass = (password) => {
    return new Promise((resolve)=>{
        bcrypt.hash(password, saltRounds, (err, hash) => {
            resolve(hash)
        })
    }) 
}

const comparePass = (passText, passDB) => {
    return new Promise((resolve)=>{
        bcrypt.compare(passText, passDB, function(err, result) {
            resolve(result)
        });
    })
}

module.exports = { generatePass, comparePass };