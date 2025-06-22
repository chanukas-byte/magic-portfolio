'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedStar = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    style={{
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)',
    }}
  />
);

export const AnimatedStars = () => {
  return (
    <div className="stars-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      {[...Array(50)].map((_, i) => (
        <AnimatedStar key={i} delay={i * 0.1} />
      ))}
    </div>
  );
}; 