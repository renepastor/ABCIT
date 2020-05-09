// --------------------------------
//  Define Data Sources
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import ingresoComp from '../components/IngresosComp'

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
                <ul class="row m-0 p-0 csForm overflow-auto" id="pnlIngreso">
                </ul>
                <div class="row bg-primary text-white m-0 p-1" id="pnlIngresosFoot">
                </div>
            </div>
        </div>
        <div class="fixed-bottom text-right m-3 ">
            <div id="misBandeja" class="hidden bg-white ">
                
            </div>
            <a href="javascript:void(0)" id="totalProducto" class="btn red btn-danger" data-container="body" data-toggle="popover" data-placement="top">
                <i class="fa fa-2x fa-cart-plus"></i>
            </a>
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

        });
        $("#btnSearch").click();
    }

}

export default Home;


var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{fnBAnuncios(pDato:"${$('#valSearch').val()}" offset:${nPg}, first:${config.LIMIT_PG}){
            totalCount nodes{tipoEmpleo:tblTipoByIdTipoEmpleo{valor} persId anuncio estado}}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBIngresos;
            if(d.nodes.length > 0){
                $("#pnlIngresosFoot").html(`Cargando....`)
                d.nodes.map((row, r) => ingresoComp.listPrecentacion(row, r))
                $("#pnlIngresosFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}
 
  