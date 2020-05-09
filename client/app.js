"use strict";
import "./scss/style.scss";


import './css/sistema.css';
import './css/animate.css';

import './js/app.js'
/**Para PWA */
/////import './js/main.js'
//import './js/js.js'
import datetimepicker from 'bootstrap4-datetimepicker'
import { loadProgressBar }  from 'axios-progress-bar'

import Login              from './views/pages/Login.js'
import Home               from './views/pages/Home.js'
import Salir              from './views/pages/Salir.js'
import Usuarios           from './views/pages/Usuarios.js'
import adminIngresos      from './views/pages/adminIngresos.js'
import ConsultaMedica     from './views/pages/ConsultaMedica.js'
import Anuncios           from './views/pages/Anuncios.js'

import Error404           from './views/pages/Error404.js'
import navbarComp         from './views/components/NavbarComp.js'
import bottombarComp      from './views/components/BottombarComp.js' 
import utilsServ          from './services/UtilsServ.js'
import usuarioServ        from './services/UsuarioServ'

const pag = 20;

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'                       : Home
    , '/login'                : Login
    , '/salir'                : Salir
    , '/consultamedica'       : ConsultaMedica

    , '/usuario'              : Usuarios
    , '/adminingresos'        : adminIngresos
    , '/adminanuncios'        : Anuncios
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const inicio   = null || document.getElementById('login_container');
    const header   = null || document.getElementById('header_container');
    const content  = null || document.getElementById('pnlBody');
    const footer   = null || document.getElementById('footer_container');
    header.innerHTML = await navbarComp.render();
    await navbarComp.after_render();
    // Render the Header and footer of the page
    if(!utilsServ.getSession("token")){
        content.innerHTML = await Home.render();
        await Home.after_render();

        //inicio.innerHTML = await Login.render();
        //await Login.after_render(); 
    }else{
        
        footer.innerHTML = await bottombarComp.render();
        await bottombarComp.after_render();

        // Get the parsed URl from the addressbar
        let request = utilsServ.parseRequestURL()

        // Parse the URL and if it has an id part, change it with the string ":id"
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
        // Get the page from our hash of supported routes.
        // If the parsed URL is not in our list of supported routes, select the 404 page instead
        console.log("parsedURL", parsedURL)
        let page = routes[parsedURL] ? routes[parsedURL] : Error404
        content.innerHTML = await page.render();
        await page.after_render();
        $("#ssPnlUsuario").html(utilsServ.getSession("ssAlias"));
        // Menu para el usuario
        if($("#listMenu").text().trim() == ""){
            usuarioServ.primerRolMenu()
        }
    }
    loadProgressBar();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);


document.addEventListener('DOMContentLoaded', function(event) {
    //On initial load to check connectivity
    if (!window.navigator.onLine) {
    updateNetworkStatus();
    }
    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
});
//To update network status
function updateNetworkStatus() {
    if (window.navigator.onLine) {
        document.getElementsByTagName("footer")[0].classList.remove("X");
        if(document.querySelector("#logo1"))
            document.querySelector("#logo1").src = './img/img128.png';
        if(document.querySelector("#logo")){
            document.querySelector("#logo").src = './img/logo.png';
            document.querySelector("#symbol").src = './img/symbol.png';
        }
    }
    else {
        //toast('App is offline');
        document.getElementsByTagName("footer")[0].classList.add("X");
        if(document.querySelector("#logo1"))
            document.querySelector("#logo1").src = './img/logoOn.png';
        if(document.querySelector("#logo")){
            document.querySelector("#logo").src = './img/logoOn.png';
            document.querySelector("#symbol").src = './img/symbolOn.png';
        }
    }
}

//----------------------
// DATATIMEPICKER
//----------------------
var overrides = {
    icons: {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-sun-o',
      clear: 'fa fa-trash',
      close: 'fa fa-remove'
    },
};
//$.extend(true, $.fn.datetimepicker.defaults, overrides);
$.extend(true, datetimepicker.defaults, overrides);
