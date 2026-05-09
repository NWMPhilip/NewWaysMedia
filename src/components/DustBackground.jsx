import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DustBackground = () => {
  const particleConfigs = useMemo(() => {
    // Vi definerer 12 partikler med 3 forskellige "dybder"
    return Array.from({ length: 12 }).map((_, i) => {
      let type = 'medium';
      if (i < 4) type = 'small'; // Små skarpe støvkorn
      if (i > 8) type = 'large'; // Store bløde bokeh-orbs

      const config = {
        small: { size: [2, 5], blur: 0, opacity: [0.4, 0.8], duration: [10, 20] },
        medium: { size: [15, 40], blur: 2, opacity: [0.2, 0.5], duration: [20, 35] },
        large: { size: [120, 250], blur: 15, opacity: [0.05, 0.15], duration: [40, 60] }
      }[type];

      const size = Math.random() * (config.size[1] - config.size[0]) + config.size[0];
      
      return {
        id: i,
        type,
        left: `${(i * 15) % 100 + (Math.random() * 10)}vw`,
        top: `${(i * 20) % 100 + (Math.random() * 10)}vh`,
        size: size,
        blur: config.blur,
        opacity: Math.random() * (config.opacity[1] - config.opacity[0]) + config.opacity[0],
        isBlue: Math.random() > 0.5,
        duration: Math.random() * (config.duration[1] - config.duration[0]) + config.duration[0],
        delay: Math.random() * -60
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[100] pointer-events-none overflow-hidden select-none">
      {particleConfigs.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, p.opacity, p.opacity, 0],
            scale: p.type === 'large' ? [1, 1.2, 1.2, 1] : [0.8, 1.1, 1.1, 0.8],
            x: [0, p.type === 'small' ? 100 : 40, p.type === 'small' ? -100 : -40, 0],
            y: [0, -50, 50, 0]
          }}
          transition={{ 
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.isBlue 
              ? `radial-gradient(circle, rgba(91,197,255,1) 0%, rgba(91,197,255,0) 80%)` 
              : `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)`,
            filter: p.blur > 0 ? `blur(${p.blur}px)` : 'none',
            boxShadow: p.type === 'small' ? '0 0 10px white' : 'none',
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

export default DustBackground;
