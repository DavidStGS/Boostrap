const myDB = require("../database/actionsDb");

class ItemsController{

    db;

    constructor(){
        this.db = myDB;
    }

    createItem({
        ReportId, Data, Unit, State, SetId, Alarm
    }){
        return new Promise((resolve, reject)=> {
            if( ReportId && this.db.isNumeric(Data) && Unit && this.db.isNumeric(State) && SetId && this.db.isNumeric(Alarm)){
                let itemSql = `INSERT INTO Items ( ReportId, Data, Unit, State, SetId, Alarm ) 
                VALUES( "${ReportId}",${Data},"${Unit}",${State},${SetId},${Alarm} );`;
                this.db.runSQLSentence(itemSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos ReportId, Data, Unit, State, SetId, Alarm')
            }
        });
    }

    updateItem({
        ItemId, Data, Unit, State, SetId, Alarm
    }){
        return new Promise((resolve, reject)=> {
            if( ItemId && this.db.isNumeric(Data) && Unit && this.db.isNumeric(State) && SetId && this.db.isNumeric(Alarm) ){
                let orderSql = `
                UPDATE Items SET 
                Data=${Data}, 
                Unit="${Unit}", 
                State=${State}, 
                Alarm=${Alarm}, 
                SetId=${SetId} 
                WHERE ItemId=${ItemId};`;
                this.db.runSQLSentence(orderSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Date, UserId, SetId, ReportId')
            }
        });
    }

    getItems({
        limit, skip, SetId, ReportId
    }){

        return new Promise((resolve, reject)=>{

            if(limit && skip){
                let itemSql = `
                SELECT DISTINCT I.*, M.Model FROM Items AS I
                JOIN Sets AS S on S.SetId = I.SetId 
                JOIN Models AS M on M.ModelId = S.ModelId
                WHERE I.Deleted=0 AND I.ReportId="${ReportId}" INSERT LIMIT ${limit} OFFSET ${skip};
                `;
                let itemSqlTotal = `SELECT COUNT(*) AS total FROM Items AS I WHERE I.Deleted=0 AND I.ReportId="${ReportId}" INSERT;`;

                const inserChanges = (value) => {
                    const indexInsert1 = itemSql.indexOf('INSERT');
                    itemSql = this.db.insertText(itemSql, indexInsert1, value);
                    const indexInsert2 = itemSqlTotal.indexOf('INSERT');
                    itemSqlTotal = this.db.insertText(itemSqlTotal, indexInsert2, value);
                }

                if (SetId) inserChanges(`AND I.SetId=${SetId} `); 
                
                itemSql = itemSql.replace('INSERT', '');
                itemSqlTotal = itemSqlTotal.replace('INSERT', '');

                this.db.runSQLSentence(itemSql)
                .then(data => {
                    this.db.runSQLSentence(itemSqlTotal)
                    .then(total => {
                        resolve({
                            data, total
                        })  
                    }).catch(err => reject('Error traer total items', err))
                }).catch(err => reject('Error traer items', err))

            } else {
                reject('Error Reports limit, skip')
            }

        })

    }

    deleteItem({ItemId}){
        return new Promise((resolve, reject)=>{
            if(ItemId){
                let itemSql = `DELETE FROM Items WHERE ItemId=${ItemId};`;
                this.db.runSQLSentence(itemSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Error al eliminar el item ID = '+ ItemId)
            }

        })

    }

}

const itemsController = new ItemsController();
module.exports = itemsController;