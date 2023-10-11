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
    // mezclamos el contenido
    shuffle(colores);
    // guardamos en sessionStorage el nombre del jugador, dificultad y colores
    sessionStorage.setItem("j1", jugador.value);
    sessionStorage.setItem("dificult", dificultad);
    sessionStorage.setItem("coloresJuego", JSON.stringify(colores));
    //despues de guardar los datos en sessionSotrage redirigimos a la pagina para jugar
    window.location.href = "./juego.html";
  }


};

// funccion para randomizar el array de colores
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
