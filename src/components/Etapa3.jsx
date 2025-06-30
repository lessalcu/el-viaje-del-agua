import React, { useEffect, useState } from 'react';
import datos from '../data/datos_juego_actualizado.json';
import { hablar } from '../utils/hablar';
import { reproducirSonido } from '../utils/sonidos';
import RecompensaEstrella from './RecompensaEstrella';

export default function Etapa3({ avanzar }) {
  const [respuesta, setRespuesta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [indiceDia, setIndiceDia] = useState(0);
  const [mostrarRecompensa, setMostrarRecompensa] = useState(false);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
    hablar('Mira el río... ¿Está tranquilo o peligroso hoy?');
  }, []);

  const caudal = datos.caudal[indiceDia];

  const evaluarRespuesta = (valor) => {
    let correcta = caudal < 1 ? 'Bajo' : caudal <= 2.5 ? 'Medio' : 'Alto';

    if (valor === correcta) {
      setFeedback('✅ ¡Correcto! El río está como lo imaginaste 🌊😄');
      reproducirSonido('acierto');
      setMostrarRecompensa(true);
      setTimeout(() => {
        setMostrarRecompensa(false);
        avanzar();
      }, 2000);
    } else {
      setFeedback(`❌ No exactamente... el río está "${correcta}" hoy 🏞️`);
      reproducirSonido('error');
    }

    setRespuesta(valor);
  };

  return (
    <div className="etapa">
      <h2>Etapa 3: ¿El río está tranquilo o peligroso?</h2>
      <p>💧 Caudal: {caudal} m³/s</p>
      <div>
        <button onClick={() => evaluarRespuesta('Bajo')}>💧 Bajo</button>
        <button onClick={() => evaluarRespuesta('Medio')}>💦 Medio</button>
        <button onClick={() => evaluarRespuesta('Alto')}>🌊 Alto</button>
      </div>
      {respuesta && <p>{feedback}</p>}
      {mostrarRecompensa && <RecompensaEstrella />}
    </div>
  );
}
