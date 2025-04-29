
import { applyMigration } from '@/utils/dbMigrations';

export const createMessagesTable = async () => {
  const migration = {
    name: 'create_messages_table',
    sql: `
      -- Create messages table
      CREATE TABLE IF NOT EXISTS public.messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
        sender_id UUID NOT NULL REFERENCES auth.users(id),
        sender_role TEXT NOT NULL CHECK (sender_role IN ('student', 'admin', 'agent')),
        content TEXT NOT NULL,
        attachments JSONB,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE
      );

      -- Enable Row Level Security
      ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

      -- Create policies for messages
      CREATE POLICY "Students can view messages for their own applications" ON public.messages
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM public.applications WHERE id = application_id AND student_id = auth.uid()
          )
        );

      CREATE POLICY "Students can insert messages for their own applications" ON public.messages
        FOR INSERT WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.applications WHERE id = application_id AND student_id = auth.uid()
          ) AND sender_id = auth.uid() AND sender_role = 'student'
        );

      CREATE POLICY "Admins can manage all messages" ON public.messages
        FOR ALL TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
          )
        );

      CREATE POLICY "Agents can view messages for applications they're assigned to" ON public.messages
        FOR SELECT TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'agent'
          )
        );

      CREATE POLICY "Agents can create messages for applications they're assigned to" ON public.messages
        FOR INSERT TO authenticated
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'agent'
          ) AND sender_id = auth.uid() AND sender_role = 'agent'
        );
      
      -- Create a function to update is_read flag
      CREATE OR REPLACE FUNCTION mark_messages_read(p_application_id UUID, p_user_id UUID)
      RETURNS void AS $$
      BEGIN
        UPDATE public.messages
        SET is_read = true
        WHERE application_id = p_application_id
          AND sender_id != p_user_id
          AND is_read = false;
      END;
      $$ LANGUAGE plpgsql;

      -- Create storage bucket for message attachments if it doesn't exist
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('message-attachments', 'Message Attachments', false)
      ON CONFLICT (id) DO NOTHING;

      -- Create policy for message attachments storage
      BEGIN
        CREATE POLICY "Users can upload message attachments" ON storage.objects
          FOR INSERT TO authenticated
          WITH CHECK (bucket_id = 'message-attachments');
      EXCEPTION
        WHEN duplicate_object THEN
          NULL;
      END;

      BEGIN
        CREATE POLICY "Users can view message attachments" ON storage.objects
          FOR SELECT TO authenticated
          USING (bucket_id = 'message-attachments');
      EXCEPTION
        WHEN duplicate_object THEN
          NULL;
      END;
    `
  };

  return await applyMigration(migration);
};
