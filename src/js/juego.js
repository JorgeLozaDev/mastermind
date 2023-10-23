// sacamos la información de sessionStorage
let dificultad = sessionStorage.getItem("dificult");
let nombreJugador = sessionStorage.getItem("j1");
let coloresAJugar = JSON.parse(sessionStorage.getItem("coloresJuego"));
// cogemos los colores principales y los mezaclamos, de esta forma nadie sabe cual es la combinación correcta
shuffle(coloresAJugar);
// estos colores lo asignamos a una nueva variable
let coloresAmostrar = [...coloresAJugar];
// y los mezclamos
shuffle(coloresAmostrar);
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
      // buscamos en nuestro array principal si existen elementos comunes en nuestro array seleccionado, si existe guardamos su posicion
      let arrComprobacion = [];
      for (let h = 0; h < seleccionActual.length; h++) {
        arrComprobacion.push(
          coloresAJugar.findIndex((e) => e == seleccionActual[h])
        );
      }

      let filaPintar = document.getElementById(currentRow + "_tabla");

      for (let i = 0; i < filaPintar.childNodes.length; i++) {
        // en nuestro array de control si un elemento no existe nos devuelve un -1 por lo cual nosotros pintaremos una cruz indicando que dicho elemento no existe
        if (arrComprobacion[i] == -1) {
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'> ❌</span>";
        } else if (arrComprobacion[i] == i) {
          // en caso de que ese elemento exista y se encuentre en la posicion correcta se mostrara el check
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'>✅</span>";
        } else {
          // en caso de que el elemento exista pero se encuentra en otro lugar se mostrara el icono de interrogacion
          filaPintar.childNodes[i].innerHTML =
            "<span class='iconosVerificacion'>❓</span>";
        }
      }
      // aumentomos nuestra variable y vaciamos nuestro array con las opciones que el jugador ha seleccionado
      currentRow++;
      seleccionActual = [];
      // cuando hemos alcanzado el maximo de oportunidades, llevamos al jugador a la pagina de resultado indicandole que ha perdido
      if (currentRow == 10) {
        currentRow = 0;
        sessionStorage.setItem("resultado", "lose");
        window.location.href = "./resultado.html";
      }
    } else {
      // en el caso de que el jugador acierte se le lleva a la pagina de resultado
      sessionStorage.setItem("resultado", "win");
      window.location.href = "./resultado.html";
    }
  }
};

// funcion para pasar el texto a hexadecimal
const rgbToHex2 = (a) => {
  a = a.replace(/[^\d,]/g, "").split(",");
  return (
    "#" +
    ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
  );
};

//funcion para comprobar si los elementos seleccionados y los guardados son iguales
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

//funcion para borrar el ultimo elemento pintado de la fila
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

//llamamos a la funcion y le pasamos la dificultad
pintarTablaSegunDificultad(dificultad);
//pintamos los colores con los que vamos a jugar
asignarColor();
