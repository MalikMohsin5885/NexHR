import React from 'react';
import CustomFormBuilder, { CustomFormQuestion, CustomFormAnswers } from './CustomFormBuilder';

interface ApplicationFormTabProps {
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

const ApplicationFormTab: React.FC<ApplicationFormTabProps> = ({
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

export default ApplicationFormTab; 