import { useState } from "react";
import { MapPin, Briefcase, Clock, DollarSign, Calendar, ChevronDown, ChevronUp } from "lucide-react";

// Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  jobType: string;
  postedDate: string;
  applicationDeadline: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

// Sample job data
const jobData: Job = {
  id: "job-123",
  title: "Senior Frontend Developer",
  company: "TechVision Inc.",
  companyLogo: "/api/placeholder/64/64",
  location: "San Francisco, CA (Remote)",
  salary: "$120,000 - $150,000",
  jobType: "Full-time",
  postedDate: "3 days ago",
  applicationDeadline: "June 15, 2025",
  experience: "3+ years",
  description: "We're seeking a talented Senior Frontend Developer to join our innovative team. In this role, you'll be responsible for building exceptional user experiences using modern frameworks like React. You'll collaborate with designers and backend developers to create responsive, scalable applications that delight our users.",
  responsibilities: [
    "Develop and maintain frontend applications using React, TypeScript and modern web technologies",
    "Collaborate with UX/UI designers to implement intuitive user interfaces",
    "Write clean, maintainable code following best practices and coding standards",
    "Participate in code reviews and contribute to technical discussions",
    "Optimize applications for maximum speed and scalability"
  ],
  requirements: [
    "3+ years of experience with React and TypeScript",
    "Strong understanding of frontend fundamentals (HTML, CSS, JavaScript)",
    "Experience with responsive design and cross-browser compatibility",
    "Knowledge of state management solutions (Redux, Context API)",
    "Familiarity with testing frameworks like Jest and React Testing Library"
  ]
};

// JobDetail component
export default function JobDetail() {
  const [activeTab, setActiveTab] = useState<string>("description");
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  
  const displayedDescription = showFullDescription 
    ? jobData.description 
    : jobData.description.length > 150 
      ? jobData.description.substring(0, 150) + "..." 
      : jobData.description;
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Job Details */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-[#dbd8e3] rounded-xl overflow-hidden flex items-center justify-center">
              <img
                // src={jobData.companyLogo}
                src='/images/company-logo.png'
                alt={`${jobData.company} logo`}
                className="object-cover w-12 h-12"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#352f44] mb-2">{jobData.title}</h1>
              <p className="text-xl text-gray-600">{jobData.company}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center text-gray-600">
              <MapPin size={20} className="mr-3 text-[#352f44]" />
              <span className="text-lg">{jobData.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign size={20} className="mr-3 text-[#352f44]" />
              <span className="text-lg">{jobData.salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase size={20} className="mr-3 text-[#352f44]" />
              <span className="text-lg">{jobData.jobType}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-[#dbd8e3] p-5 rounded-xl">
              <div className="flex items-center space-x-3">
                <Clock size={24} className="text-[#352f44]" />
                <div>
                  <p className="text-sm text-gray-600">Posted</p>
                  <p className="font-medium text-[#352f44]">{jobData.postedDate}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#dbd8e3] p-5 rounded-xl">
              <div className="flex items-center space-x-3">
                <Calendar size={24} className="text-[#352f44]" />
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-medium text-[#352f44]">{jobData.applicationDeadline}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="w-full bg-[#352f44] hover:bg-[#2a2535] text-white font-medium py-3 px-8 rounded-xl transition-all duration-300">
              Apply Now
            </button>
          </div>
        </div>

        {/* Right Column - Description & Requirements */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="flex border-b">
            <button
              className={`flex-1 py-5 px-6 text-center font-medium text-lg transition-all duration-300 ${
                activeTab === "description"
                  ? "text-[#352f44] border-b-2 border-[#352f44]"
                  : "text-gray-500 hover:text-[#352f44]"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`flex-1 py-5 px-6 text-center font-medium text-lg transition-all duration-300 ${
                activeTab === "requirements"
                  ? "text-[#352f44] border-b-2 border-[#352f44]"
                  : "text-gray-500 hover:text-[#352f44]"
              }`}
              onClick={() => setActiveTab("requirements")}
            >
              Requirements
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-bold text-[#352f44] mb-6">Job Description</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{displayedDescription}</p>
                {jobData.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="flex items-center text-[#352f44] font-medium mb-8 hover:opacity-80 transition-opacity"
                  >
                    {showFullDescription ? (
                      <>
                        Show Less <ChevronUp size={18} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Read More <ChevronDown size={18} className="ml-1" />
                      </>
                    )}
                  </button>
                )}
                
                <h3 className="text-xl font-semibold text-[#352f44] mb-4">Responsibilities</h3>
                <ul className="space-y-4">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start bg-[#dbd8e3] p-4 rounded-xl">
                      <div className="min-w-8 h-8 bg-[#352f44] rounded-full flex items-center justify-center text-white font-medium text-sm mr-4">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === "requirements" && (
              <div>
                <h2 className="text-2xl font-bold text-[#352f44] mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start bg-[#dbd8e3] p-4 rounded-xl">
                      <div className="min-w-8 h-8 bg-[#352f44] rounded-full flex items-center justify-center text-white font-medium text-sm mr-4">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}