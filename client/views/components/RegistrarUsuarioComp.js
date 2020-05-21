import alertas from './AlertasComp'
import utilsServ from '../../services/UtilsServ'
import config from '../../config'
let moment = require("moment")

let RegistrarUsuarioComp = {
  render: async () => {
    let view =  /*html*/` 
      <div class="row justify-content-center mt-3">
        <form class="csForm modal-content modal-sm" id="formCrear">
          <fieldset>
            <div class="modal-header p-0">
              <legend class="modal-title" id="exampleModalLongTitle"> Crear Usuario</legend>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                <div class="form-group col">
                  <i class="position-absolute">Examinar Foto</i>
                  <label for="pAvatar" class="text-center">
                    <input type="hidden" name="pAvatar" id="pAvatar" value="[]" class="json">
                    <canvas id="canvasFile" width="300" height="300" class="img-circle" style="width: 7rem; height: 7rem;"></canvas>
                    <input type="file" name="pAvatarFile" id="pAvatarFile" placeholder="Imagen" required="required" class="form-control file-img" style="height: 100%;"/>
                  </label>
                </div>
                <div class="form-group col">
                  <label for="alias">Apellidos y Nombres : </label>
                  <input type="text" name="pAlias" id="pAlias" required="required" placeholder="Apellidos y Nombres" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="cuenta">Usuario : </label>
                  <input type="text" name="pCuenta" id="pCuenta" required="required" placeholder="Correo" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="clave">Contraseña : <i title="Mayor a 6 caracteres">?</i></label>
                  <input type="password" name="pClave" id="pClave" required="required" placeholder="Contraseña" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="clave">Confirmación : </label>
                  <input type="password" name="clave2" id="clave2" required="required" placeholder="Confirmación" size="30" class="form-control">
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center p-2">
              <button type="submit" class="btn btn-sm btn-primary">
                <i class="fa fa-save"></i> Guardar
              </button>
            </div>
            <div id="msj" class="bg-info"></div>
          </fieldset>
        </form>
      </div>
      `
      return view
  },


  after_render: async () => {
      
      (function(){
        $("#pAvatarFile").on("change", function(){
          utilsServ.minimizarImg({'imge':'avatar_ax','input':'pAvatar','canvas':'canvasFile', 'obj':this});
          setTimeout(()=>{
            utilsServ.imagenUpload({"idCanvas":"canvasFile", "idValor":"pAvatar"});
          }, 500)
        })
          console.log("$%&$%&$%&$%&$")
      })();
      $("#formCrear").submit(function(e) {
          e.preventDefault();
          if($("#pClave").val()!==$("#clave2").val()){
            $("#msj").html(`Las claves son incorrectas`);
            return false;
          }
          if($("#pClave").val().length < 6){
            $("#msj").html(`La Clave debe tener mas de almenos 6 caracteres`);
            return false;
          }
          var dt = utilsServ.formInput(this);

          var p =`mutation{createUserAnuncios(input:{${dt}}){
              string
            }
          }`;
          utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
          .then(res => {
            var d = res.data.createUserAnuncios;
            console.log("######", d)
            if(d.string != "ok"){
              $("#pnlModal").modal("toggle");
              alertas.ok("Se registro Correctamente");
            }else{
              alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
            }
          });
      });
      
  }


}

export default RegistrarUsuarioComp;