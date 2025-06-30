import React from 'react';
import { motion } from 'framer-motion';

export default function RecompensaEstrella() {
  return (
    <motion.img
      src="/img/estrella.png"
      alt="Estrella"
      initial={{ scale: 0, y: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], y: [-30, -60, -90], opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 100,
        pointerEvents: 'none',
        zIndex: 999
      }}
    />
  );
}
