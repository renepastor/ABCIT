import config  from '../config'
import utilsServ from '../services/UtilsServ'
import alertasComp from '../views/components/AlertasComp'

const OfertaEmpleosServ = {
    // --------------------------------
    //  
    // --------------------------------
    listaAnuncios : () => {
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
    // --------------------------------
    //  
    // --------------------------------
    ,idSearch : (id="0") => {
        let query = `{
            tpProfeciones:allTblTipos(condition: {nombre: "TP-PROF-OFI"}) {
              nodes {
                tblTiposByPadreId(condition:{estado:"C"}) {
                  nodes {id valor descripcion}
                }
              }
            }
            tpAnuncios:allTblTipos(condition: {nombre: "TP-ANUNCIO"}) {
              nodes {
                tblTiposByPadreId(condition:{estado:"C"}) {
                  nodes {id valor descripcion}
                }
              }
            }
            anuncio:anuncioById (id:"${id}"){
              id
              anuncio
              calificacion
              celular
              persId
              idTipoEmpleo
              idTipoAnuncio
              facebook
              estado
              editado
              direccion
              coordenadas
              ci
            }
          }`;
        var alMenuUser = utilsServ.fnFetch({url: config.HOST_GRAPH, data: query})
        .then(menuUser => menuUser)
        .catch(errorMenu => alertasComp.error(`No existe usuario en SIstema de personal <span hidden>${errorMenu}</span>`));
        return alMenuUser;
    }
    // --------------------------------
    //  
    // --------------------------------
    ,editAnuncios : () => {
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