import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm Ally. What's on your mind? I can tell you about my work scaling e-commerce brands, my pivot into AI, or anything else about my journey. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map(m => ({ role: m.sender, content: m.text }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Try again later or reach out to me directly through the contact section.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chat" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-12 fade-in">
          <h2 className="gradient-heading text-4xl md:text-5xl font-bold mb-4 font-ethnocentric text-center">
            Or if you'd prefer to talk to me now that you're already here...
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/80 text-center max-w-2xl mx-auto leading-relaxed">
            Ask me anything about my work, projects, or thoughts on technology and business. I would love to chat!
          </p>
          
          {/* Chat Interface */}
          <div className="max-w-2xl mx-auto">
            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 mb-4 bg-black/20 rounded-2xl border border-white/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        {message.text.includes('[BOOK_MEETING]') ? (
                          <div>
                            <p className="text-sm leading-relaxed mb-3">
                              {message.text.replace('[BOOK_MEETING]', '')}
                            </p>
                            <button
                              onClick={() => setShowCalendlyModal(true)}
                              className="inline-block px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition-colors text-sm"
                            >
                              Book a Meeting
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        )}
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white max-w-[80%] p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/20 disabled:cursor-not-allowed text-black rounded-xl transition-colors font-semibold flex items-center justify-center gap-2 sm:w-auto w-full"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      {showCalendlyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-panel border border-white/20 rounded-2xl p-0 w-full max-w-[420px] md:max-w-[650px] mx-auto overflow-hidden relative shadow-2xl flex flex-col items-center justify-center" style={{background: 'rgba(20, 20, 20, 0.95)'}}>
            <button
              onClick={() => setShowCalendlyModal(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-cyan-400 text-2xl font-bold z-10 bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Close"
            >
              ×
            </button>
            <div className="w-full flex items-center justify-center p-0 m-0">
              <InlineWidget 
                url="https://calendly.com/allyabdullah99/30min?background_color=000000&text_color=ffffff&primary_color=00fff7"
                styles={{
                  width: '100%',
                  minWidth: '320px',
                  minHeight: '600px',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  background: 'transparent'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatBot; 