
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string(),
  userType: z.enum(['student', 'agent']),
  country: z.string().min(2, 'البلد مطلوب'),
  city: z.string().min(2, 'المدينة مطلوبة'),
  agreeTerms: z.boolean().refine(val => val === true, 'يجب الموافقة على الشروط والأحكام'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const applicationSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
    dateOfBirth: z.string().min(1, 'تاريخ الميلاد مطلوب'),
    nationality: z.string().min(2, 'الجنسية مطلوبة'),
    passportNumber: z.string().min(5, 'رقم جواز السفر مطلوب'),
    address: z.string().min(10, 'العنوان مطلوب'),
  }),
  academicInfo: z.object({
    previousDegree: z.string().min(1, 'الدرجة السابقة مطلوبة'),
    graduationYear: z.string().min(4, 'سنة التخرج مطلوبة'),
    gpa: z.string().min(1, 'المعدل التراكمي مطلوب'),
    university: z.string().min(2, 'الجامعة السابقة مطلوبة'),
    fieldOfStudy: z.string().min(2, 'مجال الدراسة مطلوب'),
  }),
  programSelection: z.object({
    universityId: z.number().min(1, 'الجامعة مطلوبة'),
    programId: z.number().min(1, 'البرنامج مطلوب'),
    startDate: z.string().min(1, 'تاريخ البدء مطلوب'),
  }),
});
