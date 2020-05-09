import usuarioServ from '../../services/UsuarioServ'
import UtilsServ from '../../services/UtilsServ';
let LoginComp = {
    popover: () => {
      let view =  `
      <div class="">
          <div class="fade show active tab-content p-1" id="pnlUsuarioSesion" role="tabpanel" aria-labelledby="tab-ldap">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text px-1">Usuario</span>
              </div>
              <span id="ssPnlUsuario" class="texto form-control text-truncate px-1"></span>
            </div>
          </div>
          <div class="fade show active tab-content p-1" id="pnlRolesSesion" role="tabpanel" aria-labelledby="tab-ldap">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Rol</span>
              </div>
              <select id="ssPnlRoles" required="" name="ssIdRol" class="texto form-control"></select>
            </div>
          </div>
          <div class="fade show active tab-content p-1" id="ldap" role="tabpanel" aria-labelledby="tab-ldap">
            <form method="POST" id="formLoginPopover" class="">
                <div class="card-header p-1"><b>Iniciar Sesion</b></div>
                <div class="input-group">
                  <div class="input-group-prepend fa-span">
                    <span class="input-group-text"><i class="fa fa-user"></i></span>
                  </div>
                  <input placeholder="Nombre de usuario" required="" type="text" id="pUsuario" name="pUsuario" class="texto form-control">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend fa-span">
                    <span class="input-group-text"><i class="fa fa-key"></i></span>
                  </div>
                  <input placeholder="Contraseña" required="" type="password" id="pClave" name="pClave" class="texto form-control">
                </div>
                <div class="inpForm m-1 text-center">
                  <button type="submit" class="btn btn-sm btn-outline-primary"><i class=" fa fa-sing-in"></i> Ingresar</button>
                  <a type="button" href="#/salir" class="btn btn-sm btn-outline-primary"> Salir <i class=" fa fa-sign-out"></i></a>
                </div>
            </form>
          </div>
        
      </div>`;
      return view;
    }
    ,actLogin:()=>{

      $("#ssPnlUsuario").html(UtilsServ.getSession("ssAlias"));
      $("#formLoginPopover").submit(function (event) {
        event.preventDefault();
        console.log(this, UtilsServ._id("pUsuario").value);
        usuarioServ.token($(this).find("#pUsuario").val(), $(this).find("#pClave").val())
      });
    }
}

export default LoginComp;


