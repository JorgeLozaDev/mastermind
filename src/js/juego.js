// sacamos la información de sessionStorage
let dificultad = sessionStorage.getItem("dificult");
let nombreJugador = sessionStorage.getItem("j1");
let coloresAJugar = JSON.parse(sessionStorage.getItem("coloresJuego"));
let currentRow = 0;

// buscamos el id donde ira el nombre y lo colocamos en su caja
document.getElementById("nombre").innerHTML = nombreJugador;

const asignarColor = () => {
  let cajasColores = document.getElementsByClassName("bordeCircular");

  for (let index = 0; index < cajasColores.length; index++) {
    cajasColores[index].style.backgroundColor = coloresAJugar[index];
  }
};

const pintarTablaSegunDificultad = (dificultad) => {
  if (dificultad == "easy") {
    pintarTabla(10);
  }
};

const pintarTabla = (fila) => {
  let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  for (let index = 0; index < fila; index++) {
    tabla.insertRow().innerHTML =
      //averiguar porque no asigna los ids
      // "<tr id='"+`${index}`+"'>" +
      "<tr>" +
      "<td>?</td>" +
      "<td>?</td>" +
      "<td>?</td>" +
      "<td>?</td>" +
      "</tr>";
  }

  //como no asigna bien los id vamos a asignarlo ahora
  let filasTabla = document.getElementsByTagName("tr");
  for (let index = 0; index < filasTabla.length; index++) {
    filasTabla[index].setAttribute("id", index);
  }
};

pintarFila = () =>{
  
}

//llamamos a la funcion y le pasamos la dificultad
pintarTablaSegunDificultad(dificultad);
//pintamos los colores con los que vamos a jugar
asignarColor();

console.log(nombreJugador, dificultad, coloresAJugar);
