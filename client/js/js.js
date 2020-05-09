/*var HOST = 'https://fbt.ypfb.bo';
var HOST_WHISPER = HOST+'/whisper/lista';
var HOST_WHISPER_EESS = 'http://whisper.ypfb.gob.bo/vista/eess.json';
var HOST_SER = HOST;

var HOST_SERV = HOST_SER+"/scraping";
var HOST_SERV1 = HOST_SER+"/scraping1";
*/
const HOSTSERV = 'http://localhost:8085';
slSet("miUbi",JSON.stringify([-68.1306, -16.4987]))
const nameSis = "YPFB";
const pag = 30;
function slSet(miName, miDato){
  window.localStorage.setItem(miName,miDato);
}

function slGet(miName){
  var miDato = window.localStorage.getItem(miName);
  return (miDato);
}

var fnUrl = function(obj){
  params = obj.dataset;
  defaults  = {
    target: "#pnlModal",
    url: "/error.html"
  }
  $(params.target).html("Cargando...");
  var params = $.extend({}, defaults, params);
  localStorage.setItem(params.name, _c(params.dato));
  $.get("./tpls"+ params.url, function(data){
    $(params.target).html(data);
  });
}

const confNotiInf = {
  "progressBar": true,
  "closeButton": true,
  "positionClass": "toast-bottom-right",
  "extendedTimeOut": "8000",
  "timeOut": "5000",
};

const confNotiWar = {
  "progressBar": true,
  "closeButton": true,
  "positionClass": "toast-bottom-right",
  "extendedTimeOut": "8000",
  "timeOut": "5000",
};

const confNotiErr = {
  "progressBar": true,
  "closeButton": true,
  "positionClass": "toast-top-center",
  "extendedTimeOut": "8000",
  "timeOut": "5000",
};

var dId = function(d){return(document.getElementById(d));}
var menos = function(id){
  var obj = dId(id);
  if(!obj.step) obj.step = 1;
  if(!obj.value) obj.value = 0;
  if(obj.value*1-obj.step*1 >= obj.min*1)
    obj.value = obj.value*1-obj.step*1;
  //else obj.value = obj.value*1;
}
var mas = function(id){
  var obj = dId(id);
  if(!obj.step) obj.step = 1;
  if(!obj.value) obj.value = 0;
  if(obj.value*1+obj.step*1 <= obj.max*1)
    obj.value = obj.value*1+obj.step*1;
  //else obj.value = obj.value*1;
}

function _c(str) {
  var array = [];
  if(str !== undefined){
    for (var i=(str.length-1); i>=0; i--) {
      array.unshift(['&Ã¡', str[i].charCodeAt(), '±'].join(''));
    }
    return array.join('');
  }
}

function _d(str) {
  return str.replace(/&Ã¡(\d+)±/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}


function fnAjax(params){
  defaults  = {
      query : "",
      url   : '/graphql',
      action: function(){},
      type  : "POST",
      end   : function(){} //"$('#pnlBody').html(res)"
  }
  var params = $.extend({}, defaults, params);
  //loading("#load", " Cargando..");
  $.ajax({
    type: params.type,
    url: params.url,
    //contentType: 'application/json',
    data: params.query,
    beforeSend: function(xhr) {
      //console.log("....beforeSend....");
      $('#msjLoad').show();
    },
    success: function(res) {
      if(res.errors){///info success warning error
        console.log("Mensaje Error:",res.errors[0].message);
        //loading("#load", " :( Up. "+res.errors[0].message);
        return false;
      }
      params.action(res);
    },
    error: function(err, res) {
      console.log("error.....", err, res);
      //loading("#load", "Lo sentimo al parecer hay problemas con la red");
    },
    complete: function(){
      console.log("complete.....");
      $('#msjLoad').hide();
    }
  }).always(function(res){
    eval(params.end);
    //if(res.statusText== undefined)$("#load").html("");
    //$("#load").show(2000);
    //loading();
  });
}

function fnGql(params){
  defaults  = {
      query:  "",
      action: function(){},
      end:    function(){} //"$('#pnlBody').html(res)"
  }
  var params = $.extend({}, defaults, params);
  $.ajax({
    type: "POST",
    url: '/graphql',
    contentType: 'application/json',
    data: JSON.stringify({
      "query":params.query
    }),
    beforeSend: function(xhr) {
      $('#msjLoad').show();
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
    success: function(res) {
      if(res.errors){///info success warning error
        toastr.error(res.errors[0].message, "Lo sentimos", confNotiErr);
        console.log("Mensaje Error:",res.errors[0].message);
        return false;
      }
      params.action(res);
    },
    error: function(err, res) {
      if(localStorage.token == 0 || localStorage.token == undefined ){
        toastr.info("Favor ingrese con su Usuario", "Aviso", confNotiInf);
        return false;
      }
      toastr.error("Ups, Al parecer tenemos algún problema", "Error", confNotiErr);
      console.log("error.....:", (err.responseJSON.errors[0].message).indexOf("jiwt"),"---", err.responseJSON.errors[0].message, res);
      var jw = err.responseJSON.errors[0].message;
      if(jw.indexOf("jwt")>=0) window.location.hash = '#salir';
    },
    complete: function(){
      $('#msjLoad').hide();
    }
  }).always(function(res){
    eval(params.end);
  });
}


var geoPop = function(name){
  var obj = {dataset:{"url":"/punto.html", "target":"#pnlFijo","dataUrl":"/punto.html", "dataTarget":"#pnlFijo", "dataBackdrop":"static"}};
  slSet("inputNamePoint", name);
  $("#pnlFijo").modal("toggle");
  fnUrl(obj);
}


function mapPoint(name){
  mapboxgl.accessToken = 'pk.eyJ1IjoicmVuZXBhc3RvciIsImEiOiJjam5lcjRmaXgwMGwwM3JyMW9teHpnaGtuIn0.1PBzVNQLaIubrI77ZmediA';
  var coordinates = document.getElementById(name);
  var latLon = [-68.0954, -16.5497];
  console.log(dId(name).value);
  if(dId(name).value)
    latLon = eval(dId(name).value);
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: latLon,
    zoom: 15,
    pitch: 20
  });
  //control de navegacion
  map.addControl(new mapboxgl.NavigationControl());
  // control de mi ubicacion
  map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}));
  //expandir ventana completa
  map.addControl(new mapboxgl.FullscreenControl());  
  map.on('dblclick', function(e){
    var lngLat = e.lngLat;
    //coordinates.style.display = 'block';
    //coordinates.innerHTML = 'Long: ' + lngLat.lng + '<br />Lati: ' + lngLat.lat;
    var name = slGet("inputNamePoint");
    dId(name).value = JSON.stringify(lngLat);
    marker.setLngLat([lngLat.lng, lngLat.lat]);
  });
  var marker = new mapboxgl.Marker({
    draggable: true,
    title:"Punto de venta del producto"
  }).setLngLat(latLon ).addTo(map);
  
  marker.on('dragend', function() {
    console.log(slGet("inputNamePoint"))
    var lngLat = marker.getLngLat();
    //coordinates.style.display = 'block';
    //coordinates.innerHTML = 'Long: ' + lngLat.lng + '<br />Lati: ' + lngLat.lat;
    console.log(slGet("inputNamePoint"), lngLat.lng, lngLat.lat);
    var name = slGet("inputNamePoint");
    if(name != null)
      dId(name).value = JSON.stringify([lngLat.lng, lngLat.lat]);
    
  });
}



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
function fnRoles(res){
  $("#ssRoles").select({"data":res.data.miUsuario.usrRolesByUserId.nodes, "value":(r=>`${r.rol.id}`), "text":(r => `${r.rol.nombre}`) });
  $("#ssRoles").change(function(){
    localStorage.sRolId = this.value;
    window.location = window.location.origin;
  });
  if(!(localStorage.sRolId > 0)){
    localStorage.sRolId = res.data.miUsuario.usrRolesByUserId.nodes[0].rolId;
  }
}
function fnMenuUser(res){
  //funcion identifica
  $("#listMenu").html("");
    
  var cuenta = res.data.miUsuario.cuenta;
  localStorage.sPersId = res.data.miUsuario.persId;
  var lstMenu0 = res.data.roleById.menuesByRolId.nodes;

  var lstMenu = getObjects(lstMenu0, "nivel", 1);
  if(lstMenu.length>0){
    var menu = `
              <li class="nav-item nav-dropdown">
                <a href="#salir" class="nav-link nav-dropdown-toggle">
                  <i class="fa fa-sign-out fa-2x"></i>
                  Cerrar Sesion
                </a>
              </li>
              `;
    $("#listMenu").append(menu);
    var h = "";
    h=template`${lstMenu.map(r =>
      template`<li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="${r.ruta}" onClick="$('#modTitle').html($(this).html()); slSet('modTitle', $(this).html())">
        <i class="fa ${r.imagen}"></i> ${r.nombre}</a>
        <ul class="nav-dropdown-items">
        ${(r.enlacesByPadreId.nodes).map(row => (row.menuesByEnlaId.nodes.length > 0)?
          `<li class="nav-item">
             <a class="nav-link" href="${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.ruta}" onClick="$('#modTitle').html($(this).html()); slSet('modTitle', $(this).html())">
             <i class="b-0 m-0 fa ${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.imagen}"></i>${row.menuesByEnlaId.nodes[0].enlaceByEnlaId.nombre}<span class="badge badge-secondary"></span></a>
           </li>`:``
        )}
        </ul>
      </li>`
    )}`;
    $("#listMenu").append(h);
    $("#userName").html(cuenta+'<i class="fa fa-angle-down"></i>');
    $("span.cuentaMenu").html('MENU<br><small class="rol"> Principal </small>');
  }else{
    //console.log("...",cuenta);
    if(cuenta) location.reload();
  }
  $("li.droplink").click(function(){
   var texto = $(this).find("p").text();
   $("h3#idModulo").text(texto);
  }) 
}

function fnTableScroll(obj){
  var $table = $(obj).find("> tbody> tr:eq(0)").find("td");
  var tb = 0, i=0;
  $table.map(function(row, t){
    //var wHead = Math.trunc($(obj).find("> thead > tr:eq(0) >th").eq(row).outerWidth());
    //var wBody = Math.trunc($(t).outerWidth());
    i = row;
    var wHead = Math.round($(obj).find("> thead > tr:eq(0) >th").eq(i).outerWidth());
    var wBody = Math.round($(t).outerWidth());
    //console.log(wHead, wBody, i, $(t).text());
    if(wHead > wBody){
      $(obj).find("> thead > tr >th").eq(i).width(wHead);
      $(obj).find("> tbody > tr:eq(0) >td").eq(i).width(wHead);
      tb += wHead;
    }else{
      $(obj).find("> thead > tr >th").eq(i).width(wBody);
      $(obj).find("> tbody > tr:eq(0) >td").eq(i).width(wBody);
      tb += wBody;
    }
  });
  //console.log(i);
  $(obj+" tfoot > tr:eq(0) >td:eq(0)").attr("colspan", i);
}
function isNull(val, defaul=""){
    if(val===null || val===undefined) val = defaul;
    return val;
}
var forDate = function(obj){
  if(obj==undefined) return "";
  var dato = obj.split("/");
  return dato[2]+"-"+dato[1]+"-"+dato[0];
}
var forDateView = function(obj){
  var dato = obj.split("-");
  return dato[2]+"/"+dato[1]+"/"+dato[0];
}
var fnNumFormat = function(numeric, dec=2){
  return ((numeric).replace('.',',').replace(/(\d)(?=(\d{3})+\b)/g,'$1.'));
}

function formInput(obj){
  var dt = ""; var coma ="";
  $(obj).serializeArray().map(res => {
    //console.log(res.name,parseInt(res.value), $("#"+res.name+".json").length);
    if($("#"+res.name+".int8").length > 0)
      dt += coma+res.name+':"'+(parseInt(res.value)).toString()+'"';
    if($("#"+res.name+".int4").length > 0)
      dt += coma+res.name+':'+(parseInt(res.value)).toString();
    if($("#"+res.name+".text").length > 0)
      dt += coma+res.name+':"'+res.value+'"';
    if($("#"+res.name+".numeric").length > 0)
      dt += coma+res.name+':"'+res.value+'"';
    if($("#"+res.name+".date").length > 0){
      if(res.value != ""){
        dt += coma+res.name+':"'+forDate(res.value)+'"';}}
    if($("#"+res.name+".json").length > 0)
      dt += coma + res.name+':'+JSON.stringify(res.value)+'';
    coma =",";
    //console.log(dt);
  });
  //console.log("Objeto form :",dt)
  return dt;
}



/*****Validar si existe url .js*********/
function isValidUrl(url,obligatory,ftp){
    // Si no se especifica el paramatro "obligatory", interpretamos
    // que no es obligatorio
    if(obligatory==undefined)
        obligatory=0;
    // Si no se especifica el parametro "ftp", interpretamos que la
    // direccion no puede ser una direccion a un servidor ftp
    if(ftp==undefined)
        ftp=0;
    if(url=="" && obligatory==0)
        return true;
    if(ftp)
        var pattern = /^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
    else
        var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
    if(url.match(pattern))
        return true;
    else
        return false;
}
function fnValidaNumero(obj, label){
  if(isNaN(obj.value)){
    $(obj).val('').focus();
    toastr.error('El dato "'+label+'" debe ser numerico, con punto(.) decimal', "Aviso", confNotiErr);
  }
  if(parseInt(obj.min) > parseInt(this.value) ) {
    toastr.error("El campo ("+label+") debe ser mayor o igual ("+this.min+")", "Aviso", confNotiErr);
    $(obj).val("");
  }
}


function listAjaxSelect(name,id, val){
  //console.log(name, id, val);
  $("#"+name).val(id);
  $("#"+name+"_text").val(val);
  $("#"+name +"_list").hide();
}

(function ($) {
    /* a:YPFB
    ** c:renepastor@gmail */

    $.fn.select = function (param) {
      var $html = "";
      param.data.map(r => {
        var selected = "";
        if(param.value(r)==param.selected){
          selected = "selected='true'";
        }
        $html += `<option value="${param.value(r)}"  ${selected}>${param.text(r)}</option>`;
      });
      $(this).append($html);
    };
    
    
    
    $.fn.listAjax = function(obj){
      var pnl = $(this).parent();
      var ancho = pnl.width();
      var inputId = $(this).attr("id");
      $(this).attr({"type":"hidden"});
      var nameText = inputId+"_text";
      var url = $(this).attr("data-url");
      var ql = $(this).attr("data-ql");
      var dataNames = JSON.parse($(this).attr("data-names"));
      //console.log($(this).attr("data-url"),$(this).attr("dataUrl"));
      var inputSearch = $("<input>", {
         class:"form-control",
         placeholder:"Buscar..",
         autocomplete:"off",
         width:ancho -20,
         id:nameText,
         keyup:function(e){
          //if(inputSearch.val().length >= 3 && (inputSearch.val().length % 2) == 0){
          if(inputSearch.val().length >= 3 && e.which == 13){
           var gql = ql.replace("$$$", $("#"+nameText).val());
           $("#"+inputId +"_list").html(`Cargando.....`);
           fetch(url, {method: 'post',body:JSON.stringify(JSON.parse(gql)), headers: {'Authorization': 'Bearer ' + localStorage.token,'Accept': 'application/json','Content-Type': 'application/json'}})
           .then(res => {if(res.ok){return res.json()}else{ console.log("Loading");}})
           .catch(error => console.error('Error:', error))
           .then(res => {
             //res = res.data.buscarPersona.vwPersonals;
             res = obj.action(res);
             $("#"+inputId +"_list").html("");
             if(res.length>0){
               res.map(function(row){
                 var newRow = {};
                 Object.values(dataNames).map(r=>{newRow[r]=row[r];});
                 var jsonRow = JSON.stringify(newRow);
                 $("#"+inputId +"_list").append(`<li class="dropdown-item" data-json='${jsonRow}' onclick="listAjaxSelect('${inputId}', '${isNull(row[dataNames.val])}','${isNull(row[dataNames.text])}')"><span>${isNull(row[dataNames.val])}</span><br>${isNull(row[dataNames.text])}</li>`);
               });
             }else{$("#"+inputId +"_list").html(`No existe resultado`);}
             $("#"+inputId +"_list").show();
           });
          }
         }
       });
       pnl.append(inputSearch).append(`<ul id='${inputId}_list' class='dropdown-menu scroll-list sombra' width='${ancho}px'></ul>`);
       //console.log("......",ancho)
     }
  })(jQuery);

(function(d){
  if(localStorage.sRolId > 0){
    var trab = JSON.parse(localStorage.getItem("dataUser"));
  $("li#nombreUser").append(`<b>${trab.description}</b><br> <i>${trab.displayName}</i>`);
  if(localStorage.sRolId == undefined) {
    localStorage.sRolId = 0;
    //window.location = window.location.origin;
    ///window.location = "#login";
    return false;
  }else{
    if(localStorage.sRolId > 0)
    toastr.success("Bienvenido.. ",nameSis,confNotiInf);
    $("#pnlRoles").append(`<b>Rol:</b><br><select class="form-control form-control-sm" id="ssRoles"></select>`);
  }

    var q =`query{miUsuario{cuenta persId
          usrRolesByUserId{nodes{rolId permiso rol:roleByRolId{nombre id} }}
        }
        roleById(id: "${localStorage.sRolId}") {
          menuesByRolId {nodes {
            enlaceByEnlaId {nombre nivel ruta imagen
              enlacesByPadreId(condition: {nivel: 2} orderBy: ORDEN_ASC) {nodes {
                menuesByEnlaId(condition: {rolId: "${localStorage.sRolId}"}) {
                  nodes {enlaceByEnlaId {nombre nivel ruta imagen
          }}}}}}}}}
    }`;
    /*
    fnGql({query:q, action:function(res){
      //localStorage.sRolId = res.data.miUsuario.usrRolesByUserId.nodes[0].rolId;
      fnMenuUser(res);
      $("#ssRoles").val(localStorage.sRolId);
    }});
    */
    if (navigator.onLine) {
      fnGraph(q).then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      }).catch(err => console.console("Error Graph:"))
      .then(res => {
        if(res === undefined){
          var store = getObjectStore('temporales', 'readwrite');
          store.get(1).onsuccess = function(event) {
            fnMenuUser(event.target.result);
          };
        }else{
          fnMenuUser(res);
          $("#ssRoles").val(localStorage.sRolId);
        }
      });
    }else{
      setTimeout(function(){ 
        var store = getObjectStore('temporales', 'readwrite');
        store.get(1).onsuccess = function(event) {
          fnMenuUser(event.target.result);
        };
      }, 1000);  
    }

  }

  
})(document);


function fnGraph(query) {
  //console.log(query);
  query = JSON.stringify({"query":query});
  var misCabeceras = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  if (localStorage && localStorage.token) {
    misCabeceras = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    });
  }
  var miInit = { method: 'POST',
                headers: misCabeceras,
                mode: 'cors',
                body: query };
  return fetch(HOSTSERV+'/graphql',miInit);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('sync-factura').then(res =>{
      console.log("Detalle....", res);          
    }).catch(err => {
      console.log("error ...", err);
    });
  });
}

(function () {
  'use strict';

  var headerElement = document.querySelector('header');
  var metaTagTheme = document.querySelector('meta[name=theme-color]');

  //After DOM Loaded
  document.addEventListener('DOMContentLoaded', function(event) {
    //On initial load to check connectivity
    if (!navigator.onLine) {
      updateNetworkStatus();
    }

    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
  });

  //To update network status
  function updateNetworkStatus() {
    if (navigator.onLine) {
      //metaTagTheme.setAttribute('content', '#0288d1');
      //headerElement.classList.remove('app__offline');
      document.getElementsByTagName("footer")[0].classList.remove("X");
      document.querySelector("#logo").src = './img/logo.png';
      document.querySelector("#symbol").src = './img/symbol.png';
    }
    else {
      //toast('App is offline');
      document.getElementsByTagName("footer")[0].classList.add("X");
      document.querySelector("#logo").src = './img/logoOn.png';
      document.querySelector("#symbol").src = './img/symbolOn.png';
      //metaTagTheme.setAttribute('content', '#6b6b6b');
      //headerElement.classList.add('app__offline');
    }
  }
})();


