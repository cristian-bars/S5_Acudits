let i = 0;

//Fem la crida per a carregar la meteorologia de la ciutat de Barcelona   
    fetch("https://api.tutiempo.net/json/?lan=es&apid=XCT4q4zaqq4dWgP&lid=7183")
    .then(status)
    .then(json)
    .then(function(data) {
      //Preparem per a canviar el format de data
        let dia = data.day1.date;
        let novaData = formato(dia);
        //Escrivim el resultat a la pàgina
        document.getElementById("meteo").textContent = "Hoy " + novaData + " en " + data.locality.name + ": " + data.day1.text;
      }).catch(function(error) {
        console.log('Request failed', error);
      })

//Canviem el format de la data
function formato(texto){
    let info = texto.split('-');
    return info[2] + '/' + info[1] + '/' + info[0];
}

//Detectem els clicks de la pàgina
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("llença").addEventListener("click", acudit);
});

//Funció per a carregar l'acudit
function acudit(){
    
  if (i % 2 == 0) {
    //Fem la crida per a descarregar el json dels acudits de la primera web
    fetch("https://icanhazdadjoke.com/slack")
        .then(status)
        .then(json)
        .then(function(data) {
            document.getElementById("data").textContent = data.attachments[0].fallback;
          }).catch(function(error) {
            console.log('Request failed', error);
          });
          i++;
  }else{
    //Fem la crida per a descarregar el json dels acudits de la web de chuck norris
    fetch("https://api.chucknorris.io/jokes/random")
        .then(status)
        .then(json)
        .then(function(data) {
            document.getElementById("data").textContent = data.value;
          }).catch(function(error) {
            console.log('Request failed', error);
          });
          i++;
  }
    
    
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
}
  
function json(response) {
    return response.json()
  }
  


      