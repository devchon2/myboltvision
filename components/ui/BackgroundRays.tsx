import React from 'react';

const BackgroundRays: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-radial from-bolt-accent/20 via-transparent to-transparent" />
    </div>
  );
};

export default BackgroundRays;
