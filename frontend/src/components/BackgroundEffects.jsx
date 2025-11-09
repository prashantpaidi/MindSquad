import React from 'react';

const BackgroundEffects = ({ className = '' }) => {
  return (
    <>
      {/* Aurora Background Glow Effect */}
      <div className={`fixed top-0 -left-1/4 w-[50rem] h-[50rem] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${className}`}></div>
      <div className={`fixed top-0 -right-1/4 w-[50rem] h-[50rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${className}`}></div>
      <div className={`fixed -bottom-8 left-20 w-[50rem] h-[50rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 ${className}`}></div>
    </>
  );
};

export default BackgroundEffects;