import {openDb, addPublication, putPublication}  from '../js/iDB'
import {HOST_SERVICE, MSJ_ERROR, MSJ, PARAMETROS} from '../js/conf'
import {fnfetch} from '../js/lib'
var moment = require('moment');


const addUsuario = function(){
    openDb();

}
export {setImportarFacturacion}