import { ProgramInfo } from "@/components/programs/ProgramCard";

// Define Program interface that matches the data structure
export interface Program {
  id: number;
  title: string;
  university: string;
  location: string;
  duration: string;
  language: string;
  fee: string;
  discount?: string;
  image?: string;
  badges?: string[];
  deadline: string;
  scholarshipAvailable?: boolean;
  isFeatured?: boolean;
  nameAr?: string;
  description?: string;
}

// Create a function to convert between Program and ProgramInfo
export function convertToProgramInfo(program: Program): ProgramInfo {
  return {
    id: program.id,
    name: program.title,
    name_ar: program.nameAr,
    university: program.university,
    university_id: 1, // Default value, should be replaced with actual data
    degree_type: 'bachelor', // Default value, should be parsed from title
    duration: parseInt(program.duration) || 4, // Extract number from string
    tuition_fee: parseInt(program.fee.replace(/[^0-9]/g, '')) || 6000, // Extract number from fee string
    language: program.language,
    country: program.location.split(',')[0].trim(),
    city: program.location.split(',')[1]?.trim() || '',
    has_scholarship: program.scholarshipAvailable || false,
    is_popular: program.isFeatured || false,
    description: program.description
  };
}

// Available countries for filtering
export const availableCountries = [
  "Turkey",
  "Hungary",
  "United Kingdom",
  "United States",
  "Malaysia",
  "Cyprus",
  "Poland",
  "Czech Republic",
  "Northern Cyprus",
  "Egypt",
  "United Arab Emirates",
];

// Add missing exports
export const degreeTypes = [
  { value: 'bachelor', label: 'Bachelor', labelAr: 'بكالوريوس' },
  { value: 'master', label: 'Master', labelAr: 'ماجستير' },
  { value: 'doctorate', label: 'Doctorate', labelAr: 'دكتوراه' },
  { value: 'certificate', label: 'Certificate', labelAr: 'شهادة' }
];

export const programSpecialties = [
  { value: 'engineering', label: 'Engineering', labelAr: 'هندسة' },
  { value: 'medicine', label: 'Medicine', labelAr: 'طب' },
  { value: 'business', label: 'Business', labelAr: 'إدارة أعمال' },
  { value: 'arts', label: 'Arts', labelAr: 'فنون' },
  { value: 'science', label: 'Science', labelAr: 'علوم' },
  { value: 'law', label: 'Law', labelAr: 'قانون' },
  { value: 'education', label: 'Education', labelAr: 'تعليم' }
];

// Export University interface for consistency
export interface University {
  id: number;
  name: string;
  nameAr?: string;
  country: string;
  city: string;
  location: string;
  type: "Public" | "Private";
  founded: string;
  programs: number;
  students: number;
  ranking: number;
  fees: string;
  image: string;
  website: string;
  languages: string[];
  accreditation: string;
  isFeatured: boolean;
}

// Define turkish universities data
export const turkishUniversities: University[] = [
  {
    id: 1,
    name: "Istanbul Technical University",
    nameAr: "جامعة إسطنبول التقنية",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Public",
    founded: "1773",
    programs: 120,
    students: 32000,
    ranking: 501,
    fees: "$6,000 - $8,000",
    image: "/images/universities/istanbul-technical-university.jpg",
    website: "https://www.itu.edu.tr/en",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 2,
    name: "Bilkent University",
    nameAr: "جامعة بيلكنت",
    location: "Ankara",
    city: "Ankara",
    country: "Turkey",
    type: "Private",
    founded: "1984",
    programs: 89,
    students: 12500,
    ranking: 401,
    fees: "$8,000 - $12,000",
    image: "/images/universities/bilkent-university.jpg",
    website: "http://www.bilkent.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 3,
    name: "Middle East Technical University",
    nameAr: "جامعة الشرق الأوسط التقنية",
    location: "Ankara",
    city: "Ankara",
    country: "Turkey",
    type: "Public",
    founded: "1956",
    programs: 110,
    students: 27000,
    ranking: 451,
    fees: "$5,000 - $7,000",
    image: "/images/universities/middle-east-technical-university.jpg",
    website: "https://www.metu.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: false
  },
  {
    id: 4,
    name: "Koç University",
    nameAr: "جامعة كوتش",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Private",
    founded: "1993",
    programs: 75,
    students: 7000,
    ranking: 451,
    fees: "$15,000 - $20,000",
    image: "/images/universities/koc-university.jpg",
    website: "https://www.ku.edu.tr/en/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  },
  {
    id: 5,
    name: "Boğaziçi University",
    nameAr: "جامعة بوغaziتشي",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Public",
    founded: "1863",
    programs: 95,
    students: 15000,
    ranking: 551,
    fees: "$5,000 - $7,000",
    image: "/images/universities/bogazici-university.jpg",
    website: "http://www.boun.edu.tr/",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: false
  },
  {
    id: 6,
    name: "Sabancı University",
    nameAr: "جامعة سابانجي",
    location: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    type: "Private",
    founded: "1994",
    programs: 60,
    students: 4000,
    ranking: 521,
    fees: "$12,000 - $18,000",
    image: "/images/universities/sabanci-university.jpg",
    website: "https://www.sabanciuniv.edu/en",
    languages: ["Turkish", "English"],
    accreditation: "YÖK Accredited",
    isFeatured: true
  }
];

// Dummy data for programs
export const dummyPrograms: Program[] = [
  {
    id: 1,
    title: 'Software Engineering',
    university: 'Istanbul Technical University',
    location: 'Turkey, Istanbul',
    duration: '4 years',
    language: 'English',
    fee: '$6,000',
    image: '/images/programs/software-engineering.jpg',
    badges: ['ABET Accredited', 'Top 10% in Turkey'],
    deadline: '30 June 2024',
    scholarshipAvailable: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Medicine',
    university: 'Cairo University',
    location: 'Egypt, Cairo',
    duration: '6 years',
    language: 'Arabic/English',
    fee: 'EGP 85,000',
    image: '/images/programs/medicine.jpg',
    badges: ['WHO Recognized'],
    deadline: '15 August 2024',
    scholarshipAvailable: false,
  },
  {
    id: 3,
    title: 'Business Administration',
    university: 'American University in Dubai',
    location: 'United Arab Emirates, Dubai',
    duration: '4 years',
    language: 'English',
    fee: 'AED 95,000',
    image: '/images/programs/business-administration.jpg',
    badges: ['AACSB Accredited'],
    deadline: '1 September 2024',
    scholarshipAvailable: true,
  },
  {
    id: 4,
    title: 'Computer Science',
    university: 'Eötvös Loránd University',
    location: 'Hungary, Budapest',
    duration: '3 years',
    language: 'English',
    fee: '$7,000',
    image: '/images/programs/computer-science.jpg',
    badges: ['EU Program'],
    deadline: '10 July 2024',
    scholarshipAvailable: false,
  },
  {
    id: 5,
    title: 'Mechanical Engineering',
    university: 'Istanbul Technical University',
    location: 'Turkey, Istanbul',
    duration: '4 years',
    language: 'English',
    fee: '$6,500',
    image: '/images/programs/mechanical-engineering.jpg',
    badges: ['ABET Accredited'],
    deadline: '30 June 2024',
    scholarshipAvailable: true,
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Dentistry',
    university: 'Cairo University',
    location: 'Egypt, Cairo',
    duration: '5 years',
    language: 'Arabic/English',
    fee: 'EGP 90,000',
    image: '/images/programs/dentistry.jpg',
    badges: ['WHO Recognized'],
    deadline: '15 August 2024',
    scholarshipAvailable: false,
  },
  {
    id: 7,
    title: 'Architecture',
    university: 'American University in Dubai',
    location: 'United Arab Emirates, Dubai',
    duration: '5 years',
    language: 'English',
    fee: 'AED 100,000',
    image: '/images/programs/architecture.jpg',
    badges: ['RIBA Accredited'],
    deadline: '1 September 2024',
    scholarshipAvailable: true,
  },
  {
    id: 8,
    title: 'International Relations',
    university: 'Eötvös Loránd University',
    location: 'Hungary, Budapest',
    duration: '3 years',
    language: 'English',
    fee: '$6,800',
    image: '/images/programs/international-relations.jpg',
    badges: ['EU Program'],
    deadline: '10 July 2024',
    scholarshipAvailable: true,
  },
  {
    id: 9,
    title: 'Civil Engineering',
    university: 'Istanbul Technical University',
    location: 'Turkey, Istanbul',
    duration: '4 years',
    language: 'English',
    fee: '$7,000',
    image: '/images/programs/civil-engineering.jpg',
    badges: ['ABET Accredited'],
    deadline: '30 June 2024',
    scholarshipAvailable: false,
  },
  {
    id: 10,
    title: 'Pharmacy',
    university: 'Cairo University',
    location: 'Egypt, Cairo',
    duration: '5 years',
    language: 'Arabic/English',
    fee: 'EGP 88,000',
    image: '/images/programs/pharmacy.jpg',
    badges: ['WHO Recognized'],
    deadline: '15 August 2024',
    scholarshipAvailable: true,
  },
  {
    id: 11,
    title: 'Marketing',
    university: 'American University in Dubai',
    location: 'United Arab Emirates, Dubai',
    duration: '4 years',
    language: 'English',
    fee: 'AED 92,000',
    image: '/images/programs/marketing.jpg',
    badges: ['AACSB Accredited'],
    deadline: '1 September 2024',
    scholarshipAvailable: false,
  },
  {
    id: 12,
    title: 'Psychology',
    university: 'Eötvös Loránd University',
    location: 'Hungary, Budapest',
    duration: '3 years',
    language: 'English',
    fee: '$6,500',
    image: '/images/programs/psychology.jpg',
    badges: ['EU Program'],
    deadline: '10 July 2024',
    scholarshipAvailable: true,
    isFeatured: true,
  },
];
