const pMap = (...args)=>import('p-map').then(({default: pMap})=>pMap(...args));
const { PASSWORDADMIN, PASSWORDUSER, DATABASE_URL } = require('../../config/config');
const { generatePass } = require('../services/encrypt');
const convertCSVToSQL = require('./importDB');
const initDatabase = require('./initDB');

const mysql = require('mysql2');
const connection = mysql.createConnection(DATABASE_URL)

const infoDB = [
    { file:'./info/Companies.csv', database:'Companies' },
    { file:'./info/Users.csv', database:'Users' },
    { file:'./info/Models.csv', database:'Models' },
    { file:'./info/Sets.csv', database:'Sets' },
    { file:'./info/Orders.csv', database:'Orders' },
    { file:'./info/Files.csv', database:'Files' },
    { file:'./info/Reports.csv', database:'Reports' },
    { file:'./info/Items.csv', database:'Items' }
];

function runSQLSentence(stringSQL){
    return new Promise((resolve, reject)=>{
        connection.query(stringSQL, (err, result) =>{
            if(err) reject('== Err ',err)
            if(result) resolve('== Res ',result)
        })
    })
}

async function replaceParams(db) {
    let PASSADMIN = await generatePass(PASSWORDADMIN);
    let PASSUSER = await generatePass(PASSWORDUSER);
    return db.map(stringSQL => {
        const mapObj = {
            PASSADMIN,
            PASSUSER,
        };
        stringSQL = stringSQL.replace(/\b(?:PASSADMIN|PASSUSER)\b/gi, matched => mapObj[matched]);
        return stringSQL;
    });
}

async function runMigrations(){

    const result = await replaceParams(convertCSVToSQL.convertManyCsv(infoDB));
    let sqlArray = [...initDatabase, ...result];
    pMap(sqlArray, runSQLSentence, {concurrency: 1});
}

runMigrations();
