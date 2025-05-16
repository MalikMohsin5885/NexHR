import { useState } from "react";
import { MapPin, Briefcase, Clock, DollarSign, Calendar, Users, ChevronDown, ChevronUp, Bookmark, Share2 } from "lucide-react";

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
  applicants: number;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
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
  applicants: 42,
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
  ],
  benefits: [
    "Competitive salary and equity package",
    "Remote-first work environment",
    "Flexible working hours",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Professional development budget"
  ]
};

// JobDetail component
export default function JobDetail() {
  const [activeTab, setActiveTab] = useState<string>("description");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const displayedDescription = showFullDescription 
    ? jobData.description 
    : jobData.description.length > 150 
      ? jobData.description.substring(0, 150) + "..." 
      : jobData.description;
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mr-4">
              <img
                src={jobData.companyLogo}
                alt={`${jobData.company} logo`}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{jobData.title}</h1>
              <p className="text-lg text-gray-600">{jobData.company}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={16} className="mr-1 text-indigo-500" />
                  {jobData.location}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <DollarSign size={16} className="mr-1 text-green-500" />
                  {jobData.salary}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Briefcase size={16} className="mr-1 text-blue-500" />
                  {jobData.jobType}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleToggleBookmark}
              className={`p-2 rounded-full ${isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}
            >
              <Bookmark size={20} className={isBookmarked ? "fill-yellow-500" : ""} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 text-gray-500">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-indigo-50 p-4 rounded-lg flex flex-col items-center">
            <Clock size={24} className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Posted</p>
            <p className="font-medium">{jobData.postedDate}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg flex flex-col items-center">
            <Calendar size={24} className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium">{jobData.applicationDeadline}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg flex flex-col items-center">
            <Users size={24} className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Applicants</p>
            <p className="font-medium">{jobData.applicants}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "description"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "requirements"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            Requirements
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "benefits"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("benefits")}
          >
            Benefits
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "description" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
              <p className="text-gray-600 mb-4">{displayedDescription}</p>
              {jobData.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center text-indigo-600 font-medium mb-6"
                >
                  {showFullDescription ? (
                    <>
                      Show Less <ChevronUp size={16} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown size={16} className="ml-1" />
                    </>
                  )}
                </button>
              )}
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h3>
              <ul className="list-none space-y-2 mb-6">
                {jobData.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="min-w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === "requirements" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
              <ul className="list-none space-y-3">
                {jobData.requirements.map((item, index) => (
                  <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <div className="min-w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === "benefits" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobData.benefits.map((benefit, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                        ✓
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}