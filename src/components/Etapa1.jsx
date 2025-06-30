import React, { useState, useEffect } from 'react';
import datos from '../data/datos_juego_actualizado.json';

export default function Etapa1({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);

  const evaluarRespuesta = (valor) => {
    const lluvia = datos.precipitacion[indiceDia];
    let correcta = '';

    if (lluvia >= 200) correcta = 'Mucha';
    else if (lluvia >= 100) correcta = 'Poca';
    else correcta = 'Nada';

    if (valor === correcta) {
      setFeedback('✅ ¡Correcto! Gotita está feliz 😄');
      setTimeout(() => avanzar(), 2000);
    } else {
      setFeedback(`❌ Ups… era "${correcta}" lluvia ☔`);
    }

    setRespuesta(valor);
  };

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
  }, []);

  const lluvia = datos.precipitacion[indiceDia];
  const imagenLluvia = lluvia >= 200
    ? '/img/nube_triste.webp'
    : '/img/nube_feliz.png';

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
    </div>
  );
}
