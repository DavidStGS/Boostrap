const { BUCKET, BUCKET_URL } = require('../config/config');
const myDB = require("../database/actionsDb");
const uploadService =  require('../services/uploadFile')

class CompanyController{

    db;

    constructor(){
        this.db = myDB;
    }

    createCompany({
        Name, Address, City, State, Country, Phone, Image, Coors, Doc, TypeDoc
    }){
        return new Promise( (resolve, reject)=> {
            if(Name && Address && City && State && Country && Phone && Image && Coors && Doc && TypeDoc){
                const nameImage = `mtto/companies/${Phone}`;
                let urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                const companySql = `
                INSERT INTO Companies (Name, Address, City, State, Country, Phone, Image, Coors, Doc, TypeDoc)
                VALUES( "${Name}","${Address}","${City}","${State}","${Country}","${Phone}","${urlImage}", "${Coors}", "${Doc}", "${TypeDoc}");
                `;
                this.db.runSQLSentence(companySql).then(async (result) => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos Name, Address, City, State, Country, Phone, Image, Coors, Doc, TypeDoc')
            }
        });
    }

    updateCompany({
        CompanyId, Name, Address, City, State, Country, Phone, Image, Coors, Doc, TypeDoc
    }){
        return new Promise( (resolve, reject)=> {
            if(CompanyId && Name && Address && City && State && Country && Phone && Coors && Doc && TypeDoc){
                
                let nameImage;
                let urlImage;
                let companySql = `
                UPDATE Companies
                SET Name="${Name}",
                    Address="${Address}",
                    City="${City}",
                    State="${State}",
                    Country="${Country}",
                    Phone="${Phone}",
                    Doc="${Doc}",
                    TypeDoc="${TypeDoc}",
                    Coors="${Coors}"${Image ? ',' : ''}
                    MYIMAGE
                WHERE CompanyId = "${CompanyId}";
                `;
                if( typeof Image == 'string'){
                    if(!Image.includes('http')){
                        nameImage = `mtto/companies/${Phone}`;
                        urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                        companySql =  companySql.replace('MYIMAGE', `Image="${urlImage}"`);
                    } else companySql =  companySql.replace('MYIMAGE', '');
                } else {
                    companySql =  companySql.replace('MYIMAGE', '');
                }

                const createImage = async ()=> {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                }

                this.getCompanyId({CompanyId})
                .then(async(oldCompany) => {
                    if(Image){
                        if(typeof Image == 'string' && !Image.includes('http')){
                            if(Image.includes('https://speal.')){
                                await uploadService.deleteFile(oldCompany.Image).then(async () => {
                                    createImage();
                                });
                            } else {
                                createImage();
                            }
                        }
                    }
                    this.db.runSQLSentence(companySql).then(async (result) => {
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
                reject('Datos incompletos, requeridos CompanyId, Name, Address, City, State, Country, Phone, Image, Coors, Doc, TypeDoc')
            }
        });
    }

    deleteCompany({CompanyId}){

        return new Promise((resolve, reject)=>{

            if(CompanyId){
                let companySql = `
                UPDATE Companies
                SET Deleted=1
                WHERE CompanyId = ${CompanyId} AND Admin = 0;
                `;
                this.getCompanyId({CompanyId})
                .then(async(oldCompany) => {
                    uploadService.deleteFile(oldCompany.Image).then(()=>{
                        this.db.runSQLSentence(companySql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el elemento '+ CompanyId)
            }

        })

    }

    getCompanies({
        search, limit, skip
    }){
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let companySql = `
                SELECT * FROM Companies WHERE  Deleted=0 ${ search ? 'AND Name LIKE "%'+search+'%"' : ''}
                LIMIT ${limit} OFFSET ${skip};
                `;
                let companySqlTotal = `SELECT COUNT(*) AS total FROM Companies WHERE  Deleted=0 ${ search ? 'AND Name LIKE "%'+search+'%"' : ''}`;
                this.db.runSQLSentence(companySql)
                .then(data => {
                    this.db.runSQLSentence(companySqlTotal)
                    .then(total => {
                        resolve({
                            data, total:total[0]['total']
                        })
                    }).catch(err => reject('Error traer total compañias ', err))
                }).catch(err => reject('Error traer compañias ', err))
            } else {
                reject('Error requerido limit, skip')
            }
        })
    }

    getCompanyId({CompanyId}){
        return new Promise((resolve, reject)=>{
            if(CompanyId){
                const companySql = `
                SELECT * FROM Companies WHERE CompanyId = ${CompanyId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(companySql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen compañias con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar CompanyId en los query params')
            }
        })
    }
}

const companyController = new CompanyController();
module.exports = companyController;
