import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Stor lysende 404 baggrund */}
        <h1 className="text-[120px] md:text-[200px] font-bold leading-none tracking-tighter opacity-10 select-none">
          404
        </h1>
        
        {/* Indholdet */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 text-accent"
          >
            <Compass size={64} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Faret vild i universet?</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Siden du leder efter findes desværre ikke. Måske er den blevet opslugt af et sort hul, eller også er linket bare knækket.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-liquid flex items-center gap-3 px-8"
            >
              <span className="btn-liquid-inner flex items-center gap-2 py-3">
                <Home size={18} /> Tilbage til Jorden
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Ekstra dekorative cirkler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10" />
    </div>
  );
};

export default NotFound;
