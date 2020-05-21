        var data = 
        [
            {"dep":"1","tp":"titulo", "label":"ANTECEDENTE PERSONAL"},
            {"dep":"1","tp":"hidden", "name":"persId", "req":true},
            {"dep":"1","tp":"select", "name":"idTipoEmpleo", "label":"Unidad Medida", "req":true},
            {"dep":"1","tp":"select", "name":"idMoneda", "label":"Moneda", "req":true},
            {"dep":"1","tp":"selectAjax", "name":"idProducto", "label":"Producto", "req":true},
            {"dep":"1","tp":"text", "name":"descripcion", "label":"Descripcion", "req":true},
            {"dep":"1","tp":"text", "name":"nombres", "label":"Nombre", "req":true},
            {"dep":"1","tp":"fotos", "name":"imagenes", "label":"Fotos", "req":true},
            {"dep":"1","tp":"number", "name":"cantidad", "label":"Cantidad", "req":true},
            {"dep":"1","tp":"number", "name":"cantidadExistente", "label":"Cantidad Existente", "req":true},
            {"dep":"1","tp":"number", "name":"cantidadMin", "label":"Cant. Minima", "req":true},
            {"dep":"1","tp":"number", "name":"pUnitario", "label":"P Unitario", "req":true},
            {"dep":"1","tp":"number", "name":"pVenta", "label":"P Venta", "req":true}
        ];
        
        
        var data =
        [
            {"dep":"1","tp":"titulo", "label":"ANTECEDENTE PERSONAL"},
            {"dep":"1","tp":"hidden", "name":"id", "req":true},
            {"dep":"1","tp":"hidden", "name":"persId", "req":true},
            {"dep":"1","tp":"select", "name":"idTipoEmpleo", "label":"Rubro o Actividad", "req":true},
            {"dep":"1","tp":"select", "name":"idTipoAnuncio", "label":"Tipo Anuncio", "req":true},
            {"dep":"1","tp":"ci", "name":"ci", "label":"Documento de Identificacion", "req":true},
            {"dep":"1","tp":"buttonFb", "name":"facebook", "label":"Facebook", "req":true},
            {"dep":"1","tp":"cel", "name":"celular", "label":"Numero de Celular", "req":true},
            {"dep":"1","tp":"text", "name":"direccion", "label":"Direccion", "req":true},
            {"dep":"1","tp":"punto", "name":"coordenadas", "label":"Cordenadas", "req":true},
            {"dep":"1","tp":"textarea", "name":"anuncio", "label":"Anuncio", "req":true}
        ];
        
        var data =
        [
            {"dep":"1","tp":"titulo", "label":"Datos Personales"},
            {"dep":"1","tp":"hidden", "name":"id", "req":true},
            {"dep":"1","tp":"label", "name":"Nombre Completo", "req":true},
            {"dep":"1","tp":"ci", "name":"ci", "label":"Documento de Identificacion", "req":true},
            {"dep":"1","tp":"direccion", "name":"direccion", "label":"Dirección", "req":true},
            {"dep":"1","tp":"punto", "name":"coordenadas", "label":"Cordenadas", "req":true},
            {"dep":"1","tp":"radio", "name":"enfermedadBase", "label":"¿Usted tiene alguna Enfermedad de Base?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"mayorA60", "label":"¿Usted tiene 60 o mas años de edad?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"embarasada", "label":"¿ Usted esta embarazada? ", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"hijoMenorA5", "label":"¿ Usted tiene hijos menores de 5 años?", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"cel", "name":"celular", "label":"Ingrese su Numero telefono celular Actual", "req":true},
            {"dep":"1","tp":"select", "name":"tipoTrasporte", "label":"Tipo Trasporte a Usar", "req":true},
            {"dep":"1","tp":"select", "name":"gradoFuncion", "label":"Indique en que grado cumpliria sus funciones desde casa", "req":true},

            {"dep":"1","tp":"titulo", "label":"Señale que sistemas o recuros utiliza para desarrollar sus funciones diarias"},
            {"dep":"1","tp":"radio", "name":"office", "label":"Office", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"sisVortex", "label":"Sistema Vortex", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"sisCorrespondencia", "label":"Sistema Correspondencia", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"sisNater", "label":"Sistema Nater", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"impresora", "label":"Impresoras", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"escaner", "label":"Escaners", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"llamadaNacional", "label":"LLamadas Nacionales", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"texto", "name":"otroSistema", "label":"Otros Sistemas", "req":true},
            {"dep":"1","tp":"texto", "name":"otroPrograma", "label":"Otros Programas", "req":true},


            {"dep":"1","tp":"titulo", "label":"En el Lugar donde vive usted tiene acceso a:"},
            {"dep":"1","tp":"radio", "name":"conInternet", "label":"Internet", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conComputadora", "label":"Computadora", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"audifonoMicrofono", "label":"Audifono Microfono", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conCelular", "label":"Celular", "data":"[\"Si\",\"No\"]", "req":true},
            {"dep":"1","tp":"radio", "name":"conLaptop", "label":"Laptop", "data":"[\"Si\",\"No\"]", "req":true}
        ];

function armarForm(reg){
    var regEdit = "${reg."+reg.name+"?reg."+reg.name+":''}";
    var req = reg.req?"required='required' ":"";
        switch(reg.tp) {
            case "titulo":
                return `                <h4 class="col-12 bg-1">${reg.label}</h4>`;
                break;
            case "textarea":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <textarea name="${reg.name}" id="${reg.name}" class="${reg.tp} form-control" ${req}>${regEdit}</textarea>
                </div>`;
                break;
            case "punto":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <a href="javascript:void(0)" id="ver_${reg.name}" target="_blank" class="fa fa-map-marker">
                    <input name="${reg.name}" id="${reg.name}" value="${regEdit}" class="json form-hidden" type="text" ${req} oninvalid="this.setCustomValidity('Es nesesario que su GPS este habilitado')" oninput="this.setCustomValidity('')"> Ver</a>
                </div>`;
                break;
            case "fotos":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="${reg.name}" class="img-thumbnail">
                        <img src="" id="${reg.name}_ax" width="50" height="50" alt="" class="foto"/>
                        <input type="hidden" name="${reg.name}" id="${reg.name}" value="${regEdit}" class="text">
                        <i>${reg.label}</i>
                        <input type="file" name="${reg.name}File" id="${reg.name}File" placeholder="Imagen" ${reg.required} 
                        class="form-control file-img" onchange="minimizarImg({'imge':'${reg.required}_ax','input':'${reg.required}'});"/>
                    </label>
                </div>`;
                break;
            case "hidden":
                return `
                <input name="${reg.name}" id="${reg.name}" value="${regEdit}" type="hidden" class="numero" ${req}>`;
                break;
            case "buttonFb":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <div id="status"></div>
                    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
                </div>`;
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
                            </label>`)
                return `<div class="col input-group">
                        <label class="form-label" for="${reg.name}">${reg.label}:</label>
                        <div class="btn-toolbar ${reg.tp}" id="${reg.name}">
                            ${html}
                        </div>
                    </div>`;
                break;
            case "text":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="${regEdit}" class="${reg.tp} form-control" type="text" ${req}>
                </div>`;
                break;
            case "number":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label for="${reg.name}">${reg.label} : </label>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-primary menos" data-in="${reg.name}">-</button>
                        <input type="text" name="${reg.name}" id="${reg.name}" value="${regEdit}" ${req} placeholder="${reg.label}" max="9999" min="0" step="1" size="5" class="form-control ${reg.type}"/>
                        <button type="button" class="btn btn-outline-primary mas" data-in="${reg.name}">+</button>
                    </div>
                </div>`;
                break;
            case "date":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="${regEdit}" class="${reg.tp} form-control" type="date" ${req}>
                </div>`;
            case "checkbox":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-check-label" >${reg.label}:</label>
                    <label class="input-group" for="${reg.name}">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input name="${reg.name}" id="${reg.name}" value="${regEdit}" type="checkbox" class="${reg.tp} form-check-input">
                            </div>
                        </div>
                        <div class="input-group-text">
                            ${(JSON.parse(reg.data)).join("/")}
                        </div>
                    </label>
                </div>`;
                break;
            case "selectAjax":
                var selOption = "";
                if (reg.data){
                  JSON.parse(reg.data).map(r=>{
                    selOption += `<option value="${r}">${r}</option>`;
                  });
                }
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="${regEdit}" class="texto form-control" type="serarch" ${req}>
                    <div id="list${reg.name}"></div>
                </div>`;
                break;
            case "select":
                var selOption = "";
                if (reg.data){
                  JSON.parse(reg.data).map(r=>{
                    selOption += `<option value="${r}">${r}</option>`;
                  });
                }
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                    <select name="${reg.name}" id="${reg.name}" class="${reg.tp} form-control" ${req}><option value="">--Seleccionar--</option>${selOption}</select>
                </div>`;
                break;
            case "cel":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select id="sel_${reg.name}" class="form-control">
                                <option value="591">Bol</option>
                                <option value="55">Brasil</option>
                                <option value="51">Peru</option>
                            </select >
                        </div>
                        <input name="${reg.name}" id="${reg.name}" type="number" value="${regEdit}" min="60000000" max="79999999" class="${reg.tp} form-control" aria-label="Text input with dropdown button" ${req}>
                    </div>
                </div>`;
                break;
            case "ci":
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label" for="${reg.name}">${reg.label}:</label>
                    <div class="input-group">
                        <input name="${reg.name}" id="${reg.name}" type="number" min="10" value="${regEdit}" max="99999999" class="${reg.tp} form-control" aria-label="Text input with dropdown button" ${req}>
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
                </div>`;
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
                                  </label>`);
                return `<div class="col input-group">
                            <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                            <div class="input-group ${reg.tp}" id="${reg.name}">
                                <input name="${reg.name}" id="${reg.name}" value="${reg.name}" type="hidden" class="${reg.tp} form-check-input" ${req}>
                                ${html}
                            </div>
                        </div>`;
                break;
            default:
                return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-check-label" for="${reg.name}">${reg.label}:</label>
                    <input name="${reg.name}" id="${reg.name}" value="${regEdit}" class="texto form-control" type="text" ${req}>
                </div>`;
            }
  }

function formOuput(obj, data) {
        var dt = ""; var coma = "", rowData = {};
        //$(obj).serializeArray().map(res => {
        for(var i in data){
            if ($("#" + i + ".number").length > 0)
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


//console.log(armarForm(data));
var html = ""
data.map(row => {
  html += (armarForm(row));
});
console.log(html);


