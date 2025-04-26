import React, { useState, ChangeEvent } from 'react';

interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CompanyInfoData) => void;
}

interface CompanyInfoData {
  companyName: string;
  numEmployees: string;
  industryType: string;
}

interface CompanyInfoErrors {
  companyName?: string;
  numEmployees?: string;
  industryType?: string;
}

const industryOptions = [
  { value: 'it', label: 'IT/Software Development' },
  { value: 'marketing', label: 'Marketing & Sales' },
  { value: 'design', label: 'Design & Creative' },
  { value: 'finance', label: 'Finance & Accounting' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'admin', label: 'Administrative' },
  { value: 'architecture', label: 'Architecture/Interior Design' },
  { value: 'construction', label: 'Construction/Civil Engineering' },
  { value: 'legal', label: 'Legal' },
  { value: 'logistics', label: 'Logistics/Supply Chain' },
  { value: 'manufacturing', label: 'Manufacturing/Production' },
  { value: 'media', label: 'Media/Communications' },
  { value: 'ngo', label: 'NGO/Non-profit' },
  { value: 'retail', label: 'Retail/Wholesale' },
  { value: 'tourism', label: 'Tourism/Hospitality' },
  { value: 'other', label: 'Other' },
];

const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({ isOpen, onClose, onSave }) => {
  const [data, setData] = useState<CompanyInfoData>({
    companyName: '',
    numEmployees: '',
    industryType: '',
  });
  const [errors, setErrors] = useState<CompanyInfoErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: CompanyInfoErrors = {};
    if (!data.companyName.trim()) {
      newErrors.companyName = 'Company name cannot be empty';
    }
    if (!data.numEmployees.trim() || isNaN(Number(data.numEmployees)) || Number(data.numEmployees) < 1) {
      newErrors.numEmployees = 'Please enter a valid number of employees';
    }
    if (!data.industryType) {
      newErrors.industryType = 'Please select an industry';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    onSave(data);
    // Reset form
    setData({ companyName: '', numEmployees: '', industryType: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Company Information
                </h3>
                
                <div className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={data.companyName}
                      onChange={handleChange}
                      className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.companyName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} border p-2`}
                      placeholder="Enter company name"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <label htmlFor="numEmployees" className="block text-sm font-medium text-gray-700">
                      No. of Employees
                    </label>
                    <input
                      type="number"
                      id="numEmployees"
                      name="numEmployees"
                      value={data.numEmployees}
                      onChange={handleChange}
                      min="1"
                      className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.numEmployees ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} border p-2`}
                      placeholder="e.g., 50"
                    />
                    {errors.numEmployees && (
                      <p className="mt-1 text-sm text-red-600">{errors.numEmployees}</p>
                    )}
                  </div>

                  {/* Industry Type */}
                  <div>
                    <label htmlFor="industryType" className="block text-sm font-medium text-gray-700">
                      Industry Type
                    </label>
                    <select
                      id="industryType"
                      name="industryType"
                      value={data.industryType}
                      onChange={handleChange}
                      className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.industryType ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} border p-2`}
                    >
                      <option value="">Select industry...</option>
                      {industryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.industryType && (
                      <p className="mt-1 text-sm text-red-600">{errors.industryType}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer with buttons */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoModal;