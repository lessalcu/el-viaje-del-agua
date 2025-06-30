import React, { useEffect, useState } from 'react';
import datos from '../data/datos_juego_actualizado.json';
import { hablar } from '../utils/hablar';
import { reproducirSonido } from '../utils/sonidos';
import RecompensaEstrella from './RecompensaEstrella';

export default function Etapa2({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);
  const [mostrarRecompensa, setMostrarRecompensa] = useState(false);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
    hablar('Estamos en el bosque. ¿Hace calor o frío?');
  }, []);

  const temp = datos.temperatura[indiceDia];

  const evaluarRespuesta = (valor) => {
    let correcta = temp < 18 ? 'Frío' : temp <= 22 ? 'Templado' : 'Calor';

    if (valor === correcta) {
      setFeedback('✅ ¡Muy bien! Los árboles están contentos 🌳😄');
      reproducirSonido('acierto');
      setMostrarRecompensa(true);
      setTimeout(() => {
        setMostrarRecompensa(false);
        avanzar();
      }, 2000);
    } else {
      setFeedback(`❌ Era "${correcta}" 🌡️ ¡Intenta de nuevo!`);
      reproducirSonido('error');
    }

    setRespuesta(valor);
  };

  return (
    <div className="etapa">
      <h2>Etapa 2: ¿Hace calor o frío en el bosque?</h2>
      <p>🌡️ Temperatura: {temp} °C</p>
      <div>
        <button onClick={() => evaluarRespuesta('Frío')}>🧊 Frío</button>
        <button onClick={() => evaluarRespuesta('Templado')}>🌤️ Templado</button>
        <button onClick={() => evaluarRespuesta('Calor')}>🔥 Calor</button>
      </div>
      {respuesta && <p>{feedback}</p>}
      {mostrarRecompensa && <RecompensaEstrella />}
    </div>
  );
}
