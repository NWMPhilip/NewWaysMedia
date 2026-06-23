import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ChevronLeft, Calendar, Play, Info, X } from 'lucide-react';
import logoIcon from '../assets/logo_icon_white.svg';

const PodcastDetails = () => {
  const { slug } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const res = await fetch('/shows-data.json');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const show = data.find(f => f.id === slug);
        if (show) {
          setPodcast({
            feed: { title: show.title, description: show.description, image: show.image },
            items: show.items
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Fejl ved hentning af podcast detaljer", err);
        setLoading(false);
      }
    };
    fetchPodcast();
    window.scrollTo(0, 0);
  }, [slug]);

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

  if (!podcast) return <div className="p-20 text-center text-slate-500">Podcast ikke fundet.</div>;

  return (
    <div className="min-h-screen pb-20 fade-in overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full overflow-hidden mb-16 flex flex-col justify-end">
        <div className="absolute inset-0">
          <img 
            src={podcast.feed.image} 
            className="w-full h-full object-cover opacity-60 scale-105"
            style={{ objectPosition: '10% 10%' }}
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-bg-dark via-bg-dark/20 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-l from-bg-dark via-bg-dark/20 to-transparent"></div>
        </div>

        <div className="relative w-full p-8 lg:p-20 pb-20 max-w-6xl z-10 pt-40">
          <Link to="/podcasts" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group w-fit">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Tilbage til alle podcasts
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-40 lg:w-56 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0"
            >
              <img src={podcast.feed.image} className="w-full h-full object-cover" alt={podcast.feed.title} />
            </motion.div>

            <div className="flex-1 pt-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-bold mb-6 tracking-tighter leading-none"
              >
                {podcast.feed.title}
              </motion.h1>
              
              <div className="max-w-3xl mb-8">
                <p className="text-slate-300 text-lg leading-relaxed line-clamp-2">
                  {podcast.feed.description}
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mt-4 hover:text-white transition-colors cursor-pointer"
                >
                  Mere info <Info size={16} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Play size={16} className="text-accent" />
                  {podcast.items.length} Afsnit
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  Opdateret: {new Date(podcast.items[0].pubDate).toLocaleDateString('da-DK')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <div className="px-8 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {podcast.items.map((episode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -5, zIndex: 50 }}
              viewport={{ once: true }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
              className="relative group cursor-pointer"
            >
              <div className="liquid-border-card mb-4">
                <div className="liquid-border-inner aspect-square overflow-hidden bg-bg-dark relative">
                  <img 
                    src={episode.thumbnail || podcast.feed.image} 
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

      {/* LIQUID GLASS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60" // Kun mørk maske, intet blur her
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ willChange: 'transform, opacity' }}
              className="relative w-full max-w-2xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 lg:p-12 shadow-2xl overflow-hidden"
            >
              {/* Liquid Glow Effect inside modal */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full z-20"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <img src={podcast.feed.image} className="w-20 h-20 rounded-xl shadow-xl border border-white/5" alt="" />
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">{podcast.feed.title}</h2>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Headphones size={14} /> Podcast Info
                    </span>
                  </div>
                </div>
                
                <div className="max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {podcast.feed.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                  <span>Opdateret: {new Date(podcast.items[0].pubDate).toLocaleDateString('da-DK')}</span>
                  <span className="text-accent">{podcast.items.length} AFASNIT I ALT</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(91,197,255,0.3); }
      `}} />
    </div>
  );
};

export default PodcastDetails;
