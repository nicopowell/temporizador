let tiempoRestante = 0;
let intervalo = undefined;
let pausado = true;

let formulario = document.querySelector("form");
let formContainer = document.getElementById('formContainer')
let tiempoContainer = document.getElementById('tiempoContainer')

let tiempo = document.getElementById("tiempo")
let btnPause = document.getElementById("btnPause");
let btnPlay = document.getElementById("btnPlay");
let btnStop = document.getElementById("btnStop");

formulario.addEventListener("submit", trabajarFormulario);
btnPause.addEventListener("click", pause);
btnPlay.addEventListener("click", play);
btnStop.addEventListener("click", reset);

function trabajarFormulario(e) {
  e.preventDefault();
  let horas = parseInt(document.getElementById("inputHoras").value);
  let minutos = parseInt(document.getElementById("inputMinutos").value);
  let segundos = parseInt(document.getElementById("inputSegundos").value);

  if (horas === 0 && minutos === 0 && segundos === 0) {
    let alerta = document.getElementById("alerta");
    if (alerta) {
      alerta.classList.remove("d-none");
      alerta.classList.add("show");
      alerta.innerHTML = `El tiempo debe ser mayor que 0
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    } else {
      let main = document.querySelector('main')
      let alerta = document.createElement('div')
      alerta.className = "alert alert-danger alert-dismissible fade show"
      alerta.role = "alert"
      alerta.innerHTML = `El tiempo debe ser mayor que 0
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
      alerta.id = "alerta";
      main.prepend(alerta);
    }
    return;
  }

  tiempoRestante = (horas * 3600) + (minutos * 60) + segundos;
  formContainer.className = 'd-none'
  tiempoContainer.className = "rounded-4"

  tiempoRestante = (horas * 3600) + (minutos * 60) + segundos;
  formContainer.className = 'd-none'
  tiempoContainer.className = "rounded-4"
  corregirTiempo(segundos, minutos, horas)
  play()
  formulario.reset()
}

function actualizarCronometro() {
  tiempoRestante--;

  let segundos = tiempoRestante % 60;
  let minutos = Math.floor((tiempoRestante % 3600) / 60);
  let horas = Math.floor(tiempoRestante / 3600);

  corregirTiempo(segundos, minutos, horas)
  if (tiempoRestante <= 0) {
    reset();
  }
}

function play() {
  if (pausado) {
    intervalo = setInterval(actualizarCronometro, 1000);
    pausado = false;
  }
}

function pause() {
  if (!pausado) {
    clearInterval(intervalo);
    pausado = true;
  }
}

function reset() {
  clearInterval(intervalo);
  tiempoRestante = 0;
  pausado = true;
  tiempoContainer.className = 'd-none'
  formContainer.className = "rounded-4"
  corregirTiempo(0,0,0);
}

function corregirTiempo(segundos, minutos, horas) {
  if (segundos < 10) {
    segundos = "0" + segundos;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (horas < 10) {
    horas = "0" + horas;
  }

  tiempo.innerHTML = `${horas}:${minutos}:${segundos}`
}