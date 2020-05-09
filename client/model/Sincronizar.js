import {openDb, addPublication, putPublication}  from '../js/iDB'
import {HOST_SERVICE, MSJ_ERROR, MSJ, PARAMETROS} from '../js/conf'
import {fnfetch} from '../js/lib'
var moment = require('moment');


const setImportarFacturacion = function(){
    openDb();
    // importar datos a BD local
    $('#msjLoad').show();
    var serviceCleinete = fnfetch(HOST_SERVICE+"clientes").then(res => res);
    var serviceCleineteDetalle = fnfetch(HOST_SERVICE+"clientesDetalle").then(res => res);
    Promise.all([serviceCleinete, serviceCleineteDetalle]).then(function(values){
        var apiCliente = values[0];
        var apiClienteDetalle = values[1];
        apiCliente.map(cliente => addPublication(cliente, "clientes"));
        apiClienteDetalle.map(clienteDetalle => addPublication(clienteDetalle, "clientesDetalle"));
        PARAMETROS.map(parametro => addPublication(parametro, "parametros"));

        let datoUsuario = JSON.parse(localStorage.getItem("dataUser"));
        let datoParametro = {
            valor: moment().format("DD/MM/YYYY hh:mm"),
            editor: datoUsuario.userName,
            editado: moment().format("DD/MM/YYYY hh:mm")
        };
        putPublication("SINCRONIZADO", datoParametro, "parametros"); //Almacenamos fecha de sincronizacion
        $('#msjLoad').append(MSJ('Se a completado la sincronización'));
    })
    .catch(err => {
        $('#msjLoad').append(MSJ_ERROR(`Al parecer tenemos problemas de conexion <span hidden>${err}</span>`));
    });
}
export {setImportarFacturacion}