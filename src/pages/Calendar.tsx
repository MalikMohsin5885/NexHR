
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect } from 'react';

const Calendar = () => {
  
  useEffect(() => {
    console.log("Calendar loaded!");
  }, []);
  
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Calendar</h1>
        <p className="text-muted-foreground">Calendar functionality coming soon.</p>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
