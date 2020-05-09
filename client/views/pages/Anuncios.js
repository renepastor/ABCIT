// --------------------------------
//  
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import anuncioComp from '../components/AnunciosComp'
var nPg = 0;
var pg = 0;
var q = ``;

var nPg = 0;
var pg = 0;
var q = ``;

let Anuncios = {
    render : async () => {
        let view = /*html*/anuncioComp.body();
        return view
    }
    , after_render: async () => {
        $("#new").on("click", function(){
            anuncioComp.add()
            Modal;
        });
        $(document).ready(function(){
            $("#pnlAnuncio").height((document.getElementsByTagName("body")[0].offsetHeight - 225));
            $("#pnlAnuncio").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            });
            $("#pnlAnuncio").on("mouseleave", ".row",function(){
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
                $("#pnlAnuncio").html("")
                $("#pnlAnuncioFoot").html(`Cargando....`)
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
export default Anuncios;

var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{fnBAnuncios(pDato:"${$('#valSearch').val()}" offset:${nPg}, first:${config.LIMIT_PG}){
            totalCount nodes{tpEmpleo:tblTipoByIdTipoEmpleo{descripcion} tpAnuncio:tblTipoByIdTipoAnuncio{descripcion} celular anuncio estado}}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBAnuncios;
            if(d.nodes.length > 0){
                $("#pnlAnunciosFoot").html(`Cargando....`)
                d.nodes.map((row, r) => anuncioComp.list(row, r))
                $("#pnlAnunciosFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}
 
        