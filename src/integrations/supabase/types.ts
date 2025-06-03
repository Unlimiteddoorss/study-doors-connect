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
      agent_students: {
        Row: {
          agent_id: string
          assigned_at: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          student_id: string
        }
        Insert: {
          agent_id: string
          assigned_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          student_id: string
        }
        Update: {
          agent_id?: string
          assigned_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          student_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          academic_info: Json | null
          agent_id: string | null
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
          agent_id?: string | null
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
          agent_id?: string | null
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
          {
            foreignKeyName: "fk_applications_student_profiles"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          agent_id: string
          amount: number
          application_id: string
          created_at: string | null
          id: string
          notes: string | null
          paid_at: string | null
          percentage: number
          status: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          amount: number
          application_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          percentage: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          amount?: number
          application_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          percentage?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
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
      file_settings: {
        Row: {
          allowed_extensions: string[]
          category: string
          created_at: string | null
          file_type: string
          id: string
          is_required: boolean | null
          max_size_mb: number
          updated_at: string | null
        }
        Insert: {
          allowed_extensions: string[]
          category?: string
          created_at?: string | null
          file_type: string
          id?: string
          is_required?: boolean | null
          max_size_mb?: number
          updated_at?: string | null
        }
        Update: {
          allowed_extensions?: string[]
          category?: string
          created_at?: string | null
          file_type?: string
          id?: string
          is_required?: boolean | null
          max_size_mb?: number
          updated_at?: string | null
        }
        Relationships: []
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
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          read_at?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
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
      settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
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
      calculate_commission: {
        Args: { p_application_id: string; p_agent_id: string }
        Returns: undefined
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_title: string
          p_message: string
          p_type?: string
          p_action_url?: string
          p_metadata?: Json
        }
        Returns: string
      }
      create_user_role: {
        Args: { user_id: string; user_role: string }
        Returns: boolean
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      log_audit: {
        Args: {
          p_user_id: string
          p_action: string
          p_table_name: string
          p_record_id?: string
          p_old_values?: Json
          p_new_values?: Json
        }
        Returns: string
      }
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
