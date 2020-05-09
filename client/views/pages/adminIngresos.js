// --------------------------------
//  
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import ingresoComp from '../components/IngresosComp'
var nPg = 0;
var pg = 0;
var q = ``;

let AdminIngresos = {
    render : async () => {
        let view = /*html*/ingresoComp.body();
        return view
    }
    , after_render: async () => {

        $("#new").on("click", function(){
            ingresoComp.add()
            Modal;
        });

        $(document).ready(function(){
            $("#pnlIngreso").height((document.getElementsByTagName("body")[0].offsetHeight - 225));
            $("#pnlIngreso").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            });
            $("#pnlIngreso").on("mouseleave", ".row",function(){
                if(!$(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").addClass("csHidden");
            });
            var param = {obj:{scrollHeight:0, clientHeight:0, scrollTop:0}};
            $(".table-responsive").scroll(function(){
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
export default AdminIngresos;

var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{fnBIngresos(pDato:"${$('#valSearch').val()}" offset:${nPg}, first:${config.LIMIT_PG}){
            totalCount nodes{id descripcion nombre imagenes cantidad pVenta pUnitario estado }}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBIngresos;
            if(d.nodes.length > 0){
                $("#pnlIngresosFoot").html(`Cargando....`)
                d.nodes.map((row, r) => ingresoComp.list(row, r))
                $("#pnlIngresosFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}