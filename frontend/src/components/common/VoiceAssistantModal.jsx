import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, X, Bot, Sprout } from 'lucide-react';

export function VoiceAssistantModal({ isOpen, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sampleVoiceQueries = [
    "Will it rain tomorrow?",
    "Should I spray today?",
    "Why is my crop at risk?",
    "How is my rice crop today?"
  ];

  const handleSimulateVoice = (queryText) => {
    setTranscript(queryText);
    setIsListening(true);
    setAiResponse('');

    setTimeout(() => {
      setIsListening(false);
      
      let responseText = "Humidity has remained above 85% for six hours. Rice Blast risk is high. Spray Tricyclazole within the next 24 hours.";

      if (queryText.toLowerCase().includes("rain")) {
        responseText = "Yes, light showers are expected tomorrow evening. We recommend spraying fungicide today before 9 AM.";
      } else if (queryText.toLowerCase().includes("spray")) {
        responseText = "Yes, spray Tricyclazole 75% WP today before 9 AM when wind speeds are under 6 km/h.";
      } else if (queryText.toLowerCase().includes("risk")) {
        responseText = "High humidity (86%) over the past six hours accounts for 38% of the outbreak risk weight.";
      }

      setAiResponse(responseText);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(responseText);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white border-2 border-[#2E7D32] rounded-3xl p-6 shadow-2xl text-[#1F2937] space-y-6 relative"
      >
        <button 
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F7FAF4] border border-[#E5E7EB] text-gray-500 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-[#2E7D32]/30">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#1F2937] flex items-center gap-2">
              🌾 Ask CropShield
            </h3>
            <p className="text-xs text-gray-500 font-medium">Your friendly AI farming voice assistant</p>
          </div>
        </div>

        {/* Mic Action */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button
            onClick={() => handleSimulateVoice("Should I spray today?")}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-[#E53935] text-white animate-ping ring-8 ring-[#E53935]/20' 
                : isSpeaking 
                  ? 'bg-[#2E7D32] text-white animate-bounce shadow-2xl shadow-[#2E7D32]/40'
                  : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-xl shadow-[#2E7D32]/30 hover:scale-105'
            }`}
          >
            <Mic className="w-10 h-10" />
          </button>
          
          <span className="text-xs font-extrabold text-gray-700">
            {isListening ? "Listening..." : isSpeaking ? "🔊 Speaking Answer..." : "🎤 Tap Microphone to Ask"}
          </span>
        </div>

        {/* Sample Voice Commands */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">Ask CropShield:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleVoiceQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoice(q)}
                className="p-3 rounded-2xl bg-[#F7FAF4] hover:bg-[#E8F5E9] text-xs text-gray-800 border border-[#E5E7EB] text-left transition-colors font-extrabold flex items-center justify-between"
              >
                <span className="truncate">{q}</span>
                <Mic className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Response Speech Bubble */}
        {transcript && (
          <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
            <div className="p-3 rounded-xl bg-[#F7FAF4] text-xs text-[#2E7D32] font-bold">
              <strong>Your Question:</strong> "{transcript}"
            </div>

            {aiResponse && (
              <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] text-xs text-gray-900 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold">
                  <Bot className="w-4 h-4" />
                  <span>CropShield Answer:</span>
                  {isSpeaking && <Volume2 className="w-4 h-4 text-[#2E7D32] animate-pulse" />}
                </div>
                <p className="leading-relaxed font-bold">{aiResponse}</p>
              </div>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
}
export default VoiceAssistantModal;
