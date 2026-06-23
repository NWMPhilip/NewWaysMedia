import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Info, ChevronRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo_icon_white.svg';


const Podcasts = () => {
  const [podcastGroups, setPodcastGroups] = useState([]);
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('/shows-data.json');
        if (!res.ok) throw new Error('Failed to fetch');
        const sortedGroups = await res.json();

        setPodcastGroups(sortedGroups);
        
        if (sortedGroups.length > 0) {
          const allEpisodes = sortedGroups.flatMap(g => g.items.map(i => ({...i, podcastName: g.title, podcastId: g.id})));
          allEpisodes.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
          setFeaturedEpisode(allEpisodes[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError("Kunne ikke hente streaming-feedet.");
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 blur-3xl animate-pulse-logo rounded-full"></div>
          <img src={logoIcon} alt="Loading" className="w-16 h-16 relative z-10 animate-pulse-logo" />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in pb-20 overflow-x-hidden">
      {/* Hero Section - Full width & top */}
      {featuredEpisode && (
        <section className="relative h-[85vh] w-full overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img 
              src={featuredEpisode.thumbnail || featuredEpisode.enclosure?.link} 
              className="w-full h-full object-cover opacity-60 scale-105"
              style={{ objectPosition: '10% 10%' }}
              alt="Featured"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-r from-bg-dark via-bg-dark/20 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-l from-bg-dark via-bg-dark/20 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-20 pb-20 max-w-5xl z-10 pt-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Link to={`/podcast/${featuredEpisode.podcastId}`} className="bg-accent/20 border border-accent/30 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-accent/30 transition-colors">
                <Radio size={14} /> {featuredEpisode.podcastName}
              </Link>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tighter leading-none text-text-white drop-shadow-2xl"
            >
              {featuredEpisode.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg mb-8 line-clamp-3 leading-relaxed max-w-2xl"
            >
              {featuredEpisode.description?.replace(/<[^>]*>?/gm, '')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <a href={featuredEpisode.link} target="_blank" className="btn-liquid group">
                <span className="btn-liquid-inner">
                  <Headphones size={20} className="text-accent" />
                  Hør nu
                </span>
              </a>
              <Link to={`/podcast/${featuredEpisode.podcastId}`} className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white py-4 px-8 rounded-2xl flex items-center gap-3 transition-all cursor-pointer">
                <Info size={24} />
                Mere info
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories / Rows */}
      <div className="space-y-20">
        {podcastGroups.map((group, gIndex) => (
          <div key={gIndex} className="relative z-10">
            <div className="px-8 lg:px-16 flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {group.image && (
                  <Link to={`/podcast/${group.id}`} className="shrink-0">
                    <img 
                      src={group.image} 
                      alt={group.title} 
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl object-cover shadow-lg border border-white/10 hover:border-accent/50 transition-colors" 
                    />
                  </Link>
                )}
                <div className="flex flex-col gap-1">
                  <Link to={`/podcast/${group.id}`} className="group w-fit">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3 group-hover:text-accent transition-colors">
                      {group.title}
                      <ChevronRight className="text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </h2>
                  </Link>
                  <span className="text-[10px] text-accent/60 uppercase tracking-[0.2em] font-bold">
                    Sidst opdateret: {new Date(group.latestUpdate).toLocaleDateString('da-DK', { day: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
              <Link to={`/podcast/${group.id}`} className="text-sm font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest cursor-pointer hidden md:block">Se alle</Link>
            </div>

            <div className="flex gap-6 lg:gap-8 overflow-x-auto overflow-y-visible py-10 -my-10 px-8 lg:px-16 no-scrollbar scroll-smooth relative">
              {group.items.map((episode, eIndex) => (
                <motion.div 
                  key={eIndex}
                  whileHover={{ scale: 1.08, y: -5, zIndex: 50 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                  className="relative shrink-0 w-[180px] lg:w-[240px] group cursor-pointer liquid-border-card"
                >
                  <div className="liquid-border-inner">
                    <div className="relative aspect-square overflow-hidden bg-bg-dark">
                      <img 
                        src={episode.thumbnail || episode.enclosure?.link} 
                        className="w-full h-full object-cover"
                        alt={episode.title}
                      />
                      
                      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/10">
                          <Headphones className="text-accent animate-pulse" size={28} />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h3 className="text-white font-bold text-xs lg:text-sm line-clamp-2 mb-1 group-hover:text-accent transition-colors leading-tight">
                          {episode.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>{new Date(episode.pubDate).toLocaleDateString('da-DK')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Podcasts;
