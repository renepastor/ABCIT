// --------------------------------
//  Define Data Sources
// --------------------------------

let Salir = {
    render : async () => {
        window.sessionStorage.clear();
        window.location = "index.html";
        let view =  /*html*/`
            <section class="section text-center">
              ........
            </section>
        `
        return view
    }
    , after_render: async () => {
        //window.location.reload(true);
    }
}

export default Salir;