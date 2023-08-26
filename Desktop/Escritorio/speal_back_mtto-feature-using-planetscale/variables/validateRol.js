const roles = [ 'editor','colaborator','client_admin','client_visor','client_colaborator']

// Permisos [Leer, Escribir, verUsuarios, EditarUsuarios, global]
const rolesPermissions = {
    admin:[true, true, true, true, true],
    editor:[true, true, true, false, true],
    colaborator:[true, false, true, false, true],
    client_admin:[true, true, true, true, false],
    client_visor:[true, false, true, false, false],
    client_colaborator:[true, false, false, false, false]
};
const permissions = {
    read:'leer',
    write:'escribir',
    users:'usuarios',
    users_edit:'editar_usuarios',
    global:'global',
};

const validatePermission = (rol, permission)=> {
    let perm;
    switch (permission) {
        case permissions.read: perm = 0; break;
        case permissions.write: perm = 1; break;
        case permissions.users: perm = 2; break;
        case permissions.users_edit: perm = 3; break;
        case permissions.global: perm = 4; break;
    }
    return rolesPermissions[rol][perm] ? rolesPermissions[rol][perm] : false
}

const generatePermissionsFront = (userDb) =>{
    let permissionsFront = {};
    for (const key in rolesPermissions) {
        if(userDb.Rol == key){
            permissionsFront = {};
            for (const key2 in permissions) {
                permissionsFront[key2] = validatePermission(key, permissions[key2]);
            }
        }
    }
    return permissionsFront;
}

const validateSameCompany = (userDb, CompanyId) => {
    return userDb.CompanyId == CompanyId
}

const validatePermisionGlobal = (userDb, CompanyId) => {
    let result = { mss:undefined, permission: false };
    const updateResult = (mss, permission) => {
        result = { mss, permission };
    }
    if (!validateSameCompany(userDb.CompanyId, CompanyId)) {
        if(validatePermission(userDb.Rol, permissions.global)){
            updateResult("Con permisos globales",true);
        } else {
            updateResult("No tiene permisos globales",false);
        }
    } else {
        updateResult("Con permisos",true);
    }
    return result;
}

const validateRol = (userDb, CompanyId, action) => {

    let globalPermissions = validatePermisionGlobal(userDb, CompanyId);

    if(!globalPermissions.permission){
        return globalPermissions;
    }

    let result = { mss:undefined, permission: false };
    const updateResult = (mss, permission) => {
        result = { mss, permission };
    }

    if (validatePermission(userDb.Rol, action)) {
        updateResult(`Permiso para ${permissions[action]} Aceptado!. Usuario ${userDb.Rol}.`,true);
    } else {
        updateResult(`Permiso para ${permissions[action]} negado!. Usuario ${userDb.Rol}.`,false);
    }

    return result

}

module.exports = { roles, validateRol, permissions, validatePermission, generatePermissionsFront };
