const myDB = require("../database/actionsDb");
const filesController = require("./Files");

class OrdersController{

    db;

    constructor(){
        this.db = myDB;
    }

    getOrders({
        limit, skip, OrderId,
        UserId, SupportId, SellerId, TechId, ClientId, SetId,
        DateInitMin, DateInitMax, DateFinalInit, DateFinalMax, ReportId, Type, State
    }){
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let orderSql = `
                SELECT O.* FROM Orders AS O
                JOIN Users AS U on O.UserId = U.UserId 
                JOIN Users AS SP on O.SupportId = SP.UserId 
                JOIN Users AS SL on O.SellerId = SL.UserId 
                JOIN Users AS TC on O.TechId = TC.UserId 
                JOIN Companies AS CL on O.ClientId = CL.CompanyId 
                WHERE O.Deleted=0 INSERT LIMIT ${limit} OFFSET ${skip};
                `;
                let orderSqlTotal = `SELECT COUNT(*) AS total FROM Orders AS O WHERE O.Deleted=0 INSERT;`;

                const inserChanges = (value) => {
                    const indexInsert1 = orderSql.indexOf('INSERT');
                    orderSql = this.db.insertText(orderSql, indexInsert1, value);
                    const indexInsert2 = orderSqlTotal.indexOf('INSERT');
                    orderSqlTotal = this.db.insertText(orderSqlTotal, indexInsert2, value);
                }

                if (OrderId) inserChanges(`AND O.OrderId="${OrderId}" `);
                if (UserId) inserChanges(`AND O.UserId=${UserId} `);
                if (SetId) inserChanges(`AND O.SetId=${SetId} `);
                if (SupportId) inserChanges(`AND O.SupportId=${SupportId} `);
                if (SellerId) inserChanges(`AND O.SellerId=${SellerId} `);
                if (TechId) inserChanges(`AND O.TechId=${TechId} `);
                if (ClientId) inserChanges(`AND O.ClientId=${ClientId} `);
                if (ReportId) inserChanges(`AND O.ReportId="${ReportId}" `);
                if (Type) inserChanges(`AND O.Type=${Type} `);
                if (State) inserChanges(`AND O.State=${State} `);
                if (DateInitMin && DateInitMax) inserChanges(`AND O.DateInit BETWEEN ${DateInitMin} AND ${DateInitMax} `); 
                if (DateFinalInit && DateFinalMax) inserChanges(`AND O.DateFinal BETWEEN ${DateFinalInit} AND ${DateFinalMax} `); 
                    
                orderSql = orderSql.replace('INSERT', '');
                orderSqlTotal = orderSqlTotal.replace('INSERT', '');
            
                this.db.runSQLSentence(orderSql)
                .then(data => {
                    this.db.runSQLSentence(orderSqlTotal)
                    .then(total => {
                        if(data && data.length > 0){
                            resolve({
                                data,
                                total:total[0]['total']
                            })
                        } else {
                            resolve({
                                data:[], total:0
                            })
                        }
                    }).catch(err => reject('Error traer total ordenes ', err))
                }).catch(err => reject('Error traer ordenes ', err))
            } else {
                reject('Error ordenes limit, skip')
            }
        })
    }

    createOrder({
        Date, Description, UserId, SupportId, SellerId, TechId, ClientId, SetId
    }){

        const OrderId = this.db.create_UUID();
        console.log(OrderId);
        return new Promise((resolve, reject)=> {

            if( Date && Description && UserId && SupportId && SellerId && TechId && ClientId ){

                let orderSql = `
                INSERT INTO Orders ( OrderId, Date, Description, UserId, SupportId, SellerId, TechId, ClientId, SetId )
                VALUES( "${OrderId}", ${Date},"${Description}",${UserId},${SupportId},${SellerId},${TechId},${ClientId}, ${SetId} );
                `;

                this.db.runSQLSentence(orderSql).then(async (result) => {
                    resolve({result, id: OrderId})
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Date, Description, UserId, SupportId, SellerId, TechId, ClientId ')
            }
        });
    }

    updateOrder(requestData){

        let keyBaseOptional = [ 'Date', 'State', 'Description', 'UserId', 'SupportId', 'SellerId', 'TechId', 'ClientId', 'DateInit', 'DateFinal', 'SupportRw', 'SellerRw', 'TechIdRw', 'ReportId', 'SetId']; 
        let keyBaseRequired = [ 'OrderId', 'Type' ]

        return new Promise((resolve, reject)=> {

            if(this.db.validateJsonProperties(requestData, keyBaseRequired)){
                let orderSql = `
                UPDATE Orders
                SET Type=${requestData[keyBaseRequired[1]]} INSERT WHERE OrderId="${requestData[keyBaseRequired[0]]}";`;

                const inserChanges = (prop) => {
                    const indexInsert = orderSql.indexOf('INSERT');
                    orderSql = this.db.insertText(orderSql, indexInsert, prop);
                }

                keyBaseOptional.forEach(key => {
                    let prop = requestData[key]
                    if(Object.hasOwnProperty.call(requestData, key)) inserChanges( this.db.isNumeric(prop) ? `, ${key}=${prop}` : `, ${key}="${prop}"` );
                })

                orderSql =  orderSql.replace('INSERT', '');

                this.db.runSQLSentence(orderSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                });
                
            } else {
                reject('Datos incompletos, requeridos ' +  keyBaseRequired.join(', '))
            }
        });
    }

    deleteOrder({OrderId}){

        return new Promise((resolve, reject)=>{

            if(OrderId){
                let orderSql = `
                UPDATE Orders
                SET Deleted=1
                WHERE OrderId = "${OrderId}";
                `;
                filesController.getFiles({OrderId})
                .then(async(result1) => {
                    if(result1.length > 0){
                        reject('Debe eliminar primero los archivos asociados a esta orden')
                    } else {
                        this.db.runSQLSentence(orderSql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el OrderId = '+ OrderId)
            }

        })

    }

    getOrderId({OrderId}){
        return new Promise((resolve, reject)=>{
            if(OrderId){
                const orderSql = `
                SELECT * FROM Orders WHERE OrderId=${OrderId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(orderSql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen Models con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar OrderId en los query params')
            }
        })
    }

}

const ordersController = new OrdersController();
module.exports = ordersController;
