
export interface StudentProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  nationality?: string;
  address?: string;
  city?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface University {
  id: number;
  name: string;
  name_ar?: string;
  location: string;
  country: string;
  city: string;
  type: 'Public' | 'Private';
  founded: string;
  programs_count: number;
  students_count: number;
  ranking?: number;
  fees: string;
  image_url: string;
  languages?: string[];
  accreditations?: string[];
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  university_id: number;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  degree_type: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  field_of_study: string;
  duration: string;
  language: string;
  fees?: string;
  requirements?: string;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  university_id: number;
  program_id: number;
  status: 'pending' | 'review' | 'approved' | 'rejected' | 'processing' | 'completed' | 'archived' | 'documents';
  personal_info: any;
  academic_info: any;
  documents?: any[];
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  application_id: string;
  name: string;
  file_path: string;
  file_type: string;
  status: 'pending' | 'approved' | 'rejected' | 'required';
  uploaded_at: string;
}

export interface Timeline {
  id: string;
  application_id: string;
  status: string;
  note?: string;
  created_at: string;
}

export interface Message {
  id: string;
  application_id: string;
  sender_id: string;
  sender_type: 'student' | 'admin' | 'agent' | 'system';
  content: string;
  read: boolean;
  attachments?: string[];
  created_at: string;
}
