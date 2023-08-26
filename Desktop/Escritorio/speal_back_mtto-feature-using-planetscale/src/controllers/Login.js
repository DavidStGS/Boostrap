const getToken = require("../services/auth");
const { comparePass } = require("../services/encrypt");
const UserController = require("./Users");


class LoginController{

    userController;

    constructor(){
        this.userController = new UserController();
    }

    login({ Phone, Password }){
        return new Promise((resolve,reject)=>{
            if(Phone && Password){
                this.userController.getUserPhone(Phone).then(async user =>{
                    const passIsCorrect = await comparePass(Password, user.Password);
                    if(passIsCorrect){
                        resolve(getToken(user));
                    } else {
                        reject('Contraseña incorrecta')
                    }
                }).catch(err => reject(err));
            } else {
                reject('Es necesario Phone y Password')
            }
        })
    }

}

module.exports = LoginController;