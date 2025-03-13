
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GreetingHeaderProps {
  userName: string;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ userName }) => {
  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getCurrentTimeOfDay();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fade-in">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">Overview</span>
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
          {greeting}{' '}
          <span className="text-primary animate-pulse-subtle">{userName}</span>
        </h1>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center gap-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Today is</span>
          <span className="ml-1 font-medium">{currentDate}</span>
        </div>
        <button
          className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <span>Add report</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default GreetingHeader;
