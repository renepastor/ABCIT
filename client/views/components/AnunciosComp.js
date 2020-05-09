
import alertas from './AlertasComp'
import utilsServ from '../../services/UtilsServ'
import config from '../../config'
import consultasServ from '../../services/ConsultaServ'
let moment = require("moment")

let OfertaEmpleosComp = {
    body: async (data) => {
      return `
      <div class="row">
        <div class="col">
            <h5><i class="fa fa-users"></i> Ingreso de Materiales</h5>
            <div class="input-group mb-0 border border-primary">
                <button class="btn btn-sm btn-new fa fa-plus-square" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" id="new">Nuevo</button>
                <input type="search" id="valSearch" class="form-control" placeholder="Buscar.." aria-label="Buscar.." aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" id="btnSearch"><i class="fa fa-search"></i></button>
                </div>
            </div>
                <div class="row bg-primary text-white m-0">
                  <div class="col">Descripcion</div>
                  <div class="col">Producto</div>
                  <div class="col">Cantidad</div>
                  <div class="col">P.Unitario</div>
                </div>
                <ul class="table-responsive" id="pnlIngreso">
                </ul>
                <div class="row bg-primary text-white m-0" id="pnlIngresosFoot">
                </div>
        </div>
      </div>
      `;
    },
    
    
    
    list: async (row, r) => {
      $("#pnlIngreso").append(`
         <div class="row ${row.estado} border list-group-item-action m-0 ${(r%2!=0)?'bg-light':''}">
           <div class="col">${row.descripcion}</div>
           <div class="col">
              ${row.nombre}
           </div>
           <div class="col">${row.cantidad}</div>
           <div class="col">${row.pVenta}</div>
           <div class="col csHidden position-absolute act text-right" style="z-index:2;">
             <button class="btn btn-outline-primary fa fa-edit" title="Modificar equipos" data-url="/equipos/edit.html" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="equipos" id="${row.id}"></button>
             <button class="btn btn-outline-primary fa fa-eye" title="Ver" data-backdrop="static" data-toggle="modal" data-target="#pnlModal" data-dato='{"id":"${row.id}"}' data-name="cuentas" id="${row.id}"></button>
             <a href="https://api.whatsapp.com/send?phone=${row.celular}&text=UMEC: Mi nombre es ${utilsServ.getSession('ssAlias')}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-whatsapp"></a>
             <a href="tel:${row.celular}" target="_blank" rel="noopener" class="btn btn-outline-primary fa fa-phone"></a>
           </div>
         </div>`
       );
   }
   
   ,camara: async (row, r) => {
      $("#pnlFijo").html("");
      
      $("#pnlFijo").append(`
      <div class="modal-dialog modal-sm opaco" role="document">
      <form class="csForm modal-content" id="formCrearEquipos">
        <fieldset>
          <div class="modal-header p-0">
            <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Crear Equipos</legend>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body py-0">
            <div class="row">
              <div class="">
                <canvas id="canvas" class="w-100 h-100 position-absolute"></canvas>
                <video id="video" autoplay playsinline class="w-100 h-100"></video>
              </div>
              <div class="form-group col-12 position-absolute">
                <select id="misCamaras" name="misCamaras" required="required" class="form-control text" style="opacity: 1;">
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center p-2">
            <input type="button" id="play" value="play" class="btn btn-outline-primary fa fa-play-circle" title="Iniciar Camara">
            <input type="button" id="capturar" value="Capturar" class="btn btn-outline-primary fa fa-camera" title="Capturar Imagen">
            <button type="button" class="btn btn-outline-primary fa fa-close" data-dismiss="modal" title="Cancelar"></button>
          </div>
        </fieldset>
      </form>
    </div>`);
    const video = document.getElementById('video');
    const play = document.getElementById('play');
    const misCamaras = document.getElementById('misCamaras');
    const btnCapturar = document.getElementById('capturar');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let currentStream;

    function stopMediaTracks(stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    function gotDevices(mediaDevices) {
      misCamaras.innerHTML = '';
      let selectOp = document.createElement('option');
      selectOp.innerHTML = '--Sel. Camara--';
      selectOp.value = '';
      misCamaras.appendChild(selectOp);
      let count = 1;
      mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
          const option = document.createElement('option');
          option.value = mediaDevice.deviceId;
          const label = mediaDevice.label || `Camera ${count++}`;
          const textNode = document.createTextNode(label);
          option.appendChild(textNode);
          misCamaras.appendChild(option);
        }
      });
      misCamaras.addEventListener('change', () => {
        play.click();
      });
    }
    btnCapturar.addEventListener('click', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Stop all video streams.
      video.srcObject.getVideoTracks().forEach(track => track.stop());
      utilsServ.imagenUpload({"idCanvas":"canvas", "idValor":"imagenes"});
      btnCapturar.disabled = true;
    });
  
    play.addEventListener('click', event => {
      if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
      }
      const videoConstraints = {};
      if (misCamaras.value === '') {
        videoConstraints.facingMode = 'environment';
      } else {
        videoConstraints.deviceId = { exact: misCamaras.value };
      }
      const constraints = {
        video: videoConstraints,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          currentStream = stream;
          video.srcObject = stream;
          btnCapturar.disabled = false;
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
          return navigator.mediaDevices.enumerateDevices();
        })
        .then(gotDevices)
        .catch(error => {
          console.error(error);
        });
    });

    navigator.mediaDevices.enumerateDevices().then(gotDevices);
   },
    add: async () => {
      $("#pnlModal").html(`
      <div class="modal-dialog modal-lg" role="document">
        <form class="csForm modal-content" id="formCrearEquipos">
          <fieldset>
            <div class="modal-header p-0">
              <legend class="modal-title" id="exampleModalLongTitle">  &nbsp; Ingreso Productos</legend>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                <input name="id" id="id" value="" type="hidden" required='required' >
                <input type="hidden" name="cantidadExistente" id="cantidadExistente" required='required'  placeholder="Cantidad Existente" max="9999" min="0" step="1" size="5" class="form-control numero"/>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-check-label" for="idRubro">Grupo:</label>
                    <select name="idRubro" id="idRubro" class="select form-control" required='required' ><option value="">--Seleccionar--</option></select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="nombre">Nombre:</label>
                    <input name="nombre" id="nombre" value="" class="text form-control" type="text" required='required' >
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="descripcion">Descripcion:</label>
                    <input name="descripcion" id="descripcion" value="" class="text form-control" type="text" required='required' >
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="cantidad">Cantidad a Ingresar: </label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary menos" data-in="cantidad">-</button>
                        <input type="text" name="cantidad" id="cantidad" required='required'  placeholder="Cantidad" max="9999" min="0" step="1" size="5" class="form-control numero"/>
                        <button type="button" class="btn btn-outline-primary mas" data-in="cantidad">+</button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="idUnidadMedida">Unidad Medida:</label>
                    <select name="idUnidadMedida" id="idUnidadMedida" class="select form-control" required='required' ><option value="">--Seleccionar--</option></select>
                </div>
                <!--div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="cantidadExistente">Cantidad Existente : </label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary menos" data-in="cantidadExistente">-</button>
                        
                        <button type="button" class="btn btn-outline-primary mas" data-in="cantidadExistente">+</button>
                    </div>
                </div-->
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="cantidadMin">Cant. Minima : </label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary menos" data-in="cantidadMin">-</button>
                        <input type="text" name="cantidadMin" id="cantidadMin" required='required'  placeholder="Cant. Minima" max="9999" min="0" step="1" size="5" class="form-control numero"/>
                        <button type="button" class="btn btn-outline-primary mas" data-in="cantidadMin">+</button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="pUnitario" class="form-label">Precio Compra : </label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary menos" data-in="pUnitario">-</button>
                        <input type="text" name="pUnitario" id="pUnitario" required='required'  placeholder="P Unitario" max="9999" min="0" step="1" size="5" class="form-control numero"/>
                        <button type="button" class="btn btn-outline-primary mas" data-in="pUnitario">+</button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="idMoneda">Moneda:</label>
                    <select name="idMoneda" id="idMoneda" class="select form-control" required='required' ><option value="">--Seleccionar--</option></select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="pVenta" class="form-label">Precio para la Venta : </label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary menos" data-in="pVenta">-</button>
                        <input type="text" name="pVenta" id="pVenta" required='required'  placeholder="P Venta" max="9999" min="0" step="1" size="5" class="form-control numero"/>
                        <button type="button" class="btn btn-outline-primary mas" data-in="pVenta">+</button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="file" class="form-label">Archivo : </label>
                    <div for="imagenes" class="form-control btn btn-outline-primary">
                        <i class="fa fa-picture-o position-absolute"> Examinar Archivo...</i>
                        <input type="file" name="imagenesFile" id="imagenesFile" placeholder="Imagen" class="file-img position-relative"/>
                        <canvas id="canvasFile" width="300" height="300" class="foto" hidden></canvas>
                        <input type="hidden" name="imagenes" id="imagenes" value='[]' class="json">
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="camara" class="form-label">Imagen de camara : </label>
                    <div class="btn-group">
                      <button id="camara" type="button" class="btn btn-outline-primary fa fa-camera" data-backdrop="static" data-toggle="modal" data-target="#pnlFijo">
                        Abrir Camara
                      </button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                  <div class="form-group list-group list-group-horizontal" id="listImages">
                  </div>  
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
        $("#cantidad").on("change", function(){
          $("#cantidadExistente").val(this.value);
        })
        let q = `{
          allTblTipos(condition: {nombre: "TP-MONEDA"}) {
            nodes {
              tblTiposByPadreId(condition:{estado:"C"}) {
                nodes {id valor descripcion}
              }
            }
          }
          allUnidadesMedidas(condition:{estado:"C"}){
            nodes{id abreviatura unidad}
          }
          rubroById(id:"1"){
            rubrosByIdPadre(condition:{estado:"C"}){
              nodes{id rubro}
            }
          }
        }`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
          let listMoneda = res.data.allTblTipos.nodes[0].tblTiposByPadreId.nodes;
          let listUnidadMedida = res.data.allUnidadesMedidas.nodes;
          let listRubros = res.data.rubroById.rubrosByIdPadre.nodes;
          utilsServ.selectOp({"pnl":"idUnidadMedida","valor":"id","texto":["[","abreviatura","] ","unidad"], "data":listUnidadMedida})
          utilsServ.selectOp({"pnl":"idMoneda","valor":"id","texto":["[","valor","] ","descripcion"], "data":listMoneda})
          utilsServ.selectOp({"pnl":"idRubro","valor":"id","texto":["rubro"], "data":listRubros})
        });    
      })();
      $("#imagenesFile").on("change", function(){
        utilsServ.minimizarImg({'imge':'imagenes_ax','input':'imagenes','canvas':'canvasFile', 'obj':this});
        setTimeout(()=>{
          utilsServ.imagenUpload({"idCanvas":"canvasFile", "idValor":"imagenes"});
        }, 500)
      })

      $("#camara").on("click", function(){
        IngresosComp.camara()
        Modal;
      });
      $("button.menos").on("click", function(){
        const inp = this;
        utilsServ.menos(inp.dataset.in)
      })
      $("button.mas").on("click", function(){
        const inp = this;
        utilsServ.mas(inp.dataset.in)
      })
      $("#formCrearEquipos").submit(function(e) {
        e.preventDefault();
        var data = $(this);
        var est = "C";
        if(!$("#formCrearEquipos #estado").prop("checked")){
          est ="X";
        }
        var dt = utilsServ.formInput(this);
        var p =`mutation{createIngreso(input:{ingreso:{${dt}}}){
            ingreso{id descripcion nombre cantidad pVenta estado editado usuario}
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
    ,listPrecentacion: async (row, r) => {
        $("#pnlIngreso").append(`
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 p-0 m-0">
              <div class="border w-100 p-2" style="height:22rem">
                  <a href="javascript:void(0)" id="masProducto" data-row='${JSON.stringify(row)}' class="bg-dark position-absolute text-warning p-2 border fa fa-2x fa-cart-plus" style="right: 0.5rem"></a>
                  <img src="${JSON.parse(row.imagenes)[0].url}" class="w-100 h-100">
                  <div class="producto position-relative p-2 bg-primary w-100"  data-toggle="modal" data-target="#pnlModal" style="top:-4rem; opacity:0.8; height: 4rem;" id="${row.id}">
                      <h5 class="mt-0 text-right">
                        ${utilsServ.formatNumero(row.pVenta)} ${row.moneda.valor}
                      </h5>
                      <div class="">
                        ${row.nombre}
                      </div>
                  </div>
              </div>
          </div>`
          );
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