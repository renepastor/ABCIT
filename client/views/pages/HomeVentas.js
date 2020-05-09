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
        var bar = '<div id="pnlMisPedidos"><ul class="list-group w-24"></ul></div>';
        Popover;
        $('#totalProducto').popover({title:"Mis Pedidos", html:true,content:bar});
        $('#totalProducto').on("click", function(){
            listMisProducto();
        });

        $("#pnlIngreso").on("click", ".producto", function(){
            ingresoComp.productoSelect(this.id);
            Modal;
            Carousel;
        });
        let misProductos = [];
        $("#pnlIngreso").on("click","#masProducto",function(){
            misProductos = window.localStorage.getItem("misProductos") ? window.localStorage.getItem("misProductos") : "[]";
            misProductos = JSON.parse(misProductos);
            misProductos.push(JSON.parse(this.dataset.row));
            window.localStorage.setItem("misProductos", JSON.stringify(misProductos));
            listMisProducto();
        });
        function listMisProducto(){
            let list = JSON.parse(window.localStorage.getItem("misProductos"));
            let totalProd = 0;
            $("#pnlMisPedidos >ul").html(``);
            list.map(reg => {
                totalProd++;
                $("#pnlMisPedidos >ul").append(`<li class="list-group-item d-flex mx-0 px-2 justify-content-between align-items-center">${reg.nombre} <b class="">${utilsServ.formatNumero(reg.pVenta)}</b></li>`);
                $("#totalProducto > i").html(`<h4 style="top:-1rem; right: -0.6rem;" class="bg-primary position-absolute font-weight-bold rounded-circle p-1">${totalProd}</h4>`);
            });
        }

        
        $(document).ready(function(){
            q = `query{allRubros(condition:{estado:"C"}){nodes{id rubro}}}`;
            utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
            .then(res => {
                var d = res.data.allRubros.nodes;
                if(d.length > 0){
                    utilsServ.selectOp({"pnl":"grupo", "valor":"id","texto":["rubro"], "data":d})
                }
            })

            $("#pnlIngreso").height((document.getElementsByTagName("body")[0].offsetHeight - 160));
            $("#pnlIngreso").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            });
            $("#pnlIngreso").on("mouseleave", ".row",function(){
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
                $("#pnlIngreso").html("")
                $("#pnlIngresoFoot").html(`Cargando....`)
                fnPgScroll(param);
            });
            $('#valSearch').keyup(function(e){
                if(e.keyCode == 13){
                    $("#btnSearch").click();
                }
            });
            $("#pnlEquipos").on("click", ".fa-edit", function(){
                consultaComp.edit(this)
                Modal;
            });
            $("#pnlEquipos").on("click", ".fa-eye", function(){
                consultaComp.view(this)
                Modal;
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
        q = `query{fnBIngresos(pDato:"${$('#valSearch').val()}" offset:${nPg}, first:${config.LIMIT_PG}){
            totalCount nodes{moneda:tblTipoByIdMoneda{valor} id descripcion nombre imagenes cantidad pVenta cantidadExistente estado }}}`;
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
 
  