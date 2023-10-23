const colores = [];
let result = {};

const juegoBasics = (dificultad) => {
  let jugador = document.getElementById("nombreJugador");
  if (!jugador.value) {
    jugador.classList.add("borderError");
  } else {
    jugador.classList.remove("borderError");
    // guardamos la seleccion de colores en el arrray
    colores.push(document.getElementById("color1").value);
    colores.push(document.getElementById("color2").value);
    colores.push(document.getElementById("color3").value);
    colores.push(document.getElementById("color4").value);

    // guardamos en sessionStorage el nombre del jugador, dificultad y colores
    sessionStorage.setItem("j1", sanitize(jugador.value));
    sessionStorage.setItem("dificult", dificultad);
    sessionStorage.setItem("coloresJuego", JSON.stringify(colores));
    //despues de guardar los datos en sessionSotrage redirigimos a la pagina para jugar
    window.location.href = "./juego.html";
  }
};


//funcion para evitar que pongan cosas extrañas en el input del nombre
sanitize = (string) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
};

// funccion para randomizar el array de colores
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

