
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          student_id: string;
          university_id: number;
          program_id: number;
          status: 'pending' | 'review' | 'approved' | 'rejected' | 'documents' | 'completed' | 'archived';
          personal_info: Json;
          academic_info: Json;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          student_id: string;
          university_id: number;
          program_id: number;
          status: 'pending' | 'review' | 'approved' | 'rejected' | 'documents' | 'completed' | 'archived';
          personal_info?: Json;
          academic_info?: Json;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          student_id?: string;
          university_id?: number;
          program_id?: number;
          status?: 'pending' | 'review' | 'approved' | 'rejected' | 'documents' | 'completed' | 'archived';
          personal_info?: Json;
          academic_info?: Json;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      documents: {
        Row: {
          id: number;
          application_id: string;
          name: string;
          file_path: string;
          file_type: string;
          status: 'pending' | 'approved' | 'rejected';
          comment: string | null;
          uploaded_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          application_id: string;
          name: string;
          file_path: string;
          file_type: string;
          status?: 'pending' | 'approved' | 'rejected';
          comment?: string | null;
          uploaded_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          application_id?: string;
          name?: string;
          file_path?: string;
          file_type?: string;
          status?: 'pending' | 'approved' | 'rejected';
          comment?: string | null;
          uploaded_at?: string;
          updated_at?: string | null;
        };
      };
      programs: {
        Row: {
          id: number;
          university_id: number;
          name: string;
          name_ar: string | null;
          degree_type: string;
          duration: number;
          language: string;
          tuition_fee: number;
          description: string | null;
          description_ar: string | null;
          created_at: string;
          updated_at: string | null;
          quota: number | null;
          is_active: boolean;
        };
        Insert: {
          id?: number;
          university_id: number;
          name: string;
          name_ar?: string | null;
          degree_type: string;
          duration: number;
          language: string;
          tuition_fee: number;
          description?: string | null;
          description_ar?: string | null;
          created_at?: string;
          updated_at?: string | null;
          quota?: number | null;
          is_active?: boolean;
        };
        Update: {
          id?: number;
          university_id?: number;
          name?: string;
          name_ar?: string | null;
          degree_type?: string;
          duration?: number;
          language?: string;
          tuition_fee?: number;
          description?: string | null;
          description_ar?: string | null;
          created_at?: string;
          updated_at?: string | null;
          quota?: number | null;
          is_active?: boolean;
        };
      };
      timeline: {
        Row: {
          id: number;
          application_id: string;
          status: string;
          note: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: number;
          application_id: string;
          status: string;
          note?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: number;
          application_id?: string;
          status?: string;
          note?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
      };
      universities: {
        Row: {
          id: number;
          name: string;
          name_ar: string | null;
          country: string;
          city: string;
          image_url: string | null;
          description: string | null;
          description_ar: string | null;
          website: string | null;
          founded_year: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          name_ar?: string | null;
          country: string;
          city: string;
          image_url?: string | null;
          description?: string | null;
          description_ar?: string | null;
          website?: string | null;
          founded_year?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          name_ar?: string | null;
          country?: string;
          city?: string;
          image_url?: string | null;
          description?: string | null;
          description_ar?: string | null;
          website?: string | null;
          founded_year?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          phone: string | null;
          country: string | null;
          city: string | null;
          bio: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          phone?: string | null;
          country?: string | null;
          city?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          phone?: string | null;
          country?: string | null;
          city?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      user_roles: {
        Row: {
          id: number;
          user_id: string;
          role: 'student' | 'admin' | 'agent';
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          user_id: string;
          role: 'student' | 'admin' | 'agent';
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          user_id?: string;
          role?: 'student' | 'admin' | 'agent';
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
