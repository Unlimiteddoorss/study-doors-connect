
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

// Add missing exports
export const availableCountries = ["Turkey", "Cyprus"];
export const degreeTypes = ["Bachelor", "Master", "PhD", "Diploma", "Vocational School"];
export const programSpecialties = ["Medical", "Engineering", "Business", "Arts", "Science"];
export const dummyPrograms = []; // Empty array for now, will be populated later

// Extract available degrees and languages from all university programs
export const availableDegrees = ["Bachelor", "Master", "PhD", "Diploma", "Vocational School"];
export const availableLanguages = ["English", "Turkish", "Arabic"];

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
import { University } from '@/components/universities/UniversityCard';

// Create empty arrays for university programs that were imported but don't exist
export const bahcesehirUniversityPrograms: UniversityProgram[] = [];
export const aydinUniversityPrograms: UniversityProgram[] = [];
export const arelUniversityPrograms: UniversityProgram[] = [];
export const altinbasUniversityPrograms: UniversityProgram[] = [];
export const biruniUniversityPrograms: UniversityProgram[] = [];
export const demirogluUniversityPrograms: UniversityProgram[] = [];
export const halicUniversityPrograms: UniversityProgram[] = [];
export const istinyeUniversityPrograms: UniversityProgram[] = [];
export const kentUniversityPrograms: UniversityProgram[] = [];
export const medipolUniversityPrograms: UniversityProgram[] = [];
export const okanUniversityPrograms: UniversityProgram[] = [];
export const sabanciUniversityPrograms: UniversityProgram[] = [];
export const bilgiUniversityPrograms: UniversityProgram[] = [];

export const turkishUniversities: University[] = [
  {
    id: 1,
    name: "Bahcesehir University",
    nameAr: "جامعة بهتشه شهير",
    location: "Besiktas",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1998",
    programs: 50,
    students: 28188,
    ranking: 2514,
    localRanking: 37,
    fees: "6.000$ - 18.000$",
    image: "/lovable-uploads/64c65999-b991-4692-a99d-876858f6419b.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://bau.edu.tr",
    isFeatured: true
  },
  {
    id: 2,
    name: "Aydin University",
    nameAr: "جامعة آيدن",
    location: "Florya",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2003",
    programs: 40,
    students: 31000,
    ranking: 4014,
    localRanking: 65,
    fees: "3.000$ - 7.000$",
    image: "/lovable-uploads/b499568a-8f47-4849-8465-490634c91941.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://aydin.edu.tr"
  },
  {
    id: 3,
    name: "Arel University",
    nameAr: "جامعة آريل",
    location: "Sefaköy",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2007",
    programs: 30,
    students: 8000,
    ranking: 9000,
    localRanking: 170,
    fees: "2.500$ - 5.000$",
    image: "/lovable-uploads/039f1149-15ff-4a9a-a999-59b9d3e56197.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://arel.edu.tr"
  },
  {
    id: 4,
    name: "Altinbas University",
    nameAr: "جامعة آلتن باش",
    location: "Mahmutbey",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2008",
    programs: 40,
    students: 10000,
    ranking: 5000,
    localRanking: 80,
    fees: "3.000$ - 8.000$",
    image: "/lovable-uploads/3b56954f-a906-46fb-b59f-33e958969997.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://altinbas.edu.tr"
  },
  {
    id: 5,
    name: "Biruni University",
    nameAr: "جامعة بيروني",
    location: "Topkapi",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2014",
    programs: 20,
    students: 6000,
    ranking: 7000,
    localRanking: 120,
    fees: "4.000$ - 10.000$",
    image: "/lovable-uploads/3954314a-4991-45a9-b04a-3a964983a11f.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://biruni.edu.tr"
  },
  {
    id: 6,
    name: "Demiroglu Bilim University",
    nameAr: "جامعة دمير أوغلو بيليم",
    location: "Sisli",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2006",
    programs: 30,
    students: 5000,
    ranking: 8000,
    localRanking: 150,
    fees: "3.500$ - 9.000$",
    image: "/lovable-uploads/6929d90a-2599-4a99-9945-a953e0ca6517.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://www.demiroglu.edu.tr"
  },
  {
    id: 7,
    name: "Halic University",
    nameAr: "جامعة الخليج",
    location: "Beyoglu",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1998",
    programs: 40,
    students: 7000,
    ranking: 6000,
    localRanking: 100,
    fees: "3.000$ - 7.000$",
    image: "/lovable-uploads/499e842d-4c11-4a9d-994c-348605e5499a.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://halic.edu.tr"
  },
  {
    id: 8,
    name: "Istinye University",
    nameAr: "جامعة استينيا",
    location: "Topkapi",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2015",
    programs: 35,
    students: 4000,
    ranking: 7500,
    localRanking: 130,
    fees: "3.500$ - 8.500$",
    image: "/lovable-uploads/65978191-a096-495a-899a-354525479159.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://istinye.edu.tr"
  },
  {
    id: 9,
    name: "Kent University",
    nameAr: "جامعة كينت",
    location: "Kagithane",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2016",
    programs: 25,
    students: 3000,
    ranking: 8500,
    localRanking: 160,
    fees: "3.000$ - 6.000$",
    image: "/lovable-uploads/68f99919-864d-4631-891a-a960c555c539.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://kent.edu.tr"
  },
  {
    id: 10,
    name: "Medipol University",
    nameAr: "جامعة ميديبول",
    location: "Halkali",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "2009",
    programs: 45,
    students: 12000,
    ranking: 4500,
    localRanking: 70,
    fees: "4.000$ - 9.000$",
    image: "/lovable-uploads/6a79929f-87a1-4997-894a-f0a847986a9f.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://medipol.edu.tr"
  },
  {
    id: 11,
    name: "Okan University",
    nameAr: "جامعة أوكان",
    location: "Tuzla",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1999",
    programs: 55,
    students: 15000,
    ranking: 3500,
    localRanking: 50,
    fees: "3.500$ - 8.000$",
    image: "/lovable-uploads/6c91859b-59a7-469f-b991-8584b94c561b.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://okan.edu.tr"
  },
  {
    id: 12,
    name: "Istanbul Gelisim University",
    nameAr: "جامعة إسطنبول جيليشيم",
    location: "Avcılar",
    country: "Turkey",
    city: "Istanbul",
    district: "Avcılar",
    type: "Private",
    founded: "2008",
    programs: 80,
    students: 35000,
    ranking: 1019,
    localRanking: 13,
    fees: "3,000 - 12,000 USD",
    image: "/lovable-uploads/11b99485-b751-436b-a9df-3035e5ce21a1.png",
    languages: ["English", "Turkish", "Arabic"],
    accreditations: [
      "YÖK",
      "YÖDAK",
      "AQAS",
      "ABET",
      "PEARSON"
    ],
    website: "https://gelisim.edu.tr",
    isFeatured: true
  },
  {
    id: 13,
    name: "Sabanci University",
    nameAr: "جامعة سابانجي",
    location: "Tuzla",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1999",
    programs: 30,
    students: 4427,
    ranking: 801,
    localRanking: 9,
    fees: "19.500$",
    image: "/lovable-uploads/52f85449-8981-45ef-950d-4a509999695c.png",
    languages: ["English"],
    accreditations: ["ABET", "EQUIS", "YÖK"],
    website: "https://www.sabanciuniv.edu",
    isFeatured: true
  },
   {
    id: 14,
    name: "Istanbul Bilgi University",
    nameAr: "جامعة اسطنبول بلغي",
    location: "Eyup",
    country: "Turkey",
    city: "Istanbul",
    type: "Private",
    founded: "1996",
    programs: 60,
    students: 20000,
    ranking: 2514,
    localRanking: 37,
    fees: "5.000$ - 15.000$",
    image: "/lovable-uploads/64c65999-b991-4692-a99d-876858f6419b.png",
    languages: ["English", "Turkish"],
    accreditations: ["YÖK"],
    website: "https://bau.edu.tr",
    isFeatured: true
  },
];

// Function to get programs for a specific university
export const getUniversityPrograms = (universityId: number): UniversityProgram[] => {
  // Check if the universityId matches any of our universities
  if (universityId === 1) {
    return bahcesehirUniversityPrograms;
  }
  if (universityId === 2) {
    return aydinUniversityPrograms;
  }
  if (universityId === 3) {
    return arelUniversityPrograms;
  }
  if (universityId === 4) {
    return altinbasUniversityPrograms;
  }
  if (universityId === 5) {
    return biruniUniversityPrograms;
  }
  if (universityId === 6) {
    return demirogluUniversityPrograms;
  }
  if (universityId === 7) {
    return halicUniversityPrograms;
  }
  if (universityId === 8) {
    return istinyeUniversityPrograms;
  }
  if (universityId === 9) {
    return kentUniversityPrograms;
  }
  if (universityId === 10) {
    return medipolUniversityPrograms;
  }
  if (universityId === 11) {
    return okanUniversityPrograms;
  }
  if (universityId === 13) {
    return sabanciUniversityPrograms;
  }
  if (universityId === 14) {
    return bilgiUniversityPrograms;
  }
  if (universityId === 12) {
    return gelisimUniversityPrograms;
  }
  
  // For other universities, return sample data filtered by university ID
  return sampleUniversityPrograms.filter(program => program.universityId === universityId);
};
