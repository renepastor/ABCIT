
import alertas from './AlertasComp'
import utilsServ from '../../services/UtilsServ'
import config from '../../config'
import consultasServ from '../../services/ConsultaServ'
import anuncioServ from '../../services/AnunciosServ'
let moment = require("moment")

let OfertaEmpleosComp = {
    /*** Cabesera del Listado */
    body: async (data) => {
      return `
      <div class="row">
        <div class="col">
            <h5><i class="fa fa-id-card"></i> Mis Anuncios</h5>
            <div class="input-group mb-0 border border-primary">
                <button class="btn btn-sm btn-new fa fa-plus-square" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" id="new">Nuevo</button>
                <input type="search" id="valSearch" class="form-control" placeholder="Buscar.." aria-label="Buscar.." aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" id="btnSearch"><i class="fa fa-search"></i></button>
                </div>
            </div>
                <div class="row bg-primary text-white m-0">
                  <div class="col-7">Anuncio</div>
                  <div class="col-1">Celular</div>
                  <div class="col-2">Grupo o Actividad</div>
                  <div class="col-2">Tipo Anuncio</div>
                </div>
                <ul class="table-responsive" id="pnlAnuncio">
                </ul>
                <div class="row bg-primary text-white m-0" id="pnlAnunciosFoot">
                </div>
        </div>
      </div>
      `;
    },
    
    /*** Lista para edicion */
    list: async (row, r) => {
      $("#pnlAnuncio").append(`
         <div class="row ${row.estado} border list-group-item-action m-0 ${(r%2!=0)?'bg-light':''}">
           <div class="col-7">${row.anuncio}</div>
           <div class="col-1">
              ${row.celular}
           </div>
           <div class="col-2">${row.tpEmpleo.descripcion}</div>
           <div class="col-2">${row.tpAnuncio.descripcion}</div>
           <div class="col csHidden position-absolute act text-right bg-light" style="z-index:2;">
             <button class="btn btn-outline-primary fa fa-edit" title="Modificar equipos" data-url="/equipos/edit.html" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="equipos" id="${row.id}"></button>
             <button class="btn btn-outline-primary fa fa-eye" title="Ver" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="cuentas" id="${row.id}"></button>
             <a href="https://api.whatsapp.com/send?phone=${row.celular}&text=UMEC: Mi nombre es ${utilsServ.getSession('ssAlias')}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-whatsapp"></a>
             <a href="tel:${row.celular}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-phone"></a>
           </div>
         </div>`
       );
    }
    /*** Form de registro */
   ,add: async (reg={}) => {
        $("#pnlModal").html(`
        <div class="modal-dialog modal-lg" role="document">
          <form class="csForm modal-content" id="formCrear">
            <fieldset>
              <div class="modal-header">
                <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Anuncio</legend>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row align-items-start">
                
                    <!-- input name="id" id="id" value="${reg.id?reg.id:''}" type="hidden" class="numero"-->
                    <input name="persId" id="persId" value="${reg.persId?reg.persId:''}" type="hidden" class="numero" required='required' >
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-check-label" for="idTipoEmpleo">Rubro o Actividad:</label>
                        <select name="idTipoEmpleo" id="idTipoEmpleo" class="select form-control" required='required' ><option value="">--Seleccionar--</option></select>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-check-label" for="idTipoAnuncio">Tipo Anuncio:</label>
                        <select name="idTipoAnuncio" id="idTipoAnuncio" class="select form-control" required='required' ><option value="">--Seleccionar--</option></select>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-label" for="ci">Documento de Identificacion:</label>
                        <div class="input-group">
                            <input name="ci" id="ci" type="number" min="10" value="${reg.ci?reg.ci:''}" max="99999999" class="ci form-control" aria-label="Text input with dropdown button" required='required' >
                            <div class="input-group-prepend">
                                <select id="sel_ci" class="form-control">
                                    <option value="BE">Beni</option>
                                    <option value="CB">Cochabamba</option>
                                    <option value="CH">Chuquisaca</option>
                                    <option value="LP">La Paz</option>
                                    <option value="OR">Oruro</option>
                                    <option value="PD">Pando</option>
                                    <option value="PT">Potosí</option>
                                    <option value="SC">Santa Cruz</option>
                                    <option value="TJ">Tarija</option>
                                    <option value="EX">Extranjero</option>
                                </select >
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-label" for="facebook">Facebook:</label>
                        <div id="status"></div>
                        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-label" for="celular">Numero de Celular:</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <select id="sel_celular" class="form-control">
                                    <option value="591">Bol</option>
                                    <option value="55">Brasil</option>
                                    <option value="51">Peru</option>
                                </select >
                            </div>
                            <input name="celular" id="celular" type="number" value="${reg.celulares?reg.celulares:''}" min="60000000" max="79999999" class="cel form-control" aria-label="Text input with dropdown button" required='required' >
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-label" for="direccion">Direccion:</label>
                        <input name="direccion" id="direccion" value="${reg.direccion?reg.direccion:''}" class="text form-control" type="text" required='required' >
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <label class="form-label" for="coordenadas">Cordenadas:</label>
                        <div class="input-group">
                            <input name="coordenadas" id="coordenadas" value="${reg.coordenadas?reg.coordenadas:''}" class="json form-hidden" type="text" required='required'  oninvalid="this.setCustomValidity('Es nesesario que su GPS este habilitado')" oninput="this.setCustomValidity('')">
                            <button type="button" class="btn btn-warning" id="idCoordenadas"><i class="fa fa-map-marker"></i> Mi Ubicar</button>
                        </div>

                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-8">
                        <label class="form-label" for="anuncio">Anuncio:</label>
                        <textarea name="anuncio" id="anuncio" class="textarea form-control" required='required' >${reg.anuncio?reg.anuncio:''}</textarea>
                    </div>


                </div>
              </div>
              <div class="modal-footer justify-content-center p-2">
                <button type="submit" class="btn btn-primary">
                  <i class="fa fa-save"></i> Guardar
                </button>
                <button type="button" class="btn btn-outline-primary" data-dismiss="modal">
                  Cancelar <i class="fa fa-close"></i> 
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        `);
        (function(){
            $("#idCoordenadas").on("click", function(){
              utilsServ.geoPop('coordenadas')
            })
            let resSearch = anuncioServ.idSearch();
            resSearch.then(res=>{
                console.log(res)
                let listTpProfecion = res.data.tpProfeciones.nodes[0].tblTiposByPadreId.nodes;
                let listTpAnuncio = res.data.tpAnuncios.nodes[0].tblTiposByPadreId.nodes;
                let anuncio = res.data.anuncio;
                utilsServ.selectOp({"pnl":"idTipoEmpleo","valor":"id","texto":["descripcion"], "data":listTpProfecion})
                utilsServ.selectOp({"pnl":"idTipoAnuncio","valor":"id","texto":["descripcion"], "data":listTpAnuncio})

                //utilsServ.miPunto("coordenadas");
                utilsServ.btnFacebook();
                $("#persId").val(utilsServ.getSession("ssPersId"));
            });
        })();
        $("#formCrear").submit(function(e) {
          e.preventDefault();
          var dt = utilsServ.formInput(this);
          var p =`mutation{createAnuncio(input:{anuncio:{${dt}}}){
              anuncio{id anuncio coordenadas celular estado editado usuario}
             }
           }`;
           utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
          .then(res => {
            var d = res.data.createIngreso.ingreso;
            if(d.id>0){
              IngresosComp.list(d);
              $("#pnlModal").modal("toggle");
              alertas.ok("Se registro Correctamente");
            }else{
              alertas.error(`No se registro <span hidden>${res.toString()}</span>`);
            }
          });
        });
    }

    ,view: async (obj) => {
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
    /*** Registro de precentacion para el usuario visita */    
    ,listPrecentacion: async (row, r) => {
        let coord = JSON.parse(row.coordenadas);
        let lat = coord[0];
        let lng = coord[1];
        let avatar = JSON.parse(row.persona.avatar)[0];
        console.log(avatar)
        $("#pnlAnuncio").append(`
            <div class="card border-primary mb-3 w-100 list-group-item-action">
              <div class="card-header">
                  ${row.persona.alias} - ${row.tpAnuncio.descripcion} como ${row.tpEmpleo.descripcion}
                  <small>
                    <i class="fa fa-2x fa-star text-warning"></i>
                    <i class="fa fa-2x fa-star text-warning"></i>
                    <i class="fa fa-2x fa-star text-warning"></i>
                    <i class="fa fa-2x fa-star-o"></i>
                    <i class="fa fa-2x fa-star-o"></i>
                  </small>
              </div>
              <div class="card-body csForm p-3">
                <div class="w-100 csHidden position-absolute act text-right p-0 m-0" style="z-index:2;right: 16px;">
                  <a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=19/${lat}/${lng}" title="${row.direccion}" target="_blank" class=""><i class="fa fa-2x fa-map-marker"></i></a>
                  &nbsp; &nbsp; &nbsp;
                  <a href="https://wa.me/${(row.celular).replace('','')}?text=Buenas... ${row.persona.alias} ${row.tpAnuncio.descripcion} ${row.tpEmpleo.descripcion}" class="" title="Enviar Mensaje" target="_blank"><i class="fa-2x fa fa-whatsapp"></i></a>
                </div>
                <p class="card-text">
                  <img src="${avatar.url?avatar.url:"./img/img120.png"}" width="70px" class="border2 rounded-lg border-warning mr-2" align="left" class="m-3">${row.anuncio}
                </p>

              </div>
            </div>  
        `);
    }

    ,productoSelect: async (idVal) => {
      $("#pnlModal").html("");

      Carousel;
      $(document).ready(function(){
        var p =`query{ingresoById(id:"${idVal}"){id nombre descripcion pVenta imagenes cantidadExistente moneda:tblTipoByIdMoneda{valor}}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
        .then(res => {
          var d = res.data.ingresoById;
          let listImg = JSON.parse(d.imagenes);
          let sliteProductoDiv="", sliteProductoLi="";
          listImg.map((row, r) => {
              sliteProductoLi = sliteProductoLi+`<li data-target="#carouselExampleIndicators" data-slide-to="${r}" class="${(r==0)?'active':''}"></li>`;
              sliteProductoDiv = sliteProductoDiv+`<div class="carousel-item ${(r==0)?'active':''}">
                    <img src="${row.url}" class="d-block w-100" style="height:20rem" alt="...">
                </div>`;
          });

          $("#pnlModal").append(`
            <div class="modal-dialog modal-lg" role="document">
              <form class="csForm modal-content" id="formCrearEquipos">
                <fieldset>
                  <div class="modal-header p-0">
                    <legend class="modal-title" id="exampleModalLongTitle"></legend>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body py-0">
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="card w-100" style="width: 18rem;">
                          <div class="card-body">
                            <h5 class="card-title">${d.nombre}</h5>
                            <h3 class="card-subtitle mb-2 text-muted">${utilsServ.formatNumero(d.pVenta)} ${d.moneda.valor}</h3>
                            <p class="card-text">${d.descripcion}</p>
                            <a href="javascript:void(0)" class="card-link bg-primary text-white p-2 border fa fa-2x fa-cart-plus" title="Añadir a carrito"></a>
                            <a href="https://wa.me/59172582935?text=Consulta sobre el ${d.nombre}" target="_blank" class="card-link bg-primary text-white p-2 border fa fa-2x fa-whatsapp" title="Consulta por Whatsapp"></a>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                          <ol class="carousel-indicators">${sliteProductoLi}</ol>
                          <div class="carousel-inner" >${sliteProductoDiv}</div>
                          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                          </a>
                          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </fieldset>
              </form>
            </div>`);

          Carousel;
        });
        //Carousel;
      })
   }
}

export default OfertaEmpleosComp;


