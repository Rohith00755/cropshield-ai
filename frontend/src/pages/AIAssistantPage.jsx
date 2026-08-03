import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Sparkles, RefreshCw, CheckCircle2, Cpu, Zap } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { cropShieldApi } from '../services/api';

export function AIAssistantPage() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello Rohith! I'm **CropShield ChatGPT Agent**, your 24/7 agricultural intelligence assistant powered by OpenAI models. I analyze real-time crop disease risks, soil moisture, and micro-climate patterns. How can I help protect your farm today?",
      timestamp: '10:00 AM',
      model: 'ChatGPT-4o mini'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What fertilizer should I use for Rice Blast prevention?",
    "How can I prevent Late Blight in Tomatoes?",
    "When is the optimal chemical spraying window tomorrow?",
    "How does high relative humidity trigger fungal sporulation?"
  ];

  const modelOptions = [
    { id: 'gpt-4o-mini', name: 'ChatGPT-4o mini (Fast & Smart)', badge: 'Recommended' },
    { id: 'gpt-4o', name: 'ChatGPT-4o (High Intelligence)', badge: 'Advanced' },
    { id: 'gpt-3.5-turbo', name: 'ChatGPT-3.5 Turbo (Standard)', badge: 'Legacy' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const res = await cropShieldApi.sendChatMessage(query, selectedModel);
      const botText = res?.data?.text || "For optimal crop performance, maintain balanced NPK ratios and monitor overnight dew condensation.";
      const modelLabel = selectedModel === 'gpt-4o' ? 'ChatGPT-4o' : 'ChatGPT-4o mini';

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: modelLabel
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header with ChatGPT Model Selector */}
      <GlassCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] shadow-sm">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#263238] flex items-center gap-2">
              🤖 Ask CropShield AI Agent
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-extrabold">
                ChatGPT Powered
              </span>
            </h2>
            <p className="text-xs text-[#607D8B]">Ask any crop protection, disease prevention, or fertilizer question</p>
          </div>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#F7FAF4] p-1.5 rounded-2xl border border-[#E5E7EB]">
            <Cpu className="w-4 h-4 text-[#2E7D32] ml-2" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#263238] focus:outline-none pr-2"
            >
              {modelOptions.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2.5 rounded-2xl bg-[#F7FAF4] hover:bg-[#EEF5EA] text-[#607D8B] hover:text-[#263238] transition-colors border border-[#E5E7EB]"
            title="Clear Conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>

      {/* Chat Messages Container */}
      <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-[#2E7D32] text-white' 
                  : 'bg-[#E8F5E9] text-[#2E7D32]'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[80%] rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238]'
              }`}>
                {/* Model badge for bot */}
                {msg.sender === 'bot' && (
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#2E7D32] mb-1.5">
                    <Zap className="w-3 h-3 fill-[#2E7D32]" />
                    {msg.model || 'ChatGPT-4o Agent'}
                  </div>
                )}

                {/* Content */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.text}
                </div>

                <div className={`text-[10px] mt-2 font-mono ${msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-[#607D8B]'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-[#F7FAF4] border border-[#E5E7EB] px-4 py-3 rounded-2xl text-xs text-[#607D8B] font-bold flex items-center gap-2">
                <span>ChatGPT is generating agronomic advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="pt-4 border-t border-[#E5E7EB] mt-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <span className="text-[11px] font-extrabold text-[#607D8B] whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
              Quick Questions:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#F7FAF4] hover:bg-[#EEF5EA] text-[#2E7D32] border border-[#E5E7EB] whitespace-nowrap font-bold transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Ask ChatGPT about crops, pests, disease prevention, or fertilizers..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-[#F7FAF4] border border-[#E5E7EB] rounded-2xl px-4 py-3 text-xs text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] font-medium"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50 transition-all"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </GlassCard>

    </div>
  );
}

export default AIAssistantPage;
