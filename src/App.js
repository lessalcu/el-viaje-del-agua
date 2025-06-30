import React from 'react';
import './App.css';
import Game from './components/Game';
import GotitaIntro from './components/GotitaIntro';
import DatosAnimados from './components/DatosAnimados';

function App() {
  return (
    <div className="App">
      <h1>🌊 El Viaje del Agua: La Aventura de Gotita</h1>
      <Game />
    </div>
  );
}

export default App;
