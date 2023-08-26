const { BUCKET, BUCKET_URL } = require('../config/config');
const myDB = require("../database/actionsDb");
const uploadService =  require('../services/uploadFile')

class FilesController{

    db = myDB;

    getFiles({ OrderId }){
        return new Promise((resolve, reject)=>{
            if(OrderId){
                const orderSql = `SELECT * FROM Files WHERE OrderId="${OrderId}";`;
                this.db.runSQLSentence(orderSql).then(async (result) => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe enviar OrderId en los query params')
            }
        })
    }

    async createFile({
        OrderId, DateFile, File, Title, Type, SetId, Description
    }){
        return new Promise((resolve, reject)=> {

            if( OrderId && DateFile && File && Title && this.db.isNumeric(Type) ){

                const resultFile = {
                    mime: File.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0],
                    ext: File.match(/[^:/]\w+(?=;|,)/)[0]
                }

                console.log('resultFile ', resultFile);
                
                const nameImage = `mtto/files/${Title.replace(/\s+/g, '')}-${Date.now()}`;
                let urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.${resultFile.ext}`;
                let setSql = `INSERT INTO Files ( OrderId, DateFile, File, Title, Type INSERT1) 
                VALUES( "${OrderId}",${DateFile},"${urlImage}","${Title}",${Type} INSERT2);`;

                const inserChanges = (prop, value) => {
                    const indexInsert1 = setSql.indexOf('INSERT1');
                    setSql = this.db.insertText(setSql, indexInsert1, prop);
                    const indexInsert2 = setSql.indexOf('INSERT2');
                    setSql = this.db.insertText(setSql, indexInsert2, value);
                }

                if( SetId || Description){
                    if (Description) inserChanges(', Description',`, "${Description}"`); 
                    if (SetId) inserChanges(', SetId', `, ${SetId}`)
                }
                setSql = setSql.replace('INSERT1', '');
                setSql = setSql.replace('INSERT2', '');

                console.log(setSql);
                this.db.runSQLSentence(setSql).then(async (result) => {
                    if (!File.includes('data:')){
                        File = `data:${resultFile.mime};base64,${File}`;
                    }
                    await uploadService.createFile(nameImage, File);
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos OrderId, Date, File, Title, Type')
            }
        });
    }

    deleteFile({FileId}){

        return new Promise((resolve, reject)=>{
            if(FileId){
                let fileSql = `DELETE FROM Files WHERE FileId=${FileId};`;
                this.getFileId({ FileId })
                .then(async(oldFile) => {
                    uploadService.deleteFile(oldFile.File).then(()=>{
                        this.db.runSQLSentence(fileSql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el modelo ID = '+ FileId)
            }

        })

    }

    getFileId({FileId}){
        return new Promise((resolve, reject)=>{
            if(FileId){
                const fileSql = `
                SELECT * FROM Files WHERE FileId=${FileId};
                `;
                this.db.runSQLSentence(fileSql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen Models con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar FileId en los query params')
            }
        })
    }

}

const filesController = new FilesController();
module.exports = filesController;
