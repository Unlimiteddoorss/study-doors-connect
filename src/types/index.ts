
export interface Program {
  id: string;
  name: string;
  university: string;
  universityId: string;
  description: string;
  degreeLevel: 'bachelor' | 'master' | 'phd' | 'diploma';
  faculty: string;
  duration: string;
  language: string;
  tuitionFee: string;
  currency: string;
  applicationFee?: string;
  deadline?: string;
  startDate?: string;
  country: string;
  city: string;
  requirements?: string[];
  features?: string[];
  scholarships?: string[];
  ranking?: number;
  studentsCount?: number;
  imageUrl?: string;
  isFeatured?: boolean;
  discount?: number;
  fee?: string;
  title?: string;
  location?: string;
}

export interface University {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  location: string;
  country: string;
  ranking: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  programsCount?: number;
  campuses?: string[];
  facilites?: string[];
  city?: string;
  type?: "Public" | "Private";
  founded?: string;
  programs?: any;
  students?: number;
  fees?: any;
  image?: string;
  languages?: string[];
  accreditation?: any[];
  isFeatured?: boolean;
}

export interface Application {
  id: string;
  programId: string;
  program: {
    name: string;
    university: string;
  };
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'awaiting_documents';
  date: string;
  documents: {
    id: string;
    name: string;
    uploaded: boolean;
    url?: string;
    required: boolean;
  }[];
  messages: number;
  notes?: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  uploaded: boolean;
  required: boolean;
  url?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'info' | 'warning' | 'error' | 'update';
  link?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin' | 'agent';
  timestamp: Date;
  read: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  agent: {
    name: string;
    avatar?: string;
  };
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthdate: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  education: string;
  languages: string;
  bio: string;
  avatar?: string;
}
