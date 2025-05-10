import React from 'react';
import { OptionType } from '../../data/formData';
import { CustomFormQuestion } from '../../pages/JobPostForm';

interface ReviewTabProps {
  formData: {
    jobTitle: string;
    jobCategory: OptionType | null;
    jobType: string;
    locationType: string;
    country: OptionType | null;
    state: OptionType | null;
    city: OptionType | null;
    salaryMin: string;
    salaryMax: string;
    currency: string;
    period: string;
    skills: OptionType[];
    jobDescription: string;
    experienceLevel: string;
    educationLevel: string;
    screeningQuestions: string[];
  };
  customFormQuestions: CustomFormQuestion[];
  customFormAnswers: Record<string, string>;
}

const ReviewTab: React.FC<ReviewTabProps> = ({
  formData,
  customFormQuestions,
  customFormAnswers,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 border-[#DBD8E3]">Review Job Post</h2>
      <div className="space-y-4 p-4 rounded-md" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <strong className="block">Job Title:</strong>{" "}
            {formData.jobTitle || (<span className="text-[#5C5470]">Not specified</span>)}
          </div>
          <div>
            <strong className="block">Category:</strong>{" "}
            {formData.jobCategory?.label || (<span className="text-[#5C5470]">Not specified</span>)}
          </div>
          <div>
            <strong className="block">Job Type:</strong> {formData.jobType}
          </div>
          <div>
            <strong className="block">Location Type:</strong> {formData.locationType}
          </div>
          {formData.locationType !== "Remote" && (
            <>
              <div>
                <strong className="block">Country:</strong>{" "}
                {formData.country?.label || (<span className="text-[#5C5470]">Not specified</span>)}
              </div>
              <div>
                <strong className="block">State:</strong>{" "}
                {formData.state?.label || (<span className="text-[#5C5470]">Not specified</span>)}
              </div>
              <div>
                <strong className="block">City:</strong>{" "}
                {formData.city?.label || (<span className="text-[#5C5470]">Not specified</span>)}
              </div>
            </>
          )}
          <div>
            <strong className="block">Salary:</strong>{" "}
            {formData.salaryMin || formData.salaryMax ? (
              <>
                {formData.salaryMin || "N/A"} - {formData.salaryMax || "N/A"} {formData.currency} {formData.period}
              </>
            ) : (
              <span className="text-[#5C5470]">Not specified</span>
            )}
          </div>
          <div>
            <strong className="block">Experience:</strong> {formData.experienceLevel}
          </div>
          <div>
            <strong className="block">Education:</strong> {formData.educationLevel}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#DBD8E3]">
          <strong className="block mb-1 text-sm">Skills:</strong>
          <div className="flex flex-wrap gap-2">
            {formData.skills.length > 0 ? (
              formData.skills.map((skill) => (
                <span key={skill.value} className="px-2.5 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: "#DBD8E3", color: "#2A2438" }}>
                  {skill.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-[#5C5470]">None specified</span>
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#DBD8E3]">
          <strong className="block mb-1 text-sm">Job Description:</strong>
          <p className="text-sm whitespace-pre-wrap p-3 rounded-md border" style={{ backgroundColor: "#FFFFFF", borderColor: "#DBD8E3", color: "#2A2438" }}>
            {formData.jobDescription || (<span className="text-[#5C5470]">Not specified</span>)}
          </p>
        </div>
        {formData.screeningQuestions.filter((q) => q.trim()).length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#DBD8E3]">
            <strong className="block mb-1 text-sm">Screening Questions:</strong>
            <ul className="list-decimal list-inside space-y-1 pl-4">
              {formData.screeningQuestions.map((q, index) =>
                q.trim() && (<li key={index} className="text-sm">{q}</li>)
              )}
            </ul>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-[#DBD8E3]">
          <strong className="block mb-1 text-sm">Custom Application Form:</strong>
          <ul className="list-disc pl-6 space-y-2">
            {customFormQuestions.filter(q => q.enabled).map(q => (
              <li key={q.id} className="text-sm">
                <span className="font-medium">{q.label}:</span>{" "}
                {customFormAnswers[q.id] ? (
                  <span>{customFormAnswers[q.id]}</span>
                ) : (
                  <span className="text-[#5C5470] italic">Not answered</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab; 