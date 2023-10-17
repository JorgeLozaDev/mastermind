// sacamos la información de sessionStorage
let dificultad = sessionStorage.getItem("dificult");
let nombreJugador = sessionStorage.getItem("j1");
let coloresAJugar = JSON.parse(sessionStorage.getItem("coloresJuego"));
// cogemos los colores principales y los mezaclamos, de esta forma nadie sabe cual es la combinación correcta
shuffle(coloresAJugar);
// estos colores lo asignamos a una nueva variable
let coloresAmostrar = coloresAJugar;
// y los mezclamos
shuffle(coloresAmostrar);
// console.log(coloresAJugar);
// console.log(coloresAmostrar);
//variable aux para indicar la fila que estamos comprobando
let currentRow = 0;
let seleccionActual = [];

// buscamos el id donde ira el nombre y lo colocamos en su caja
document.getElementById("nombre").innerHTML = nombreJugador;

//rellenamos las cajas con los colores que tenemos que jugar
const asignarColor = () => {
  let cajasColores = document.getElementsByClassName("bordeCircular");

  for (let index = 0; index < cajasColores.length; index++) {
    cajasColores[index].style.backgroundColor = coloresAmostrar[index];
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

comprobar = () => {
  // buscamos el id de la fila actual a comprobar
  let filaPintar = document.getElementById(currentRow + "_tabla");
  let mensaje = document.getElementById("mensaje");

  //recorremos sus hijos y comproblamos si todas las cajas estan rellenadas, mostramos un mensaje
  for (let i = 0; i < filaPintar.childNodes.length; i++) {
    if (filaPintar.childNodes[i].getAttribute("data-pintado") == "") {
      mensaje.innerHTML = "Rellena todas las filas";
      break;
    } else {
      mensaje.innerHTML = "";

      // console.log(rgbToHex2(filaPintar.childNodes[i].style.backgroundColor));
      seleccionActual.push(
        rgbToHex2(filaPintar.childNodes[i].style.backgroundColor)
      );
      // console.log(rgbToHex(color[0], color[1], color[2]));
      // color.substring()
      // seleccionActual.push(filaPintar.childNodes[i].style.backgroundColor);
    }
  }

  if (seleccionActual.length > 0) {
    let result = comprobarResultado(seleccionActual, coloresAJugar);
    console.log(result);
    if (!result) {
      currentRow++;
      seleccionActual = [];
      mensaje.innerHTML="Te has equivocado, prueba otra vez"
    }else{
      sessionStorage.setItem("resultado", "win");
      window.location.href = "./juego.html";
    }
  }

  // console.log(seleccionActual);
};

console.log(coloresAJugar + "bueno");

//funcion para pasar de rbg a hex
const rgbToHex = (r, g, b) => {
  "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
};

function rgbToHex2(a) {
  a = a.replace(/[^\d,]/g, "").split(",");
  return (
    "#" +
    ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
  );
}

const comprobarResultado = (arr1, arr2) => {
  // comparing each element of array
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    } else {
      result = true;
    }
  }
  return result;
};
//llamamos a la funcion y le pasamos la dificultad
pintarTablaSegunDificultad(dificultad);
//pintamos los colores con los que vamos a jugar
asignarColor();
