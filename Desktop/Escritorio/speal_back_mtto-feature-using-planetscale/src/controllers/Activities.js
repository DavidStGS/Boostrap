const myDB = require("../database/actionsDb");

class ActivityController {

    db;

    constructor(){
        this.db = myDB;
    }

    createActivity(UserId, CompanyID, DateAct, Activity, EntityId){
        return new Promise((resolve, reject)=>{
            const activitySql = `
                INSERT INTO Activities (UserId, CompanyID, DateAct, Activity, EntityId)
                VALUES( "${UserId}", "${CompanyID}",${DateAct},"${Activity}","${EntityId}");
            `;
            this.db.runSQLSentence(activitySql).then(async (result) => {
                resolve(result)
            }).catch(err => {
                reject(err)
            });
        })
    }

    getActivities({
        limit, skip, UserId, CompanyID
    }){
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let activitySql = `
                SELECT * FROM Companies WHERE Admin = 0 AND Deleted=0 
                ${ UserId ? 'AND UserId='+UserId : ''}
                ${ CompanyID ? 'AND CompanyID='+CompanyID : ''}
                LIMIT ${limit} OFFSET ${skip} ORDER BY DateAct DESC;
                `;
                let activitySqlTotal = `
                SELECT COUNT(*) AS total FROM Companies WHERE Admin = 0 AND Deleted=0 
                ${ UserId ? 'AND UserId='+UserId : ''}
                ${ CompanyID ? 'AND CompanyID='+CompanyID : ''};
                `;
                this.db.runSQLSentence(activitySql)
                .then(data => {
                    this.db.runSQLSentence(activitySqlTotal)
                    .then(total => {
                        resolve({
                            data, total:total[0]['total']
                        })
                    }).catch(err => reject('Error traer total actividades ', err))
                }).catch(err => reject('Error traer actividades ', err))
            } else {
                reject('Error requerido limit y skip, opcional UserId y CompanyID.')
            }
        })
    }

}

const activityController = new ActivityController();
module.exports = activityController;
