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
        <div class="row p-1 justify-content-center py-3">
            <div class="col-sm-6" style="max-width:10rem">
                <a id="anuncios" class="card bg-primary mb-3 text-center sombra" href="#/homeAnuncios">
                    <div class="card-body">
                        <h5 class="card-title">
                        <i class="fa fa-3x fa-suitcase"></i>
                        </h5>
                    </div>
                    <div class="card-header"><b>Anuncios Empleo</b></div>
                </a>
            </div>
            <div class="col-sm-6" style="max-width:10rem">
                <a id="ventas" class="card bg-warning mb-3 text-center sombra" href="#/homeVentas">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="fa fa-3x fa-cart-plus"></i>
                        </h5>
                    </div>
                    <div class="card-header text-dark"><b>Ventas Productos</b></div>
                </a>
            </div>
        </div>
        `
        return view
    }
    , after_render: async () => {
        $(document).ready(function(){
            
        });
        
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
 
  