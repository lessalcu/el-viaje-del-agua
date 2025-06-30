import React, { useEffect, useState } from 'react';
import datos from '../data/datos_juego_actualizado.json';
import { hablar } from '../utils/hablar';
import { reproducirSonido } from '../utils/sonidos';
import RecompensaEstrella from './RecompensaEstrella';

export default function Etapa4({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);
  const [mostrarRecompensa, setMostrarRecompensa] = useState(false);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
    hablar('Vamos a la planta de agua. ¿Se puede usar el agua del río hoy?');
  }, []);

  const lluvia = datos.precipitacion[indiceDia];
  const caudal = datos.caudal[indiceDia];

  const evaluarRespuesta = (valor) => {
    const decisionCorrecta = (lluvia > 200 || caudal < 1) ? 'No' : 'Sí';

    if (valor === decisionCorrecta) {
      setFeedback('✅ ¡Correcto! La planta puede (o no) usar esta agua 💧');
      reproducirSonido('acierto');
      setMostrarRecompensa(true);
      setTimeout(() => {
        setMostrarRecompensa(false);
        avanzar();
      }, 2000);
    } else {
      setFeedback(`❌ Ups… La respuesta correcta era "${decisionCorrecta}" 😕`);
      reproducirSonido('error');
    }

    setRespuesta(valor);
  };

  return (
    <div className="etapa">
      <h2>Etapa 4: ¿Podemos usar el agua del río?</h2>
      <p>🌧️ Lluvia: {lluvia} mm — Caudal: {caudal} m³/s</p>
      <div>
        <button onClick={() => evaluarRespuesta('Sí')}>✅ Sí</button>
        <button onClick={() => evaluarRespuesta('No')}>🚫 No</button>
      </div>
      {respuesta && <p>{feedback}</p>}
      {mostrarRecompensa && <RecompensaEstrella />}
    </div>
  );
}
