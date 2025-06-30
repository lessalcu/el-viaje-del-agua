import React from 'react';
import { motion } from 'framer-motion';

export default function MapaProgreso({ etapa }) {
  const estaciones = [
    { icono: '☁️', nombre: 'Lluvia' },
    { icono: '🌳', nombre: 'Bosque' },
    { icono: '🌊', nombre: 'Río' },
    { icono: '🚰', nombre: 'Planta' },
    { icono: '🏠', nombre: 'Pueblo' }
  ];

  return (
    <div className="mapa-progreso">
      {estaciones.map((est, i) => (
        <div key={i} className="estacion">
          <div className={`punto ${i + 1 === etapa ? 'activo' : ''}`}>
            {i + 1 === etapa ? (
              <motion.img
                src="/img/gotita.png"
                alt="Gotita"
                width={40}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            ) : (
              est.icono
            )}
          </div>
          <p>{est.nombre}</p>
        </div>
      ))}
    </div>
  );
}
