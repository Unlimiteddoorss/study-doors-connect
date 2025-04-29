export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          academic_info: Json | null
          created_at: string | null
          id: string
          personal_info: Json | null
          program_id: number
          status: string
          student_id: string
          university_id: number
          updated_at: string | null
        }
        Insert: {
          academic_info?: Json | null
          created_at?: string | null
          id?: string
          personal_info?: Json | null
          program_id: number
          status: string
          student_id: string
          university_id: number
          updated_at?: string | null
        }
        Update: {
          academic_info?: Json | null
          created_at?: string | null
          id?: string
          personal_info?: Json | null
          program_id?: number
          status?: string
          student_id?: string
          university_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          application_id: string
          comment: string | null
          file_path: string
          file_type: string
          id: number
          name: string
          status: string
          updated_at: string | null
          uploaded_at: string | null
        }
        Insert: {
          application_id: string
          comment?: string | null
          file_path: string
          file_type: string
          id?: number
          name: string
          status: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Update: {
          application_id?: string
          comment?: string | null
          file_path?: string
          file_type?: string
          id?: number
          name?: string
          status?: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          application_id: string
          attachments: Json | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string
          sender_role: string
          updated_at: string | null
        }
        Insert: {
          application_id: string
          attachments?: Json | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id: string
          sender_role: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string
          attachments?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string
          sender_role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string | null
          degree_type: string
          description: string | null
          description_ar: string | null
          duration: number
          id: number
          is_active: boolean | null
          language: string
          name: string
          name_ar: string | null
          quota: number | null
          tuition_fee: number
          university_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree_type: string
          description?: string | null
          description_ar?: string | null
          duration: number
          id?: number
          is_active?: boolean | null
          language: string
          name: string
          name_ar?: string | null
          quota?: number | null
          tuition_fee: number
          university_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree_type?: string
          description?: string | null
          description_ar?: string | null
          duration?: number
          id?: number
          is_active?: boolean | null
          language?: string
          name?: string
          name_ar?: string | null
          quota?: number | null
          tuition_fee?: number
          university_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline: {
        Row: {
          application_id: string
          created_at: string | null
          created_by: string | null
          id: number
          note: string | null
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          created_by?: string | null
          id?: number
          note?: string | null
          status: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: number
          note?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          city: string
          country: string
          created_at: string | null
          description: string | null
          description_ar: string | null
          founded_year: number | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          name_ar: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          founded_year?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name: string
          name_ar?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          founded_year?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          name_ar?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      mark_messages_read: {
        Args: { p_application_id: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
