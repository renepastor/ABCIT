import usuarioServ from '../../services/UsuarioServ'

let Login = {
    render : async () => {
       let view =  /*html*/`
        <section style="z-index:2000"  class="section position-fixed w-100 h-100 bg-light" tabindex="-1" role="dialog">
                <div class="p-2 content">
                    <div class="d-flex justify-content-center p-2">
                        <div class="brand_logo_container">
                        <img src="./img/img128.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center form_container p-2">
                        <div class="fade show active tab-content" id="ldap" role="tabpanel" aria-labelledby="tab-ldap" id="pills-tabContent">
                        <form method="POST" id="formLogin" class=" m-2">
                            <div class="card-header p-1"><b>Iniciar Sesion</b></div>
                            <div class="input-group mb-1">
                                <div class="input-group-prepend fa-span">
                                    <span class="input-group-text"><i class="fa fa-user"></i></span>
                                </div>
                                <input placeholder="Nombre de usuario" required="" type="text" id="pUsuario" name="pUsuario" class="texto form-control">
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend fa-span">
                                    <span class="input-group-text"><i class="fa fa-key"></i></span>
                                </div>
                                <input placeholder="Contraseña" required="" type="password" id="pClave" name="pClave" class="texto form-control">
                            </div>
                            <div class="inpForm m-1 text-center">
                                <button type="submit" class="btn btn-sm btn-outline-primary"><i class=" fa fa-sing-in"></i> Ingresar</button>
                                <a type="button" href="#salir" class="btn btn-sm btn-outline-primary"> Salir <i class=" fa fa-sign-out"></i></a>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center form_container p-2">
                        <div class="bg-1">
                           <h1 class="t-shadow">PRECIOS UNITARIOS</h1>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center form_container p-2" id="msjLogin">
                    </div>
                </div>
            </section>
        `
        return view
    },
    after_render: async () => {
        document.querySelector("#formLogin").addEventListener("submit", function(e){
            var form =  $(this);
            e.preventDefault();
            var pUsuario = $("#pUsuario").val();
            var pClave = $("#pClave").val();
            usuarioServ.token(pUsuario, pClave);
        });
    }
}

export default Login;
