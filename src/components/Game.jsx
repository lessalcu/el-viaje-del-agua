import React, { useState } from 'react';
import Etapa1 from './Etapa1';
import Etapa2 from './Etapa2';
import Etapa3 from './Etapa3';
import Etapa4 from './Etapa4';
import Etapa5 from './Etapa5';
import MapaProgreso from './MapaProgreso';
import EtapaExtraDrag from './EtapaExtraDrag';

export default function Game() {
  const [etapa, setEtapa] = useState(1);

  const avanzarEtapa = () => setEtapa(prev => prev + 1);
  const reiniciarJuego = () => setEtapa(1);

  return (
    <div>
      <MapaProgreso etapa={etapa} />
      {etapa === 1 && <Etapa1 avanzar={avanzarEtapa} />}
      {etapa === 2 && <Etapa2 avanzar={avanzarEtapa} />}
      {etapa === 3 && <Etapa3 avanzar={avanzarEtapa} />}
      {etapa === 4 && <Etapa4 avanzar={avanzarEtapa} />}
      {etapa === 5 && <Etapa5 reiniciar={reiniciarJuego} />}
      {etapa === 6 && <EtapaExtraDrag avanzar={avanzarEtapa} />}
    </div>
  );
}
