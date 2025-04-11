
import { University } from '@/components/universities/UniversityCard';

// نموذج لبرنامج دراسي
export interface UniversityProgram {
  id: number;
  universityId: number;
  name: string;
  nameAr: string;
  degree: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  language: string;
  campus: string;
  tuitionFee: number;
  discountedFee: number;
  depositFee: number;
  prepFee: number;
  available: boolean;
  description?: string;
  duration?: string;
}

// برامج جامعة بهتشي شهير
export const bahcesehirPrograms: UniversityProgram[] = [
  {
    id: 1001,
    universityId: 26,
    name: "Medicine (English)",
    nameAr: "الطب البشري (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Göztepe",
    tuitionFee: 28000.0,
    discountedFee: 28000.0,
    depositFee: 7500.0,
    prepFee: 8500.0,
    available: true,
    duration: "6 سنوات"
  },
  {
    id: 1002,
    universityId: 26,
    name: "Dentistry (English)",
    nameAr: "طب الأسنان (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş North",
    tuitionFee: 24000.0,
    discountedFee: 24000.0,
    depositFee: 7500.0,
    prepFee: 8500.0,
    available: true,
    duration: "5 سنوات"
  },
  {
    id: 1003,
    universityId: 26,
    name: "Law (Turkish)",
    nameAr: "الحقوق (تركي)",
    degree: "Bachelor",
    language: "Turkish",
    campus: "Beşiktaş South",
    tuitionFee: 10000.0,
    discountedFee: 10000.0,
    depositFee: 1000.0,
    prepFee: 3500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1004,
    universityId: 26,
    name: "Nursing (English)",
    nameAr: "التمريض (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1005,
    universityId: 26,
    name: "Nursing (Turkish)",
    nameAr: "التمريض (تركي)",
    degree: "Bachelor",
    language: "Turkish",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 3500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1006,
    universityId: 26,
    name: "Nutrition and Dietetics (English)",
    nameAr: "التغذية والحمية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1007,
    universityId: 26,
    name: "Nutrition and Dietetics (Turkish)",
    nameAr: "التغذية والحمية (تركي)",
    degree: "Bachelor",
    language: "Turkish",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 3500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1008,
    universityId: 26,
    name: "Physiotherapy and Rehabilitation (English)",
    nameAr: "العلاج الطبيعي وإعادة التأهيل (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1009,
    universityId: 26,
    name: "Physiotherapy and Rehabilitation (Turkish)",
    nameAr: "العلاج الطبيعي وإعادة التأهيل (تركي)",
    degree: "Bachelor",
    language: "Turkish",
    campus: "Beşiktaş North",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 3500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1010,
    universityId: 26,
    name: "Preschool Education (English)",
    nameAr: "معلم رياض الأطفال (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1011,
    universityId: 26,
    name: "Psychological Counseling and Guidance (English)",
    nameAr: "الإرشاد النفسي والتوجيه (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1012,
    universityId: 26,
    name: "English Language Education (English)",
    nameAr: "تعليم اللغة الانجليزية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1013,
    universityId: 26,
    name: "Business Administration (English)",
    nameAr: "إدارة الأعمال (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1014,
    universityId: 26,
    name: "Psychology (English)",
    nameAr: "علم النفس (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1015,
    universityId: 26,
    name: "Sociology (English)",
    nameAr: "علم الاجتماع (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1016,
    universityId: 26,
    name: "Economics (English)",
    nameAr: "الاقتصاد (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1017,
    universityId: 26,
    name: "Economics and Finance (English)",
    nameAr: "الاقتصاد والمالية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1018,
    universityId: 26,
    name: "International Finance and Banking (English)",
    nameAr: "التمويل والتأمين الدولي (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1019,
    universityId: 26,
    name: "International Trade and Business (English)",
    nameAr: "التجارة الدولية والأعمال (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1020,
    universityId: 26,
    name: "Logistic Management (English)",
    nameAr: "إدارة الخدمات اللوجستية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1021,
    universityId: 26,
    name: "Political Science and International Relations (English)",
    nameAr: "العلوم السياسية والعلاقات الدولية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Beşiktaş South",
    tuitionFee: 8500.0,
    discountedFee: 8500.0,
    depositFee: 1000.0,
    prepFee: 8500.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1022,
    universityId: 26,
    name: "Advertising (English)",
    nameAr: "الدعاية والإعلان (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Galata",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1023,
    universityId: 26,
    name: "Digital Game Design (English)",
    nameAr: "تصميم الألعاب الرقمية (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Galata",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  },
  {
    id: 1024,
    universityId: 26,
    name: "Film and Television (English)",
    nameAr: "السينما والتلفزيون (إنجليزي)",
    degree: "Bachelor",
    language: "English",
    campus: "Galata",
    tuitionFee: 8500.0,
    discountedFee: 5950.0,
    depositFee: 1000.0,
    prepFee: 5950.0,
    available: true,
    duration: "4 سنوات"
  }
];

// قائمة بجميع برامج الجامعات المتوفرة
export const allUniversityPrograms: UniversityProgram[] = [
  ...bahcesehirPrograms,
  // يمكن إضافة برامج جامعات أخرى هنا
];

// وظيفة للحصول على برامج جامعة معينة
export const getUniversityPrograms = (universityId: number): UniversityProgram[] => {
  return allUniversityPrograms.filter(program => program.universityId === universityId);
};

// وظيفة للحصول على عدد برامج الجامعة
export const getUniversityProgramCount = (universityId: number): number => {
  return allUniversityPrograms.filter(program => program.universityId === universityId).length;
};

// الدرجات العلمية المتاحة
export const availableDegrees = ["Bachelor", "Master", "PhD", "Diploma"];

// اللغات المتاحة للدراسة
export const availableLanguages = ["English", "Turkish", "Arabic"];
