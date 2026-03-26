import React from 'react';
import clsx from 'clsx';
import {
  CheckCircle,
  Clock,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Info
} from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    'PENDING': { 
      color: 'bg-yellow-50 text-status-warning border-yellow-200', 
      icon: Clock, 
      label: 'Under Review' 
    },
    'ANSWERED': { 
      color: 'bg-blue-50 text-unstop-blue border-blue-200', 
      icon: HelpCircle, 
      label: 'Answered' 
    },
    'RESOLVED': { 
      color: 'bg-green-50 text-status-success border-green-200', 
      icon: CheckCircle, 
      label: 'Resolved' 
    },
  };

  const config = statusConfig[status] || { 
    color: 'bg-gray-50 text-gray-500 border-gray-200', 
    icon: Info, 
    label: status 
  };

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border",
      config.color
    )}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export const AppBadge = ({ children, color = 'primary' }) => {
  const colors = {
    primary: 'bg-unstop-blue text-white',
    orange: 'bg-status-warning text-white',
    blue: 'bg-unstop-accent text-white',
    dark: 'bg-unstop-dark text-white',
  };
  return (
    <span className={clsx(
      "inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", 
      colors[color]
    )}>
      {children}
    </span>
  );
}

export const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-surface-border shadow-soft flex-1">
      {Icon && (
        <div className="w-12 h-12 bg-unstop-lightBlue rounded-lg flex items-center justify-center text-unstop-blue">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-display font-bold text-unstop-dark">{value}</h3>
      </div>
    </div>
  );
};

export const Avatar = ({ name, size = "md" }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  return (
    <div className={clsx(
      "rounded-lg bg-unstop-lightBlue overflow-hidden flex-shrink-0 border border-surface-border relative group", 
      sizeMap[size]
    )}>
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'Irene'}&backgroundColor=e7f0fa`}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
}
