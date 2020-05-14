import login from '../components/LoginComp'
import usuarioServ from '../../services/UsuarioServ'
import Utils from '../../services/UtilsServ';

function resizeBroadcast() {
    var timesRun = 0;
    var interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === 5){
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }


let NavbarComp = {
    render: async () => {
      let view =  /*html*/` 
      <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
        <span class="fa fa-bars text-light m-1"></span>
      </button>
      <a href="./">
        <img src="../img/baner.png" height="56px">
      </a>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
        <span class="fa fa-bars text-light m-1" style="color:dark"></span>
      </button>
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item d-md-down-none">
          <a class="nav-link nav-item dropdown d-md-down-none" href="#">          
          </a>
        </li>
        <li class="nav-item d-md-down-none text-center">
        </li>
        <li class="nav-item d-md-down-none p-1 text-right" id="nombreUser"></li>
        <li class="">
          <i class="fa fa-3x fa-user-circle-o text-light" title="Ingresar al Sistema" id="btnLogin" data-toggle="popover" data-placement="bottom" data-url="/login.html" data-target="#pnlLogin"></i>
        </li>
      </ul>
        `
        return view
    },


    after_render: async () => {
      if (navigator.onLine) {
        document.getElementsByTagName("footer")[0].classList.remove("X");
        //document.querySelector("#logo").src = './img/logo.png';
        //document.querySelector("#symbol").src = './img/symbol.png';
        
      }
      else {
        document.getElementsByTagName("footer")[0].classList.add("X");
        //document.querySelector("#logo").src = './img/logoOn.png';
        //document.querySelector("#symbol").src = './img/symbolOn.png';
      }
  
      
      /* ---------- Main Menu Open/Close, Min/Full ---------- */
      $('.sidebar-toggler').click(function(){
        $('body').toggleClass(this.dataset.toggle);
        resizeBroadcast();
      });
     
      $('.aside-menu-toggler').click(function(){
        $('body').toggleClass('aside-menu-hidden');
        resizeBroadcast();
      });
      
      $('.mobile-sidebar-toggler').click(function(){
        $('body').toggleClass('sidebar-mobile-show');
        resizeBroadcast();
      });
      
      $('.sidebar-close').click(function(){
        $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
      });
      
      /* ---------- Disable moving to top ---------- */
      $('a[href="#"][data-top!=true]').click(function(e){
        e.preventDefault();
      });
      

      var bar = '<div id="pnlLogin" style="width:21em""></div>';
      Popover;
      $('#btnLogin').popover({title:"Perfil Usuario", html:true,content:bar});
      $('#btnLogin').on("click", function(){
        $("#pnlLogin").html(login.popover());
        login.actLogin();
        //usuarioServ.rolMenu("#ssPnlRoles");
        $("#ssPnlRoles").on("change", function(){
          Utils.setSession("ssIdRolUsuario", this.value);
          window.setTimeout(()=>{ window.location = "index.html"; }, 200);
        });
      });
  
      
    }

}

export default NavbarComp;