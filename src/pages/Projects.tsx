
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground">Project management functionality coming soon.</p>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
