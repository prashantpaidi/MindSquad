import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'h-14 bg-primary text-secondary font-bold text-lg rounded-full transform hover:scale-105';
      case 'secondary':
        return 'h-14 bg-secondary text-primary border border-subtle-border font-semibold rounded-full hover:border-gray-300';
      case 'ghost':
        return 'h-10 px-5 text-sm font-medium transition-colors text-text-muted hover:bg-subtle-background hover:text-text-primary';
      case 'link':
        return 'text-text-muted hover:text-text-primary hover:bg-subtle-background p-3 rounded-lg';
      case 'quiz-option':
        return 'h-14 bg-secondary text-primary border border-subtle-border rounded-2xl text-base font-medium hover:border-gray-400';
      default:
        return 'h-14 bg-primary text-secondary font-bold text-lg rounded-full transform hover:scale-105';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'md': return 'px-4 py-2 text-sm';
      case 'lg': return 'px-6 py-3 text-base';
      case 'full': return 'w-full justify-center';
      default: return 'px-4 py-2 text-sm';
    }
  };
  
  const classes = `${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`;
  
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;