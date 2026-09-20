import React from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative group transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
};

