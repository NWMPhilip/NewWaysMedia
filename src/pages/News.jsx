import React from 'react';

const News = () => {
  return (
    <div className="fade-in">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-1">Nyheder</h2>
          <p className="text-slate-400">Her kan du se de seneste opdateringer fra NewWaysMedia.</p>
        </div>
      </header>
      
      <div className="glass-card">
        <h3 className="text-lg font-bold">Seneste nyheder</h3>
        <p className="mt-4 text-slate-400">Ingen nyheder tilgængelige i øjeblikket.</p>
      </div>
    </div>
  );
};

export default News;
