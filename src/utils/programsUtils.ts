
import { ProgramInfo } from '@/data/programsData';

// Helper function to normalize program data structure
export const normalizeProgram = (program: any): ProgramInfo => {
  return {
    id: program.id,
    name: program.name || program.title,
    name_ar: program.name_ar || program.nameAr,
    university: program.university,
    university_id: program.university_id,
    degree_type: program.degree_type || program.degreeType,
    duration: typeof program.duration === 'string' 
      ? parseInt(program.duration.split(' ')[0]) 
      : program.duration,
    tuition_fee: typeof program.tuition_fee === 'number' 
      ? program.tuition_fee 
      : typeof program.fee === 'string' 
        ? parseInt(program.fee.replace(/[^0-9]/g, ''))
        : program.fee,
    language: program.language,
    country: program.country || (program.location ? program.location.split(',')[1].trim() : ''),
    city: program.city || (program.location ? program.location.split(',')[0].trim() : ''),
    is_popular: program.is_popular || program.isPopular || program.isFeatured,
    has_scholarship: program.has_scholarship || program.scholarshipAvailable,
    description: program.description,
    university_image: program.university_image || program.image,
  };
};

// Helper function to handle program field access regardless of the data structure
export const getFieldValue = (program: any, field: string): string | number | boolean => {
  switch (field) {
    case 'name':
      return program.name || program.title || '';
    case 'title':
      return program.title || program.name || '';
    case 'name_ar':
      return program.name_ar || program.nameAr || '';
    case 'nameAr':
      return program.nameAr || program.name_ar || '';
    case 'location':
      return program.location || `${program.city}, ${program.country}` || '';
    case 'university_image':
      return program.university_image || program.image || '';
    case 'image':
      return program.image || program.university_image || '';
    case 'is_popular':
      return program.is_popular || program.isPopular || program.isFeatured || false;
    case 'has_scholarship':
      return program.has_scholarship || program.scholarshipAvailable || false;
    case 'tuition_fee':
      return typeof program.tuition_fee === 'number' 
        ? program.tuition_fee 
        : typeof program.fee === 'string' 
          ? parseInt(program.fee.replace(/[^0-9]/g, ''))
          : program.fee || 0;
    case 'fee':
      return program.fee || program.tuition_fee || 0;
    default:
      return program[field] !== undefined ? program[field] : '';
  }
};
