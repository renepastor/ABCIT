import utilsServ from "./UtilsServ";
import UtilsServ from "./UtilsServ";

const PUServ = {
    // --------------------------------
    // Listar item q searan modificado
    // --------------------------------
    itemsASerModificado : (idItem) => {
        return idItem;
    }

    // --------------------------------
    //  suma ides
    // --------------------------------
    , sumaColumna : (selectorASumar) => {
        let resul = [];
        //$(selectorASumar).map((r, res) => resul.push(res.innerText))
        $(selectorASumar).map((r, res) => resul.push(res.dataset.v))
        return resul;
    }
    // --------------------------------
    // Convert text en input
    // --------------------------------
    , text2Input : (name, value="", funcion="") => {
        let html = `<input name="${name}" id="${name}" value="${value}" ${funcion} min="0" step="0.10" type="text" required="required" class="form-control form-control-sm" tabindex="-1">`
        html = $(html).on("blur ", function(){
            PUServ.input2Text(this)
        });
        return html;
    }
    // --------------------------------
    // Convert input en text
    // --------------------------------
    , input2Text : (obj=0) => {
        if(obj != 0){
            let row = $("#"+obj.id).parent().parent();
            //$("#"+obj.id).parent().text(obj.value);
            $("#"+obj.id).parent().text(obj.dataset.v);
            //let cantidad = row.find(".pu").text();
            let cantidad = row.find("#cantidaTemp").val();
            row.find(".pt").text(utilsServ.formatNumero(obj.value * 1 + cantidad*1)).data("v",obj.value * 1 + cantidad*1);
            row.find(".can").text(utilsServ.formatNumero(cantidad*1)).data("v",cantidad);
        }
        let reducer = (accumulator, currentValue) => (accumulator*1 + currentValue*1);
        let totalMaterial = (PUServ.sumaColumna("#pnlMat .pt")).reduce(reducer)
        let totalManoObra = (PUServ.sumaColumna("#pnlMano .pt")).reduce(reducer)
        let totalEquipo = (PUServ.sumaColumna("#pnlEquipo .pt")).reduce(reducer)
        let totalPrecioUnitario = (PUServ.sumaColumna(".pt")).reduce(reducer)    
    
        
        
        // SUB TOTALES
        $("#totalMaterial").text(utilsServ.formatNumero(totalMaterial))
        $("#totalManoObra").text(utilsServ.formatNumero(totalManoObra))
        $("#totalEquipo").text(utilsServ.formatNumero(totalEquipo))
        $("#totalPrecioUnitario").text(utilsServ.formatNumero(totalPrecioUnitario))
        
        // GASTO GENERAL
        let gastosGenerales = (totalMaterial + totalManoObra + totalEquipo) * $("#pcGastosGenerales").data("v");
        $("#gastosGenerales, #totalGastosGenerales")
        .text(utilsServ.formatNumero(gastosGenerales))
        .attr("data-v",utilsServ.redondeo(gastosGenerales,6));
        
        // UTILIDAD
        let utilidades = (gastosGenerales + eval($("#totalGastosGenerales").data("v"))) * $("#pcUtilidad").data("v");
        $("#utilidad")
        .text(utilsServ.formatNumero(utilidades))
        .attr("data-v",utilsServ.redondeo(utilidades,6))
        
        // COSTO FINANCIAMIENTO
        let costoFinanciamiento = (gastosGenerales + eval($("#totalGastosGenerales").data("v"))) * $("#pcCostoFinanciamiento").data("v");
        $("#costoFinanciamiento")
        .text(utilsServ.formatNumero(costoFinanciamiento))
        .attr("data-v",utilsServ.redondeo(costoFinanciamiento,6))
        
        // TOTAL 5
        let totalUtilidad = (eval($("#utilidad").data("v") + $("#costoFinanciamiento").data("v")) );
        $("#totalUtilidad")
        .text(utilsServ.formatNumero(totalUtilidad))
        .attr("data-v",utilsServ.redondeo(totalUtilidad,6))

        // INPUESTOS
        let pcImpuestoTransaccion = (gastosGenerales + totalUtilidad + eval($("#totalGastosGenerales").data("v"))) * $("#pcImpuestoTransaccion").data("v");
        $("#impuestoTransaccion, #totalImpuesto")
        .text(utilsServ.formatNumero(pcImpuestoTransaccion))
        .attr("data-v",utilsServ.redondeo(pcImpuestoTransaccion,6))
        
        //console.log("total..",total.reduce(reducer), total1)
    }

    , parametrosPU:()=>{
        // PARAMETROS
        let paramPU = JSON.parse(utilsServ.getSession("paramPU"));
        let gastoGen = paramPU.find(r=>(r.campo == 'GASTOS GENERALES'))
        let utilidad = paramPU.find(r=>(r.campo == 'UTILIDAD'))
        let impTran = paramPU.find(r=>(r.campo == 'IMPUESTO A LAS TRANSACCIONES'))
        let financia = paramPU.find(r=>(r.campo == 'FINANCIAMIENTO (FACTOR)'))
        $("#pcGastosGenerales").text(gastoGen.valor).attr("data-v",gastoGen.valor)
        $("#pcCostoFinanciamiento").text(financia.valor).attr("data-v",financia.valor)
        $("#pcUtilidad").text(utilidad.valor).attr("data-v",utilidad.valor)
        $("#pcImpuestoTransaccion").text(impTran.valor).attr("data-v",impTran.valor)
        PUServ.input2Text(this)
    }
}

export default PUServ;