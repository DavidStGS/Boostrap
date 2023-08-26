const myDB = require("../src/database/actionsDb");

class ReportsController{

    db;

    constructor(){
        this.db = myDB;
    }

    getReports({
        limit, skip, DateMin, DateMax, UserId, SetId, ReportId
    }){

        return new Promise((resolve, reject)=>{

            if(limit && skip){
                let reportSql = `
                SELECT R.*, U.LastName, U.FirstName FROM Reports AS R
                JOIN Users AS U on R.UserId = U.UserId 
                JOIN Sets AS S on R.SetId = S.SetId 
                WHERE R.Deleted=0 INSERT LIMIT ${limit} OFFSET ${skip};
                `;
                let reportSqlTotal = `SELECT COUNT(*) AS total FROM Reports AS R WHERE R.Deleted=0 INSERT`;

                const inserChanges = (value) => {
                    const indexInsert1 = reportSql.indexOf('INSERT');
                    reportSql = this.db.insertText(reportSql, indexInsert1, value);
                    const indexInsert2 = reportSqlTotal.indexOf('INSERT');
                    reportSqlTotal = this.db.insertText(reportSqlTotal, indexInsert2, value);
                }

                if (DateMin && DateMax) inserChanges(`AND R.Date BETWEEN ${DateMin} AND ${DateMax} `);
                if (UserId) inserChanges(`AND R.UserId=${UserId} `);  
                if (SetId) inserChanges(`AND R.SetId=${SetId} `); 
                if (ReportId) inserChanges(`AND R.ReportId="${ReportId}"`); 
                
                reportSql = reportSql.replace('INSERT', '');
                reportSqlTotal = reportSqlTotal.replace('INSERT', '');
                console.log(reportSql);
                this.db.runSQLSentence(reportSql)
                .then(data => {
                    this.db.runSQLSentence(reportSqlTotal)
                    .then(total => {
                        resolve({
                            data, total
                        })  
                    }).catch(err => reject('Error traer total reports 1', err))
                }).catch(err => reject('Error traer reports 2', err))

            } else {
                reject('Error Reports limit, skip')
            }

        })

    }

    createReport({
        Date, UserId, SetId
    }){
        const ReportId = this.db.create_UUID();
        return new Promise((resolve, reject)=> {
            if( Date && UserId && SetId){
                let reportSql = `INSERT INTO Reports ( ReportId, Date, UserId, SetId ) VALUES( "${ReportId}", ${Date},${UserId},${SetId} );`;
                this.db.runSQLSentence(reportSql).then(async (result) => {
                    resolve({result, id: ReportId})
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Date, UserId, SetId')
            }
        });
    }

    updateReport({
        ReportId, Date, UserId, SetId
    }){
        return new Promise((resolve, reject)=> {
            if( Date && UserId && SetId && ReportId){
                let reportSql = `UPDATE Reports SET Date=${Date}, UserId=${UserId}, SetId=${SetId} WHERE ReportId="${ReportId}";`;
                this.db.runSQLSentence(reportSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Date, UserId, SetId, ReportId')
            }
        });
    }

    deleteReport({
        ReportId
    }){
        return new Promise((resolve, reject)=> {
            if(ReportId){
            let orderSql = `UPDATE Reports SET Deleted=1 WHERE ReportId="${ReportId}";`;
                this.db.runSQLSentence(orderSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos ReportId')
            }
        });
    }

}

const reportsController = new ReportsController();
module.exports = reportsController;
