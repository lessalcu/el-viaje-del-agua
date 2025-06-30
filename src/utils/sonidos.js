export const reproducirSonido = (tipo) => {
  let archivo = '';

  if (tipo === 'acierto') archivo = '/sounds/acierto.mp3';
  else if (tipo === 'error') archivo = '/sounds/error.mp3';

  if (archivo) {
    const audio = new Audio(archivo);
    audio.play();
  }
};
