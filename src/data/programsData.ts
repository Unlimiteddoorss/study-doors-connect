
import { Program } from './universityPrograms';

export interface ProgramInfo {
  id: number;
  title: string;
  university: string;
  location: string;
  degree: string;
  duration: string;
  language: string[];
  fee: number;
  discount?: number;
  isFeatured?: boolean;
  description?: string;
  requirements?: string[];
  opportunities?: string[];
}

export const availableCountries = [
  { value: "turkey", label: "تركيا" },
  { value: "cyprus", label: "قبرص" },
  { value: "malaysia", label: "ماليزيا" },
  { value: "egypt", label: "مصر" },
  { value: "hungary", label: "المجر" },
  { value: "poland", label: "بولندا" },
  { value: "czechRepublic", label: "التشيك" },
  { value: "syria", label: "سوريا" }
];

// Function to convert Program to ProgramInfo format
export const convertToProgramInfo = (programs: Program[]): ProgramInfo[] => {
  return programs.map(program => ({
    id: program.id,
    title: program.name,
    university: program.university,
    location: program.country,
    degree: program.degree,
    duration: program.duration,
    language: program.languages,
    fee: program.tuitionFee,
    discount: program.discount,
    isFeatured: program.isFeatured,
    description: program.description,
    requirements: program.requirements,
    opportunities: program.careerOpportunities
  }));
};
