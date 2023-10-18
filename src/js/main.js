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
    sessionStorage.setItem("j1", jugador.value);
    sessionStorage.setItem("dificult", dificultad);
    sessionStorage.setItem("coloresJuego", JSON.stringify(colores));
    //despues de guardar los datos en sessionSotrage redirigimos a la pagina para jugar
    window.location.href = "./juego.html";
  }
};

// funccion para randomizar el array de colores
// const shuffle = (array) => {
//   return array.sort(() => Math.random() - 0.5);
// };

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}