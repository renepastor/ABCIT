
let MenuComp = {
    opcionMenu: (res) => {
        $("#listMenu").html("");
    
        //var cuenta = res.data.miUsuario.cuenta;
        //sessionStorage.sPersId = res.data.miUsuario.persId;
        var lstMenu0 = res.data.roleById.menuesByRolId.nodes;
      
        var lstMenu = getObjects(lstMenu0, "nivel", 1);
        if(lstMenu.length>0){
          var menu = `
                    <li class="nav-item nav-dropdown">
                      <a href="#/salir" class="nav-link nav-dropdown-toggle">
                        <i class="fa fa-sign-out"></i> 
                        Cerrar Sesion
                      </a>
                    </li>
                    `;
          $("#listMenu").append(menu);
          var h = "";
          h=template`${lstMenu.map(r =>
            template`<li class="nav-item nav-dropdown">
              <a class="nav-link nav-dropdown-toggle" href="${r.ruta}">
              <i class="fa ${r.imagen}"></i> ${r.nombre}</a>
              <ul class="nav-dropdown-items">
              ${(r.enlacesByPadreId.nodes).map(row => (row.menuesByEnlaId.nodes.length > 0)?
                `<li class="nav-item"> 
                   <a class="nav-link" href="${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.ruta}">
                   <i class="b-0 m-0 fa ${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.imagen}"></i> ${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.nombre}<span class="badge badge-secondary"></span></a>
                 </li>`:``
              )}
              </ul>
            </li>`
          )}`;
          $("#listMenu").append(h);
          //$("#userName").html(cuenta+'<i class="fa fa-angle-down"></i>');
          //$("span.cuentaMenu").html('MENU<br><small class="rol"> Principal </small>');
        }
    }
}

export default MenuComp;

function getPieces(strings, values) {  
    return strings.map(function(string, i) {
      return [string, values[i]];
    }).reduce(function(accumulator, item) {
      return [...accumulator, ...item];
    }, []).filter(a => a);
  }

  function template(strings, ...values) {
    return getPieces(strings, values).map(function(item) {
      return Array.isArray(item) ? item.join('') : item;
    }).join('');
  }


  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
          objects.push(obj);
        }
      }
    return objects;
  }
