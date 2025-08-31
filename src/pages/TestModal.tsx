import { useState } from 'react';
import CompanyInfoModal from '@/components/modals/CompanyInfoModal'

export default function TestModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: CompanyInfoData) => {
    console.log('Saved company info:', data);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Company Info Modal
      </button>
      
      <CompanyInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};