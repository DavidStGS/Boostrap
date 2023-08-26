const { BUCKET, BUCKET_URL } = require('../config/config');
const myDB = require('../database/actionsDb');
const { generatePass } = require('../services/encrypt');
const uploadService =  require('../services/uploadFile')

class UserController{

    db;

    constructor(){
        this.db = myDB;
    }

    createUser({
        LastName, FirstName, Email, Position, Phone, Rol, CompanyId, Password, Image
    }){
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject)=> {
            if(LastName && FirstName && Email && Position && Phone && Rol && CompanyId && Password && Image){
                const nameImage = `mtto/users/${Phone}-${Rol}-${CompanyId}`;
                let urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                let passDB = await generatePass(Password);
                const userSql = `
                INSERT INTO Users (LastName, FirstName, Email, Position, Phone, Rol, CompanyId, Password,Image)
                VALUES( "${LastName}","${FirstName}","${Email}","${Position}","${Phone}","${Rol}","${CompanyId}", "${passDB}","${urlImage}");
                `;
                this.db.runSQLSentence(userSql).then(async (result) => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                    resolve(result)
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Datos incompletos, requeridos LastName, FirstName, Email, Position, Phone, Rol, CompanyId, Password, Image')
            }
        });
    }

    updateUser({
        UserId, LastName, FirstName, Email, Position, Phone, Rol, CompanyId, Image
    }){
        return new Promise((resolve, reject)=> {
            if(LastName && FirstName && Email && Position && Phone && Rol && CompanyId && UserId){
                
                let nameImage;
                let urlImage;
                let userSql = `
                UPDATE Users
                SET LastName="${LastName}",
                    FirstName="${FirstName}",
                    Email="${Email}",
                    Position="${Position}",
                    Phone="${Phone}",
                    Rol="${Rol}",
                    CompanyId="${CompanyId}"MYIMAGE
                WHERE UserId=${UserId};
                `;
                if( typeof Image == 'string'){
                    if(!Image.includes('http')){
                        nameImage = `mtto/users/${Phone}-${Rol}-${CompanyId}`;
                        urlImage = `https://${BUCKET}.${BUCKET_URL}/${nameImage}.jpg`;
                        userSql =  userSql.replace('MYIMAGE', `,Image="${urlImage}"`);
                    } else userSql =  userSql.replace('MYIMAGE', '');
                } else {
                    userSql =  userSql.replace('MYIMAGE', '');
                }

                const createImage = async () => {
                    if (!Image.includes('data:image/png;base64')){
                        Image = `data:image/png;base64,${Image}`;
                    }
                    await uploadService.createFile(nameImage, Image);
                }

                this.getUserId({UserId})
                .then(async(oldUser) => {
                    if(Image){
                        if(typeof Image == 'string' && !Image.includes('http')){
                            if(Image.includes('https://speal.')){
                                await uploadService.deleteFile(oldUser.Image).then(async () => {
                                    createImage();
                                });
                            } else {
                                createImage();
                            }
                            await uploadService.deleteFile(oldUser.Image);
                        }
                    }
                    this.db.runSQLSentence(userSql).then(async (result) => {
                        resolve(result)
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))
                
            } else {
                reject('Datos incompletos, requeridos UserId, LastName, FirstName, Email, Position, Phone, Rol, CompanyId')
            }
        });
    }

    getUserId({UserId}){
        return new Promise((resolve, reject)=>{
            if(UserId){
                const userSql = `
                SELECT * FROM Users WHERE UserId = ${UserId} AND Deleted = 0;
                `;
                this.db.runSQLSentence(userSql).then(async (result) => {
                    if(result.length >= 1)
                    resolve(result[0])
                    else reject('No existen usuarios con este id')
                }).catch(err => {
                    reject(err)
                });
            } else {
                reject('Debe eviar UserId en los query params')
            }
        })
    }

    getUserPhone(Phone){
        return new Promise((resolve, reject)=>{
            const userSql = `
            SELECT * FROM Users WHERE Phone = ${Phone} AND Deleted = 0;
            `;
            this.db.runSQLSentence(userSql).then(async (result) => {
                if(result.length >= 1)
                resolve(result[0])
                else reject('No existen usuarios con este telefono')
            }).catch(err => {
                reject(err)
            });
        })
    }

    deleteUser({UserId}){

        return new Promise((resolve, reject)=>{

            if(UserId){
                let userSql = `
                UPDATE Users
                SET Deleted=1
                WHERE UserId=${UserId};
                `;
                this.getUserId({UserId})
                .then(async(oldCompany) => {
                    uploadService.deleteFile(oldCompany.Image).then(()=>{
                        this.db.runSQLSentence(userSql).then(async (result) => {
                            resolve(result)
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch(err => {
                        reject(err)
                    });
                }).catch(err => reject(err))

            } else {
                reject('Error al eliminar el elemento enviar UserId '+ UserId)
            }

        })

    }

    getUsers({
        limit, skip, CompanyId, search
    }){
        console.log({
            limit, skip, CompanyId
        });
        return new Promise((resolve, reject)=>{
            if(limit && skip){
                let userSql = `
                SELECT * FROM Users WHERE Deleted=0
                ${ CompanyId ? 'AND CompanyId='+CompanyId : ''}
                ${ search ? 'AND FirstName LIKE "%'+search+'%"' : ''}
                LIMIT ${limit} OFFSET ${skip};
                `;
                let userSqlTotal = `
                SELECT COUNT(*) AS total FROM Users WHERE Deleted=0
                ${ CompanyId ? 'AND CompanyId='+CompanyId : ''}
                ${ search ? 'AND FirstName LIKE "%'+search+'%"' : ''};
                `;
                this.db.runSQLSentence(userSql)
                .then(data => {
                    this.db.runSQLSentence(userSqlTotal)
                    .then(total => {
                        resolve({
                            data, total:total[0]['total']
                        })
                    }).catch(err => reject('Error traer total usuarios ', err))
                }).catch(err => reject('Error traer usuarios ', err))
            } else {
                reject('Error requerido limit y skip.')
            }
        })
    }

}

module.exports = UserController;