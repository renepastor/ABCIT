import config  from '../config'
import utilsServ from '../services/UtilsServ'
import alertasComp from '../views/components/AlertasComp'

const OfertaEmpleosServ = {
    // --------------------------------
    //  Acceso de usuario
    // --------------------------------
    listar : () => {
        console.log();
    }
    //
    // Roles del Usuario
    , verDatos : (id) => {
        console.log("ss");   
    }
    // --------------------------------
    //  Acceso de usuario
    // --------------------------------
    ,menuUsuario : (idRol="001") => {
        var query =`query{
                roleById(id: "${idRol}") {
                    menuesByRolId {nodes {
                    enlaceByEnlaId {nombre nivel ruta imagen
                        enlacesByPadreId(condition: {nivel: 2} orderBy: ORDEN_ASC) {nodes {
                        menuesByEnlaId(condition: {rolId: "${idRol}"}) {
                            nodes {enlaceByEnlaId {nombre nivel ruta imagen
                }}}}}}}}}
        }`;
        var alMenuUser = utilsServ.fnFetch({url: config.HOST_GRAPH, data: query})
        .then(menuUser => menuUser)
        .catch(errorMenu => alertasComp.error(`No existe usuario en SIstema de personal <span hidden>${errorMenu}</span>`));
        return alMenuUser;
    }
}

export default OfertaEmpleosServ;