import React, { useEffect, useState } from 'react';
import datos from '../data/datos_juego_actualizado.json';
import { reproducirSonido } from '../utils/sonidos';
import { hablar } from '../utils/hablar';

export default function EtapaExtraDrag({ avanzar }) {
  const [indiceDia, setIndiceDia] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * datos.fechas.length);
    setIndiceDia(aleatorio);
    hablar('Arrastra la nube al bosque solo si está lloviendo.');
  }, []);

  const lluvia = datos.precipitacion[indiceDia];
  const estaLloviendo = lluvia >= 100;

  const permitirSoltar = (ev) => ev.preventDefault();

  const manejarDrop = () => {
    if (estaLloviendo) {
      setMensaje('✅ ¡Muy bien! La lluvia llegó al bosque 🌳💧');
      reproducirSonido('acierto');
      setResultado(true);
      setTimeout(() => avanzar(), 2500);
    } else {
      setMensaje('❌ Ups… hoy no llueve. El bosque no recibe agua.');
      reproducirSonido('error');
      setResultado(false);
    }
  };

  return (
    <div className="etapa">
      <h2>Etapa Extra: Arrastra la nube al bosque 🌧️ ➡️ 🌳</h2>
      <p>📅 Día: {datos.fechas[indiceDia]} | Lluvia: {lluvia} mm</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 30 }}>
        <img
          src="/img/nube_feliz.png"
          alt="Nube"
          width={100}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('nube', 'lluvia')}
          style={{ cursor: 'grab' }}
        />
        <div
          onDragOver={permitirSoltar}
          onDrop={manejarDrop}
          style={{
            width: 140,
            height: 140,
            border: '2px dashed green',
            borderRadius: 20,
            textAlign: 'center',
            paddingTop: 50,
            backgroundColor: '#e8f5e9'
          }}
        >
          <img src="/img/bosque.avif" alt="Bosque" width={80} />
          <p>🌳 Bosque</p>
        </div>
      </div>

      {mensaje && (
        <p style={{ marginTop: 20, fontSize: 18 }}>{mensaje}</p>
      )}
    </div>
  );
}
