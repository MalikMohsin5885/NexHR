import React from 'react';
import CustomFormBuilder, { CustomFormQuestion, CustomFormAnswers } from './CustomFormBuilder';

interface WorkflowTabProps {
  formData: {
    experienceLevel: string;
    educationLevel: string;
  };
  validationErrors: Record<string, string>;
  customFormQuestions: CustomFormQuestion[];
  customFormAnswers: CustomFormAnswers;
  showCustomForm: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onToggleQuestion: (questionId: string) => void;
  onShowCustomForm: (show: boolean) => void;
  onCustomFormInput?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const WorkflowTab: React.FC<WorkflowTabProps> = ({
  formData,
  validationErrors,
  customFormQuestions,
  customFormAnswers,
  showCustomForm,
  handleInputChange,
  onToggleQuestion,
  onShowCustomForm,
  onCustomFormInput,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Experience Level */}
        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              validationErrors.experienceLevel ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Experience Level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Executive Level">Executive Level</option>
          </select>
          {validationErrors.experienceLevel && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.experienceLevel}</p>
          )}
        </div>

        {/* Education Level */}
        <div>
          <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
            Education Level
          </label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              validationErrors.educationLevel ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
          </select>
          {validationErrors.educationLevel && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.educationLevel}</p>
          )}
        </div>
      </div>

      {/* Custom Form Builder */}
      <div className="mt-8">
        <CustomFormBuilder
          customFormQuestions={customFormQuestions}
          customFormAnswers={customFormAnswers}
          showCustomForm={showCustomForm}
          onToggleQuestion={onToggleQuestion}
          onShowCustomForm={onShowCustomForm}
          onCustomFormInput={onCustomFormInput}
        />
      </div>
    </div>
  );
};

export default WorkflowTab; 