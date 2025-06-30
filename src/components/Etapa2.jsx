import React, { useState, useEffect } from 'react';
import datos from '../data/datos_juego_actualizado.json';

export default function Etapa2({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);

  const evaluarRespuesta = (valor) => {
    const temp = datos.temperatura[indiceDia];
    let correcta = '';

    if (temp < 18) correcta = 'Frío';
    else if (temp <= 22) correcta = 'Templado';
    else correcta = 'Calor';

    if (valor === correcta) {
      setFeedback('✅ ¡Muy bien! Los árboles están contentos 🌳😄');
      setTimeout(() => avanzar(), 2000);
    } else {
      setFeedback(`❌ Era "${correcta}" 🌡️ ¡Intenta de nuevo!`);
    }

    setRespuesta(valor);
  };

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
  }, []);

  const temp = datos.temperatura[indiceDia];

  return (
    <div className="etapa">
      <h2>Etapa 2: ¿Hace calor o frío en el bosque?</h2>
      <p>📅 Día: {datos.fechas[indiceDia]}</p>
      <p>🌡️ Temperatura: {temp} °C</p>
      <img src="/img/bosque.avif" alt="Bosque" width={120} />
      <img src="/img/termometro_feliz.png" alt="Termómetro" width={60} />

      <div>
        <button onClick={() => evaluarRespuesta('Frío')}>❄️ Frío</button>
        <button onClick={() => evaluarRespuesta('Templado')}>🙂 Templado</button>
        <button onClick={() => evaluarRespuesta('Calor')}>🔥 Calor</button>
      </div>

      {respuesta && <p>{feedback}</p>}
    </div>
  );
}
