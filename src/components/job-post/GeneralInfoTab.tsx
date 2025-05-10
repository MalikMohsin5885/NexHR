import React from 'react';
import Select, { MultiValue, ActionMeta, StylesConfig } from "react-select";
import CreatableSelect from 'react-select/creatable';
import { OptionType } from "../../data/formData";

interface GeneralInfoTabProps {
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
    skills: MultiValue<OptionType>;
    jobDescription: string;
    deadline: string | null;
    requirements: string | null;
  };
  validationErrors: Record<string, string>;
  isClient: boolean;
  states: OptionType[];
  cities: OptionType[];
  countryOptions: OptionType[];
  jobCategoryOptions: OptionType[];
  skillsOptions: OptionType[];
  selectStyles: StylesConfig<OptionType, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, selectedOption: OptionType | MultiValue<OptionType> | null) => void;
  handleSkillsChange: (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
}

const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({
  formData,
  validationErrors,
  isClient,
  states,
  cities,
  countryOptions,
  jobCategoryOptions,
  skillsOptions,
  selectStyles,
  handleInputChange,
  handleSelectChange,
  handleSkillsChange,
}) => {
  return (
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
      {/* Deadline */}
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium mb-1">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
          style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
        />
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
          ) : (
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
      {/* Requirements */}
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium mb-1">
          Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={4}
          value={formData.requirements || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#352F44] focus:border-[#352F44] transition duration-150 ease-in-out"
          style={{ borderColor: "#DBD8E3", backgroundColor: "#FFFFFF", color: "#2A2438" }}
          placeholder="List the requirements for this job..."
        />
      </div>
    </div>
  );
};

export default GeneralInfoTab; 