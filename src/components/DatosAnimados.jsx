import React, { useEffect, useState } from 'react';
import datos from '../data/datosSensores.json';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import 'chart.js/auto';

export default function DatosAnimados() {
  const [dia, setDia] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDia(prev => (prev + 1) % datos.fechas.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getEmoji = (valor, tipo) => {
    if (tipo === 'precipitacion') return valor > 200 ? '☁️😭' : valor > 100 ? '☁️🙂' : '☁️😄';
    if (tipo === 'temperatura') return valor > 22 ? '🌡️🔥' : valor > 18 ? '🌡️😊' : '🌡️🥶';
    if (tipo === 'humedad') return valor > 90 ? '💧😰' : valor > 70 ? '💧🙂' : '💧😄';
    return '📈';
  };

  return (
    <motion.div
      key={dia}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="datos-dia"
    >
      <h2>📅 Día: {datos.fechas[dia]}</h2>
      <p>🌧️ Lluvia: {datos.precipitacion[dia]} mm {getEmoji(datos.precipitacion[dia], 'precipitacion')}</p>
      <p>🌡️ Temperatura: {datos.temperatura[dia]} °C {getEmoji(datos.temperatura[dia], 'temperatura')}</p>
      <p>💧 Humedad: {datos.humedad[dia]} % {getEmoji(datos.humedad[dia], 'humedad')}</p>

      <Line
        data={{
          labels: datos.fechas,
          datasets: [
            {
              label: 'Precipitación (mm)',
              data: datos.precipitacion,
              borderColor: 'blue',
              backgroundColor: 'lightblue'
            }
          ]
        }}
        options={{ responsive: true, animation: false }}
      />
    </motion.div>
  );
}
