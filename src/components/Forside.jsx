import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logoFull from '../assets/logo_full_white.svg';

const Forside = () => {
  const [randomEpisodes, setRandomEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const RSS_FEEDS = [
    'https://anchor.fm/s/e929f8d0/podcast/rss',
    'https://anchor.fm/s/10ad912e0/podcast/rss',
    'https://anchor.fm/s/10c331ff0/podcast/rss',
    'https://anchor.fm/s/10bf96058/podcast/rss',
    'https://anchor.fm/s/f72ed02c/podcast/rss',
    'https://anchor.fm/s/e1403bc0/podcast/rss',
    'https://anchor.fm/s/108ab05f0/podcast/rss'
  ];

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const allData = await Promise.all(RSS_FEEDS.map(async (url) => {
          const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
          const data = await res.json();
          return data.status === 'ok' ? data.items : [];
        }));

        const flattened = allData.flat();
        const shuffled = flattened.sort(() => 0.5 - Math.random()).slice(0, 5);
        setRandomEpisodes(shuffled);
        setLoading(false);
      } catch (err) {
        console.error("Fejl ved hentning af forside-data", err);
        setLoading(false);
      }
    };
    fetchRandom();
  }, []);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-accent animate-pulse">Samler universet...</div>;

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center pt-2 overflow-x-hidden w-full">

      {/* HERO SECTION */}
      <div className="relative z-30 text-center max-w-5xl px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <img src={logoFull} alt="NewWaysMedia" className="h-9 lg:h-11 w-auto object-contain opacity-90" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl lg:text-8xl font-bold mb-6 tracking-tighter leading-[0.95] max-w-4xl mx-auto"
        >
          Podcasts du kan <br />
          <span className="text-liquid">slappe af til</span>
        </motion.h1>
        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-base text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed font-medium"
        >
          Podcasts lavet af mennesker til andre mennesker.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <NavLink to="/podcasts" className="btn-liquid group">
            <span className="btn-liquid-inner !py-4 !px-14 !rounded-2xl text-base font-bold tracking-wide">
              Se vores podcasts <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </NavLink>
        </motion.div>
      </div>

      {/* 3D STAGE - Larger and higher */}
      <div className="relative w-full max-w-6xl h-[450px] -mt-10 flex justify-center items-center [perspective:2500px]">
        {randomEpisodes.map((episode, index) => {
          // Samlet mere centralt og gjort større
          const configs = [
            { x: -420, z: -250, rotateY: 25, rotateZ: -3, delay: 0.1 },
            { x: -220, z: -80, rotateY: 15, rotateZ: -1, delay: 0.2 },
            { x: 0, z: 0, rotateY: 0, rotateZ: 0, delay: 0, center: true },
            { x: 220, z: -80, rotateY: -15, rotateZ: 1, delay: 0.2 },
            { x: 420, z: -250, rotateY: -25, rotateZ: 3, delay: 0.1 },
          ];

          const config = configs[index] || configs[0];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 0, z: -500 }}
              animate={{
                opacity: 1,
                x: config.x,
                z: config.z,
                rotateY: config.rotateY,
                rotateZ: config.rotateZ,
                y: [0, -10, 0]
              }}
              whileHover={{
                z: 120,
                rotateY: 0,
                rotateZ: 0,
                scale: 1.15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: config.delay },
                default: { duration: 1.2, ease: "easeOut" }
              }}
              style={{ 
                position: 'absolute',
                width: config.center ? '320px' : '280px',
                zIndex: 20 - Math.abs(config.x / 10),
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center'
              }}
              className="group cursor-pointer"
            >
              <div className="liquid-border-card shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)]">
                <div className="liquid-border-inner aspect-square overflow-hidden bg-bg-dark">
                  <img
                    src={episode.thumbnail || episode.enclosure?.link}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg-dark/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Baggrunds-lys fjernet for at undgå skarpe kanter i bunden */}
    </div>
  );
};

export default Forside;
