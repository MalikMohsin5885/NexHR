import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import Select, { MultiValue, ActionMeta, StylesConfig } from "react-select";
import DashboardLayout from '@/layouts/DashboardLayout';
import CreatableSelect from 'react-select/creatable';

import {
  countryData,
  jobCategories,
  technicalSkillsOptions,
  OptionType,
} from "../data/formData";

// --- Helper Types ---
interface FormData {
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
  skills: MultiValue<OptionType>;
  jobDescription: string;
  applicationDeadline: string;
  experienceLevel: string;
  educationLevel: string;
  screeningQuestions: string[];
}

// Type for validation errors
type ValidationErrors = Partial<Record<keyof FormData, string>>;

// --- Step Progress Bar Component ---
interface StepProgressBarProps {
  currentStep: number;
  steps: string[];
  reviewCompleted?: boolean;
}
const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  steps,
  reviewCompleted = false,
}) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center justify-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          let isCompleted = stepIndex < currentStep;
          let isCurrent = stepIndex === currentStep;
          // For the review step (step 3), if reviewCompleted is true, mark it as completed.
          if (stepIndex === 3 && reviewCompleted) {
            isCompleted = true;
            isCurrent = false;
          }
          return (
            <li key={step} className="flex items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 w-8 sm:w-16 md:w-24 ${isCompleted || isCurrent ? "bg-[#352F44]" : "bg-[#DBD8E3]"
                    }`}
                />
              )}
              <div
                className={`relative flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full ${isCompleted
                  ? "bg-[#352F44]"
                  : isCurrent
                    ? "border-2 border-[#352F44] bg-white"
                    : "border-2 border-[#DBD8E3] bg-white"
                  }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span
                    className={`text-xs sm:text-sm font-medium ${isCurrent ? "text-[#352F44]" : "text-[#5C5470]"
                      }`}
                  >
                    {stepIndex}
                  </span>
                )}
              </div>
              <span
                className={`ml-2 text-xs sm:text-sm font-medium ${isCurrent ? "text-[#352F44]" : "text-[#5C5470]"
                  }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// --- react-select custom styles for visibility ---
const selectStyles: StylesConfig<OptionType, boolean> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderColor: "#DBD8E3",
    color: "#2A2438",
    "&:hover": { borderColor: "#DBD8E3" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#2A2438",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5C5470",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#F2F1F7",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#DBD8E3" : state.isFocused ? "#F2F1F7" : "#FFFFFF",
    color: "#2A2438",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#DBD8E3",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#2A2438",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#2A2438",
    "&:hover": {
      backgroundColor: "#5C5470",
      color: "white",
    },
  }),
};

// --- Main Job Post Form Component ---
const JobPostForm: React.FC = () => {
  // --- Main Job Post State Initialization ---
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    jobCategory: null,
    jobType: "Full-time",
    locationType: "On-site",
    country: null,
    state: null,
    city: null,
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    period: "Monthly",
    skills: [],
    jobDescription: "",
    applicationDeadline: "",
    experienceLevel: "",
    educationLevel: "",
    screeningQuestions: [""],
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [states, setStates] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);
  const [isClient, setIsClient] = useState(false);

  // --- Candidate Application Form State ---
  const [candidateTechSkills, setCandidateTechSkills] = useState<MultiValue<OptionType>>([]);

  // --- State to Trigger Modal and Mark Review as Completed ---
  const [jobPostedModal, setJobPostedModal] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- Validation Function ---
  const validateStep = (): boolean => {
    const errors: ValidationErrors = {};
    if (currentStep === 1) {
      if (!formData.jobTitle.trim()) {
        errors.jobTitle = "Job Title cannot be empty";
      }
      if (!formData.jobCategory) {
        errors.jobCategory = "Job Category is required";
      }
      if (!formData.jobDescription.trim()) {
        errors.jobDescription = "Job Description cannot be empty";
      }
      if (formData.locationType !== "Remote") {
        if (!formData.country) {
          errors.country = "Country is required";
        }
        if (!formData.state) {
          errors.state = "State is required";
        }
        if (!formData.city) {
          errors.city = "City is required";
        }
      }
    } else if (currentStep === 2) {
      // For Workflow tab, require that Experience and Education are selected.
      if (!formData.experienceLevel.trim()) {
        errors.experienceLevel = "Experience Level is required";
      }
      if (!formData.educationLevel.trim()) {
        errors.educationLevel = "Education Level is required";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Form Input Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (validationErrors[name as keyof FormData]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    name: keyof FormData,
    selectedOption: OptionType | MultiValue<OptionType> | null
  ) => {
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (name === "skills") return;
    if (name === "country") {
      const country = selectedOption as OptionType | null;
      setFormData((prev) => ({ ...prev, country, state: null, city: null }));
      if (country && countryData[country.value]) {
        const stateOptions = Object.keys(countryData[country.value].states).map(
          (stateItem) => ({
            value: stateItem,
            label: stateItem,
          })
        );
        setStates(stateOptions);
      } else {
        setStates([]);
      }
      setCities([]);
    } else if (name === "state") {
      const stateVal = selectedOption as OptionType | null;
      setFormData((prev) => ({ ...prev, state: stateVal, city: null }));
      if (stateVal && formData.country && countryData[formData.country.value]) {
        const cityOptions = (
          countryData[formData.country.value].states[stateVal.value] || []
        ).map((city: string) => ({
          value: city,
          label: city,
        }));
        setCities(cityOptions);
      } else {
        setCities([]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: selectedOption }));
    }
  };

  const handleSkillsChange = (
    newValue: MultiValue<OptionType>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _actionMeta: ActionMeta<OptionType>
  ) => {
    setFormData((prev) => ({ ...prev, skills: newValue || [] }));
  };

  const handleScreeningQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...formData.screeningQuestions];
    updatedQuestions[index] = value;
    setFormData((prev) => ({ ...prev, screeningQuestions: updatedQuestions }));
  };

  const addScreeningQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      screeningQuestions: [...prev.screeningQuestions, ""],
    }));
  };

  const removeScreeningQuestion = (index: number) => {
    if (formData.screeningQuestions.length <= 1) return;
    const updatedQuestions = formData.screeningQuestions.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, screeningQuestions: updatedQuestions }));
  };

  // --- Navigation Logic ---
  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // "Post Job" is now triggered only on Step 3.
  const handlePostJob = () => {
    setReviewCompleted(true);
    setJobPostedModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Job Post Submitted Successfully!");
  };

  // --- Memoized Options for Select Dropdowns ---
  const countryOptions = useMemo(
    () =>
      Object.keys(countryData).map((country) => ({
        value: country,
        label: country,
      })),
    []
  );
  const jobCategoryOptions = useMemo(() => jobCategories, []);
  const skillsOptions = useMemo(() => technicalSkillsOptions, []);

  const steps = ["General Info", "Workflow", "Review"];

  return (
    <DashboardLayout>
      <div
        className='container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl rounded-md shadow-lg my-10'
        style={{ backgroundColor: "#FFFFFF", color: "#2A2438" }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Post a New Job
        </h1>

        <StepProgressBar currentStep={currentStep} steps={steps} reviewCompleted={reviewCompleted} />

        <form onSubmit={handleSubmit}>
          {/* Step 1: General Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4 border-[#DBD8E3]">
                General Information
              </h2>
              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
                  style={{
                    borderColor: validationErrors.jobTitle ? "red" : "#DBD8E3",
                    backgroundColor: "#FFFFFF",
                    color: "#2A2438",
                  }}
                  placeholder="e.g., Senior Software Engineer"
                />
                {validationErrors.jobTitle && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.jobTitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobCategory" className="block text-sm font-medium mb-1">
                    Job Category <span className="text-red-500">*</span>
                  </label>
                  {isClient ? (
                    <Select<OptionType>
                      id="jobCategory"
                      name="jobCategory"
                      options={jobCategoryOptions}
                      value={formData.jobCategory}
                      onChange={(option) => handleSelectChange("jobCategory", option)}
                      classNamePrefix="select"
                      placeholder="Select category..."
                      isClearable
                      required
                      styles={{
                        ...selectStyles,
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#FFFFFF",
                          borderColor: validationErrors.jobCategory ? "red" : "#DBD8E3",
                          color: "#2A2438",
                          "&:hover": {
                            borderColor: validationErrors.jobCategory ? "red" : "#DBD8E3",
                          },
                        }),
                      }}
                    />
                  ) : (
                    <div className="w-full h-[42px] rounded-md animate-pulse" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }} />
                  )}
                  {validationErrors.jobCategory && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.jobCategory}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium mb-1">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out h-[42px]"
                    style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                    <option>Internship</option>
                    <option>Volunteer</option>
                  </select>
                </div>
              </div>
              {/* Location Type & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="locationType" className="block text-sm font-medium mb-1">
                    Location Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="locationType"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out h-[42px]"
                    style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                  >
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">
                    Country {formData.locationType !== "Remote" && (<span className="text-red-500">*</span>)}
                  </label>
                  {isClient ? (
                    <Select<OptionType>
                      id="country"
                      name="country"
                      options={countryOptions}
                      value={formData.country}
                      onChange={(option) => handleSelectChange("country", option)}
                      classNamePrefix="select"
                      placeholder="Select country..."
                      isClearable
                      required={formData.locationType !== "Remote"}
                      isDisabled={formData.locationType === "Remote"}
                      styles={{
                        ...selectStyles,
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#FFFFFF",
                          borderColor: validationErrors.country ? "red" : "#DBD8E3",
                          color: "#2A2438",
                          "&:hover": {
                            borderColor: validationErrors.country ? "red" : "#DBD8E3",
                          },
                        }),
                      }}
                    />
                  ) :
                    (
                      <div className="w-full h-[42px] rounded-md animate-pulse" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }} />
                    )}
                  {validationErrors.country && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
                  )}

                </div>
              </div>
              {/* State & City */}
              {formData.locationType !== "Remote" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State/Province {formData.country && (<span className="text-red-500">*</span>)}
                    </label>
                    {isClient ? (
                      <Select<OptionType>
                        id="state"
                        name="state"
                        options={states}
                        value={formData.state}
                        onChange={(option) => handleSelectChange("state", option)}
                        classNamePrefix="select"
                        placeholder="Select state..."
                        isClearable
                        isDisabled={!formData.country || states.length === 0}
                        required={!!formData.country}
                        styles={{
                          ...selectStyles,
                          control: (base) => ({
                            ...base,
                            backgroundColor: "#FFFFFF",
                            borderColor: validationErrors.state ? "red" : "#DBD8E3",
                            color: "#2A2438",
                            "&:hover": {
                              borderColor: validationErrors.state ? "red" : "#DBD8E3",
                            },
                          }),
                        }}
                      />
                    ) : (
                      <div className="w-full h-[42px] rounded-md animate-pulse" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }} />
                    )}
                    {validationErrors.state && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.state}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City {formData.state && (<span className="text-red-500">*</span>)}
                    </label>
                    {isClient ? (
                      <Select<OptionType>
                        id="city"
                        name="city"
                        options={cities}
                        value={formData.city}
                        onChange={(option) => handleSelectChange("city", option)}
                        classNamePrefix="select"
                        placeholder="Select city..."
                        isClearable
                        isDisabled={!formData.state || cities.length === 0}
                        required={!!formData.state}
                        styles={{
                          ...selectStyles,
                          control: (base) => ({
                            ...base,
                            backgroundColor: "#FFFFFF",
                            borderColor: validationErrors.city ? "red" : "#DBD8E3",
                            color: "#2A2438",
                            "&:hover": {
                              borderColor: validationErrors.city ? "red" : "#DBD8E3",
                            },
                          }),
                        }}
                      />
                    ) : (
                      <div className="w-full h-[42px] rounded-md animate-pulse" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }} />
                    )}
                    {validationErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
                    )}
                  </div>
                </div>
              )}
              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium mb-1">Salary Range (Optional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <div className="sm:col-span-1">
                    <label htmlFor="salaryMin" className="block text-xs font-medium mb-1">Minimum</label>
                    <input
                      type="number"
                      id="salaryMin"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
                      style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                      placeholder="e.g., 50000"
                      min="0"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="salaryMax" className="block text-xs font-medium mb-1">Maximum</label>
                    <input
                      type="number"
                      id="salaryMax"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
                      style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                      placeholder="e.g., 80000"
                      min={formData.salaryMin || "0"}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="currency" className="block text-xs font-medium mb-1">Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out h-[42px]"
                      style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>CAD</option>
                      <option>AUD</option>
                      <option>PKR</option>
                      <option>INR</option>
                    </select>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="period" className="block text-xs font-medium mb-1">Period</label>
                    <select
                      id="period"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out h-[42px]"
                      style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                    >
                      <option>Hourly</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Annually</option>
                    </select>
                  </div>
                </div>
              </div>


              {/*----------------------fix this issue----------------------------*/}
              {/* Technical Skills */}
              {/* <div>
                <label htmlFor="skills" className="block text-sm font-medium mb-1">
                  Required Technical Skills
                </label>

                {isClient ? (
                  <CreatableSelect<OptionType, true>
                    inputId="skills"
                    name="skills"
                    isMulti
                    options={skillsOptions}
                    value={formData.skills}
                    onChange={handleSkillsChange}
                    classNamePrefix="select"
                    placeholder="Select skills or type to add new ones..."
                    formatCreateLabel={(inputValue: string) => `Add "${inputValue}"`}
                    styles={selectStyles}
                  />
                ) : (
                  <div
                    className="w-full h-[42px] rounded-md animate-pulse"
                    style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }}
                  />
                )}


                <p className="mt-1 text-xs text-[#5C5470]">
                  Select multiple skills. If a skill isn&apos;t listed, type it and press Enter.
                </p>
              </div> */}




              {/* Job Description */}
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={6}
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
                  style={{ borderColor: validationErrors.jobDescription ? "red" : "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
                  placeholder="Describe the role, responsibilities, required qualifications, benefits, etc."
                />
                {validationErrors.jobDescription && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.jobDescription}</p>
                )}
              </div>
              {/* Step 1 "Save and Continue" Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#352F44", color: "#FFFFFF" }}
                >
                  Save and Continue
                </button>
              </div>
            </div>

          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Workflow Section */}
              <section className="p-4 rounded-md space-y-6" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }}>
                <h2 className="text-xl font-semibold border-b pb-2 mb-4 border-[#DBD8E3]">Workflow & Details</h2>

                {/* Deadline */}
                <div>
                  <label htmlFor="applicationDeadline" className="block text-sm font-medium mb-1">
                    Application Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                    style={{
                      borderColor: "#DBD8E3",
                      backgroundColor: "#FFFFFF",
                      color: "#2A2438",
                    }}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium mb-1">
                      Required Experience Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md shadow-sm h-[42px]"
                      style={{
                        borderColor: validationErrors.experienceLevel ? "red" : "#DBD8E3",
                        backgroundColor: "#FFFFFF",
                        color: "#2A2438",
                      }}
                    >
                      <option value="">Select experience level</option>
                      <option>Internship</option>
                      <option>Entry-level</option>
                      <option>Associate</option>
                      <option>Mid-level</option>
                      <option>Senior-level</option>
                      <option>Director</option>
                      <option>Executive</option>
                    </select>
                    {validationErrors.experienceLevel && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.experienceLevel}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="educationLevel" className="block text-sm font-medium mb-1">
                      Required Education Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md shadow-sm h-[42px]"
                      style={{
                        borderColor: validationErrors.educationLevel ? "red" : "#DBD8E3",
                        backgroundColor: "#FFFFFF",
                        color: "#2A2438",
                      }}
                    >
                      <option value="">Select education level</option>
                      <option>High School or equivalent</option>
                      <option>Associate Degree</option>
                      <option>a Bachelor Degree</option>
                      <option>a Master Degree</option>
                      <option>Doctorate</option>
                      <option>Professional</option>
                      <option>Not Required</option>
                    </select>
                    {validationErrors.educationLevel && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.educationLevel}</p>
                    )}
                  </div>
                </div>

                {/* Screening Questions */}
                <div>
                  <label className="block text-sm font-medium mb-2">Screening Questions (Optional)</label>
                  <div className="space-y-3">
                    {formData.screeningQuestions.map((question, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => handleScreeningQuestionChange(index, e.target.value)}
                          placeholder={`Question ${index + 1}`}
                          className="flex-grow px-3 py-2 border rounded-md shadow-sm"
                          style={{
                            borderColor: "#DBD8E3",
                            backgroundColor: "#FFFFFF",
                            color: "#2A2438",
                          }}
                        />
                        {formData.screeningQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeScreeningQuestion(index)}
                            className="text-red-500 p-1 rounded-full"
                            title="Remove question"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addScreeningQuestion}
                    className="mt-3 inline-flex items-center px-3 py-1 rounded-md shadow-sm text-sm text-white"
                    style={{ backgroundColor: "#352F44" }}
                  >
                    + Add Question
                  </button>
                </div>
              </section>

              {/* Candidate Application Form */}
              <section className="mt-8 p-4 rounded-md" style={{ backgroundColor: "#F2F1F7", border: "1px solid #DBD8E3" }}>
                <h2 className="mb-4 text-center text-xl font-bold" style={{ color: "#2A2438" }}>
                  Candidate Application Form
                </h2>

                {/* Form Fields (Full Name, Email, Phone, Resume, etc.) */}
                {/* — Keep these as-is or modularize if needed — */}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="py-2 px-6 border rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#2A2438",
                      borderColor: "#DBD8E3",
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2 px-6 border border-transparent rounded-md text-sm font-medium shadow-sm"
                    style={{
                      backgroundColor: "#352F44",
                      color: "#FFFFFF",
                    }}
                  >
                    Save and Continue
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
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
                  {formData.applicationDeadline && (
                    <div>
                      <strong className="block">Deadline:</strong> {formData.applicationDeadline}
                    </div>
                  )}
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
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex justify-center py-2 px-6 border shadow-sm text-sm font-medium rounded-md transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#FFFFFF", color: "#2A2438", borderColor: "#DBD8E3" }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#352F44", color: "#FFFFFF" }}
                  onClick={handlePostJob}
                >
                  Post Job
                </button>
              </div>
            </div>
          )}
        </form>


        {/* Job Posted Modal Dialog */}
        {jobPostedModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-lg">
              <h1 className="text-4xl font-bold text-center mb-4">JOB POSTED!</h1>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setJobPostedModal(false)}
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#352F44", color: "#FFFFFF" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobPostForm;
