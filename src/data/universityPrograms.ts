
export interface UniversityProgram {
  id: number;
  name: string;
  nameAr: string;
  language: string;
  campus: string;
  degree: "Bachelor" | "Master" | "PhD" | "Diploma" | "Vocational School";
  duration: string;
  available: boolean;
  tuitionFee: number;
  discountedFee: number;
  cashPaymentFee: number;
  depositFee: number;
  prepFee: number;
  universityId?: number;
}

import { gelisimPrograms } from "./universities/gelisimPrograms";

// تصدير القيم للبحث والتصفية
export const availableDegrees = ["Bachelor", "Master", "PhD", "Diploma", "Vocational School"];
export const availableLanguages = ["English", "Turkish", "Arabic"];

export const getUniversityPrograms = (universityId: number): UniversityProgram[] => {
  switch(universityId) {
    case 5: // Gelisim University
      return gelisimPrograms;
    default:
      return [];
  }
};

