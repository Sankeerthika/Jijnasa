import React from 'react';
import { Bell, Search, Upload, MessageCircle, HelpCircle } from 'lucide-react';
import { useAuth } from './AuthProvider';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white border-b border-surface-border sticky top-0 z-40">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-unstop-blue transition-colors" />
          <input
            type="text"
            placeholder="Search for doubts, topics or faculty..."
            className="w-full pl-12 pr-4 py-2.5 bg-surface-bg border border-surface-border rounded-lg focus:ring-2 focus:ring-unstop-blue/10 focus:border-unstop-blue outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-4 border-r border-surface-border pr-6">
          <button className="relative p-2 text-gray-500 hover:text-unstop-blue hover:bg-unstop-lightBlue rounded-lg transition-all">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full border-2 border-white"></span>
          </button>
          <button className="relative p-2 text-gray-500 hover:text-unstop-blue hover:bg-unstop-lightBlue rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-unstop-accent rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-gray-500 hover:text-unstop-blue hover:bg-unstop-lightBlue rounded-lg transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-unstop-dark leading-none">{user?.name}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-unstop-lightBlue border border-surface-border flex items-center justify-center text-unstop-blue font-bold overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Irene'}&backgroundColor=e7f0fa`} 
              alt="avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
