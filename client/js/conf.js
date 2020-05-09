const HOST_SERVICE = "./";
const SECRET_TOKEN = "&3344SF87098A8D323%&RETYXYGTE5YGT6YRETE";
const LIMIT_PG = 10;
var moment = require('moment');



// Menu estatico
const MENU = [
    {"rol":"publico","data":[
        {"ruta":"#/cambiarPasswordOff", "descripcion":"Cambiar Clave","img":"fa-key"}
    ]},
    {"rol":"lecturador","data":[
        {"ruta":"#/facturar", "descripcion":"Facturar","img":"fa-credit-card"},
        {"ruta":"#/clientes", "descripcion":"Clientes","img":"fa-users"},
        {"ruta":"#/parametros", "descripcion":"Parametros","img":"fa-cubes"},
        {"ruta":"#/sincronizar", "descripcion":"Sincronizar","img":"fa-refresh"},
        {"ruta":"#/cambiarClave", "descripcion":"Cambiar Clave","img":"fa-key"}
    ]},
    {"rol":"lecturadorOff","data":[
        {"ruta":"#/facturar", "descripcion":"Facturar","img":"fa-credit-card"},
        {"ruta":"#/clientes", "descripcion":"","img":"fa-users"},
        {"ruta":"#/cambiarClave", "descripcion":"Cambiar Clave","img":"fa-key"}
    ]}
];

// Parmetros para el sistema
const PARAMETROS = [
  {"id":"SINCRONIZADO","valor":"", "descripcion":"Ultima fecha de Sincronozacion","editor":"", "editado":""}
];

// Mensajes
const MSJ = (msj, title="") => {
    return `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast show  bg-warning text-dark" data-autohide="false" onclick="this.remove();" onload="setTimeout(document.querySelector(".toast").remove(), 3000); ">
            <div class="toast-header bg-warning text-dark">
              <i class="fa fa-check"></i>
              <strong class="mr-auto">  ${title}</strong>
              <small>${moment().format("DD/MM hh:mm")}</small>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body"> ${msj}</div>
            </div>`;
}
const MSJ_INFO = (msj, title="Aviso") => {
    return `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast show bg-info text-dark" data-autohide="false" onclick="this.remove();" onload="setTimeout(document.querySelector(".toast").remove(), 3000); ">
            <div class="toast-header bg-info text-dark">
              <i class="fa fa-info-circle"></i>
              <strong class="mr-auto">  ${title}</strong>
              <small>${moment().format("DD/MM hh:mm")}</small>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">${msj}</div>
          </div>`;
}
const MSJ_ERROR = (msj, title="Error") => {
    return `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast show bg-danger text-dark" data-autohide="false" onclick="this.remove();" onload="setTimeout(document.querySelector(".toast").remove(), 3000); ">
            <div class="toast-header bg-danger text-dark">
              <i class="fa fa-shield"></i>
              <strong class="mr-auto">  ${title}</strong>
              <small>${moment().format("DD/MM hh:mm")}</small>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">${msj}</div>
            </div>`;
}
export {HOST_SERVICE, LIMIT_PG, MENU, MSJ_ERROR, MSJ_INFO, MSJ, PARAMETROS}