const { BUCKET, BUCKET_URL } = require('../config/config');
const myDB = require("../database/actionsDb");
const uploadService =  require('../services/uploadFile')

class ModelsController{

    db;

    constructor(){
        this.db = myDB;
    }

    createModel({
        ParentId, ProviderId, MakerId, Reference1, Frecuency, Image, Reload, Model, Reference2, LimitLife, Description, Capacity, Unit
    }){
        return new Promise((resolve, reject)=> {

            if( ProviderId && MakerId && Reference1 && Image ){

                const nameImage = `mtto/models/${Reference1}-${ProviderId}-${MakerId}`;
                let urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                let modelSql = `
                INSERT INTO Models ( ProviderId, MakerId, Reference1, Image INSERT1)
                VALUES( "${ProviderId}","${MakerId}","${Reference1}","${urlImage}" INSERT2);
                `;

                const inserChanges = (prop, value) => {
                    const indexInsert1 = modelSql.indexOf('INSERT1');
                    modelSql = this.db.insertText(modelSql, indexInsert1, prop);
                    const indexInsert2 = modelSql.indexOf('INSERT2');
                    modelSql = this.db.insertText(modelSql, indexInsert2, value);
                }

                ParentId ? inserChanges(', ParentId', `, ${ParentId}`) : inserChanges(', ParentId', `, NULL`); 

                if( typeof Reload === 'boolean' || Model || Reference2 || LimitLife || Description || Frecuency || Capacity || Unit){

                    if (typeof Reload === 'boolean') inserChanges(', Reload',`, ${Reload ? 1: 0}`);
                    if (Model) inserChanges(', Model',`, "${Model}"`); 
                    if (Reference2) inserChanges(', Reference2', `, "${Reference2}"`)
                    if (LimitLife) inserChanges(', LimitLife', `, ${LimitLife}`)
                    if (LimitLife) inserChanges(', Frecuency', `, ${Frecuency}`)
                    if (Description) inserChanges(', Description', `, "${Description}"`)
                    if (Capacity) inserChanges(', Capacity', `, ${Capacity}`)
                    if (Unit) inserChanges(', Unit', `, "${Unit}"`)
                    // if (ParentId) inserChanges(', ParentId', `, ${ParentId}`)
                    modelSql = modelSql.replace('INSERT1', '');
                    modelSql = modelSql.replace('INSERT2', '');

                } else {
                    modelSql = modelSql.replace('INSERT1', '');
                    modelSql = modelSql.replace('INSERT2', '');
                }
                console.log(modelSql);
                // resolve(modelSql);

                this.db.runSQLSentence(modelSql).then(async (result) => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos ParentId, ProviderId, MakerId, Reference1, Image')
            }
        });
    }

    getModels({
        limit, skip, ModelId, Model, Reference1, ParentId, ProviderId, MakerId, CapacityMin, CapacityMax, Unit // validar si va a ser solo padres para comparar con NULL
    }){
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let modelSql = `
SELECT M.*, P.Name AS ProviderName, MK.Name AS MakerName FROM Models AS M
JOIN Companies AS P on M.ProviderId = P.CompanyId 
JOIN Companies AS MK on M.MakerId = MK.CompanyId 
WHERE M.Deleted=0 INSERT LIMIT ${limit} OFFSET ${skip};
`;
                let modelSqlTotal = `SELECT COUNT(*) AS total FROM Models AS M WHERE M.Deleted=0 INSERT`;

                const inserChanges = (value) => {
                    const indexInsert1 = modelSql.indexOf('INSERT');
                    modelSql = this.db.insertText(modelSql, indexInsert1, value);
                    const indexInsert2 = modelSqlTotal.indexOf('INSERT');
                    modelSqlTotal = this.db.insertText(modelSqlTotal, indexInsert2, value);
                }

                
                if (Model || ModelId || Reference1 || ProviderId || MakerId || Unit || (CapacityMin && CapacityMax) ) {
                    if (Model) inserChanges(`AND M.Model LIKE "%${Model}%" `); 
                    if (Reference1) inserChanges(`AND M.Reference1 LIKE "%${Reference1}%" `); 
                    if (ProviderId) inserChanges(`AND M.ProviderId=${ProviderId} `); 
                    if (MakerId) inserChanges(`AND M.MakerId=${MakerId} `); 
                    if (CapacityMin && CapacityMax) inserChanges(`AND M.Capacity BETWEEN ${CapacityMin} AND ${CapacityMax} `); 
                    if (Unit) inserChanges(`AND M.Unit="${Unit}" `);
                    if (ModelId) inserChanges(`AND M.ModelId=${ModelId} `);
                    
                    modelSql = modelSql.replace('INSERT', '');
                    modelSqlTotal = modelSqlTotal.replace('INSERT', '');
                } else {
                    ParentId ? inserChanges(`AND M.ParentId=${ParentId} `) : inserChanges(`AND M.ParentId IS NULL `); 
                    modelSql = modelSql.replace('INSERT', '');
                    modelSqlTotal = modelSqlTotal.replace('INSERT', '');
                }

                this.db.runSQLSentence(modelSql)
                .then(data => {
                    this.db.runSQLSentence(modelSqlTotal)
                    .then(total => {
                        if(data && data.length > 0){
                            let promises = [];
                            data.forEach((element) => {
                                promises.push(
                                    this.getChildModels({ ParentId:element.ModelId  })
                                        .then((response) => response )
                                        .catch((error) => error )
                                );
                            });

                            Promise.all(promises)
                            .then((result) => {
                                data = data.map((ele, index)=> {
                                    ele.childs = result[index]
                                    return ele;
                                })
                                resolve({
                                    data, 
                                    total:total[0]['total']
                                })
                            }).catch(err => reject('Error traer hijos modelos ', err))
                            
                        } else {
                            resolve({
                                data:[], total:0
                            })
                        }

                        
                    }).catch(err => reject('Error traer total modelos ', err))
                }).catch(err => reject('Error traer modelos ', err))
            } else {
                reject('Error modelos limit, skip')
            }
        })
    }

    updateModel({
        ModelId, ParentId, ProviderId, MakerId, Reference1, Frecuency, Image, Reload, Model, Reference2, LimitLife, Description, Capacity, Unit
    }){
        return new Promise((resolve, reject)=> {
            if(ModelId && Reference1 && ProviderId && MakerId){
                
                let nameImage;
                let urlImage;
                let modelSql = `
                UPDATE Models
                SET Reference1="${Reference1}", ProviderId=${ProviderId}, MakerId=${MakerId}INSERT WHERE ModelId = "${ModelId}";`;

                const inserChanges = (prop) => {
                    const indexInsert = modelSql.indexOf('INSERT');
                    modelSql = this.db.insertText(modelSql, indexInsert, prop);
                }

                if(typeof ParentId == 'number') inserChanges(`, ParentId=${ParentId}`);
                if(typeof Reload === 'boolean') inserChanges(`, Reload=${Reload ? 1: 0}`);
                if(Frecuency) inserChanges(`, Frecuency=${Frecuency}`);
                if(LimitLife) inserChanges(`, LimitLife=${LimitLife}`);
                if(Model) inserChanges(`, Model="${Model}"`);
                if(Reference2) inserChanges(`, Reference2="${Reference2}"`);
                if(Description) inserChanges(`, Description="${Description}"`);
                if(Capacity) inserChanges(`, Capacity=${Capacity}`);
                if(Unit) inserChanges(`, Unit="${Unit}"`);

                if( typeof Image == 'string'){
                    if(!Image.includes('http')){
                        nameImage = `mtto/models/${Reference1.replace(/\s+/g, '')}-${ProviderId}-${MakerId}`;
                        urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                        inserChanges(`, Image="${urlImage}"`);
                    }
                }
                modelSql =  modelSql.replace('INSERT', '');

                const createImage = async () => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                }

                this.getModelId({ModelId})
                .then(async(oldModel) => {
                    if(Image){
                        if(typeof Image == 'string' && !Image.includes('http')){
                            if(Image.includes('https://speal.')){
                                await uploadService.deleteFile(oldModel.Image).then(async () => {
                                    createImage();
                                })
                            } else {
                                createImage();
                            }
                        }
                    }
                    this.db.runSQLSentence(modelSql).then(async (result) => {
                        resolve(result)
                    }).catch(err => {
                        console.log(err);
                        reject(err)
                    });
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
                
            } else {
                reject('Datos incompletos, requeridos ModelId, Reference1, ProviderId, MakerId')
            }
        });
    }

    deleteModel({ModelId}){

        return new Promise((resolve, reject)=>{

            if(ModelId){
                let modelSql = `
                UPDATE Models
                SET Deleted=1
                WHERE ModelId = ${ModelId};
                `;
                this.getModelId({ModelId})
                .then(async(oldModel) => {
                    uploadService.deleteFile(oldModel.Image).then(()=>{
                        this.db.runSQLSentence(modelSql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el modelo ID = '+ ModelId)
            }

        })

    }

    getModelId({ModelId}){
        return new Promise((resolve, reject)=>{
            if(ModelId){
                const modelSql = `
                SELECT * FROM Models WHERE ModelId=${ModelId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(modelSql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen Models con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar ModelId en los query params')
            }
        })
    }

    getChildModels({ParentId}){
        return new Promise((resolve, reject)=>{
            if(ParentId){
                const modelSql = `
                SELECT * FROM Models WHERE ParentId=${ParentId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(modelSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar ParentId en los query params')
            }
        })
    }

}

const modelsController = new ModelsController();
module.exports = modelsController;


