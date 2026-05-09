import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Newspaper, 
  Headphones, 
  FileText, 
  Mail
} from 'lucide-react';
import logoIcon from '../assets/logo_icon_white.svg';

const Navbar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <Home size={22} />, label: 'Forside', path: '/' },
    { icon: <Headphones size={22} />, label: 'Podcasts', path: '/podcasts' },
    { icon: <Mail size={22} />, label: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav className="bg-black/40 backdrop-blur-lg border border-white/5 rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.3)] pointer-events-auto">
        
        {/* LOGO - Skaleret proportionelt */}
        <div className="flex items-center pl-3 pr-4 border-r border-white/10 mr-1">
          <NavLink to="/" className="flex items-center justify-center group">
            <img 
              src={logoIcon} 
              alt="NewWays" 
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
          </NavLink>
        </div>

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink 
              key={index}
              to={item.path} 
              className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 group overflow-hidden isolate"
            >
              {/* Liquid Effect & Mask Group */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-0 overflow-hidden rounded-full"
                  >
                    {/* Den roterende Liquid-effekt */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="absolute inset-[-150%] z-0"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, var(--color-accent), transparent 40%)',
                        animation: 'rotate-gradient 4s linear infinite'
                      }}
                    />
                    
                    {/* Den beskyttende maske (Ligger nu inde i AnimatePresence) */}
                    <div className="absolute inset-[1.5px] rounded-full z-10 bg-[#0a1224]" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Hover-maske (Kun til ikke-aktive knapper) */}
              {!isActive && (
                <div className="absolute inset-[1.5px] rounded-full z-10 bg-transparent group-hover:bg-white/5 transition-colors duration-300" />
              )}
              
              {/* LAG 3: Ikonet */}
              <div className="relative z-20 pointer-events-none">
                <div className={`
                  transition-all duration-500
                  ${isActive ? 'text-accent scale-110' : 'text-slate-400 group-hover:text-white'}
                `}>
                  {item.icon}
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-14 bg-black/60 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap text-white z-30">
                {item.label}
              </div>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
