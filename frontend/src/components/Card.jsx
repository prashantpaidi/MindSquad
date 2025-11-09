import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  interactive = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-4xl transition-all duration-200';
  
  const variants = {
    default: 'glass-panel',
    outlined: 'bg-secondary border-2 border-subtle-border p-6 lg:p-8',
    interactive: 'glass-panel hover:shadow-lg cursor-pointer transform hover:scale-105',
    elevated: 'bg-secondary p-8 lg:p-10 ring-1 ring-black/5',
    solid: 'bg-secondary p-6 lg:p-8'
  };
  
  // Add custom shadow style to the card
  const getCardStyle = () => {
    if (['default', 'interactive', 'elevated', 'solid'].includes(variant)) {
      return {
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
      };
    }
    return {};
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <div className={classes} style={getCardStyle()} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-h2 text-text-primary ${className}`}>
    {children}
  </h3>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`text-text-secondary ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-6 border-t border-subtle-border ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;