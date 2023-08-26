const mysql = require('mysql2');
const { DATABASE_URL } = require('../../config/config');
const connection = mysql.createConnection(DATABASE_URL);

class database {

    db;
    
    constructor(){
        this.db = mysql.createConnection(DATABASE_URL);
    }

    runSQLSentence(stringSQL){
        // console.log(stringSQL);
        return new Promise((resolve, reject) => {
            connection.query(stringSQL, (err, result) =>{
                if(err){
                    console.log("Error DATABASE ", err); 
                    reject(err + ' ')
                } else resolve( result ?? 'Ejecucion exitosa!');
            });
        })
    }

    insertText(txt, index, insert){
        return txt.slice(0, index) + insert + txt.slice(index);
    }

    validateJsonProperties(object, properties){
        let result = true
        properties.forEach(key => {
            if (!Object.hasOwnProperty.call(object, key)) result = false;
        })
        return result;
    }

    isNumeric(prop){
        return typeof prop === 'number'
    }

    create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

}
const myDB = new database();
module.exports = myDB;