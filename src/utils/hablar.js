export function hablar(texto) {
  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = 'es-ES'; // español latino
  speechSynthesis.cancel(); // detener cualquier voz anterior
  speechSynthesis.speak(mensaje);
}
