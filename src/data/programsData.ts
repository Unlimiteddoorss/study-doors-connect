import { Program } from './universityPrograms';

export interface ProgramInfo {
  id: number;
  title?: string;
  name?: string;
  name_ar?: string;
  university: string;
  university_id?: number;
  location?: string;
  degree?: string;
  degree_type?: string;
  duration: string;
  language: string | string[];
  fee?: number | string;
  tuition_fee?: number;
  discount?: number | string;
  isFeatured?: boolean;
  is_popular?: boolean;
  has_scholarship?: boolean;
  scholarshipAvailable?: boolean;
  description?: string;
  requirements?: string[];
  opportunities?: string[];
  country?: string;
  city?: string;
  image?: string;
  university_image?: string;
  badges?: string[];
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
export const convertToProgramInfo = (program: any): ProgramInfo => {
  return {
    id: program.id,
    title: program.title || program.name,
    name: program.name || program.title,
    name_ar: program.name_ar,
    university: program.university,
    location: program.location || `${program.city}, ${program.country}`,
    degree: program.degree || program.degree_type,
    duration: typeof program.duration === 'number' ? `${program.duration} years` : program.duration,
    language: Array.isArray(program.language) ? program.language : [program.language || "English"],
    fee: program.tuition_fee || program.fee,
    tuition_fee: program.tuition_fee,
    discount: program.discount,
    isFeatured: program.isFeatured || program.is_popular,
    is_popular: program.is_popular || program.isFeatured,
    has_scholarship: program.has_scholarship || program.scholarshipAvailable,
    scholarshipAvailable: program.scholarshipAvailable || program.has_scholarship,
    description: program.description,
    requirements: program.requirements,
    opportunities: program.careerOpportunities,
    country: program.country,
    city: program.city,
    university_id: program.university_id,
    image: program.image || program.university_image,
    university_image: program.university_image
  };
};

// Define dummy programs for testing
export const dummyPrograms = [
  {
    id: 1,
    name: "Computer Science and Engineering",
    name_ar: "علوم وهندسة الحاسوب",
    university: "Istanbul Technical University",
    university_id: 1,
    degree_type: "Bachelor",
    duration: 4,
    tuition_fee: 5000,
    language: "English",
    country: "Turkey",
    city: "Istanbul",
    is_popular: true,
    has_scholarship: false,
    description: "A comprehensive program covering programming, algorithms, and computer systems.",
    university_image: "https://via.placeholder.com/200x200?text=ITU"
  },
  {
    id: 2,
    name: "Business Administration",
    name_ar: "إدارة الأعمال",
    university: "Bogazici University",
    university_id: 2,
    degree_type: "Bachelor",
    duration: 4,
    tuition_fee: 4500,
    language: "English",
    country: "Turkey",
    city: "Istanbul",
    is_popular: false,
    has_scholarship: true,
    description: "Learn business principles, management strategies, and entrepreneurship skills."
  },
  {
    id: 3,
    name: "Medicine",
    name_ar: "الطب",
    university: "Ankara University",
    university_id: 3,
    degree_type: "Bachelor",
    duration: 6,
    tuition_fee: 8000,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    is_popular: true,
    has_scholarship: true,
    description: "A comprehensive medical program preparing students for careers in healthcare."
  },
  {
    id: 4,
    name: "Mechanical Engineering",
    name_ar: "الهندسة الميكانيكية",
    university: "Middle East Technical University",
    university_id: 4,
    degree_type: "Bachelor",
    duration: 4,
    tuition_fee: 5500,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    is_popular: false,
    has_scholarship: false,
    description: "Study the principles of mechanics, thermodynamics, and materials science."
  },
  {
    id: 5,
    name: "International Relations",
    name_ar: "العلاقات الدولية",
    university: "Bilkent University",
    university_id: 5,
    degree_type: "Master",
    duration: 2,
    tuition_fee: 6000,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    is_popular: true,
    has_scholarship: true,
    description: "Analyze global politics, international law, and diplomatic relations."
  },
  {
    id: 6,
    name: "Civil Engineering",
    name_ar: "الهندسة المدنية",
    university: "Istanbul Technical University",
    university_id: 1,
    degree_type: "Bachelor",
    duration: 4,
    tuition_fee: 5200,
    language: "English",
    country: "Turkey",
    city: "Istanbul",
    is_popular: false,
    has_scholarship: false,
    description: "Learn to design, construct and maintain the built environment."
  },
  {
    id: 7,
    name: "Data Science",
    name_ar: "علم البيانات",
    university: "Koç University",
    university_id: 6,
    degree_type: "Master",
    duration: 2,
    tuition_fee: 7000,
    language: "English",
    country: "Turkey",
    city: "Istanbul",
    is_popular: true,
    has_scholarship: true,
    description: "Combine statistics, computer science, and domain knowledge to extract insights from data."
  },
  {
    id: 8,
    name: "Architecture",
    name_ar: "الهندسة المعمارية",
    university: "Yildiz Technical University",
    university_id: 7,
    degree_type: "Bachelor",
    duration: 5,
    tuition_fee: 5500,
    language: "Turkish",
    country: "Turkey",
    city: "Istanbul",
    is_popular: false,
    has_scholarship: true,
    description: "Study the art and science of designing buildings and other physical structures."
  }
];

// Define Turkish universities
export const turkishUniversities = [
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
  }
];
