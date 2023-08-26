const sqlite3 = require("sqlite3").verbose();



class CountriesController{

    db;

    constructor(){
        this.db = new sqlite3.Database('sql/countries.db');
    }

    runSQLSentence(stringSQL){
        return new Promise((resolve, reject) => {
            this.db.all(stringSQL,(err, result) => {
                if(err){
                    console.log("Error DATABASE ", err); 
                    reject(err + ' ')
                } else {
                    resolve(result)
                }
            });
        })
    }

    getCountries(){
        return new Promise((resolve,reject)=>{
            const sqlString = `SELECT * FROM countries;`;
            this.runSQLSentence(sqlString).then(async (result) => {
                resolve(result)
            }).catch(err => {
                reject(err)
            });
        })
    }

    getStates({ countryId }){
        return new Promise((resolve,reject)=>{
            if (countryId) {
                const sqlString = `SELECT * FROM states WHERE country_id = ${countryId};`;
                this.runSQLSentence(sqlString).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Campo countryId es necesario')
            }
        })
    }

    getCities({ stateId }){
        return new Promise((resolve,reject)=>{
            if (stateId) {
                const sqlString = `SELECT * FROM cities WHERE state_id = ${stateId};`;
                this.runSQLSentence(sqlString).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Campo stateId es necesario')
            }
        })
    }

}

const countriesController = new CountriesController();
module.exports = countriesController;