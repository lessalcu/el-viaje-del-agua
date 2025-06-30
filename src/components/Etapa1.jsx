import React, { useEffect, useState } from 'react';
import datos from '../data/datos_juego_actualizado.json';
import { reproducirSonido } from '../utils/sonidos';
import { hablar } from '../utils/hablar';
import RecompensaEstrella from './RecompensaEstrella';

export default function Etapa1({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);
  const [mostrarRecompensa, setMostrarRecompensa] = useState(false);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
    hablar('¡Hola! Soy Gotita. ¿Está lloviendo mucho hoy?');
  }, []);

  const lluvia = datos.precipitacion[indiceDia];
  const imagenLluvia = lluvia >= 200 ? '/img/nube_triste.webp' : '/img/nube_feliz.png';

  const evaluarRespuesta = (valor) => {
    let correcta = lluvia >= 200 ? 'Mucha' : lluvia >= 100 ? 'Poca' : 'Nada';

    if (valor === correcta) {
      setFeedback('✅ ¡Correcto! Gotita está feliz 😄');
      reproducirSonido('acierto');
      setMostrarRecompensa(true);
      setTimeout(() => {
        setMostrarRecompensa(false);
        avanzar();
      }, 2000);
    } else {
      setFeedback(`❌ Ups… era "${correcta}" lluvia ☔`);
      reproducirSonido('error');
    }

    setRespuesta(valor);
  };

  return (
    <div className="etapa">
      <h2>Etapa 1: ¿Está lloviendo mucho hoy?</h2>
      <p>📅 Día: {datos.fechas[indiceDia]}</p>
      <p>💧 Precipitación: {lluvia} mm</p>
      <img src={imagenLluvia} alt="Estado de la nube" width={120} />
      <div>
        <button onClick={() => evaluarRespuesta('Nada')}>🌤️ Nada</button>
        <button onClick={() => evaluarRespuesta('Poca')}>🌧️ Poca</button>
        <button onClick={() => evaluarRespuesta('Mucha')}>⛈️ Mucha</button>
      </div>
      {respuesta && <p>{feedback}</p>}
      {mostrarRecompensa && <RecompensaEstrella />}
    </div>
  );
}
