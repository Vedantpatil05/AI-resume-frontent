import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface HealthBadgeProps {
  status?: 'ready' | 'error' | 'loading';
}

const HealthBadge: React.FC<HealthBadgeProps> = ({ status = 'ready' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'ready':
        return {
          icon: CheckCircle,
          text: 'Model Ready',
          className: 'bg-green-500/20 text-green-400 border-green-500/30'
        };
      case 'error':
        return {
          icon: XCircle,
          text: 'Model Error',
          className: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
      case 'loading':
        return {
          icon: Loader,
          text: 'Loading Model',
          className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        };
      default:
        return {
          icon: CheckCircle,
          text: 'Model Ready',
          className: 'bg-green-500/20 text-green-400 border-green-500/30'
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${className}`}>
      <Icon className={`h-3 w-3 ${status === 'loading' ? 'animate-spin' : ''}`} />
      {text}
    </div>
  );
};

export default HealthBadge;