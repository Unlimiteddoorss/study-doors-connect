
import { ProgramInfo } from "./programsData";

// Export the UniversityProgram type with additional properties
export interface UniversityProgram extends ProgramInfo {
  degree: string;
  campus: string;
  discountedFee: number;
  nameAr: string;
  tuitionFee: number;
  depositFee: number;
  prepFee: number;
  available: boolean;
}

// Function to get programs for a specific university
export const getUniversityPrograms = (universityId: number): UniversityProgram[] => {
  // Sample programs data - in a real application this would be fetched from an API
  const allPrograms: UniversityProgram[] = [
    {
      id: 201,
      name: "Computer Engineering",
      name_ar: "هندسة الحاسوب",
      nameAr: "هندسة الحاسوب",
      university: "Istanbul Technical University",
      university_id: 1,
      degree_type: "Bachelor",
      degree: "Bachelor",
      duration: 4,
      tuition_fee: 6000,
      tuitionFee: 6000,
      discountedFee: 5400,
      depositFee: 500,
      prepFee: 1000,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      campus: "Main Campus",
      is_popular: true,
      has_scholarship: true,
      available: true,
      description: "A comprehensive program focusing on computer systems, software development, and IT infrastructure.",
      university_image: "/images/universities/istanbul-technical-university.jpg"
    },
    {
      id: 202,
      name: "Mechanical Engineering",
      name_ar: "الهندسة الميكانيكية",
      nameAr: "الهندسة الميكانيكية",
      university: "Istanbul Technical University",
      university_id: 1,
      degree_type: "Bachelor",
      degree: "Bachelor",
      duration: 4,
      tuition_fee: 5800,
      tuitionFee: 5800,
      discountedFee: 5800,
      depositFee: 500,
      prepFee: 1000,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      campus: "Engineering Campus",
      is_popular: false,
      has_scholarship: false,
      available: true,
      description: "Study of design, analysis, manufacturing, and maintenance of mechanical systems.",
      university_image: "/images/universities/istanbul-technical-university.jpg"
    },
    {
      id: 203,
      name: "Computer Science",
      name_ar: "علوم الحاسوب",
      nameAr: "علوم الحاسوب",
      university: "Bilkent University",
      university_id: 2,
      degree_type: "Bachelor",
      degree: "Bachelor",
      duration: 4,
      tuition_fee: 12000,
      tuitionFee: 12000,
      discountedFee: 10800,
      depositFee: 800,
      prepFee: 1500,
      language: "English",
      country: "Turkey",
      city: "Ankara",
      campus: "Main Campus",
      is_popular: true,
      has_scholarship: true,
      available: true,
      description: "Focus on algorithms, programming languages, and computational theories.",
      university_image: "/images/universities/bilkent-university.jpg"
    },
    {
      id: 204,
      name: "Electrical Engineering",
      name_ar: "الهندسة الكهربائية",
      nameAr: "الهندسة الكهربائية",
      university: "Middle East Technical University",
      university_id: 3,
      degree_type: "Bachelor",
      degree: "Bachelor",
      duration: 4,
      tuition_fee: 5500,
      tuitionFee: 5500,
      discountedFee: 4950,
      depositFee: 400,
      prepFee: 900,
      language: "English",
      country: "Turkey",
      city: "Ankara",
      campus: "Engineering Campus",
      is_popular: false,
      has_scholarship: true,
      available: true,
      description: "Study of electricity, electronics, and electromagnetism.",
      university_image: "/images/universities/middle-east-technical-university.jpg"
    },
    {
      id: 205,
      name: "Civil Engineering",
      name_ar: "الهندسة المدنية",
      nameAr: "الهندسة المدنية",
      university: "Boğaziçi University",
      university_id: 5,
      degree_type: "Bachelor",
      degree: "Bachelor",
      duration: 4,
      tuition_fee: 5300,
      tuitionFee: 5300,
      discountedFee: 5300,
      depositFee: 400,
      prepFee: 800,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      campus: "South Campus",
      is_popular: false,
      has_scholarship: false,
      available: false,
      description: "Study of design, construction, and maintenance of the physical and built environment.",
      university_image: "/images/universities/bogazici-university.jpg"
    }
  ];
  
  // Filter programs for the specified university
  return allPrograms.filter(program => program.university_id === universityId);
};

// Export available degrees as string array
export const availableDegrees = [
  "Bachelor",
  "Master", 
  "PhD",
  "Diploma"
];

// Export available languages as string array
export const availableLanguages = [
  "English",
  "Turkish",
  "Arabic", 
  "German"
];
