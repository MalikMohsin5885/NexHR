import React from 'react';

export interface CustomFormQuestion {
  id: string;
  label: string;
  type: 'text' | 'email' | 'telephone' | 'file' | 'textarea' | 'dropdown' | 'radio' | 'date' | 'education' | 'experience';
  enabled: boolean;
}

interface EducationBlock {
  education_level?: string;
  institution_name?: string;
  degree_detail?: string;
  cgpa?: string;
  start_date?: string;
  description?: string;
}

interface ExperienceBlock {
  experience_level?: string;
  years_of_experience?: string;
  previous_job_titles?: string;
  company_name?: string;
}

export interface CustomFormAnswers {
  [key: string]: string | EducationBlock[] | ExperienceBlock[];
}

interface CustomFormBuilderProps {
  customFormQuestions: CustomFormQuestion[];
  customFormAnswers: CustomFormAnswers;
  showCustomForm: boolean;
  onToggleQuestion: (questionId: string) => void;
  onShowCustomForm: (show: boolean) => void;
  onCustomFormInput?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CustomFormBuilder: React.FC<CustomFormBuilderProps> = ({
  customFormQuestions,
  customFormAnswers,
  showCustomForm,
  onToggleQuestion,
  onShowCustomForm,
  onCustomFormInput,
}) => {
  const enabledQuestions = customFormQuestions.filter(q => q.enabled);

  const educationArr = Array.isArray(customFormAnswers.education) ? customFormAnswers.education : [];
  const experienceArr = Array.isArray(customFormAnswers.experience) ? customFormAnswers.experience : [];

  const handleEducationChange = (idx: number, field: string, value: string) => {
    const updated = [...educationArr];
    updated[idx] = { ...updated[idx], [field]: value };
    if (onCustomFormInput) {
      const event = {
        target: {
          name: 'education',
          value: updated
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onCustomFormInput(event);
    }
  };

  const addEducationBlock = () => {
    const updated = [...educationArr, {}];
    if (onCustomFormInput) {
      const event = {
        target: {
          name: 'education',
          value: updated
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onCustomFormInput(event);
    }
  };

  const handleExperienceChange = (idx: number, field: string, value: string) => {
    const updated = [...experienceArr];
    updated[idx] = { ...updated[idx], [field]: value };
    if (onCustomFormInput) {
      const event = {
        target: {
          name: 'experience',
          value: updated
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onCustomFormInput(event);
    }
  };

  const addExperienceBlock = () => {
    const updated = [...experienceArr, {}];
    if (onCustomFormInput) {
      const event = {
        target: {
          name: 'experience',
          value: updated
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onCustomFormInput(event);
    }
  };

  const getStringValue = (value: string | EducationBlock[] | ExperienceBlock[] | undefined): string => {
    if (typeof value === 'string') return value;
    return '';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Custom Application Form</h3>
      <p className="text-sm text-gray-500">
        Toggle the questions you want to include in your application form
      </p>
      <div className="space-y-4">
        {customFormQuestions
          .filter(question => question.id !== 'applied_at')
          .map((question) => (
            <div key={question.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">{question.label}</h4>
              </div>
              <button
                onClick={() => {
                  onToggleQuestion(question.id);
                  onShowCustomForm(false);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  question.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    question.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
      </div>
      {customFormQuestions.some(q => q.enabled) && !showCustomForm && (
        <button
          className="mt-4 px-6 py-2 rounded-md shadow transition inline-flex justify-center font-medium text-sm border border-transparent"
          style={{ backgroundColor: "#352F44", color: "#FFFFFF" }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#4B3B6A')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#352F44')}
          onClick={() => onShowCustomForm(true)}
          type="button"
        >
          Create
        </button>
      )}
      {showCustomForm && (
        <form
          className="mt-6 space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
          action="#"
          onSubmit={e => {
            e.preventDefault();
            return false;
          }}
        >
          <h4 className="font-semibold text-gray-900 mb-2">Generated Application Form</h4>
          {enabledQuestions
            .filter(q => q.id !== 'applied_at')
            .map(q => (
              <div key={q.id} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor={q.id}>{q.label}</label>
                {q.type === "file" ? (
                  <input
                    type="file"
                    name={q.id}
                    id={q.id}
                    className="border rounded px-3 py-2"
                    onChange={onCustomFormInput}
                  />
                ) : q.type === "textarea" ? (
                  <textarea
                    name={q.id}
                    id={q.id}
                    rows={5}
                    className="border rounded px-3 py-2"
                    style={{ backgroundColor: "#FFFFFF", color: "#2A2438", borderColor: "#DBD8E3" }}
                    value={getStringValue(customFormAnswers[q.id])}
                    onChange={onCustomFormInput}
                  />
                ) : q.type === "dropdown" ? (
                  <select
                    name={q.id}
                    id={q.id}
                    className="border rounded px-3 py-2 text-[#2A2438]"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#DBD8E3" }}
                    value={getStringValue(customFormAnswers[q.id])}
                    onChange={onCustomFormInput}
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Executive Level">Executive Level</option>
                  </select>
                ) : q.type === "radio" ? (
                  <div className="flex gap-6 items-center mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={q.id}
                        value="male"
                        checked={getStringValue(customFormAnswers[q.id]) === 'male'}
                        onChange={onCustomFormInput}
                        className="mr-2"
                      />
                      <span>Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={q.id}
                        value="female"
                        checked={getStringValue(customFormAnswers[q.id]) === 'female'}
                        onChange={onCustomFormInput}
                        className="mr-2"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                ) : q.type === "education" ? (
                  <div className="mb-6 p-4 rounded-lg border bg-white">
                    <h5 className="font-semibold mb-2">Education</h5>
                    {(educationArr.length === 0 ? [{}] : educationArr).map((edu, idx) => (
                      <div key={idx} className="mb-4 p-3 border rounded-md bg-gray-50">
                        <input
                          type="text"
                          name={`education_level_${idx}`}
                          placeholder="Education Level"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={edu.education_level || ""}
                          onChange={e => handleEducationChange(idx, 'education_level', e.target.value)}
                        />
                        <input
                          type="text"
                          name={`institution_name_${idx}`}
                          placeholder="Institution Name"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={edu.institution_name || ""}
                          onChange={e => handleEducationChange(idx, 'institution_name', e.target.value)}
                        />
                        <input
                          type="text"
                          name={`degree_detail_${idx}`}
                          placeholder="Degree Detail"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={edu.degree_detail || ""}
                          onChange={e => handleEducationChange(idx, 'degree_detail', e.target.value)}
                        />
                        <input
                          type="number"
                          step="0.01"
                          name={`cgpa_${idx}`}
                          placeholder="CGPA"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={edu.cgpa || ""}
                          onChange={e => handleEducationChange(idx, 'cgpa', e.target.value)}
                        />
                        <input
                          type="date"
                          name={`start_date_${idx}`}
                          placeholder="Start Date"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={edu.start_date || ""}
                          onChange={e => handleEducationChange(idx, 'start_date', e.target.value)}
                        />
                        <textarea
                          name={`description_${idx}`}
                          placeholder="Description"
                          className="border rounded px-3 py-2 w-full"
                          value={edu.description || ""}
                          onChange={e => handleEducationChange(idx, 'description', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-[#352F44] text-white mt-2"
                      onClick={addEducationBlock}
                    >
                      + Add Education
                    </button>
                  </div>
                ) : q.type === "experience" ? (
                  <div className="mb-6 p-4 rounded-lg border bg-white">
                    <h5 className="font-semibold mb-2">Experience</h5>
                    {(experienceArr.length === 0 ? [{}] : experienceArr).map((exp, idx) => (
                      <div key={idx} className="mb-4 p-3 border rounded-md bg-gray-50">
                        <select
                          name={`experience_level_${idx}`}
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={exp.experience_level || ""}
                          onChange={e => handleExperienceChange(idx, 'experience_level', e.target.value)}
                        >
                          <option value="">Select Experience Level</option>
                          <option value="Entry Level">Entry Level</option>
                          <option value="Mid Level">Mid Level</option>
                          <option value="Senior Level">Senior Level</option>
                          <option value="Executive Level">Executive Level</option>
                        </select>
                        <input
                          type="number"
                          name={`years_of_experience_${idx}`}
                          placeholder="Years of Experience"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={exp.years_of_experience || ""}
                          onChange={e => handleExperienceChange(idx, 'years_of_experience', e.target.value)}
                        />
                        <input
                          type="text"
                          name={`previous_job_titles_${idx}`}
                          placeholder="Previous Job Titles"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={exp.previous_job_titles || ""}
                          onChange={e => handleExperienceChange(idx, 'previous_job_titles', e.target.value)}
                        />
                        <input
                          type="text"
                          name={`company_name_${idx}`}
                          placeholder="Company Name"
                          className="mb-2 border rounded px-3 py-2 w-full"
                          value={exp.company_name || ""}
                          onChange={e => handleExperienceChange(idx, 'company_name', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-[#352F44] text-white mt-2"
                      onClick={addExperienceBlock}
                    >
                      + Add Experience
                    </button>
                  </div>
                ) : (
                  <input
                    type={q.type === "telephone" ? "tel" : q.type}
                    name={q.id}
                    id={q.id}
                    className="border rounded px-3 py-2"
                    value={getStringValue(customFormAnswers[q.id])}
                    onChange={onCustomFormInput}
                  />
                )}
              </div>
            ))}
          <button
            type="submit"
            tabIndex={-1}
            className="w-full mt-2 px-6 py-2 bg-[#352F44] text-white rounded-md shadow hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomFormBuilder; 