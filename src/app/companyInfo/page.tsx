"use client";

import React, { useState, ChangeEvent } from 'react';
import { Roboto } from 'next/font/google';

// Google Font
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

// Industry options
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

const CompanyInfoForm: React.FC = () => {
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

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    console.log('Company Info:', data);
    alert('Company information saved successfully!');
    // Reset form
    setData({ companyName: '', numEmployees: '', industryType: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className={`${roboto.className} max-w-md w-full p-6 rounded-2xl shadow-2xl bg-white text-[#2A2438]`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#352F44]">
          Company Information
        </h2>

        <div className="space-y-5">
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#e53e3e] transition duration-150 ease-in-out ${errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-[#DBD8E3] focus:border-[#352F44]'}`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Number of Employees */}
          <div>
            <label htmlFor="numEmployees" className="block text-sm font-medium mb-1">
              No. of Employees
            </label>
            <input
              type="number"
              id="numEmployees"
              name="numEmployees"
              value={data.numEmployees}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#e53e3e] transition duration-150 ease-in-out ${errors.numEmployees ? 'border-red-500 focus:border-red-500' : 'border-[#DBD8E3] focus:border-[#352F44]'}`}
              placeholder="e.g., 50"
            />
            {errors.numEmployees && (
              <p className="mt-1 text-sm text-red-600">{errors.numEmployees}</p>
            )}
          </div>

          {/* Industry Type */}
          <div>
            <label htmlFor="industryType" className="block text-sm font-medium mb-1">
              Industry Type
            </label>
            <select
              id="industryType"
              name="industryType"
              value={data.industryType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#e53e3e] transition duration-150 ease-in-out ${errors.industryType ? 'border-red-500 focus:border-red-500' : 'border-[#DBD8E3] focus:border-[#352F44]'}`}
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

        {/* Save Button */}
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-md text-sm font-medium rounded-md transition duration-150 ease-in-out bg-[#352F44] text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
