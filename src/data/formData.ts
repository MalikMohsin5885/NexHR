// Define a reusable type for dropdown options
export interface OptionType {
    value: string;
    label: string;
  }
  
  // Type for the structure of country data
  export interface CountryDataType {
    [countryCode: string]: { // e.g., 'USA', 'Pakistan'
      states: {
        [stateName: string]: string[]; // e.g., 'California': ['Los Angeles', ...]
      };
    };
  }
  
  // Export Job Categories with the OptionType
  export const jobCategories: OptionType[] = [
    { value: "it", label: "IT/Software Development" },
    { value: "marketing", label: "Marketing & Sales" },
    { value: "design", label: "Design & Creative" },
    { value: "finance", label: "Finance & Accounting" },
    { value: "hr", label: "Human Resources" },
    { value: "customer_service", label: "Customer Service" },
    { value: "engineering", label: "Engineering" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "admin", label: "Administrative" },
    { value: "architecture", label: "Architecture/Interior Design" },
    { value: "construction", label: "Construction/Civil Engineering" },
    { value: "legal", label: "Legal" },
    { value: "logistics", label: "Logistics/Supply Chain" },
    { value: "manufacturing", label: "Manufacturing/Production" },
    { value: "media", label: "Media/Communications" },
    { value: "ngo", label: "NGO/Non-profit" },
    { value: "retail", label: "Retail/Wholesale" },
    { value: "tourism", label: "Tourism/Hospitality" },
    { value: "other", label: "Other" },
  ];
  
  // Export Technical Skills with the OptionType
  export const technicalSkillsOptions: OptionType[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "java", label: "Java" },
    { value: "spring", label: "Spring Boot" },
    { value: "csharp", label: "C#" },
    { value: ".net", label: ".NET" },
    { value: "php", label: "PHP" },
    { value: "laravel", label: "Laravel" },
    { value: "ruby", label: "Ruby" },
    { value: "rails", label: "Ruby on Rails" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "android", label: "Android Development" },
    { value: "ios", label: "iOS Development" },
    { value: "sql", label: "SQL" },
    { value: "mysql", label: "MySQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "Google Cloud Platform" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "tailwindcss", label: "Tailwind CSS" },
    { value: "typescript", label: "TypeScript" },
    { value: "git", label: "Git" },
    { value: "jira", label: "Jira" },
    { value: "agile", label: "Agile Methodologies" },
    { value: "scrum", label: "Scrum" },
    { value: "photoshop", label: "Adobe Photoshop" },
    { value: "illustrator", label: "Adobe Illustrator" },
    { value: "aftereffects", label: "Adobe After Effects" },
    { value: "premierepro", label: "Adobe Premiere Pro" },
    { value: "figma", label: "Figma" },
    { value: "sketch", label: "Sketch" },
    { value: "autocad", label: "AutoCAD" },
    { value: "revit", label: "Revit" },
    { value: "solidworks", label: "SolidWorks" },
    { value: "blender", label: "Blender" },
    { value: "maya", label: "Autodesk Maya" },
    { value: "3dsmax", label: "Autodesk 3ds Max" },
    { value: "cplusplus", label: "C++" },
    { value: "linux", label: "Linux" },
    { value: "selenium", label: "Selenium" },
    { value: "testing", label: "Software Testing" },
    { value: "networking", label: "Networking" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "datascience", label: "Data Science" },
    { value: "machinelearning", label: "Machine Learning" },
    { value: "tensorflow", label: "TensorFlow" },
    { value: "pytorch", label: "PyTorch" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "powerbi", label: "Power BI" },
    { value: "tableau", label: "Tableau" },
    { value: "sap", label: "SAP" },
    { value: "oracle", label: "Oracle" },
    { value: "salesforce", label: "Salesforce" },
    { value: "projectmanagement", label: "Project Management" },
    { value: "communication", label: "Communication Skills" },
    { value: "teamwork", label: "Teamwork" },
    { value: "problemsolving", label: "Problem Solving" },
    { value: "t-sql", label: "T-SQL" },
    { value: "coreldraw", label: "CorelDRAW" },
    { value: "swiftui", label: "SwiftUI" },
    { value: "symfony", label: "Symfony" },
    { value: "vuejs", label: "Vue.js" },
    { value: "angular", label: "Angular" },
  ];
  
  // Export Country Data with the specific CountryDataType
  export const countryData: CountryDataType = {
    USA: {
      states: {
        California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
        Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
        NewYork: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
        Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg"],
        Illinois: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
      },
    },
    Pakistan: {
      states: {
        Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha", "Okara", "Pakpattan", "Pasrur"],
        Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas"],
        KPK: ["Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat", "Dera Ismail Khan"],
        Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman"],
        Islamabad: ["Islamabad"],
        AzadKashmir: ["Muzaffarabad", "Mirpur", "Kotli"],
        GilgitBaltistan: ["Gilgit", "Skardu", "Chilas"],
      },
    },
    India: {
      states: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
        Delhi: ["New Delhi"],
        Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
        TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        UttarPradesh: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Ghaziabad"],
        Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Pathankot", "Nurmahal", "Patti", "Chandigarh"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
        WestBengal: ["Kolkata", "Howrah", "Asansol", "Siliguri"],
      },
    },
    Canada: {
      states: {
        Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "Brampton", "London"],
        Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
        BritishColumbia: ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond"],
        Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
        Manitoba: ["Winnipeg", "Brandon"],
      },
    },
    Australia: {
      states: {
        NewSouthWales: ["Sydney", "Newcastle", "Wollongong", "Central Coast"],
        Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
        Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns"],
        WesternAustralia: ["Perth", "Mandurah", "Bunbury"],
        SouthAustralia: ["Adelaide"],
      },
    },
    UnitedKingdom: {
      states: {
        England: ["London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Leeds", "Sheffield"],
        Scotland: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"],
        Wales: ["Cardiff", "Swansea", "Newport"],
        NorthernIreland: ["Belfast", "Derry"],
      },
    },
    Germany: {
      states: {
        Berlin: ["Berlin"],
        Bavaria: ["Munich", "Nuremberg", "Augsburg"],
        Hamburg: ["Hamburg"],
        NorthRhineWestphalia: ["Cologne", "Düsseldorf", "Dortmund", "Essen"],
        BadenWürttemberg: ["Stuttgart", "Mannheim", "Karlsruhe"],
      }
    },
    France: {
      states: {
        Ile_de_France: ["Paris", "Versailles", "Boulogne-Billancourt"],
        Provence_Alpes_Cote_dAzur: ["Marseille", "Nice", "Toulon"],
        Auvergne_Rhone_Alpes: ["Lyon", "Grenoble", "Saint-Étienne"],
        Hauts_de_France: ["Lille", "Amiens", "Roubaix"],
      }
    },
    // Add more countries as needed
  };
  
  