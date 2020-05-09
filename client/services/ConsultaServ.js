import config  from '../config'
import utilsServ from '../services/UtilsServ'
import alertasComp from '../views/components/AlertasComp'

const ConsultaServ = {
    // --------------------------------
    //  Acceso de usuario
    // --------------------------------
    formInit : () => {
        
        var data = 
        [
            {"dep":"1","tp":"titulo", "label":"ANTECEDENTE PERSONAL"},
            {"dep":"1","tp":"radio", "name":"edadMinima", "label":"¿Edad mayor o igual a 14 años?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"llegoDelExtranjero", "label":"¿Haber estado en el extrajeron durante los útimos 3 meses?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"contactoConInfectado", "label":"¿Haber tenido el contacto con personas sospechosas COVIT-19?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"punto", "name":"coordenada", "label":"Mi ubicacion", "req":true},
            {"dep":"1","tp":"radio", "name":"conFiebre", "label":"¿Fiebre?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conTos", "label":"¿Tos?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conFlema", "label":"¿Flema?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conVomito", "label":"¿Vómito?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conDebilidad", "label":"¿Debilidad?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conDisnea", "label":"¿Dificultat Respiratoria?", "data":"[\"Si\",\"No\"]", "req":true},
            
            {"dep":"2","tp":"titulo", "label":"INFORMACIÓN PERSONAL"},
            {"dep":"2","tp":"text", "name":"nombres", "label":"Nombre", "req":true},
            {"dep":"2","tp":"text", "name":"apellidos", "label":"Apellidos", "req":true},
            {"dep":"2","tp":"ci", "name":"ci", "label":"C.I.", "req":true},
            {"dep":"2","tp":"cel", "name":"celular", "label":"Nro. Celular", "req":true}
            
            /*,
            {"dep":"1","tp":"button", "name":"faceboock", "label":"Iniciar Cuenta con Faceboock", "fn":"fnFaceboock()", "req":true},
            {"dep":"1","tp":"text", "name":"nombres", "label":"Nombre", "req":true},
            {"dep":"1","tp":"text", "name":"apellidos", "label":"Apellidos", "req":true},
            {"dep":"1","tp":"textarea", "name":"descripcion", "label":"Descripcion", "data":"", "req":true},
            {"dep":"1","tp":"number", "name":"edad", "label":"Edad", "data":"", "req":true},
            {"dep":"1","tp":"date", "name":"fechaNacimiento", "label":"Fecha Nacimiento", "data":"", "req":true},
            {"dep":"1","tp":"checkbox", "name":"temperatua", "label":"Su temperatura es mas de 37?", "data":"[\"No\",\"Si\"]", "req":true},
            {"dep":"1","tp":"multCheck", "name":"enfermedades", "label":"Enfemedades", "data":"[\"Cancer\",\"Diavetes\",\"Daño pulmonar\"]", "req":true},
            {"dep":"1","tp":"titulo", "label":"Datos Personales 2", "orden":2  },
            {"dep":"1","tp":"select", "name":"dificutasRespirar", "label":"¿Presenta dificultad respiratoria?", "data":"[\"No\",\"Si\"]", "req":true}*/
        ];
        return data;

    }
    //
    // Roles del Usuario
    , verDatos : (id) => {
        var p =`query{
            consultaById(id: "${id}") {
              apellidos
              celular
              ci
              conDisnea
              conDebilidad
              conFiebre
              conFlema
              conTos
              conVomito
              contactoConInfectado
              coordenada
              edadMinima
              estado
              nombres
              registrado
              llegoDelExtranjero
              ip
              idUserDesignado
              idTpEstado
              id
            }}`;
            

          utilsServ.fnFetch({url: config.HOST_GRAPH, data: p})
          .then(res => {
                var rowData = res.data.consultaById;
                var miList = [];
                var arrayForm = ConsultaServ.formInit();
                for(var i in rowData){
                    var regist = {};
                    regist = arrayForm.find(r => (r.name == i));
                    if(Object.keys(rowData).length === 0){
                        regist["valor"] = rowData[i].toString();    
                        if(i=="conDisnea"||i=="conDebilidad"||i=="conFiebre"||i=="conFlema"||i=="conTos"||i=="conVomito"||i=="contactoConInfectado"||i=="edadMinima"||i=="llegoDelExtranjero"){
                            var val = (rowData[i]=="1")?"Si":"No";
                            regist["valor"] = val;
                        }
                        miList.push(regist);
                    }
                }
                console.log("grave...", miList);
                return miList;
          })    
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

export default ConsultaServ;