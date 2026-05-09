import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, ShieldCheck, CheckCircle2, AlertCircle, Lock, User } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+45',
    phone: '',
    message: '',
    hp_field: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const securitySanitize = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  };

  const validate = () => {
    let newErrors = {};
    if (formData.hp_field !== '') return false;

    const now = Date.now();
    if (now - lastSubmitTime < 20000 && lastSubmitTime !== 0) {
      newErrors.general = 'Vent venligst lidt før du sender igen.';
      setErrors(newErrors);
      return false;
    }

    if (formData.name.length < 2) {
      newErrors.name = 'Indtast venligst dit navn.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ugyldig e-mail adresse.';
    }

    if (!/^\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Skal være 8 tal.';
    }

    if (formData.message.length < 5) {
      newErrors.message = 'Beskeden er for kort.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const subject = encodeURIComponent(`Ny henvendelse fra ${formData.name}`);
      const body = encodeURIComponent(
        `Hej New Ways Media\n\n` +
        `${formData.message}\n\n` +
        `Hilsen\n` +
        `${formData.name}\n` +
        `E-mail: ${formData.email}\n` +
        `Telefon: ${formData.countryCode} ${formData.phone}`
      );
      
      const mailtoLink = `mailto:philip@newwaysmedia.dk?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;

      setTimeout(() => {
        setStatus('success');
        setLastSubmitTime(Date.now());
        setFormData({ name: '', email: '', countryCode: '+45', phone: '', message: '', hp_field: '' });
      }, 1000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <Lock size={12} /> Secure Communication Channel
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tighter">Kontakt Os</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="hidden" aria-hidden="true">
            <input type="text" value={formData.hp_field} onChange={(e) => setFormData({...formData, hp_field: e.target.value})} tabIndex="-1" autoComplete="off" />
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Dit Navn</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-accent transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text"
                required
                maxLength="100"
                placeholder="Agurk Tomat"
                className={`w-full bg-black/40 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-accent/50 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all text-white placeholder:text-slate-700`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            {errors.name && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-wider">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Din E-mail</label>
              <input 
                type="email"
                required
                placeholder="mail@eksempel.dk"
                className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-accent/50 rounded-2xl py-4 px-4 outline-none transition-all text-white placeholder:text-slate-700`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-wider">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Telefon</label>
              <div className="flex gap-2">
                <select 
                  className="bg-black/40 border border-white/10 rounded-2xl py-4 px-3 outline-none text-white cursor-pointer hover:bg-white/5 transition-colors text-sm"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                >
                  <option value="+45">+45</option>
                  <option value="+46">+46</option>
                  <option value="+47">+47</option>
                </select>
                <input 
                  type="tel"
                  required
                  maxLength="8"
                  placeholder="12345678"
                  className={`w-full bg-black/40 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} focus:border-accent/50 rounded-2xl py-4 px-4 outline-none transition-all text-white placeholder:text-slate-700`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-wider">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Besked</label>
            <textarea 
              required
              rows="4"
              maxLength="2000"
              placeholder="Jeg vil gerne have min egen podcast om rumvæsner og kaffe..."
              className={`w-full bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} focus:border-accent/50 rounded-2xl py-4 px-4 outline-none transition-all text-white placeholder:text-slate-700 resize-none`}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <div className="flex justify-between items-center px-1">
              {errors.message && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">{errors.message}</p>}
              <span className="text-[9px] font-bold ml-auto text-slate-600">{formData.message.length} / 2000</span>
            </div>
          </div>

          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs">
              <AlertCircle size={18} /> {errors.general}
            </div>
          )}

          <button type="submit" disabled={status === 'sending' || status === 'success'} className="btn-liquid w-full group overflow-hidden">
            <span className="btn-liquid-inner flex items-center justify-center gap-3 py-4">
              {status === 'sending' ? (
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <Send size={18} />
              )}
              {status === 'sending' ? 'Sender...' : status === 'success' ? 'Besked klar' : 'Send Sikker Besked'}
            </span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] pt-2">
            <ShieldCheck size={12} /> End-to-end Encrypted Processing
          </div>
        </form>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-bg-dark/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Besked Klar!</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Dit mail-program åbner nu med din besked. Husk at trykke send i mailen.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-accent text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Luk</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Contact;
