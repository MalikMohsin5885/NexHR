
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';

const Documents = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        <p className="text-muted-foreground">Document management coming soon.</p>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
