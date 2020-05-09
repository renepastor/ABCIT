import alertas from './AlertasComp'
import utilsServ from '../../services/UtilsServ'
import config from '../../config'
let moment = require("moment")

let UsuariosComp = {
    body: async (data) => {
      return `
      <div class="row">
        <div class="col">
            <h5><i class="fa fa-users"></i> Admin. Usuario</h5>
            <div class="input-group mb-0">
                <button class="btn btn-sm btn-new fa fa-plus-square" data-backdrop="static" data-toggle="modal" data-url="/usuarios/add.html" data-target="#pnlModal" id="new">Nuevo</button>
                <input type="search" id="searchUsuario" class="form-control" placeholder="Buscar.." aria-label="Buscar.." aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="btnSearch"><i class="fa fa-search"></i></button>
                </div>
            </div>
                <div class="row bg-primary text-white m-0">
                  <div class="col">Foto</div>
                  <div class="col">Usuario</div>
                  <div class="col">Alias</div>
                </div>
                <ul class="table-responsive" id="pnlEquipos"></ul>
                <div class="row bg-primary text-white m-0" id="pnlEquiposFoot"></div>
        </div>
      </div>
      `;
    },

    list: async (row, r) => {
       $("#pnlEquipos").append(`
          <div class="row ${row.estado} border list-group-item-action m-0 ${(r%2!=0)?'bg-light':''}">
            <div class="col"><img src="${row.foto}" alt="Foto" class="img-circle p-1 border" width="50px"></div>
            <div class="col">${row.cuenta}</div>
            <div class="col">${row.alias}</div>
            <div class="col csHidden position-absolute act text-right" style="z-index:2;">
              <button class="btn btn-sm btn-outline-primary fa fa-edit" title="Modificar Usuario" data-url="/usuarios/edit.html" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.pers_id}"}' data-name="usuarios" id="${row.pers_id}"></button>
            </div>
          </div>`
        );
    },

    add: async () => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formCrearUsuario">
          <fieldset>
            <div class="modal-header p-0">
              <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Crear Usuario</legend>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                
                <div class="form-group col">
                  <label for="foto" class="img-thumbnail">
                    <img src="" id="foto_ax" width="50" height="50" alt="" class="foto"/>
                    <input type="hidden" name="foto" id="foto" class="text">
                    <i>Foto</i>
                    <input type="file" name="fotoFile" id="fotoFile" placeholder="Imagen" required="required" 
                    class="form-control file-img" />
                  </label>     
                </div>
                <div class="form-group col">
                  <label for="alias">Alias : </label>
                  <input type="text" name="alias" id="alias" required="required" placeholder="Alias" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="cuenta">Usuario : </label>
                  <input type="text" name="cuenta" id="cuenta" required="required" placeholder="Usuario" size="30" class="form-control text">
                </div>
              </div>
              <div class="row align-items-start">
                <div class="form-group col">
                  <label for="alias">Roles : </label>
                  <div id="listRoles" class="list-group">Lista roles
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center p-2">
              <button type="submit" class="btn btn-sm btn-primary">
                <i class="fa fa-save"></i> Guardar
              </button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-dismiss="modal">
                Cancelar <i class="fa fa-close"></i> 
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      `);
      $("#fotoFile").on("change", function(){utilsServ.minimizarImg({'imge':'foto_ax','input':'foto'});})
      var q = `query{miUsuario{cuenta persId alias
              usrRolesByUserId{nodes{rolId}}}
              allRoles {nodes {sistema nombre id descripcion}
            }}`;
      utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
      .then(res => {
        var lRolesAsignados = res.data.miUsuario.usrRolesByUserId.nodes;
        var lRoles = res.data.allRoles.nodes;
        $("#listRoles").html("");
        lRoles.map(r =>{
          var select = (lRolesAsignados.find(rAsig => (rAsig.rolId==r.id)) == undefined)?"":"checked='checked'";
          $("#listRoles").append(`<label class="list-group-item"><input ${select} id="${r.id}" name="${r.id}" type="checkbox" ><span>${r.descripcion}</span></label>`)
        });
          
        
        console.log(lRoles);
      }).catch(err => console.log(err));

       $("#formCrearUsuario").submit(function(e) {
        e.preventDefault();
        var data = $(this);
        var est = "C";
        var dt = utilsServ.formInput(this);
        var p =`mutation{createUsuario(input:{usuario:{${dt}}}){
            usuario{persId cuenta alias foto estado}
           }
         }`;
         utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
        .then(res => {
          var d = res.data.createUsuario.usuario;
          if(d.persId>0){
            UsuariosComp.list(d);
            $("#pnlModal").modal("toggle");
            alertas.ok("Se registro Correctamente");
          }else{
            alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
          }
        });
      });
      
    },

    addHistorial: async () => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formCrearEquiposHistorial" method="POST">
        <fieldset>
          <div class="modal-header p-0">
            <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Crear Equipos Historial</legend>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row align-items-start">
              <div class="form-group col">
                <label for="justificacion">Justificacion : </label>
                <input type="text" name="justificacion" id="justificacion"  placeholder="Justificacion" size="30" class="form-control text">
              </div>
              <div class="form-group col">
                <label for="precioUnitario">Precio Unitario : </label>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-outline-primary" onClick="menos('precioUnitario')">-</button>
                  <input type="text" name="precioUnitario" id="precioUnitario" required="required" placeholder="Precio Unitario" max="9999" min="0" step="1" size="5" class="form-control numeric"/>
                  <button type="button" class="btn btn-outline-primary" onClick="mas('precioUnitario')">+</button>
                </div>
              </div>
              <div class="form-group col">
                <label for="fechaInicio">Fecha Inicio : </label>
                <div class='input-group date' id='fechaInicioDtti'>
                  <input type="text" name="fechaInicio" id="fechaInicio" required="required" placeholder="Fecha Inicio" size="16" class="form-control date">
                  <span class="input-group-addon">
                    <span class="fa fa-calendar"></span>
                  </span>
                </div>
              </div>
              <div class="form-group col">
                <label for="fechaFin">Fecha Fin : </label>
                <div class='input-group date' id='fechaFinDtti'>
                  <input type="text" name="fechaFin" id="fechaFin"  placeholder="Fecha Fin" size="16" class="form-control date">
                  <span class="input-group-addon">
                    <span class="fa fa-calendar"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center p-2">
            <input type="hidden" name="equipoId" id="equipoId" required="required" value="" class="form-control int8">
            <button type="submit" class="btn btn-sm btn-primary">
              <i class="fa fa-save"></i> Guardar
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary" data-dismiss="modal">
              Cancelar <i class="fa fa-close"></i>.
            </button>
          </div>
        </fieldset>
        </form>
      </div>`);
      $(function() {
        e.preventDefault();
        var data = $(this);
        var est = "C";
        if(!$("#formCrearEquipos #estado").prop("checked")){
          est ="X";
        }
        var dt = utilsServ.formInput(this);
        var p =`mutation{createEquipo(input:{equipo:{${dt}}}){
            equipo{id descripcion tipo unidadMedida  estado editado usuario}
           }
         }`;
         utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
        .then(res => {
          var d = res.data.createEquipo.equipo;
          if(d.id>0){
            EquiposComp.list(d);
            $("#pnlModal").modal("toggle");
            alertas.ok("Se registro Correctamente");
          }else{
            alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
          }
        });
      });
      
      
      
    },

    edit: async (obj) => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formEditEquipos">
          <fieldset>
            <div class="modal-header p-0">
              <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Crear Equipos</legend>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                <div class="form-group col">
                  <label for="descripcion">Descripcion : </label>
                  <input type="text" name="descripcion" id="descripcion" required="required" placeholder="Descripcion" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="unidadMedida">Unidad Medida : </label>
                  <input type="text" name="unidadMedida" id="unidadMedida" required="required" placeholder="Unidad Medida" size="30" class="form-control text">
                </div>
                <div class="form-group col">
                  <label for="tipo">tipo : </label>
                  <select id="tipo" name="tipo" required="required" class="form-control text">
                    <option value="I">INTERNO</option>
                    <option value="E">EXTERNO</option>
                  </select>
                </div>
                <div class="form-group col">
                  <label for="estado">Estado : </label>
                  <select id="estado" name="estado" required="required" class="form-control text">
                    <option value="A">AVILITAR</option>
                    <option value="E">INAVILITAR</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center p-2">
              <input type="hidden" name="id" id="id" required="required" value="">
              <button type="submit" class="btn btn-sm btn-primary">
                <i class="fa fa-save"></i> Guardar
              </button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-dismiss="modal">
                Cancelar <i class="fa fa-close"></i> 
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      `);
      var p =`query{equipoById(id:"${obj.id}"){id descripcion tipo unidadMedida  estado editado usuario}}`;
      utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
      .then(res => {
        console.log("sssssss.....",res.data.equipoById)
        var row = res.data.equipoById;
        $("#id").val(row.id)
        $("#descripcion").val(row.descripcion)
        $("#unidadMedida").val(row.unidadMedida)
        $("#tipo").val(row.tipo)
      })

       $("#formEditEquipos").submit(function(e) {
        $("#fechaInicioDtti ").datetimepicker({
          format:"L", locale: "es", format: "DD/MM/YYYY"
        });
        $("#equipoId").val($("#idEquipoSelect").val());
        $("#formEditEquipos").submit(function(e) {
          e.preventDefault();
          var data = $(this);
          var dt = utilsServ.formInput(this);
          var p =`mutation{updateEquipoById(input:{id:"${$("#id").val()}" equipoPatch:{${dt}}}){
            equipo{id}}}`;
          utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
          .then(res =>{
            var d = res.data.updateEquipoById.equipo;
            if(d.id>0){
              $("#pnlModal").modal("toggle");
              alertas.ok("Se registro Correctamente");
            }else{
              alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
            }
          });
        });
      });
    }

}

export default UsuariosComp;