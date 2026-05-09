import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const Articles = () => {
  return (
    <div className="fade-in">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-1">Artikler</h2>
          <p className="text-slate-400">Læs vores dybdegående artikler.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Artikel {i}: Fremtidens Medier</h3>
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <BookOpen size={20} />
              </div>
            </div>
            <p className="text-slate-400 flex-1 leading-relaxed">
              Her kommer teksten til artiklen. Vi arbejder på at bringe dig det bedste indhold inden for medieproduktion og digital strategi. 
              Dyk ned i de nyeste trends og få konkrete værktøjer til din forretning.
            </p>
            <button className="mt-6 flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer">
              Læs mere <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
