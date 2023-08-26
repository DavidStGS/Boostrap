const { BUCKET, BUCKET_URL } = require('../config/config');
const myDB = require("../database/actionsDb");
const uploadService =  require('../services/uploadFile')

class SetsController{

    db;

    constructor(){
        this.db = myDB;
    }

    createSet({
        Address, City, State, Country, Coors, Image, ModelId, OnwerId, ParentId,
        Notes, RentalId, InitDate, LastMtto
    }){
        return new Promise((resolve, reject)=> {

            if( Address && City && State && Country && Coors && Image && ModelId && OnwerId ){

                const nameImage = `mtto/sets/${City}-${Date.now().toString()}-${OnwerId}`;
                let urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                let setSql = `
                INSERT INTO Sets ( Address, City, State, Country, Coors, Image, ModelId, OnwerId INSERT1)
                VALUES( "${Address}",${City},${State},${Country},"${Coors}","${urlImage}",${ModelId},${OnwerId} INSERT2);
                `;

                const inserChanges = (prop, value) => {
                    const indexInsert1 = setSql.indexOf('INSERT1');
                    setSql = this.db.insertText(setSql, indexInsert1, prop);
                    const indexInsert2 = setSql.indexOf('INSERT2');
                    setSql = this.db.insertText(setSql, indexInsert2, value);
                }

                ParentId ? inserChanges(', ParentId', `, ${ParentId}`) : inserChanges(', ParentId', `, NULL`); 

                if( Notes || RentalId || InitDate || LastMtto){

                    if (Notes) inserChanges(', Notes',`, "${Notes}"`); 
                    if (RentalId) inserChanges(', RentalId', `, ${RentalId}`)
                    if (InitDate) inserChanges(', InitDate', `, ${InitDate}`)
                    if (LastMtto) inserChanges(', LastMtto', `, ${LastMtto}`)

                    setSql = setSql.replace('INSERT1', '');
                    setSql = setSql.replace('INSERT2', '');

                } else {
                    setSql = setSql.replace('INSERT1', '');
                    setSql = setSql.replace('INSERT2', '');
                }
                // console.log(setSql);
                // resolve(setSql);

                this.db.runSQLSentence(setSql).then(async (result) => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Address, City, State, Country, Coors, Image, ModelId, OnwerId, ParentId')
            }
        });
    }

    
    updateSet({
        SetId, Address, City, State, Country, Coors, ModelId, OnwerId, ParentId, Notes, RentalId, InitDate, LastMtto, Image
    }){
        return new Promise((resolve, reject)=> {
            if(SetId){
                
                let nameImage;
                let urlImage;
                let setSql = `UPDATE Sets SET ModelId=${ModelId} INSERT WHERE SetId = "${SetId}";`;

                const inserChanges = (prop) => {
                    const indexInsert = setSql.indexOf('INSERT');
                    setSql = this.db.insertText(setSql, indexInsert, prop);
                }

                if(typeof ParentId == 'number') inserChanges(`, ParentId=${ParentId}`);
                if(RentalId) inserChanges(`, RentalId=${RentalId}`);
                if(InitDate) inserChanges(`, InitDate=${InitDate}`);
                if(LastMtto) inserChanges(`, LastMtto=${LastMtto}`);
                if(City) inserChanges(`, City=${City}`);
                if(State) inserChanges(`, State=${State}`);
                if(Country) inserChanges(`, Country=${Country}`);
                if(OnwerId) inserChanges(`, OnwerId=${OnwerId}`);
                if(Notes) inserChanges(`, Notes="${Notes}"`);
                if(Address) inserChanges(`, Address="${Address}"`);
                if(Coors) inserChanges(`, Coors="${Coors}"`);

                if( typeof Image == 'string'){
                    if(!Image.includes('http')){
                        nameImage = `mtto/sets/${City}-${Date.now().toString()}-${OnwerId}`;
                        urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                        inserChanges(`, Image="${urlImage}"`);
                    }
                }
                setSql =  setSql.replace('INSERT', '');

                const createImage = async () => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                }

                this.getSetId({SetId})
                .then(async(oldSet) => {
                    if(Image){
                        if(typeof Image == 'string' && !Image.includes('http')){
                            if(Image.includes('https://speal.')){
                                await uploadService.deleteFile(oldSet.Image).then(async () => {
                                    createImage();
                                })
                            } else {
                                createImage();
                            }
                        }
                    }
                    // console.log(setSql);
                    this.db.runSQLSentence(setSql).then(async (result) => {
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
                reject('Datos incompletos, requeridos SetId')
            }
        });
    }

    deleteSet({SetId}){

        return new Promise((resolve, reject)=>{

            if(SetId){
                let setSql = `
                UPDATE Sets
                SET Deleted=1
                WHERE SetId = ${SetId};
                `;
                this.getSetId({SetId})
                .then(async(oldModel) => {
                    uploadService.deleteFile(oldModel.Image).then(()=>{
                        this.db.runSQLSentence(setSql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el set ID = '+ SetId)
            }

        })

    }

    getSets({
        limit, skip, SetId, City, State, Country, InitDateMin, InitDateMax, LastMttoMin, LastMttoMax, ModelId, OnwerId, RentalId, ParentId,
        Model, Reference1, ProviderId, MakerId, CapacityMin, CapacityMax, Unit 
    }){
        const myJoins = `
        JOIN Models AS M on S.ModelId = M.ModelId 
        JOIN Companies AS OW on S.OnwerId = OW.CompanyId 
        JOIN Companies AS RE on S.RentalId = RE.CompanyId 
        JOIN Companies AS MK on M.ProviderId = MK.CompanyId 
        JOIN Companies AS P on M.MakerId = P.CompanyId`
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let setSql = `
                    SELECT S.*, M.*, 
                    OW.Name AS OnwerName, 
                    RE.Name AS RentalName, 
                    P.Name AS ProviderName, 
                    MK.Name AS MakerName 
                    FROM Sets AS S
                    ${myJoins}
                    WHERE S.Deleted=0 INSERT LIMIT ${limit} OFFSET ${skip};
                `;
                let setSqlTotal = `SELECT COUNT(*) AS total FROM Sets AS S ${myJoins} WHERE S.Deleted=0 INSERT`;

                const inserChanges = (value) => {
                    const indexInsert1 = setSql.indexOf('INSERT');
                    setSql = this.db.insertText(setSql, indexInsert1, value);
                    const indexInsert2 = setSqlTotal.indexOf('INSERT');
                    setSqlTotal = this.db.insertText(setSqlTotal, indexInsert2, value);
                }

                if (
                    City || State || Country || ModelId || OnwerId || RentalId || SetId || 
                    Model || Reference1 || ProviderId || MakerId  || Unit ||
                    (InitDateMin && InitDateMax) || (LastMttoMin && LastMttoMax) || (CapacityMin && CapacityMax)
                    ) {
                        if(City) inserChanges(`AND S.City=${City} `);
                        if(State) inserChanges(`AND S.State=${State} `);
                        if(Country) inserChanges(`AND S.Country=${Country} `);
                        if(ModelId) inserChanges(`AND S.ModelId=${ModelId} `);
                        if(OnwerId) inserChanges(`AND S.OnwerId=${OnwerId} `);
                        if(RentalId) inserChanges(`AND S.RentalId=${RentalId} `);
                        if(SetId) inserChanges(`AND S.SetId=${SetId} `);
                        if (InitDateMin && InitDateMax) inserChanges(`AND S.InitDate BETWEEN ${InitDateMin} AND ${InitDateMax} `);
                        if (LastMttoMin && LastMttoMax) inserChanges(`AND S.LastMtto BETWEEN ${LastMttoMin} AND ${LastMttoMax} `);

                        if (Model) inserChanges(`AND M.Model LIKE "%${Model}%" `); 
                        if (Reference1) inserChanges(`AND M.Reference1 LIKE "%${Reference1}%" `); 
                        if (ProviderId) inserChanges(`AND M.ProviderId=${ProviderId} `); 
                        if (MakerId) inserChanges(`AND M.MakerId=${MakerId} `); 
                        if (CapacityMin && CapacityMax) inserChanges(`AND M.Capacity BETWEEN ${CapacityMin} AND ${CapacityMax} `); 
                        if (Unit) inserChanges(`AND M.Unit="${Unit}" `);
                        setSql = setSql.replace('INSERT', '');
                        setSqlTotal = setSqlTotal.replace('INSERT', '');
                } else {
                    ParentId ? inserChanges(`AND S.ParentId=${ParentId} `) : inserChanges(`AND S.ParentId IS NULL`); 
                    setSql = setSql.replace('INSERT', '');
                    setSqlTotal = setSqlTotal.replace('INSERT', '');
                }

                this.db.runSQLSentence(setSql)
                .then(data => {
                    this.db.runSQLSentence(setSqlTotal)
                    .then(total => {

                        
                        if(data && data.length > 0){

                            let promises = [];

                            data.forEach((element) => {
                                promises.push(
                                    this.getChildSets({ ParentId:element.SetId  })
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

                            // resolve({
                            //     data, 
                            //     total:total[0]['total']
                            // })
                            
                        } else {
                            resolve({
                                data:[], total:0
                            })
                        }

                        
                    }).catch(err => reject('Error traer total equipos ', err))
                }).catch(err => reject('Error traer equipos ', err))
            } else {
                reject('Error equipos limit, skip')
            }
        })
    }

    getSetId({SetId}){
        return new Promise((resolve, reject)=>{
            if(SetId){
                const setSql = `
                SELECT * FROM Sets WHERE SetId=${SetId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(setSql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen Sets con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar SetId en los query params')
            }
        })
    }

    getChildSets({ParentId}){
        return new Promise((resolve, reject)=>{
            if(ParentId){
                const setSql = `
                SELECT * FROM Sets WHERE ParentId=${ParentId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(setSql).then(async (result) => {
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

const setsController = new SetsController();
module.exports = setsController;


