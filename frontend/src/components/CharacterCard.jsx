import React from 'react';

const CharacterCard = ({ 
  src, 
  alt, 
  position = 'left', 
  rotation = 0,
  className = '',
  ...props 
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return '-top-20 -left-16 transform -rotate-12';
      case 'right':
        return '-top-12 -right-16 transform rotate-12';
      default:
        return '-top-20 -left-16 transform -rotate-12';
    }
  };

  return (
    <div className={`absolute w-32 h-32 ${getPositionClasses()} hidden lg:block ${className}`}>
      <div className="bg-white p-2 rounded-2xl shadow-lg">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain" 
          {...props}
        />
      </div>
    </div>
  );
};

export default CharacterCard;