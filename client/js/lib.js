const Lib = {
    // --------------------------------
    //  Acceso de usuario
    // --------------------------------
    fnfetch: (url) =>{
        var misCabeceras = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        var formData = "{}";
        var miInit = { method: 'GET',
                        headers: misCabeceras,
                        mode: 'cors' };
        return fetch(url,miInit).then(res => {
            if (!res.ok) {
            throw Error(res.statusText);
            }
            return res.json();
        }).catch(err => console.log("Error..",err));
    }
}
export default Lib;
