
// Define the UniversityProgram type
export interface UniversityProgram {
  id: number;
  name: string;
  nameAr: string;
  degree: string;
  language: string;
  campus: string;
  duration: string;
  available: boolean;
  tuitionFee: number;
  discountedFee: number;
  cashPaymentFee?: number;
  depositFee: number;
  prepFee: number;
  universityId: number;
}

// Sample university programs for testing
const sampleUniversityPrograms: UniversityProgram[] = [
  {
    id: 1,
    name: "Computer Engineering (English)",
    nameAr: "هندسة الكومبيوتر (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Main Campus",
    duration: "4 years",
    available: true,
    tuitionFee: 9000,
    discountedFee: 8000,
    cashPaymentFee: 7500,
    depositFee: 1000,
    prepFee: 4000,
    universityId: 1
  },
  {
    id: 2,
    name: "Business Administration (English)",
    nameAr: "إدارة الأعمال (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Main Campus",
    duration: "4 years",
    available: true,
    tuitionFee: 8000,
    discountedFee: 7000,
    depositFee: 1000,
    prepFee: 3500,
    universityId: 1
  },
  {
    id: 3,
    name: "Medicine (English)",
    nameAr: "الطب (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Medical Campus",
    duration: "6 years",
    available: false,
    tuitionFee: 15000,
    discountedFee: 13500,
    depositFee: 2000,
    prepFee: 5000,
    universityId: 1
  }
];

// Import specific university program data
import { gelisimUniversityPrograms } from './universityGelisimPrograms';

// Function to get programs for a specific university
export const getUniversityPrograms = (universityId: number): UniversityProgram[] => {
  // Check if the universityId is for Istanbul Gelisim University (id: 12)
  if (universityId === 12) {
    return gelisimUniversityPrograms;
  }
  
  // For other universities, return sample data filtered by university ID
  // In a real app, you would fetch this from an API or database
  return sampleUniversityPrograms.filter(program => program.universityId === universityId);
};
