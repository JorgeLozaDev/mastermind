const colores = [];

const juegoBasics = (dificultad) => {
  let jugador = document.getElementById("nombreJugador");
  if (!jugador.value) {
    jugador.classList.add("borderError");
  } else {
    jugador.classList.remove("borderError");
    colores.push(document.getElementById("color1").value);
    colores.push(document.getElementById("color2").value);
    colores.push(document.getElementById("color3").value);
    colores.push(document.getElementById("color4").value);
    sessionStorage.setItem("j1", jugador.value);
    sessionStorage.setItem("dificult", dificultad);
  }

  let j1 = sessionStorage.getItem("j1");
  let difiLocal = sessionStorage.getItem("dificult");

  console.log(j1, difiLocal);
  console.log(colores);
};
