
import { supabase } from '@/lib/supabase';
import { Application, Document, Timeline } from '@/types/supabase';

// Get all applications for a student
export const getStudentApplications = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, universities(name, name_ar, country, city, image_url), programs(name, name_ar, degree_type, duration)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching applications for student ${studentId}:`, error.message);
    return { data: [], error: error.message };
  }
};

// Get application by ID
export const getApplicationById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, universities(*), programs(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Get documents for this application
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .eq('application_id', id);

    if (docsError) throw docsError;

    // Get timeline for this application
    const { data: timeline, error: timelineError } = await supabase
      .from('timeline')
      .select('*')
      .eq('application_id', id)
      .order('created_at', { ascending: true });

    if (timelineError) throw timelineError;

    return { 
      data: {
        ...data,
        documents,
        timeline
      }, 
      error: null 
    };
  } catch (error: any) {
    console.error(`Error fetching application with ID ${id}:`, error.message);
    return { data: null, error: error.message };
  }
};

// Create new application
export const createApplication = async (application: Partial<Application>) => {
  try {
    // Generate a UUID for the application
    const applicationId = crypto.randomUUID();
    const newApplication = { ...application, id: applicationId };
    
    const { data, error } = await supabase
      .from('applications')
      .insert([newApplication])
      .select()
      .single();

    if (error) throw error;

    // Create initial timeline entry
    await supabase
      .from('timeline')
      .insert([{
        application_id: data.id,
        status: 'pending',
        note: 'تم استلام الطلب وهو قيد المراجعة'
      }]);

    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating application:', error.message);
    return { data: null, error: error.message };
  }
};

// Upload document
export const uploadDocument = async (
  applicationId: string, 
  file: File, 
  documentName: string
) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase
      .storage
      .from('application-documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    
    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase
      .storage
      .from('application-documents')
      .getPublicUrl(filePath);

    // Create document record
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        application_id: applicationId,
        name: documentName,
        file_path: filePath,
        file_type: file.type,
        status: 'pending',
        uploaded_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return { data: { ...data, publicUrl: publicUrlData.publicUrl }, error: null };
  } catch (error: any) {
    console.error('Error uploading document:', error.message);
    return { data: null, error: error.message };
  }
};

// Update application status
export const updateApplicationStatus = async (
  id: string, 
  status: string, 
  note?: string
) => {
  try {
    // Update application status
    const { data, error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Add timeline entry
    const timelineNote = note || `تم تحديث حالة الطلب إلى ${status}`;
    await supabase
      .from('timeline')
      .insert([{
        application_id: id,
        status,
        note: timelineNote,
        created_at: new Date().toISOString()
      }]);

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error updating application ${id} status:`, error.message);
    return { data: null, error: error.message };
  }
};

// Update application form data
export const updateApplicationForm = async (
  id: string,
  formData: any
) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({
        personal_info: formData.personalInfo || null,
        academic_info: formData.academicInfo || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error(`Error updating application ${id} form data:`, error.message);
    return { data: null, error: error.message };
  }
};
