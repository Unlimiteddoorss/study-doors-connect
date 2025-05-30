
// Define the program information interface
export interface ProgramInfo {
  id: number;
  name: string;
  name_ar?: string;
  university: string;
  university_id: number;
  degree_type: string;
  duration: number;
  tuition_fee: number;
  language: string | string[];
  country: string;
  city: string;
  is_popular?: boolean;
  has_scholarship?: boolean;
  description?: string;
  university_image?: string;
}

// Sample program data structure
interface RawProgramData {
  id: number;
  name: string;
  name_ar?: string;
  university: string;
  university_id: number;
  degree_type: string;
  duration: number;
  tuition_fee: number;
  language: string | string[];
  country: string;
  city: string;
  is_popular?: boolean;
  has_scholarship?: boolean;
  description?: string;
  university_image?: string;
}

// Function to convert raw program data to ProgramInfo
export const convertToProgramInfo = (program: RawProgramData): ProgramInfo => {
  return {
    id: program.id,
    name: program.name,
    name_ar: program.name_ar,
    university: program.university,
    university_id: program.university_id,
    degree_type: program.degree_type,
    duration: program.duration,
    tuition_fee: program.tuition_fee,
    language: program.language,
    country: program.country,
    city: program.city,
    is_popular: program.is_popular || false,
    has_scholarship: program.has_scholarship || false,
    description: program.description,
    university_image: program.university_image
  };
};

// Export dummy programs data
export const dummyPrograms: RawProgramData[] = [
  {
    id: 1,
    name: "Computer Science",
    name_ar: "علوم الحاسوب",
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
    description: "A comprehensive computer science program",
    university_image: "/images/universities/istanbul-technical-university.jpg"
  },
  {
    id: 2,
    name: "Mechanical Engineering",
    name_ar: "الهندسة الميكانيكية",
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
    description: "Advanced mechanical engineering program",
    university_image: "/images/universities/middle-east-technical-university.jpg"
  },
  {
    id: 3,
    name: "Medicine",
    name_ar: "الطب",
    university: "Bilkent University",
    university_id: 2,
    degree_type: "Bachelor",
    duration: 6,
    tuition_fee: 15000,
    language: "English",
    country: "Turkey",
    city: "Ankara",
    is_popular: true,
    has_scholarship: false,
    description: "Medical program with clinical training",
    university_image: "/images/universities/bilkent-university.jpg"
  }
];

// Export available countries
export const availableCountries = [
  { value: "turkey", label: "تركيا" },
  { value: "usa", label: "الولايات المتحدة" },
  { value: "uk", label: "المملكة المتحدة" },
  { value: "germany", label: "ألمانيا" },
  { value: "france", label: "فرنسا" },
  { value: "canada", label: "كندا" },
  { value: "australia", label: "أستراليا" },
];

// Export this list of Turkish universities
export const turkishUniversities = [
  {
    id: 1,
    name: "Istanbul Technical University",
    nameAr: "جامعة إسطنبول التقنية",
    country: "Turkey",
    city: "Istanbul",
    type: "Public",
    founded: "1773",
    programs: 125,
    students: 32000,
    image: "/images/universities/istanbul-technical-university.jpg",
    isFeatured: true,
    ranking: 351,
    languages: ["English", "Turkish"],
    fees: "5,000$ - 7,000$ سنوياً",
    accreditation: "YÖK, ABET",
    website: "https://www.itu.edu.tr",
    location: "Istanbul, Turkey"
  },
  {
    id: 2,
    name: "Bilkent University",
    nameAr: "جامعة بيلكنت",
    country: "Turkey",
    city: "Ankara",
    type: "Private",
    founded: "1984",
    programs: 102,
    students: 13000,
    image: "/images/universities/bilkent-university.jpg",
    isFeatured: true,
    ranking: 458,
    languages: ["English"],
    fees: "10,000$ - 15,000$ سنوياً",
    accreditation: "YÖK",
    website: "https://www.bilkent.edu.tr",
    location: "Ankara, Turkey"
  },
  {
    id: 3,
    name: "Middle East Technical University",
    nameAr: "جامعة الشرق الأوسط التقنية",
    country: "Turkey",
    city: "Ankara",
    type: "Public",
    founded: "1956",
    programs: 110,
    students: 28000,
    image: "/images/universities/middle-east-technical-university.jpg",
    isFeatured: true,
    ranking: 501,
    languages: ["English"],
    fees: "4,500$ - 6,500$ سنوياً",
    accreditation: "YÖK, ABET, AACSB",
    website: "https://www.metu.edu.tr",
    location: "Ankara, Turkey"
  },
  {
    id: 4,
    name: "Koç University",
    nameAr: "جامعة كوتش",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1993",
    programs: 95,
    students: 7000,
    image: "/images/universities/koc-university.jpg",
    isFeatured: true,
    ranking: 511,
    languages: ["English"],
    fees: "15,000$ - 20,000$ سنوياً",
    accreditation: "YÖK, EQUIS",
    website: "https://www.ku.edu.tr",
    location: "Istanbul, Turkey"
  },
  {
    id: 5,
    name: "Boğaziçi University",
    nameAr: "جامعة بوغازيتشي",
    country: "Turkey",
    city: "Istanbul",
    type: "Public",
    founded: "1863",
    programs: 108,
    students: 15000,
    image: "/images/universities/bogazici-university.jpg",
    isFeatured: true,
    ranking: 651,
    languages: ["English", "Turkish"],
    fees: "4,000$ - 6,000$ سنوياً",
    accreditation: "YÖK",
    website: "https://www.boun.edu.tr",
    location: "Istanbul, Turkey"
  }
];
