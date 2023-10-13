// sacamos la información de sessionStorage
let dificultad = sessionStorage.getItem("dificult");
let nombreJugador = sessionStorage.getItem("j1");
let coloresAJugar = JSON.parse(sessionStorage.getItem("coloresJuego"));
let currentRow = 0;

// buscamos el id donde ira el nombre y lo colocamos en su caja
document.getElementById("nombre").innerHTML = nombreJugador;

//rellenamos las cajas con los colores que tenemos que jugar
const asignarColor = () => {
  let cajasColores = document.getElementsByClassName("bordeCircular");

  for (let index = 0; index < cajasColores.length; index++) {
    cajasColores[index].style.backgroundColor = coloresAJugar[index];
  }
};

//segun la dificultad pintamos nuestra tabla (de momento solo pintamos el nivel facil)
const pintarTablaSegunDificultad = (dificultad) => {
  if (dificultad == "easy") {
    pintarTabla(10);
  }
};

// function para pintar nuestra tabla dependiendo del número de filas que le pasemos
const pintarTabla = (fila) => {
  let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  for (let index = 0; index < fila; index++) {
    tabla.insertRow().innerHTML =
      //averiguar porque no asigna los ids
      // "<tr id='index'>" +
      "<tr>" +
      "<td data-pintado=''>?</td>" +
      "<td data-pintado=''>?</td>" +
      "<td data-pintado=''>?</td>" +
      "<td data-pintado=''>?</td>" +
      "</tr>";
    // console.log(index);
  }

  //como no asigna bien los id vamos a asignarlo ahora
  let filasTabla = document.getElementsByTagName("tr");
  for (let index = 0; index < filasTabla.length; index++) {
    filasTabla[index].setAttribute("id", index + "_tabla");
  }
};

//con esta funcion vamos a recogemos el color al que hemos hecho click y se lo asignamos al elemento correspondiente de nuestra filas
pintarFila = (e) => {
  // buscamos el id de la fila actual a pintar
  let filaPintar = document.getElementById(currentRow + "_tabla");

  //recorremos sus hijos y los vamos pintando
  for (let i = 0; i < filaPintar.childNodes.length; i++) {
    if (filaPintar.childNodes[i].getAttribute("data-pintado") == "") {
      filaPintar.childNodes[i].setAttribute("data-pintado", true);
      filaPintar.childNodes[i].innerHTML = "";
      filaPintar.childNodes[i].style.backgroundColor = e.style.backgroundColor;
      break;
    }
  }
};

//llamamos a la funcion y le pasamos la dificultad
pintarTablaSegunDificultad(dificultad);
//pintamos los colores con los que vamos a jugar
asignarColor();

console.log(nombreJugador, dificultad, coloresAJugar);
