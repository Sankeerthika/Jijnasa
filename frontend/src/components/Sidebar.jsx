import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  HelpCircle, 
  Library, 
  Settings, 
  LogOut, 
  BarChart2,
  MessageSquare,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import clsx from 'clsx';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.role;

  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    ...(role === 'STUDENT' ? [
      { name: 'Ask Doubt', icon: HelpCircle, path: '/post-doubt' },
      { name: 'My Doubts', icon: MessageSquare, path: '/my-doubts' },
      { name: 'AI Chatbot', icon: Sparkles, path: '/chatbot' },
    ] : [
      { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    ]),
    { name: 'Library', icon: Library, path: '/library' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-surface-border w-64">
      {/* Brand */}
      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-unstop-blue rounded flex items-center justify-center text-white font-bold text-xl">
            J
          </div>
          <span className="text-xl font-display font-bold text-unstop-dark tracking-tight">Jijnasa</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-unstop-lightBlue text-unstop-blue"
                  : "text-gray-600 hover:bg-gray-50 hover:text-unstop-dark"
              )
            }
          >
            <link.icon className={clsx("w-5 h-5", "text-current")} />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-border">
        <div className="flex flex-col gap-1">
          <NavLink 
            to="/settings" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Settings className="w-5 h-5" />
            Settings
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-status-error hover:bg-red-50 transition-colors text-sm font-medium w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        
        {/* User Mini Profile */}
        <div className="mt-4 p-3 bg-surface-bg rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-unstop-blue text-white flex items-center justify-center text-xs font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-unstop-dark truncate">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
