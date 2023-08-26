const fs = require("fs");

class ConvertCSVToSQL {

  databaseName = 'DATABASE';
  databaseHeaders = 'HEADERS';
  databaseRows = 'ROWS';

  constructor(){

  }

  replaceParams(txt){
    const mapObj = { '\r': '' };
    return txt.replace(/\r/gi, matched => mapObj[matched]);
  }

  isNumeric(str){
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }

  insertText(txt, index, insert){
    return txt.slice(0, index) + insert + txt.slice(index);
  }

  csvToJson(csv, getHeaders){
    let txtInit = csv.toString();
    let array = txtInit.split("\n");
    let result = [];
    let headers = this.replaceParams(array[0]).split('\t');
    if(getHeaders) return headers;

    for (let i = 1; i < array.length; i++) {
      let obj = {}
      let str = this.replaceParams(array[i])
      let properties = str.split('\t')
      for (let j in headers) {
        if (properties[j].includes('\t')) {
          obj[headers[j]] = properties[j]
            .split(",").map(item => item.trim())
        }
        else obj[headers[j]] = this.isNumeric(properties[j]) ? parseInt(properties[j]) : properties[j];
      }
      result.push(obj)
    }
    return result;
  }

  replaceSQLString(stringOriginal, stringSearch, stringReplace){
    const indexName = stringOriginal.indexOf(stringSearch);
    stringOriginal = this.insertText(stringOriginal, indexName, stringReplace);
    return stringOriginal.replace(stringSearch, '');
  }

  validateField(fieldInit){

    if(this.isNumeric(fieldInit)){
      return parseInt(fieldInit);
    } else if(fieldInit === ''){
      return 'NULL'
    } else {
      return `"${fieldInit}"`;
    }
  }

  buildSQLScript( database, csv){
    const rows = this.csvToJson(csv, false);
    const headersList = this.csvToJson(csv, true);
    let scriptSql =  `INSERT INTO ${this.databaseName} ( ${this.databaseHeaders} ) VALUES ${this.databaseRows};`;
    let rowsInternal = [];
    rows.forEach(obj => {
      let row = '(';
      let miarr = [];
      for (let field in obj){
        let fieldInit = `${obj[field]}`
        let fieldFinal = this.validateField(fieldInit);
        miarr.push( fieldFinal );
      }
      row += `${miarr.join(',')})`
      rowsInternal.push(row);
    })
  
    scriptSql = this.replaceSQLString(scriptSql, this.databaseName, database);
    scriptSql = this.replaceSQLString(scriptSql, this.databaseHeaders, headersList.join(','));
    scriptSql = this.replaceSQLString(scriptSql, this.databaseRows, rowsInternal.join(','));
    return scriptSql;
  }

  convertManyCsv(array){
    let result = [];
    array.forEach(element => {
      const csv = fs.readFileSync(element.file)
      const SQLString = this.buildSQLScript(element.database, csv);
      result.push(SQLString);
    });
    return result;
  }

}

const convertCSVToSQL =  new ConvertCSVToSQL();
module.exports = convertCSVToSQL;

// const replaceParams = txt=>{
//   const mapObj = { '\n': '' };
//   return txt.replace(/\n/gi, matched => mapObj[matched]);
// }

// const isNumeric = (str) => {
//   if (typeof str != "string") return false
//   return !isNaN(str) && !isNaN(parseFloat(str)) 
// }

// const insertText = (txt, index, insert) =>{
//   return txt.slice(0, index) + insert + txt.slice(index);
// }

// var txtInit = replaceParams(csv.toString())
// var array = txtInit.split("\r");


// let result = [];
// let headers = array[0].split(',');
 
// for (let i = 1; i < array.length; i++) {
//   let obj = {}
//   // let str = array[i]
//   let s = ''
//   // let flag = 0
//   // for (let ch of str) {
//   //   if (ch === '"' && flag === 0) {
//   //     flag = 1
//   //   }
//   //   else if (ch === '"' && flag == 1) flag = 0
//   //   if (ch === ', ' && flag === 0) ch = '|'
//   //   if (ch !== '"') s += ch
//   // }
//   let properties = s.split('\t')
//   for (let j in headers) {
//     if (properties[j].includes('\t')) {
//       obj[headers[j]] = properties[j]
//         .split(",").map(item => item.trim())
//     }
//     else obj[headers[j]] = isNumeric(properties[j]) ? parseInt(properties[j]) : properties[j];
//   }
//   result.push(obj)
// }


// const databaseName = 'DATABASE';
// const databaseHeaders = 'HEADERS';
// const databaseRows = 'ROWS';
// let strSql =  `INSERT INTO ${databaseName} ( ${databaseHeaders} ) VALUES ${databaseRows};`;


// const replaceSQLString = (stringOriginal, stringSearch, stringReplace) => {
//   const indexName = stringOriginal.indexOf(stringSearch);
//   stringOriginal = insertText(stringOriginal, indexName, stringReplace);
//   return stringOriginal.replace(stringSearch, '');
// }

// const buildSQLScript = ( scriptSql, database, headersList, rows) => {
  
//   let rowsInternal = [];
//   rows.forEach(obj => {
//     let row = '(';
//     let miarr = [];
//     for (let field in obj){
//       let fieldInit = `${obj[field]}`
//       let fieldFinal = isNumeric(fieldInit) ? parseInt(fieldInit) : `"${fieldInit}"`;
//       miarr.push( fieldFinal );
//     }
//     row += `${miarr.join(',')})`
//     rowsInternal.push(row);
//   })

//   scriptSql = replaceSQLString(scriptSql, databaseName, database);
//   scriptSql = replaceSQLString(scriptSql, databaseHeaders, headersList.join(','));
//   scriptSql = replaceSQLString(scriptSql, databaseRows, rowsInternal.join(','));
//   return scriptSql;
// }

// strSql = buildSQLScript(strSql, 'Ejemplo', headers, result);
// console.log(strSql);


// TAREAS VARIAS
// 1.CVS to SQL insert
// 2.Agregar parent ID
// 3.Consultas con rango de fecha para las fechas initDate LastName
// 4.Crear modelo si tiene parentID solo puede ser modelos hijos del modelo padre OJO
