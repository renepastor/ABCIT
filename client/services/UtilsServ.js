import config  from '../config'
import qs from 'qs';
import axios  from 'axios'

const UtilsServ = { 
    minimizarImg : (params) =>{
        /**
        *Funcion minimiza imagen en javascript
        *params.img = identificador de la imagen
        *params.input = identificador de la input donde almacenara la imagen
        *params.w = ancho de la imagen, default 100
        *params.h = alto de la imagen, default 100
        **/
        var defaults = {
          imge:this.id,
          input:this.id,
          w:100,
          h:100
        }
        var params =$.extend({},defaults, params);
        var idFile = params.input+"File";
        var preview = document.getElementById(idFile).files[0];
        //var file    = document.querySelector("input[type=file]").files[0];
        var file    = document.getElementById(idFile).files[0];
        var reader  = new FileReader();
        //document.getElementById("pngHolder").innerHTML = "";
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
        reader.onloadend = function () {
          // $("#ringoImage").attr("src",reader.result);
          var img = new Image(params.w,params.h);
          img.src = reader.result;
          img.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = params.w;
            canvas.height = params.h;
            canvas.getContext("2d").drawImage(img, 0, 0, params.w,params.h);
            var imgText =  canvas.toDataURL("image/png");
            document.getElementById(params.imge).src=imgText;
            document.getElementById(params.input).value=imgText;
          }
        }
    }
    ,fnForm : (reg) =>{
        var req = reg.req?"required='required' ":"";
        switch(reg.tp) {
            case "titulo":
                return `<h4 class="col-12 bg-1">${reg.label}</h4>`;
                break;
            case "textarea":
                return `<div class="col form-group">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <textarea name="${reg.name}" id="${reg.name}" value="" class="${reg.tp} form-control" ${req}></textarea>
                </div>`;
                break;
            case "punto":
                return `
                <div class="col form-group">
                <label class="form-label" for="${reg.name}">${reg.label}:</label>
                <a href="javascript:void(0)" id="ver_${reg.name}" target="_blank" class="fa fa-map-marker">
                <input name="${reg.name}" id="${reg.name}" value="" class="${reg.tp} form-hidden" type="text" value="" ${req} oninvalid="this.setCustomValidity('Es nesesario que su GPS este habilitado')" oninput="this.setCustomValidity('')"> 
                    Ver</a>
                </div>`;
                break;
            case "button":
                return `
                <div class="col form-group">
                <label class="form-label" for="${reg.name}">${reg.label}:</label>
                <div id="status"></div>
                <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>`;
                break;
            case "radio":
                var list = JSON.parse(reg.data);
                var html = "";
                list.map((r,x) => html += `
                    <label class="btn-group mr-2 label-radio" for"${r}">
                        <div class="input-group-text">
                            <input name="${reg.name}" id="${reg.name}${x}" value="${r}" type="radio" class="${reg.tp}${reg.name} form-check-input" ${req}>
                        </div>
                        <div class="input-group-text">
                            ${r}
                        </div>
                    </label>
                `)
                return `<div class="col input-group">
                        <label class="form-label" for="${reg.name}">${reg.label}:</label>
                        <div class="btn-toolbar ${reg.tp}" id="${reg.name}">
                            ${html}
                        </div>
                    </div>
                `;
                break;
            case "text":
                return `
                <div class="col form-group">
                <label class="form-label" for="${reg.name}">${reg.label}:</label>
                <input name="${reg.name}" id="${reg.name}" value="" class="${reg.tp} form-control" type="text" ${req}>`;
                break;
            case "number":
                return `
                <div class="col form-group">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="" class="${reg.tp} form-control" type="text" ${req}>
                </div>`;
                break;
            case "date":
                return `
                <div class="col form-group">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="" class="${reg.tp} form-control" type="date" ${req}>
                </div>`;
            case "checkbox":
                return `
                <div class="col form-group">
                    <label class="form-check-label" >${reg.label}:</label>
                        <label class="input-group" for="${reg.name}">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input name="${reg.name}" id="${reg.name}" value="" type="checkbox" class="${reg.tp} form-check-input">
                                </div>
                            </div>
                            <div class="input-group-text">
                                ${(JSON.parse(reg.data)).join("/")}
                            </div>
                        </label>
                </div>`;
                break;
            case "select":
                var selOption = "";
                JSON.parse(reg.data).map(r=>{
                    selOption += `<option value="${r}">${r}</option>`;
                });
                return `
                <div class="col form-group">
                <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                <select name="${reg.name}" id="${reg.name}" class="${reg.tp} form-control" ${req}><option>--Seleccionar--</option>${selOption}</select>
                </div>`;
                break;
            case "cel":
                return `
                <div class="col form-group">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select id="sel_${reg.name}" class="form-control">
                                <option value="591">Bol</option>
                                <option value="55">Brasil</option>
                                <option value="51">Peru</option>
                            </select >
                        </div>
                        <input name="${reg.name}" id="${reg.name}" type="number" value="" min="60000000" max="79999999" class="${reg.tp} form-control" aria-label="Text input with dropdown button" ${req}>
                    </div>
                </div>
                `;
                break;
            case "ci":
                return `
                <div class="col form-group">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <div class="input-group">
                        <input name="${reg.name}" id="${reg.name}" type="number" min="10" value="" max="99999999" class="${reg.tp} form-control" aria-label="Text input with dropdown button" ${req}>
                        <div class="input-group-prepend">
                            <select id="sel_${reg.name}" class="form-control">
                                <option value="BE">Beni</option>
                                <option value="CB">Cochabamba</option>
                                <option value="CH">Chuquisaca</option>
                                <option value="LP">La Paz</option>
                                <option value="OR">Oruro</option>
                                <option value="PD">Pando</option>
                                <option value="PT">Potosí</option>
                                <option value="SC">Santa Cruz</option>
                                <option value="TJ">Tarija</option>
                                <option value="EX">Extranjero</option>
                            </select >
                        </div>
                    </div>
                </div>
                `;
                break;
            
            case "multCheck":
                var list = JSON.parse(reg.data);
                var html = "";
                list.map(r => html += `
                    <label class="input-group" for"${r}">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input name="${r}" id="${r}" value="${r}" type="checkbox" class="${reg.tp}${reg.name} form-check-input">
                            </div>
                        </div>
                        <div class="input-group-text">
                            ${r}
                        </div>
                        </label>
                `)
                return `<div class="col input-group">
                        <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                        <div class="input-group ${reg.tp}" id="${reg.name}">
                            <input name="${reg.name}" id="${reg.name}" value="${reg.name}" type="hidden" class="${reg.tp} form-check-input" ${req}>
                            ${html}
                        </div>
                    </div>
                `;
                break;
            default:
                return `
                <div class="col form-group">
                    <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                        <input name="${reg.name}" id="${reg.name}" value="" class="texto form-control" type="text" ${req}>
                </div>`;
            }
    }
    //
    // 
    ,fnFetch : (param) =>{
        var obj = Object.assign(param, {method:"POST"});
        var misCabeceras = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        if (sessionStorage && UtilsServ.getSession("token")) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + UtilsServ.getSession("token");
            misCabeceras = new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UtilsServ.getSession("token"),
                'Content-Type': 'application/json'
            });
        }
                     
        var authOptions = {
            method: 'POST',
            url: obj.url,
            data: qs.stringify({"query":obj.data}),
            headers: misCabeceras
        };

        return axios(authOptions)
        .then(res => {
            if(res.statusText != "OK") alert("Error "+res.status);
            if(res.data.errors != undefined) console.log(res.data.errors[0].message);
            return res.data;
        });

    }
    ,fnFetch_0 : (param) =>{
        var obj = Object.assign(param, {method:"POST"});
        var misCabeceras = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        if (sessionStorage && UtilsServ.getSession("token")) {
            misCabeceras = new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + UtilsServ.getSession("token"),
                'Content-Type': 'application/json'
            });
        }
        var miInit = { method: 'POST',
                        headers: misCabeceras,
                        mode: 'cors',
                        body: JSON.stringify({
                            "query":obj.data
                        })
                     };
        return fetch(obj.url,miInit).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        });
    }
    ,fnPaginarList : (param) => {
        var reg = param.nPg * config.LIMIT_PG;
        var nro = (reg - config.LIMIT_PG );
        do {
            var lista = param.lista[nro];
            nro = nro + 1;
            if(lista){
                $(param.pnl).append(param.htmlList(lista, nro));
                $(param.pnl+"Foot").html(`Reg.: ${nro}  de ${param.lista.length}`);
            }
        } while (nro < reg);
    }
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    ,parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }
    
    //---------------------------------
    // armando el input
    // --------------------------------
    ,formInput :(obj) => {
        var dt = ""; var coma = "", rowData = {};
        $(obj).serializeArray().map(res => {
            if ($("#" + res.name + ".numero").length > 0)
                dt += coma + res.name + ':"' + (parseInt(res.value)).toString() + '"';
            if ($("#" + res.name + ".cel").length > 0){
                var cod = $("#sel_" + res.name).val();
                dt += coma + res.name + ':"'+cod+' '+res.value+'"';
            }
            if ($("#" + res.name + ".ci").length > 0){
                var cod = $("#sel_" + res.name).val();
                dt += coma + res.name + ':"'+res.value+' '+cod+'"';
            }
            if ($("#" + res.name + ".text").length > 0)
                dt += coma + res.name + ':"' + res.value + '"';
            if ($("#" + res.name + ".radio").length > 0){
                var val = (res.value == "Si")?1:0;
                dt += coma + res.name + ':' + val + '';
            }
            if ($("#" + res.name + ".select").length > 0)
                dt += coma + res.name + ':"' + $("#"+res.name).val() + '"';
            if ($("#" + res.name + ".textarea").length > 0){
                dt += coma + res.name + ':"' + res.value.replace(/(\r\n|\n|\r)/gm, "<br>") + '"';
            }
                
            if ($("#" + res.name + ".checkbox").length > 0) {
                var chec = (res.value=="on")?"true":"false";
                dt += coma + res.name + ':"' + chec + '"';
            }
            if ($("#" + res.name + ".date").length > 0) {
                dt += coma + res.name + ':"' + forDate(res.value) + '"';
            }
            if ($("#" + res.name + ".multCheck").length > 0) {
                var listChec = [];
                $(".multCheck"+ res.name).map((i, r) => {
                    r.checked?listChec.push(r.value):"";
                });
                dt += coma + res.name + ':' + JSON.stringify(listChec) + '';
            }
            if ($("#" + res.name + ".punto").length > 0) {            
                dt += coma + res.name + ':' + JSON.stringify(res.value) + '';
            }
            if ($("#" + res.name + ".json").length > 0)
                dt += coma + res.name + ':' + JSON.stringify(res.value) + '';
            coma = ",";
            //console.log(res.name, dt);
        });
        return dt;

    }

    ,formOuput :(obj, data) => {
        var dt = ""; var coma = "", rowData = {};
        //$(obj).serializeArray().map(res => {
        for(var i in data){
            if ($("#" + i + ".numero").length > 0)
                $("#"+i).val(data[res.name]);
            if ($("#" + i + ".cel").length > 0){
                var cod = data[i].split(" ");
                $("#sel_"+i).val(cod[0]);
                $("#"+i).val(cod[1]);
            }
            if ($("#" + i + ".ci").length > 0){
                var cod = data[i].split(" ");
                $("#sel_"+i).val(cod[1]);
                $("#"+i).val(cod[0]);
            }
            if ($("#" + i + ".text").length > 0)
                $("#"+i).val(data[i]);
            if ($("#" + i + ".radio").length > 0){
                var val = (data[i]=="1")?"Si":"No";
                $("input[name='"+i+"'][value='"+val+"']").prop('checked', true);
            }
            if ($("#" + i + ".select").length > 0)
                $("#"+i).val(data[i]);
            if ($("#" + i + ".textarea").length > 0)
                $("#"+i).val(data[i]);
            if ($("#" + i + ".checkbox").length > 0) {
                var chec = (res.value=="on")?"true":"false";
                dt += coma + i + ':"' + chec + '"';
            }
            if ($("#" + i + ".date").length > 0) {
                $("#"+i).val(JSON.stringify(data[i]));
            }/*
            if ($("#" + i + ".multCheck").length > 0) {
                var listChec = [];
                $(".multCheck"+ i).map((i, r) => {
                    r.checked?listChec.push(r.value):"";
                });
                dt += coma + i + ':' + JSON.stringify(listChec) + '';
            }*/
            if ($("#" + i + ".punto").length > 0) {
                $("#"+i).val(JSON.stringify(data[i]));
            }/*
            if ($("#" + i + ".json").length > 0)
                dt += coma + res.name + ':' + JSON.stringify(res.value) + '';
            coma = ",";*/
            //console.log(res.name, dt);
        };
        return dt;

    }

    ,miPunto:(pnl)=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude?position.coords.latitude:0;
            var lng = position.coords.longitude?position.coords.longitude:0;
            console.log(lat,lng, document.getElementById(pnl))
            document.getElementById(pnl).value = JSON.stringify([lat,lng]);
            document.getElementById("ver_"+pnl).href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=19/${lat}/${lng}`;
        });
    }
    ,geoPop:(id)=>{
        $("#pnlFijo").html(`<div class="modal-dialog modal-dos" role="document">
        <form class="csForm modal-content" id="formCrearDetallePermisoVacacion">
          <div class="modal-header">
            <legend class="modal-title" id="exampleModalLongTitle">Georreferencia</legend>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-0 m-0">
            <div class="row align-items-start mx-0">
              <div class="w-100 bg-warning text-dark position-relative">
                <h4 class=""> Con el cursor selecciona <i class="fa fa-map-marker"></i> y ubique en su posición</h4>
              </div>
              <div class="form-group col">
                <div id='map' style="height: 30em;"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      `);
        //var obj = {dataset:{"url":"/punto.html", "target":"#pnlFijo","dataUrl":"/punto.html", "dataTarget":"#pnlFijo", "dataBackdrop":"static"}};
        UtilsServ.setSession("inputNamePoint", name);
        $("#pnlFijo").modal("toggle");
        UtilsServ.mapPoint(UtilsServ.setSession("inputNamePoint"));
        //fnUrl(obj);
    }
    ,mapPoint:(name)=>{
        mapboxgl.accessToken = 'pk.eyJ1IjoicmVuZXBhc3RvciIsImEiOiJjam5lcjRmaXgwMGwwM3JyMW9teHpnaGtuIn0.1PBzVNQLaIubrI77ZmediA';
        var coordinates = document.getElementById(name);
        var latLon = [-68.0954, -16.5497];
        if(UtilsServ._id(name).value){
          latLon = eval(UtilsServ._id(name).value);
          latLon = [latLon[1],latLon[0]];
        }
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
          var name = UtilsServ.getSession("inputNamePoint");
          UtilsServ._id(name).value = JSON.stringify(lngLat);
          marker.setLngLat([lngLat.lng, lngLat.lat]);
        });
        var marker = new mapboxgl.Marker({
          draggable: true,
          title:"Punto de venta del producto"
        }).setLngLat(latLon ).addTo(map);

        marker.on('dragend', function() {
            //console.log(slGet("inputNamePoint"))
            var lngLat = marker.getLngLat();
            var name = UtilsServ.getSession("inputNamePoint");
            if(name != null)
            UtilsServ._id(name).value = JSON.stringify([lngLat.lat,lngLat.lng]);
          });
          function onDragEnd() {
            var lngLat = marker.getLngLat();
            var name = UtilsServ.getSession("inputNamePoint");
            if(name != null){
                UtilsServ._id(name).value = JSON.stringify([lngLat.lat,lngLat.lng]);
            }
          }
          marker.on('dragend', onDragEnd);
    }
        
      
    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    , getSession:(name)=>{
        return window.sessionStorage.getItem(name)
    }

    , setSession:(nombre, valor)=>{
        window.sessionStorage.setItem(nombre, valor)
    }

    ,isNull:(val, defaul="")=>{
       if(val===null || val===undefined) val = defaul;
       return val;
    }

    ,redondeo : (numero, decimales=2) => {
        var flotante = parseFloat(numero);
        var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
        return resultado;
    }

    ,formatNumero : (nStr, decimales=2) =>{
        if(nStr=="") return "0,00";
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? ',' + x[1] + '0000000' : ',0000000';
        x2 = x2.substring(0, decimales+1);
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    ,numeroALetras:(num)=>{
        return NumeroALetras(num)
    }

    ,_id:(id)=>{
        return document.getElementById(id);
    }

    ,menos: (id)=>{
        var obj = UtilsServ._id(id);
        if(!obj.step) obj.step = 1;
        if(!obj.value) obj.value = 0;
        if(obj.value*1-obj.step*1 >= obj.min*1)
          obj.value = obj.value*1-obj.step*1;
        //else obj.value = obj.value*1;
    }

    ,mas:(id)=>{
        var obj = UtilsServ._id(id);
        if(!obj.step) obj.step = 1;
        if(!obj.value) obj.value = 0;
        if(obj.value*1+obj.step*1 <= obj.max*1)
            obj.value = obj.value*1+obj.step*1;
        if(isNaN(obj.value))
            obj.value = 0;
          //else obj.value = obj.value*1;
    }

    ,selectDataList: (idInputText, idInputVal, idDataList) =>{
        $(idInputText).on('input', function() {
            var userText = $(this).val(), sw = 0;
            //if($(this).val()=="") $(idInputVal).val("");
            $(idDataList).find("option").each(function() {
                if ($(this).val() == userText) {
                    let idVal = this.dataset.val;
                    $(idInputVal).val(idVal);
                    sw = 1;
                }
            })
            if(sw==0){
                $(idInputVal).val("");
            }
          })
    }

    ,selectOp:(param)=>{
        let pnl = document.getElementById(param.pnl);
        let count = 1;
        let dataList = param.data;
        dataList.forEach(mediaDevice => {
            const option = document.createElement('option');
            option.value = mediaDevice[param.valor];
            const label = param.texto.map(r => mediaDevice[r]?mediaDevice[r]:r);
            const textNode = document.createTextNode(label.join(''));
            option.appendChild(textNode);
            pnl.appendChild(option);
        });
    }

    ,minimizarImg:(params)=> {
        /**
        *Funcion minimiza imagen en javascript
        *params.img = identificador de la imagen
        *params.input = identificador de la input donde almacenara la imagen
        *params.w = ancho de la imagen, default 100
        *params.h = alto de la imagen, default 100
        **/
        let defaults = {
          imge:params.obj.id,
          input:params.obj.id,
          w:300,
          h:300
        }
        var params =$.extend({},defaults, params);
        var idFile = params.input+"File";
        var preview = document.getElementById(idFile).files[0];
        //var file    = document.querySelector("input[type=file]").files[0];
        var file    = document.getElementById(idFile).files[0];
        var reader  = new FileReader();
        //document.getElementById("pngHolder").innerHTML = "";
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
        reader.onloadend = function () {
          // $("#ringoImage").attr("src",reader.result);
          var img = new Image(params.w,params.h);
          img.src = reader.result;
          img.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = params.w;
            canvas.height = params.h;
            if(params.canvas){
                document.getElementById(params.canvas).getContext("2d").drawImage(img, 0, 0, params.w,params.h);
            }else{
                canvas.getContext("2d").drawImage(img, 0, 0, params.w,params.h);
                var imgText =  canvas.toDataURL("image/png");
                document.getElementById(params.imge).src=imgText;
                document.getElementById(params.input).value=imgText;
            }
          }
        }
    }

    ,imagenUpload:(param)=>{
        var send= function(blob){
            var filename = 'img.png';
            var formdata = new FormData();
            formdata.append('miFile', blob, filename);

            $.ajax({
                url: './upload',
                type: "POST",
                data: formdata,
                mimeTypes:"multipart/form-data",
                processData: false,
                contentType: false,
                success: function (result) {
                    let valImg = document.getElementById(param.idValor);
                    let arrayImg = valImg.value ? JSON.parse(valImg.value) : [];
                    arrayImg.push(JSON.parse(result));
                    valImg.value = JSON.stringify(arrayImg);
                    UtilsServ.tempListImg({"pnl":"listImages","data":arrayImg})
                },
                error: function (error) {
                    console.log("Something went wrong!");
                }
            })            
        }

        var canvasImage = document.getElementById(param.idCanvas);
        if(!canvasImage.toBlob){
            var dataURL = canvasImage.toDataURL();
            var bytes = atob(dataURL.split(',')[1])
            var arr = new Uint8Array(bytes.length);
            for(var i=0; i<bytes.length; i++){
                arr[i]=bytes.charCodeAt(i);
            }
            send(new Blob([arr], {type:'image/png'}));
        }
        else{
            canvasImage.toBlob(send);
        }
    }

    ,tempListImg:(param)=>{
        document.getElementById(param.pnl).innerHTML = "";
        param.data.map(reg => {
            let div = document.createElement("div");
            div.classList.add("list-group-item");
            div.classList.add("p-0");
            div.classList.add("m-0");
            let btnClose = document.createElement("span");
            btnClose.innerHTML = "x";
            btnClose.setAttribute('data-val', reg.url);
            btnClose.classList.add("close");
            btnClose.classList.add("position-absolute");
            btnClose.classList.add("btn");
            btnClose.classList.add("btn-outline-primary");
            btnClose.addEventListener('click', event => {
                console.log("###### Borrar file", reg.url)
            });
            let img = document.createElement("img");
            img.width = 60;
            img.height = 60;
            div.appendChild(btnClose)
            div.appendChild(img)
            img.src = reg.url;
            document.getElementById(param.pnl).appendChild(div);
        })
    }

    ,btnFacebook:()=>{
        var d=document, s='script', id='facebook-jssdk';
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)){location.reload(); return;}
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.1&appId=3021042347938700';
        fjs.parentNode.insertBefore(js, fjs);
        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                testAPI();
            } else {
                console.log("Boton iniciar");
            }
            }

            function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
            }
        console.log("##;;::,,...", this)
    }

}

export default UtilsServ;



//---------------------------------
//Numero en literal
function Unidades(num){
    switch(num){
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }
    return "";
}//Unidades()

function Decenas(num){
    var decena = Math.floor(num/10);
    var unidad = num - (decena * 10);

    switch(decena){
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)
    return strSin;
}//DecenasY()

function Centenas(num) {
    var centenas = Math.floor(num / 100);
    var decenas = num - (centenas * 100);
    switch(centenas){
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    var cientos = Math.floor(num / divisor)
    var resto = num - (cientos * divisor)
    var letras = "";
    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;
    if (resto > 0)
        letras += "";
    return letras;
}//Seccion()

function Miles(num) {
    var divisor = 1000;
    var cientos = Math.floor(num / divisor)
    var resto = num - (cientos * divisor)
    var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    var strCentenas = Centenas(resto);
    if(strMiles == "")
        return strCentenas;
    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    var divisor = 1000000;
    var cientos = Math.floor(num / divisor)
    var resto = num - (cientos * divisor)
    var strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    var strMiles = Miles(resto);
    if(strMillones == "")
        return strMiles;
    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'BOLIVIANOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'BOLIVIANO', //"PESO", 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };
    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            return data.centavos + "/100";
        })();
    };
    if(data.enteros == 0)
        return "CERO " + data.letrasCentavos + " " + data.letrasMonedaPlural;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaSingular;
    else
        return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaPlural;
}//NumeroALetras()










function forDate(obj){
    if(obj==undefined) return "";
    return obj;
}//forDate()

function fnFaceboock(){
    var d=document, s='script', id='facebook-jssdk';
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)){location.reload(); return;}
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.1&appId=232856817910000';
    fjs.parentNode.insertBefore(js, fjs);
    function statusChangeCallback(response) {
        if (response.status === 'connected') {
          testAPI();
        } else {
          console.log("Boton iniciar");
        }
      }
      
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }
       
    console.log("##;;::,,...", this)
}
function fnEnable(){
    var empty = false;
    $('form > input[required]').each(function() {
        if ($(this).val() == '') {
            empty = true;
        }
    });

    if (empty) {
        $('#register').attr('disabled', 'disabled');
    } else {
        $('#register').removeAttr('disabled');
    }
}

var menos = function(id){
  var obj = UtilsServ._id(id);
  if(!obj.step) obj.step = 1;
  if(!obj.value) obj.value = 0;
  if(obj.value*1-obj.step*1 >= obj.min*1)
    obj.value = obj.value*1-obj.step*1;
  //else obj.value = obj.value*1;
}
var mas = function(id){
  var obj = UtilsServ._id(id);
  if(!obj.step) obj.step = 1;
  if(!obj.value) obj.value = 0;
  if(obj.value*1+obj.step*1 <= obj.max*1)
    obj.value = obj.value*1+obj.step*1;
  //else obj.value = obj.value*1;
}

