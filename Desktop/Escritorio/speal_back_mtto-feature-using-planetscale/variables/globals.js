const units = [ 'PSI','CM3','M3','M2','M','SCFM','CFM','KG','GR','TN','KM','MM','%']
const typeDocs = [ 'CC','NIT','RUT','#','REGISTRO','ID']
const typeOrders = {
    0: 'Reporte',
    1: 'Mantenimiento',
    2: 'Garantia',
}
const statesOrders = {
    0: 'Pendiente',
    1: 'Proceso',
    2: 'Suspendido',
    3: 'Terminado',
}
const typeFiles = {
    0: 'Equipos',
    1: 'Documentos'
}
const stateItems = {
    0: 'Normal',
    1: 'Fuga/Escape',
    2: 'Ruptura'
}
module.exports = { units, typeDocs, typeOrders, statesOrders, typeFiles, stateItems };
