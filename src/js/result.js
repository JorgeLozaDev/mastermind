// obtenemos la informacion que necesitamos del sessionStorage
let resultado = sessionStorage.getItem("resultado");
let jugador = sessionStorage.getItem("j1");

// funcion para mostrar un mensaje u otro dependiendo si el jugador a ganado o ha perdido

mensajeResultado = () => {
  let caja = document.getElementById("cajaResultado");
  caja.innerHTML = "";
  if (resultado == "win") {
    caja.innerHTML =
      "<div class='cajaResultado'> <p>Has ganado " +
      jugador +
      "</p> <p>¿Quieres volver a jugar?</p><div class='divBtnResult'><p class='myBtn' onclick='preLoadGame()'>SI</p><p class='myBtn' onclick='resetGame()'>NO</p></div> </div>";
  } else {
    caja.innerHTML =
      "<div class='cajaResultado'> <p> " +
      jugador +
      " has perdido </p> <p>¿Quieres volver a jugar?</p><div class='divBtnResult'><p class='myBtn' onclick='preLoadGame()'>SI</p><p class='myBtn' onclick='resetGame()'>NO</p></div> </div>";
  }
};

resetGame = () => {
  // limpiamos los datos que tengamos guardados
  sessionStorage.clear();
  //llevamos al usuario a la pagina principal
  window.location.href = "./index.html";
};

preLoadGame = () => {
  //llevamos al usario a la pagina de basic
  window.location.href = "./juego.html";
};

mensajeResultado();
