var moment = require('moment');
import config from '../../config'
let AlertasComp = {
    ok: async (msj, title="") => {
      var id = moment().format("YYYYMMDDHmmssSSS");
      $("#msjLoad").append(`
      <div role="alert" id="${id}" aria-live="assertive" aria-atomic="false" class="action toast show bg-info text-dark" data-autohide="true">
        <div class="toast-header bg-info text-dark">
          <i class="fa fa-check"></i>
          <strong class="mr-auto">  ${title}</strong>
          <small>${moment().format("DD/MM hh:mm")}</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body"> ${msj}</div>
      </div>`);
      //$("#msjLoad").on("click","#"+id+" .close", function(){$("#"+id).remove();});
      //setTimeout(()=>{document.getElementById(id).remove()}, config.TIME_MSJ);
      $("#"+id).toast('show');
      $("#"+id).toast({delay: config.TIME_MSJ});
    },
    aviso: async (msj, title="Aviso") => {
      var id = moment().format("YYYYMMDDHmmssSSS");
      $("#msjLoad").append(`
      <div role="alert" id="${id}" aria-live="assertive" aria-atomic="true" class="toast show bg-warning text-dark" data-autohide="true">
        <div class="toast-header bg-warning text-dark">
          <i class="fa fa-warning-circle"></i>
          <strong class="mr-auto">  ${title}</strong>
          <small>${moment().format("DD/MM hh:mm")}</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">${msj}</div>
      </div>`);
      //$("#msjLoad").on("click","#"+id+" .close", function(){$("#"+id).remove();});
      //setTimeout(()=>{document.getElementById(id).remove()}, config.TIME_MSJ);
      $("#"+id).toast('show');
      $("#"+id).toast({delay: config.TIME_MSJ});
    },
    error: async (msj, title="Error") => {
      var id = moment().format("YYYYMMDDHmmssSSS");
      $("#msjLoad").append(`
      <div role="alert" id="${id}" aria-live="assertive" aria-atomic="false" class=" action toast show bg-danger text-dark" data-autohide="true">
        <div class="toast-header bg-danger text-light">
          <i class="fa fa-shield"></i>
          <strong class="mr-auto">  ${title}</strong>
          <small>${moment().format("DD/MM hh:mm")}</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body text-light">${msj}</div>
      </div>`);
      $("#msjLoad").on("click","#"+id+" .close", function(){$("#"+id).remove();});
      setTimeout(()=>{document.getElementById(id).remove()}, config.TIME_MSJ);
      //$("#"+id).toast('show');
      //$("#"+id).toast({delay: config.TIME_MSJ});
    }

}

export default AlertasComp;