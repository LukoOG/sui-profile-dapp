import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'lg', 
  text, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-18 w-18'
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full my-auto ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mr-2`} />
      {text && <span className="text-gray-600">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;