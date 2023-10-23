// sacamos la información de sessionStorage
let dificultad = sessionStorage.getItem("dificult");
let nombreJugador = sessionStorage.getItem("j1");
let coloresAJugar = JSON.parse(sessionStorage.getItem("coloresJuego"));
// cogemos los colores principales y los mezaclamos, de esta forma nadie sabe cual es la combinación correcta
shuffle(coloresAJugar);
// estos colores lo asignamos a una nueva variable
// shuffle(coloresAJugar);
let coloresAmostrar = [...coloresAJugar];
// y los mezclamos
shuffle(coloresAmostrar);
console.log(coloresAJugar);
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
      mensaje.classList.add("mensaje");
      mensaje.innerHTML = "Rellena toda la fila";
      mensaje.addEventListener("animationend", () => {
        mensaje.classList.remove("mensaje");
        mensaje.innerHTML = "";
      });
      seleccionActual = [];
      break;
    } else {
      mensaje.innerHTML = "";
      seleccionActual.push(
        rgbToHex2(filaPintar.childNodes[i].style.backgroundColor)
      );
    }
  }

  if (seleccionActual.length > 3) {
    let result = comprobarResultado(seleccionActual, coloresAJugar);

    if (!result) {
      mensaje.classList.add("mensaje");
      mensaje.innerHTML = "Te has equivocado, prueba otra vez";
      mensaje.addEventListener("animationend", () => {
        mensaje.classList.remove("mensaje");
        mensaje.innerHTML = "";
      });
      // probar con for luego hacer un find para cada elementos del array
      let arrComprobacion = [];
      for (let h = 0; h < seleccionActual.length; h++) {
        arrComprobacion.push(
          coloresAJugar.findIndex((e) => e == seleccionActual[h])
        );
      }

      let filaPintar = document.getElementById(currentRow + "_tabla");
      console.log(arrComprobacion);
      for (let i = 0; i < filaPintar.childNodes.length; i++) {
        if (arrComprobacion[i] == -1) {
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'> ❌</span>";
        } else if (arrComprobacion[i] == i) {
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'>✅</span>";
        } else {
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'>❓</span>";
        }
      }
      currentRow++;
      seleccionActual = [];
      if (currentRow == 10) {
        currentRow = 0;
        sessionStorage.setItem("resultado", "lose");
        window.location.href = "./resultado.html";
      }
    } else {
      sessionStorage.setItem("resultado", "win");
      window.location.href = "./resultado.html";
    }
  }
};

const rgbToHex2 = (a) => {
  a = a.replace(/[^\d,]/g, "").split(",");
  return (
    "#" +
    ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
  );
};

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

borrar = () => {
  let filaPintar = document.getElementById(currentRow + "_tabla");
  let id;
  for (let i = 0; i < filaPintar.childNodes.length; i++) {
    if (filaPintar.childNodes[i].getAttribute("data-pintado") == "") {
      id = i;
      break;
    }
  }

  if (id) {
    filaPintar.childNodes[id - 1].setAttribute("data-pintado", "");
    filaPintar.childNodes[id - 1].innerHTML = "?";
    filaPintar.childNodes[id - 1].style.backgroundColor = "";
  } else {
    filaPintar.childNodes[filaPintar.childNodes.length - 1].setAttribute(
      "data-pintado",
      ""
    );
    filaPintar.childNodes[filaPintar.childNodes.length - 1].innerHTML = "?";
    filaPintar.childNodes[
      filaPintar.childNodes.length - 1
    ].style.backgroundColor = "";
  }
};

// mostrarAyuda = (arr, arr2) => {};
//llamamos a la funcion y le pasamos la dificultad
pintarTablaSegunDificultad(dificultad);
//pintamos los colores con los que vamos a jugar
asignarColor();
