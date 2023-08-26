const { validateRol } = require("../variables/validateRol");


exports.validateRolMiddleware = function (action){
    return (req, res, next) => {
        const { body } = req;
        let CompanyId = body.CompanyId ? body.CompanyId : 1;
        let result = validateRol(req.body.userdb,CompanyId,action);
        if(!result.permission){
            return res.status(401).json({
                status: false,
                mss: result.mss,
                errors : result.mss
            })
        }
        next();
    }
}