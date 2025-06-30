import React, { useState, useEffect } from 'react';
import datos from '../data/datos_juego_actualizado.json';

export default function Etapa4({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);

  const evaluarRespuesta = (valor) => {
    const lluvia = datos.precipitacion[indiceDia];
    const caudal = datos.caudal[indiceDia];
    let decisionCorrecta = '';

    if (lluvia > 200 || caudal < 1) decisionCorrecta = 'No';
    else decisionCorrecta = 'Sí';

    if (valor === decisionCorrecta) {
      setFeedback('✅ ¡Correcto! La planta puede (o no) usar esta agua 💧');
      setTimeout(() => avanzar(), 2000);
    } else {
      setFeedback(`❌ Ups… La respuesta correcta era "${decisionCorrecta}" 😕`);
    }

    setRespuesta(valor);
  };

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
  }, []);

  return (
    <div className="etapa">
      <h2>Etapa 4: ¿Podemos usar el agua del río hoy?</h2>
      <p>📅 Día: {datos.fechas[indiceDia]}</p>
      <p>🌧️ Lluvia: {datos.precipitacion[indiceDia]} mm</p>
      <p>🌊 Caudal: {datos.caudal[indiceDia]} m³/s</p>
      <img src="/img/planta_agua.png" alt="Planta de agua" width={120} />

      <div>
        <button onClick={() => evaluarRespuesta('Sí')}>✅ Sí</button>
        <button onClick={() => evaluarRespuesta('No')}>🚫 No</button>
      </div>

      {respuesta && <p>{feedback}</p>}
    </div>
  );
}
