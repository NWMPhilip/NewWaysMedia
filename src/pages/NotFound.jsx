import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md"
      >
        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Fejl 404</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Faret vild?</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Siden du leder efter findes desværre ikke. Måske er linket bare knækket? Det i hvert fald ikke her det sker...
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} /> Gå tilbage til forsiden
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
