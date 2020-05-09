// --------------------------------
//  
// --------------------------------
import config from '../../config'
import utilsServ from '../../services/UtilsServ'
import usuariosComp from '../components/UsuariosComp'

var nPg = 0;
var pg = 0;
var q = ``;

let Usuarios = {
    render : async () => {
        let view = /*html*/usuariosComp.body();
        return view
    }

    , after_render: async () => {
        $("#new").on("click", function(){
            usuariosComp.add()
            Modal;
        });
        $(document).ready(function(){
            $("#pnlEquipos").height((document.getElementsByTagName("body")[0].offsetHeight - 225));
            $("#pnlEquipos").on("mouseenter", ".row",function(){
                if($(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").removeClass("csHidden");
            })

            $("#pnlEquipos").on("mouseleave", ".row",function(){
                if(!$(this).find(".act").hasClass("csHidden"))
                $(this).find(".act").addClass("csHidden");
            })

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
            })
            $('#searchEquipo').keyup(function(e){
                if(e.keyCode == 13){
                    $("#btnSearch").click();
                }
            });
            $("#pnlEquipos").on("click", ".fa-edit", function(){
                console.log("detall......",this.id)
                usuariosComp.edit(this)
                Modal;
            });
        });

    }
}
export default Usuarios;

var fnPgScroll = function(param){
    var scrollTopMax = window.scrollMaxY || (param.obj.scrollHeight - param.obj.clientHeight);
    if(param.obj.scrollTop*1+1 >= scrollTopMax){
        q = `query{fnBUsuarios(pDato:"${$('#searchUsuario').val()}" offset:${nPg}, first:${config.LIMIT_PG}){totalCount nodes{persId cuenta alias foto estado editado usuario }}}`;
        utilsServ.fnFetch({url: config.HOST_GRAPH, data: q})
        .then(res => {
            var d = res.data.fnBUsuarios;
            if(d.nodes.length > 0){
                $("#pnlUsuariosFoot").html(`Cargando....`)
                d.nodes.map((row, r) =>usuariosComp.list(row, r))
                $("#pnlUsuariosFoot").html(`Reg.: ${nPg + d.nodes.length} de ${d.totalCount}`)
                pg++;
                nPg = pg * config.LIMIT_PG;
            }
        });
    }
}
