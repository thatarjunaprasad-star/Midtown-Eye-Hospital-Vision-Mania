/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Eye, 
  Send, 
  User, 
  Bot, 
  Info, 
  Activity, 
  ShieldCheck, 
  Store, 
  Coffee,
  Search,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Welcome to Midtown Eye Hospital Vision Mania. I am your medical assistant, Payal Prasad. I can provide you with eye vision reports and medical updates based on the expert analysis of Dr. Ashiqur Rahman. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const prompt = `
        You are Payal Prasad, an experienced medical assistant at Midtown Eye Hospital Vision Mania. 
        You present data and reports based on the analysis of Dr. Ashiqur Rahman, an eye specialist.
        
        Your tone should be professional, helpful, and interactive.
        Focus on:
        1. Eye vision reports and analysis.
        2. Medical help related to vision.
        3. Vision awareness and eye health tips.
        4. Analytical approach to eye care.

        Context:
        - Hospital: Midtown Eye Hospital Vision Mania
        - Specialist: Dr. Ashiqur Rahman
        - Assistant: Payal Prasad (You)
        
        User Query: ${userMessage}
      `;

      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
      });

      const botResponse = response.text || "I apologize, but I'm having trouble processing that request right now. Please try again or consult Dr. Ashiqur Rahman directly.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "I encountered an error while trying to reach our medical database. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neon-red px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Eye className="w-8 h-8 text-neon-red" />
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-tighter neon-text">VISION MANIA</h1>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none">Midtown Eye Hospital</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-neon-red transition-colors">Analysis</a>
            <a href="#" className="hover:text-neon-red transition-colors">Reports</a>
            <a href="#" className="hover:text-neon-red transition-colors">Awareness</a>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="text-[10px] font-black text-slate-800 italic">Twoptjabs</span>
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-8 gap-8">
        {/* Intro Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-red/10 text-neon-red rounded-full text-xs font-bold uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              Expert Analysis
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              PRECISION <span className="neon-text">VISION</span> REPORTS
            </h2>
            <p className="text-slate-600 font-medium">
              Experience the analytical approach of <span className="font-bold text-slate-900">Dr. Ashiqur Rahman</span>, presented by <span className="font-bold text-slate-900">Payal Prasad</span>. We combine medical expertise with modern technology to ensure your vision stays crystal clear.
            </p>
            <div className="flex gap-4">
              <button className="neon-button">GET REPORT</button>
              <button className="px-4 py-2 font-bold text-slate-500 hover:text-neon-red transition-colors text-sm uppercase tracking-widest">Learn More</button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden neon-border bg-slate-50 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 to-transparent pointer-events-none" />
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { icon: ShieldCheck, label: "Secure Data", color: "text-blue-500" },
                  { icon: Activity, label: "Live Analysis", color: "text-green-500" },
                  { icon: Info, label: "Awareness", color: "text-amber-500" },
                  { icon: Eye, label: "Vision Care", color: "text-neon-red" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 text-center">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Chatbot Section */}
        <section className="flex-1 flex flex-col min-h-[500px] bg-slate-50 rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xl">
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-red flex items-center justify-center text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Medical Assistant Chat</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Payal Prasad Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Search className="w-4 h-4 text-slate-400" /></button>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Menu className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    m.role === 'user' 
                      ? 'bg-neon-red text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {m.role === 'bot' ? <Bot className="w-3 h-3 opacity-50" /> : <User className="w-3 h-3 opacity-50" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                        {m.role === 'bot' ? 'Payal Prasad' : 'Patient'}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:m-0">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-1">
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-neon-red rounded-full" />
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-neon-red rounded-full" />
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-neon-red rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your vision report or eye health..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-neon-red/20 outline-none transition-all"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-neon-red text-white p-3 rounded-xl hover:bg-neon-red/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2 font-medium uppercase tracking-widest">
              Powered by Dr. Ashiqur Rahman's Analytical Framework
            </p>
          </div>
        </section>
      </main>

      {/* Footer Sponsors */}
      <footer className="bg-slate-900 text-white p-8 mt-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4 p-6 rounded-2xl border border-white/10 hover:border-neon-red/50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon-red/20 transition-colors">
                <Store className="w-6 h-6 text-neon-red" />
              </div>
              <h4 className="text-xl font-black tracking-tighter">MEHEDI VARIETIES STORE</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Proud sponsor of Midtown Eye Hospital. Mehedi Varieties Store provides a wide range of essential goods and medical supplies to our community. Visit us for quality products and exceptional service.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-red">Official Partner</span>
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-2xl border border-white/10 hover:border-neon-red/50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon-red/20 transition-colors">
                <Coffee className="w-6 h-6 text-neon-red" />
              </div>
              <h4 className="text-xl font-black tracking-tighter">LITON TEA STALL</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Supporting vision awareness since day one. Liton Tea Stall is the heart of our neighborhood, serving the finest tea and refreshments. A place where community and health awareness meet.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-red">Official Partner</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            © 2026 MIDTOWN EYE HOSPITAL VISION MANIA
          </p>
          <div className="flex gap-6">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <Activity className="w-4 h-4 text-slate-600" />
            <Eye className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </footer>
    </div>
  );
}
