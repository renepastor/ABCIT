// --------------------------------
//  Define Data Sources
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import anuncioComp from '../components/AnunciosComp'

var nPg = 0;
var pg = 0;
var q = ``;

let Home = {
    render : async () => {
        var user = JSON.parse(localStorage.getItem("dataUser"));
        let view =  /*html*/`
        <div class="row px-3">
            <div class="col">
                <div class="input-group mb-0 border border-primary">
                    <select id="grupo" style="width:6rem">
                        <option value="">--Sel Grupo--</option>
                    </select>
                    <input type="search" id="valSearch" class="form-control" placeholder="Buscar producto.." aria-label="Buscar.." aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" id="btnSearch"><i class="fa fa-search"></i></button>
                    </div>
                </div>
                <ul class="list-unstyled csForm overflow-auto" id="pnlAnuncio">
                </ul>
                <div class="row bg-primary text-white m-0 p-1" id="pnlAnunciosFoot">
                </div>
            </div>
        </div>
        `
        return view
    }
    , after_render: async () => {
        $(document).ready(function(){
            q = `query{allTblTipos(condition: {nombre: "TP-PROF-OFI", estado:"C"}) {nodes {
              tblTiposByPadreId(condition:{estado:"C"}) {
                nodes {id valor descripcion}
              }}}}`;
            utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
            .then(res => {
                var d = res.data.allTblTipos.nodes[0].tblTiposByPadreId.nodes;
                if(d.length > 0){
                    utilsServ.selectOp({"pnl":"grupo", "valor":"id","texto":["descripcion"], "data":d})
                }
            })
            $("#pnlAnuncio").height((document.getElementsByTagName("body")[0].offsetHeight - 160));
            $("#pnlAnuncio").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            });
            $("#pnlAnuncio").on("mouseleave", ".row",function(){
                if(!$(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").addClass("csHidden");
            });
            var param = {obj:{scrollHeight:0, clientHeight:0, scrollTop:0}};
            $(".overflow-auto").scroll(function(){
                param.obj = this;
                fnPgScroll(param);
            });
            //fnPgScroll(param);
            $("#btnSearch").on("click", function(){
                nPg = 0, pg = 0;
                var param = {obj:{scrollHeight:0, clientHeight:0, scrollTop:0}};
                $("#pnlAnuncio").html("")
                $("#pnlAnuncioFoot").html(`Cargando....`)
                fnPgScroll(param);
            });
            $('#valSearch').keyup(function(e){
                if(e.keyCode == 13){
                    $("#btnSearch").click();
                }
            });
            $("#btnSearch").click();
        });
        $("#btnSearch").click();
    }

}

export default Home;


var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{
            fnBAnuncios(pDato:""){
              nodes{
                tpEmpleo:tblTipoByIdTipoEmpleo{descripcion}
                tpAnuncio:tblTipoByIdTipoAnuncio{descripcion}
                persona:usuarioByPersId{alias avatar}
                      id anuncio celular coordenadas calificacion direccion
              }
            }
          }`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBAnuncios;
            if(d.nodes.length > 0){
                $("#pnlAnunciosFoot").html(`Cargando....`)
                d.nodes.map((row, r) => anuncioComp.listPrecentacion(row, r))
                $("#pnlAnunciosFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}
 
  