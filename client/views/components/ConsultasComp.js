import alertas from './AlertasComp'
import utilsServ from '../../services/UtilsServ'
import config from '../../config'
import consultasServ from '../../services/ConsultaServ'
let moment = require("moment")

let ConsultasComp = {
    body: async (data) => {
      return `
      <div class="row">
        <div class="col">
            <h5><i class="fa fa-users"></i> Cita Medica</h5>
            <div class="input-group mb-0">
                <input type="search" id="searchEquipo" class="form-control" placeholder="Buscar.." aria-label="Buscar.." aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="btnSearch"><i class="fa fa-search"></i></button>
                </div>
            </div>
                <div class="row bg-primary text-white m-0">
                  <div class="col" hidden></div>
                  <div class="col">Nombre</div>
                  <div class="col">Celular</div>
                  <div class="col">CI</div>
                </div>
                <ul class="table-responsive" id="pnlEquipos">
                </ul>
                <div class="row bg-primary text-white m-0" id="pnlEquiposFoot">
                </div>
        </div>
      </div>
      `;
    },
    
    
    
    list: async (row, r) => {
       $("#pnlEquipos").append(`
          <div class="row ${row.estado} border list-group-item-action m-0 ${(r%2!=0)?'bg-light':''}">
            <div class="col">${row.nombres} ${row.apellidos}</div>
            <div class="col">
              ${row.celular}
            </div>
            <div class="col">${row.ci}</div>
            <div class="col csHidden position-absolute act text-right" style="z-index:2;">
              <button class="btn btn-outline-primary fa fa-edit" title="Modificar equipos" data-url="/equipos/edit.html" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="equipos" id="${row.id}"></button>
              <button class="btn btn-outline-primary fa fa-eye" title="Ver" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="cuentas" id="${row.id}"></button>
              <a href="https://api.whatsapp.com/send?phone=${row.celular}&text=UMEC: Mi nombre es ${utilsServ.getSession('ssAlias')}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-whatsapp"></a>

              <a href="tel:${row.celular}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-phone"></a>
            </div>
          </div>`
        );
    },
    
    
    add: async () => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formCrearEquipos">
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
                  <label for="tipo">tipo : </label>
                  <select id="tipo" name="tipo" required="required" class="form-control text">
                    <option value="I">INTERNO</option>
                    <option value="E">EXTERNO</option>
                  </select>
                </div>
                <div class="form-group col">
                  <label for="unidadMedida">Unidad Medida : </label>
                  <input type="text" name="unidadMedida" id="unidadMedida" required="required" placeholder="Unidad Medida" size="30" class="form-control text">
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
       $("#formCrearEquipos").submit(function(e) {
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
            ConsultasComp.list(d);
            $("#pnlModal").modal("toggle");
            alertas.ok("Se registro Correctamente");
          }else{
            alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
          }
        });
      });
    },
    view: async (obj) => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formCrearEquipos">
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
                  <label for="tipo">tipo : </label>
                  <select id="tipo" name="tipo" required="required" class="form-control text">
                    <option value="I">INTERNO</option>
                    <option value="E">EXTERNO</option>
                  </select>
                </div>
                <div class="form-group col">
                  <label for="unidadMedida">Unidad Medida : </label>
                  <input type="text" name="unidadMedida" id="unidadMedida" required="required" placeholder="Unidad Medida" size="30" class="form-control text">
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
      
      
      var list = consultasServ.verDatos(obj.id);
      console.log("grave...",list, obj);
      /*list.map(row => {
        console.log("%%%%", row.label, row.name, row.value);
      });
*/
    },


    edit: async (obj) => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formEditEquipos">
          <fieldset>
            <div class="modal-header p-0">
              <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Datos Del Paciente</legend>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div id="bodyForm" class="modal-body row m-0">
            
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

      function formOption(op){
          $("#bodyForm").html("");
          var dataForm = consultasServ.formInit();
          var datas = dataForm.filter(r => (r.dep == op))
          datas.map(row => {
              var elTag = utilsServ.fnForm(row);
              $("#bodyForm").append(`
                  ${elTag}
              `);
              (row.tp == "punto")? utilsServ.miPunto(row.name):"";
              (row.tp == "button")?eval(row.fn):"";
          });
          op =2;
          var datas = dataForm.filter(r => (r.dep == op))
          datas.map(row => {
              var elTag = utilsServ.fnForm(row);
              $("#bodyForm").append(`
                  ${elTag}
              `);
              (row.tp == "punto")? utilsServ.miPunto(row.name):"";
              (row.tp == "button")?eval(row.fn):"";
          });
      }
      formOption(utilsServ.getSession("idDtConsulta"));

      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",consultasServ.formInit());
      var p =`query{
        consultaById(id: "${obj.id}") {
          apellidos
          celular
          ci
          conDisnea
          conDebilidad
          conFiebre
          conFlema
          conTos
          conVomito
          contactoConInfectado
          coordenada
          edadMinima
          estado
          nombres
          registrado
          llegoDelExtranjero
          ip
          idUserDesignado
          idTpEstado
          id
        }}`;
      utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
      .then(res => {
        var row = res.data.consultaById;
        utilsServ.formOuput("#formEditEquipos", row);

          
        
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

export default ConsultasComp;