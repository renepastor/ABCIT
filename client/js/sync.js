(function(){
        openDb();
})();
function doSomeStuff(){
  var store = getObjectStore('facturas', 'readwrite');
  store.count().onsuccess = function(event) {console.log("Nro de Registros", event.target.result);}    
  store.getAll().onsuccess = function(event) {
    var noEnviados = event.target.result.filter(res => (res.estadoEnvio == "F"));
    //console.log("Detalle Nr",JSON.stringify(JSON.stringify(noEnviados)));
    //console.log(event, "$$$$$$$$$$$$$$$$$$", event.target.result);
    var query = `mutation{
      fnSincronizar(input:{data:${JSON.stringify(JSON.stringify(noEnviados))}}){
        string}}`;
//        apiServerData(query);
      query = JSON.stringify({"query":query});
      var misCabeceras = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });      
      var miInit = { method: 'POST',
                    headers: misCabeceras,
                    mode: 'cors',
                    body: query };
      //return fetch('http://localhost:8085/graphql',miInit).then(res => {
      return fetch('./graphql',miInit).then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      }).then(res =>{
        noEnviados.map(noEnv => {
          putPublication(noEnv.id, "", "facturas");
        })
      }).catch(err => console.log("Error Sync", err));

  

    //var listaFallidos = eve
  };
}