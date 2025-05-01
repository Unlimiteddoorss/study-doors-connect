// Add to the existing file - this will setup the Kultur University programs
export interface UniversityProgram {
  id: number | string;
  name: string;
  nameAr: string;
  degree: string;
  language: string;
  campus: string;
  duration?: string;
  tuitionFee: number;
  discountedFee: number;
  depositFee: number;
  prepFee: number;
  available: boolean;
}

// Add available degrees and languages
export const availableDegrees = ["Bachelor", "Master", "PhD", "Doctorate", "Diploma", "Vocational School"];
export const availableLanguages = ["English", "Turkish", "Arabic"];

// Create Istanbul Kultur University programs
const kulturUniversityPrograms: UniversityProgram[] = [
  {
    id: 'ku-english-literature',
    name: 'English Language and Literature',
    nameAr: 'اللغة الإنجليزية وآدابها',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-math-cs',
    name: 'Mathematics and Computer Science',
    nameAr: 'الرياضيات وعلوم الكومبيوتر',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-molecular-biology',
    name: 'Molecular Biology and Genetics',
    nameAr: 'البيولوجيا الجزيئية وعلم الوراثة',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-psychology',
    name: 'Psychology',
    nameAr: 'علم النفس',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-turkish-literature',
    name: 'Turkish Language and Literature',
    nameAr: 'اللغة التركية وآدابها',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-law',
    name: 'Law',
    nameAr: 'الحقوق',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Şirinevler',
    tuitionFee: 12580,
    discountedFee: 6290,
    depositFee: 6290,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-nutrition',
    name: 'Nutrition and Dietetics',
    nameAr: 'التغذية والحمية',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Şirinevler',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-nursing',
    name: 'Nursing',
    nameAr: 'التمريض',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Şirinevler',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-physiotherapy',
    name: 'Physiotherapy and Rehabilitation',
    nameAr: 'العلاج الطبيعي وإعادة التأهيل',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Şirinevler',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-economics',
    name: 'Economics',
    nameAr: 'الاقتصاد',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Küçükçekmece',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-business-eng',
    name: 'Business Administration',
    nameAr: 'إدارة الأعمال',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Küçükçekmece',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-business-tr',
    name: 'Business Administration',
    nameAr: 'إدارة الأعمال',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Küçükçekmece',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-international-relations',
    name: 'International Relations',
    nameAr: 'العلاقات الدولية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Küçükçekmece',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-international-trade-eng',
    name: 'International Trade and Finance',
    nameAr: 'التجارة الدولية والمالية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Küçükçekmece',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-international-trade-tr',
    name: 'International Trade and Finance',
    nameAr: 'التجارة الدولية والمالية',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Küçükçekmece',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-computer-eng',
    name: 'Computer Engineering',
    nameAr: 'هندسة الكومبيوتر',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-electrical-eng',
    name: 'Electrical and Electronics Engineering',
    nameAr: 'هندسة الكهرباء والالكترون',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-industrial-eng',
    name: 'Industrial Engineering',
    nameAr: 'الهندسة الصناعية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-civil-eng',
    name: 'Civil Engineering',
    nameAr: 'الهندسة المدنية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-interior-design-tr',
    name: 'Interior Architecture and Environmental Design',
    nameAr: 'العمارة الداخلية والتصميم البيئي',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-interior-design-eng',
    name: 'Interior Architecture and Environmental Design',
    nameAr: 'العمارة الداخلية والتصميم البيئي',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 7300,
    discountedFee: 3650,
    depositFee: 3650,
    prepFee: 7300,
    available: true
  },
  {
    id: 'ku-architecture',
    name: 'Architecture',
    nameAr: 'هندسة العمارة',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 7500,
    discountedFee: 3750,
    depositFee: 3750,
    prepFee: 7500,
    available: true
  },
  {
    id: 'ku-cartoon-animation',
    name: 'Cartoon and Animation',
    nameAr: 'الكرتون والرسوم المتحركة',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-communication-arts',
    name: 'Communication Arts',
    nameAr: 'فنون التواصل',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-communication-design',
    name: 'Communication Design',
    nameAr: 'تصميم الاتصالات',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-new-media',
    name: 'New Media and Communication',
    nameAr: 'الإعلام الجديد ونظم الاتصال',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-guidance-counseling',
    name: 'Guidance and Psychological Counseling',
    nameAr: 'الإرشاد النفسي والتوجيه',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-radio-tv-cinema',
    name: 'Radio, Television and Cinema',
    nameAr: 'الراديو والتلفزيون والسينما',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-english-teaching',
    name: 'Foreign Language Education (English Teaching)',
    nameAr: 'معلم اللغة الإنجليزية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  },
  {
    id: 'ku-elementary-education',
    name: 'Elementary Education',
    nameAr: 'معلم المرحلة الإبتدائية',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-software-engineering',
    name: 'Software Engineering',
    nameAr: 'هندسة البرمجيات',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 7600,
    discountedFee: 3800,
    depositFee: 3800,
    prepFee: 7600,
    available: true
  },
  {
    id: 'ku-special-education',
    name: 'Special Education',
    nameAr: 'التعليم الخاص',
    degree: 'Bachelor',
    language: 'Turkish',
    campus: 'Yenibosna',
    tuitionFee: 5950,
    discountedFee: 2975,
    depositFee: 2975,
    prepFee: 3000,
    available: true
  },
  {
    id: 'ku-digital-game-design',
    name: 'Digital Game Design',
    nameAr: 'تصميم الألعاب الرقمية',
    degree: 'Bachelor',
    language: 'English',
    campus: 'Yenibosna',
    tuitionFee: 6900,
    discountedFee: 3450,
    depositFee: 3450,
    prepFee: 6900,
    available: true
  }
];

// Existing getUniversityPrograms function - just add to it
const existingGetUniversityPrograms = getUniversityPrograms;  // Keep reference to existing function
export function getUniversityPrograms(universityId: number): UniversityProgram[] {
  // Special case for Istanbul Kultur University (ID 10)
  if (universityId === 10) {
    return kulturUniversityPrograms;
  }
  
  // For all other universities, use the existing function
  return existingGetUniversityPrograms(universityId);
}
