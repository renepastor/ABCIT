// --------------------------------
//  
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import consultaComp from '../components/ConsultasComp'
import consultaServ from '../../services/ConsultaServ'

var nPg = 0;
var pg = 0;
var q = ``;

let Anuncios = {
    render : async () => {
        let view = /*html*/consultaComp.body();
        return view
    }
    , after_render: async () => {

        $("#new").on("click", function(){
            consultaComp.add()
            Modal;
        });

        $(document).ready(function(){
            $("#pnlEquipos").height((document.getElementsByTagName("body")[0].offsetHeight - 225));
            $("#pnlEquipos").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            });
            $("#pnlEquipos").on("mouseleave", ".row",function(){
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
                $("#pnlEquipos").html("")
                $("#pnlEquiposFoot").html(`Cargando....`)
                fnPgScroll(param);
            });
            $('#searchEquipo').keyup(function(e){
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
export default Anuncios;

var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{fnBConsultas(pDato:"${$('#searchEquipo').val()}" offset:${nPg}, first:${config.LIMIT_PG}){totalCount nodes{id nombres apellidos ci celular estado }}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBConsultas;
            if(d.nodes.length > 0){
                $("#pnlEquiposFoot").html(`Cargando....`)
                d.nodes.map((row, r) =>consultaComp.list(row, r))
                $("#pnlEquiposFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}
        