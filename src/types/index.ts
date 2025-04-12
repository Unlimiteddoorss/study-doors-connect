
export interface Program {
  id: number;
  name: string;
  nameAr?: string;
  degree: string;
  university: string;
  universityId: number;
  language: string;
  duration: string;
  tuitionFee: number;
  discountedFee?: number;
  depositFee?: number;
  prepSchoolFee?: number;
  campus?: string;
  available: boolean;
  description?: string;
  requirements?: string[];
  career?: string[];
  quota?: number;
}

export interface University {
  id: number;
  name: string;
  nameAr?: string;
  location: string;
  country: string;
  ranking?: string;
  description?: string;
  logoUrl?: string;
  imageUrl?: string;
  establishedYear?: number;
  programCount?: number;
  studentCount?: number;
  website?: string;
}
