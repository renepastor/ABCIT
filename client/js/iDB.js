/*****
 * Base de datos
 */
let DB_NAME = 'BDfacturacion';
let DB_VERSION = 3; // Use a long long for this value (don't use a float)
let DB_STORE_NAME = 'clientes';
let db; 

function openDb() {
  var req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function (evt) {
      db = this.result;
      console.log("open Db DONE");
  };
  req.onerror = function (evt) {
      console.error("Error open Db:", evt.target.errorCode);
  };

  req.onupgradeneeded = function (evt) {
    var usuarios = evt.currentTarget.result.createObjectStore("usuarios", { keyPath: 'id', autoIncrement: true });
    usuarios.createIndex('cuenta', 'cuenta', { unique: true });
    usuarios.createIndex('clave', 'clave', { unique: false });
    usuarios.createIndex('alias', 'alias', { unique: false });

    var clientes = evt.currentTarget.result.createObjectStore("clientes", { keyPath: 'idCliente', autoIncrement: true });
    clientes.createIndex('id', 'id', { unique: true });
    clientes.createIndex('complemento', 'complemento', { unique: false });
    clientes.createIndex('extension', 'extension', { unique: false });
    clientes.createIndex('nombreRazonSocial', 'nombreRazonSocial', { unique: false });
    clientes.createIndex('idParamTipoDocumentoIdentidad', 'idParamTipoDocumentoIdentidad', { unique: false });
    clientes.createIndex('nitCi', 'nitCi', { unique: false });

    var clientesDetalle = evt.currentTarget.result.createObjectStore("clientesDetalle", { keyPath: 'idClienteDetalle', autoIncrement: true });
    clientesDetalle.createIndex('id', 'id', { unique: true });
    clientesDetalle.createIndex('idCliente', 'idCliente', { unique: false });
    clientesDetalle.createIndex('nombreRazonSocial', 'nombreRazonSocial', { unique: false });
    clientesDetalle.createIndex('nombreComercial', 'nombreComercial', { unique: false });
    clientesDetalle.createIndex('email', 'codigoProducto', { unique: false });
    clientesDetalle.createIndex('celular', 'producto', { unique: false });
    clientesDetalle.createIndex('fechaInicio', 'fechaInicio', { unique: false });
    clientesDetalle.createIndex('fechaFin', 'fechaFin', { unique: false });

    var pais = evt.currentTarget.result.createObjectStore("pais", { keyPath: 'id', autoIncrement: true });
    pais.createIndex('idPais', 'idPais', { unique: true });
    pais.createIndex('codigo', 'codigo', { unique: false });
    pais.createIndex('nombre', 'nombre', { unique: false });
    pais.createIndex('direccion', 'direccion', { unique: false });

    var facturas = evt.currentTarget.result.createObjectStore("facturas", { keyPath: 'id', autoIncrement: true });
    facturas.createIndex('idFactura', 'idFactura', { unique: false });
    facturas.createIndex('idContrato', 'idContrato', { unique: false });
    //facturas.createIndex('ubicacion', 'ubicacion', { unique: false });
    facturas.createIndex('codigoProducto', 'codigoProducto', { unique: false });
    //facturas.createIndex('producto', 'producto', { unique: false });
    facturas.createIndex('precioUnitario', 'precioUnitario', { unique: false });
    facturas.createIndex('cantidad', 'cantidad', { unique: false });
    facturas.createIndex('precioTotal', 'precioTotal', { unique: false });
    //facturas.createIndex('tipoUnidad', 'tipoUnidad', { unique: false });
    facturas.createIndex('razonSocial', 'razonSocial', { unique: false });
    facturas.createIndex('nit', 'nit', { unique: false });
    facturas.createIndex('estadoFactura', 'estadoFactura', { unique: false });
    facturas.createIndex('estadoEnvio', 'estadoEnvio', { unique: false });
    
    var personas = evt.currentTarget.result.createObjectStore("personas", { keyPath: 'id', autoIncrement: true });
    personas.createIndex('idPersona', 'idPersona', { unique: true });
    personas.createIndex('primerNombre', 'primerNombre', { unique: false });
    personas.createIndex('segundoNombre', 'segundoNombre', { unique: false });
    personas.createIndex('primerApellido', 'primerApellido', { unique: false });
    personas.createIndex('segundoApellido', 'segundoApellido', { unique: false });
    personas.createIndex('telefono', 'telefono', { unique: false });
    personas.createIndex('direccion', 'direccion', { unique: false });
    personas.createIndex('ci', 'ci', { unique: false });
    personas.createIndex('extensionCi', 'seextensionCixo', { unique: false });
    personas.createIndex('fecNacimiento', 'fecNacimiento', { unique: false });
    personas.createIndex('estadoCivil', 'estadoCivil', { unique: false });
    personas.createIndex('usuario', 'usuario', { unique: false });

    // Parametros de la base
    var parametros = evt.currentTarget.result.createObjectStore("parametros", { keyPath: 'id', autoIncrement: false });
    parametros.createIndex('valor', 'valor', { unique: false });
    parametros.createIndex('descripcion', 'descripcion', { unique: false });
    parametros.createIndex('editor', 'editor', { unique: false });
    parametros.createIndex('editado', 'editado', { unique: false });

  };
}
function getObjectStore(store_name, mode) {
  var tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}
function clearObjectStore() {
  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  var req = store.clear();
  req.onsuccess = function(evt) {
  displayActionSuccess("Store cleared");
  displayPubList(store);
  };
  req.onerror = function (evt) {
  console.error("clearObjectStore:", evt.target.errorCode);
  displayActionFailure(this.error);
  };
}

function addPublication(dataInsert, DB_STORE_NAME) {
  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  var req;
  try {
      req = store.add(dataInsert);
  } catch (e) {
      if (e.name == 'DataCloneError')
          displayActionFailure("This engine doesn't know how to clone a Blob, " + "use Firefox");
      throw e;
  }
  req.onsuccess = function (evt) {
      //console.log("Insertion in DB successful");
      displayActionSuccess();
      //displayPubList(store);
  };
  req.onerror = function() {
      console.log("addPublication error", this.error);
      displayActionFailure(this.error);
  };
}
function putPublication(id, dataPut, DB_STORE_NAME) {
  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  store.get(id).onsuccess = function(event) {
    var data = Object.assign(event.target.result, dataPut);
    store.put(data).onsuccess = function(event) {
      console.log("Update...", event.target.result);
    };
  };
}
function displayActionSuccess(msg) {
  msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
  $('#msg').html('<span class="action-success">' + msg + '</span>');
}
function displayActionFailure(msg) {
  msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
  $('#msg').html('<span class="action-success">' + msg + '</span>');
}
function dropDB(){
  var store = getObjectStore("contratos", 'readwrite');
  var req = store.clear();
  store = getObjectStore("clientes", 'readwrite');
  req = store.clear();
  store = getObjectStore("usuarios", 'readwrite');
  req = store.clear();
  store = getObjectStore("pais", 'readwrite');
  req = store.clear();
  store = getObjectStore("personas", 'readwrite');
  req = store.clear();
  store = getObjectStore("facturas", 'readwrite');
  req = store.clear();
  store = getObjectStore("temporales", 'readwrite');
  req = store.clear();
}


function apiServerData(query) {
  //console.log(query);
  query = JSON.stringify({"query":query});
  var misCabeceras = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  if (localStorage && localStorage.token) {
    misCabeceras = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    });
  }
  var miInit = { method: 'POST',
                headers: misCabeceras,
                mode: 'cors',
                body: query };
  return fetch(HOSTSERV+'/graphql',miInit).then(res => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  }); //capch no da el error
}

export {openDb,getObjectStore, clearObjectStore, addPublication, putPublication, dropDB}