import React, { useState, useEffect } from 'react';
import datos from '../data/datos_juego_actualizado.json';

export default function Etapa3({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);

  const evaluarRespuesta = (valor) => {
    const caudal = datos.caudal[indiceDia];
    let correcta = '';

    if (caudal < 1) correcta = 'Bajo';
    else if (caudal <= 2.5) correcta = 'Medio';
    else correcta = 'Alto';

    if (valor === correcta) {
      setFeedback('✅ ¡Correcto! El río está como lo imaginaste 🌊😄');
      setTimeout(() => avanzar(), 2000);
    } else {
      setFeedback(`❌ No exactamente... el río está "${correcta}" hoy 🏞️`);
    }

    setRespuesta(valor);
  };

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
  }, []);

  const caudal = datos.caudal[indiceDia];
  const imagenRio = caudal > 2.5
    ? '/img/rio_peligroso.avif'
    : '/img/rio_normal.png';

  return (
    <div className="etapa">
      <h2>Etapa 3: ¿El río está tranquilo o peligroso?</h2>
      <p>📅 Día: {datos.fechas[indiceDia]}</p>
      <p>🌊 Caudal: {caudal} m³/s</p>
      <img src={imagenRio} alt="Estado del río" width={120} />

      <div>
        <button onClick={() => evaluarRespuesta('Bajo')}>🐟 Bajo</button>
        <button onClick={() => evaluarRespuesta('Medio')}>🌊 Medio</button>
        <button onClick={() => evaluarRespuesta('Alto')}>🚨 Alto</button>
      </div>

      {respuesta && <p>{feedback}</p>}
    </div>
  );
}
