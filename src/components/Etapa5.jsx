import React from 'react';

export default function Etapa5({ reiniciar }) {
  return (
    <div className="etapa final">
      <h2>🎉 ¡Felicidades!</h2>
      <p>🎊 Gotita llegó al pueblo con agua limpia para todos 💧🏠</p>
      <p>🌟 ¡Eres un defensor del agua!</p>

      <img src="/img/victoria.gif" alt="Gotita feliz" width={150} />
      <br />
      <img src="/img/pueblo.avif" alt="Pueblo" width={120} />
      <br />
      <img src="/img/estrella.png" alt="Estrella" width={60} />

      <br /><br />
      <button onClick={reiniciar}>🔁 Volver a jugar</button>
    </div>
  );
}
