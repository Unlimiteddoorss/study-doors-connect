
import { ProgramInfo } from "./programsData";

// Export the UniversityProgram type
export interface UniversityProgram extends ProgramInfo {}

// Function to get programs for a specific university
export const getUniversityPrograms = (universityId: number): ProgramInfo[] => {
  // Sample programs data - in a real application this would be fetched from an API
  const allPrograms: ProgramInfo[] = [
    {
      id: 201,
      name: "Computer Engineering",
      name_ar: "هندسة الحاسوب",
      university: "Istanbul Technical University",
      university_id: 1,
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 6000,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      is_popular: true,
      has_scholarship: true,
      description: "A comprehensive program focusing on computer systems, software development, and IT infrastructure.",
      university_image: "/images/universities/istanbul-technical-university.jpg"
    },
    {
      id: 202,
      name: "Mechanical Engineering",
      name_ar: "الهندسة الميكانيكية",
      university: "Istanbul Technical University",
      university_id: 1,
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 5800,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      is_popular: false,
      has_scholarship: false,
      description: "Study of design, analysis, manufacturing, and maintenance of mechanical systems.",
      university_image: "/images/universities/istanbul-technical-university.jpg"
    },
    {
      id: 203,
      name: "Computer Science",
      name_ar: "علوم الحاسوب",
      university: "Bilkent University",
      university_id: 2,
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 12000,
      language: "English",
      country: "Turkey",
      city: "Ankara",
      is_popular: true,
      has_scholarship: true,
      description: "Focus on algorithms, programming languages, and computational theories.",
      university_image: "/images/universities/bilkent-university.jpg"
    },
    {
      id: 204,
      name: "Electrical Engineering",
      name_ar: "الهندسة الكهربائية",
      university: "Middle East Technical University",
      university_id: 3,
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 5500,
      language: "English",
      country: "Turkey",
      city: "Ankara",
      is_popular: false,
      has_scholarship: true,
      description: "Study of electricity, electronics, and electromagnetism.",
      university_image: "/images/universities/middle-east-technical-university.jpg"
    },
    {
      id: 205,
      name: "Civil Engineering",
      name_ar: "الهندسة المدنية",
      university: "Boğaziçi University",
      university_id: 5,
      degree_type: "Bachelor",
      duration: 4,
      tuition_fee: 5300,
      language: "English",
      country: "Turkey",
      city: "Istanbul",
      is_popular: false,
      has_scholarship: false,
      description: "Study of design, construction, and maintenance of the physical and built environment.",
      university_image: "/images/universities/bogazici-university.jpg"
    }
  ];
  
  // Filter programs for the specified university
  return allPrograms.filter(program => program.university_id === universityId);
};

// Export available degrees
export const availableDegrees = [
  { value: "bachelor", label: "بكالوريوس" },
  { value: "master", label: "ماجستير" },
  { value: "phd", label: "دكتوراه" },
  { value: "diploma", label: "دبلوم" }
];

// Export available languages
export const availableLanguages = [
  { value: "english", label: "الإنجليزية" },
  { value: "turkish", label: "التركية" },
  { value: "arabic", label: "العربية" },
  { value: "german", label: "الألمانية" }
];
