import React from 'react';

const FormContainer = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  ...props 
}) => {
  return (
    <div className="relative w-full max-w-md z-10">
      {/* 3D Character Cards in the background */}
      <div className="absolute -top-20 -left-16 w-32 h-32 transform -rotate-12 hidden lg:block">
        <div className="bg-white p-2 rounded-2xl shadow-lg">
          <img 
            src="https://i.ibb.co/n6kmyBv/robot-1.png" 
            alt="3D Robot" 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>
      
      <div className="absolute -top-12 -right-16 w-32 h-32 transform rotate-12 hidden lg:block">
        <div className="bg-white p-2 rounded-2xl shadow-lg">
          <img 
            src="https://i.ibb.co/3s79dM3/robot-2.png" 
            alt="3D Robot" 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>
      
      {/* Frosted Glass Form Panel */}
      <div className="relative bg-white/70 backdrop-blur-3xl rounded-3xl p-8 shadow-lg ring-1 ring-black/5">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;