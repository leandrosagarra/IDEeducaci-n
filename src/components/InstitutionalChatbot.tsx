import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Bot, X, Send, MessageSquare, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  hasAnswer?: boolean;
  time: string;
  suggestions?: string[];
}

interface ChatbotProps {
  onNavigateContact: () => void;
}

export const InstitutionalChatbot: React.FC<ChatbotProps> = ({ onNavigateContact }) => {
  const { data } = useData();
  const { settings } = data;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy el asistente virtual del Instituto. ¿En qué puedo ayudarte?',
      time: 'Ahora',
      hasAnswer: true,
      suggestions: [
        '¿Dónde quedan las sedes y qué horarios tienen?',
        '¿Cómo funciona la doble jornada en primaria?',
        '¿Qué orientaciones ofrece la secundaria?',
        '¿Cómo solicitar una vacante de inscripción?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputValue).trim();
    if (!message || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (response.ok) {
        const dataJson = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: dataJson.reply,
          hasAnswer: dataJson.hasAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: dataJson.suggestions
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Error de servidor en chatbot');
      }
    } catch (err) {
      console.error(err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'No encontré esa información publicada actualmente. Si querés, podés comunicarte directamente con el Instituto.',
        hasAnswer: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Contactar por WhatsApp', 'Ver Contacto']
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent('Hola Instituto de Enseñanza, me comunico desde el sitio web con una consulta institucional.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: '¡Hola! Soy el asistente virtual del Instituto. ¿En qué puedo ayudarte?',
        time: 'Ahora',
        hasAnswer: true,
        suggestions: [
          '¿Dónde quedan las sedes y qué horarios tienen?',
          '¿Cómo funciona la doble jornada en primaria?',
          '¿Qué orientaciones ofrece la secundaria?',
          '¿Cómo solicitar una vacante de inscripción?'
        ]
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chatbot Modal */}
      {isOpen ? (
        <div
          id="institutional-chatbot-window"
          className="w-[94vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white px-4 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-amber-900/60 border border-amber-400/40 flex items-center justify-center text-amber-200 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-tight flex items-center gap-1.5">
                  <span>Asistente del Instituto</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 font-semibold uppercase tracking-wider">
                    IA Oficial
                  </span>
                </h3>
                <p className="text-[11px] text-stone-300 leading-tight">
                  Respuestas oficiales sobre las 3 sedes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                id="chatbot-reset-btn"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reiniciar conversación"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                id="chatbot-close-btn"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RAG Knowledge source banner */}
          <div className="bg-amber-50/70 border-b border-amber-200/60 px-3.5 py-1.5 text-[11px] text-amber-950 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-amber-700" />
              Base institucional: Inicial (68 nº 969), Primario (66 nº 818) y Secundario (68 nº 970)
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/70 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-amber-800 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>

                {/* If answer was NOT found, show explicit official contact buttons */}
                {msg.sender === 'bot' && msg.hasAnswer === false && (
                  <div className="mt-2.5 flex flex-wrap gap-2 w-full max-w-[90%]">
                    <button
                      onClick={handleWhatsAppClick}
                      id="bot-action-whatsapp-btn"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>CONTACTAR POR WHATSAPP</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigateContact();
                        setIsOpen(false);
                      }}
                      id="bot-action-contacto-btn"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>VER CONTACTO</span>
                    </button>
                  </div>
                )}

                {/* Quick suggestion chips */}
                {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (sug.toLowerCase().includes('whatsapp')) {
                            handleWhatsAppClick();
                          } else if (sug.toLowerCase().includes('contacto')) {
                            onNavigateContact();
                            setIsOpen(false);
                          } else {
                            handleSendMessage(sug);
                          }
                        }}
                        className="text-[11px] bg-white hover:bg-amber-50 text-amber-900 hover:text-amber-950 border border-amber-200/80 font-medium px-2.5 py-1 rounded-full shadow-xs transition-colors cursor-pointer text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-stone-500 text-xs bg-white p-3 rounded-xl border border-stone-200 w-fit">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="font-medium text-stone-600">Consultando información oficial...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              id="chatbot-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribí tu consulta aquí..."
              disabled={isLoading}
              className="flex-1 bg-stone-100/80 border border-stone-200 focus:border-amber-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              id="chatbot-send-btn"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all cursor-pointer flex-shrink-0"
              aria-label="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Button Trigger */
        <button
          onClick={() => setIsOpen(true)}
          id="institutional-chatbot-trigger"
          className="group relative flex items-center gap-2.5 bg-stone-900 hover:bg-stone-850 text-white px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer border border-amber-600/40"
          aria-label="Abrir asistente del instituto"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-amber-900/60 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-stone-900 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-stone-900"></span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold tracking-tight leading-none text-stone-100">
              Asistente del Instituto
            </div>
            <div className="text-[10px] text-amber-300/90 mt-1 font-medium">
              Consultas y 3 Sedes
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
