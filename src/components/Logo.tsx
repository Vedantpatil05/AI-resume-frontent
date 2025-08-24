
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold">C</span>
      </div>
      <span className="text-xl font-semibold text-foreground">Carnival</span>
    </div>
  );
};

export default Logo;
