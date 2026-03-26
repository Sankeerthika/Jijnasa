import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import clsx from 'clsx';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Jijnasa AI. How can I help you with your academic doubts today?", sender: 'ai', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const userQuery = input;
        setInput('');
        setIsTyping(true);

        try {
            // Call Real AI API via Backend
            const data = await apiService.askChatbot(userQuery);
            
            const aiMessage = {
                id: Date.now() + 1,
                text: data.response,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to my AI service right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            setMessages([{ id: 1, text: "Hello! I'm Jijnasa AI. How can I help you with your academic doubts today?", sender: 'ai', timestamp: new Date() }]);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl border border-surface-border shadow-soft overflow-hidden animate-fade-in">
            {/* Chat Header */}
            <div className="p-4 border-bottom flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-unstop-blue/10 rounded-full flex items-center justify-center text-unstop-blue">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-unstop-dark">Jijnasa AI Assistant</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Online</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={clearChat}
                    className="p-2 text-gray-400 hover:text-status-error hover:bg-red-50 rounded-lg transition-all"
                    title="Clear Chat"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-bg/30">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={clsx(
                            "flex items-start gap-3 animate-slide-up",
                            msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                            msg.sender === 'user' ? "bg-unstop-blue text-white" : "bg-white text-unstop-blue border border-surface-border"
                        )}>
                            {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>
                        <div className={clsx(
                            "max-w-[80%] p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed",
                            msg.sender === 'user' 
                                ? "bg-unstop-blue text-white rounded-tr-none" 
                                : "bg-white text-unstop-dark border border-surface-border rounded-tl-none"
                        )}>
                            {msg.text}
                            <div className={clsx(
                                "text-[10px] mt-2 opacity-60 font-bold uppercase tracking-widest",
                                msg.sender === 'user' ? "text-right" : "text-left"
                            )}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-start gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-white text-unstop-blue border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-surface-border shadow-sm">
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-top">
                <form onSubmit={handleSend} className="relative flex items-center gap-3">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Jijnasa AI anything about your subjects..."
                            className="w-full bg-surface-bg border-2 border-surface-border focus:border-unstop-blue focus:bg-white rounded-xl py-4 pl-6 pr-14 outline-none transition-all font-medium text-unstop-dark placeholder:text-gray-400 group-hover:border-gray-300"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-unstop-blue/40">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className={clsx(
                            "p-4 rounded-xl shadow-elevated transition-all flex-shrink-0",
                            input.trim() && !isTyping
                                ? "bg-unstop-blue text-white hover:bg-unstop-dark hover:scale-105"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </form>
                <p className="text-[10px] text-center mt-3 text-gray-400 font-bold uppercase tracking-widest">
                    Jijnasa AI can make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
};

export default Chatbot;
