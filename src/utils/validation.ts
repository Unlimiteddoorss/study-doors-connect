
import { z } from 'zod';

// Input validation schemas
export const emailSchema = z.string().email('البريد الإلكتروني غير صحيح');
export const passwordSchema = z.string().min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف');
export const phoneSchema = z.string().min(10, 'رقم الهاتف غير صحيح');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  userType: z.enum(['student', 'agent']),
  agreeTerms: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

// File validation
export const validateFile = (file: File, maxSizeMB: number = 5) => {
  const errors: string[] = [];
  
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    errors.push(`حجم الملف يجب أن يكون أقل من ${maxSizeMB} ميجابايت`);
  }
  
  // Check file type (basic MIME type validation)
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('نوع الملف غير مدعوم');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Validate message content
export const messageSchema = z.object({
  content: z.string().min(1, 'المحتوى مطلوب').max(2000, 'المحتوى طويل جداً'),
  application_id: z.string().uuid('معرف الطلب غير صحيح'),
});
