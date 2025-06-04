
import { supabase } from '@/integrations/supabase/client';
import { errorHandler } from '@/utils/errorHandler';

export interface DemoAccount {
  email: string;
  password: string;
  role: 'admin' | 'student' | 'agent';
  profile: {
    full_name: string;
    phone?: string;
    country?: string;
    city?: string;
  };
}

export const demoAccounts: DemoAccount[] = [
  {
    email: 'admin@demo.com',
    password: 'Demo123!',
    role: 'admin',
    profile: {
      full_name: 'مدير النظام التجريبي',
      phone: '+90 555 123 4567',
      country: 'Turkey',
      city: 'Istanbul'
    }
  },
  {
    email: 'student1@demo.com',
    password: 'Demo123!',
    role: 'student',
    profile: {
      full_name: 'أحمد محمد علي',
      phone: '+966 50 123 4567',
      country: 'Saudi Arabia',
      city: 'Riyadh'
    }
  },
  {
    email: 'student2@demo.com',
    password: 'Demo123!',
    role: 'student',
    profile: {
      full_name: 'فاطمة أحمد حسن',
      phone: '+971 55 123 4567',
      country: 'UAE',
      city: 'Dubai'
    }
  },
  {
    email: 'agent1@demo.com',
    password: 'Demo123!',
    role: 'agent',
    profile: {
      full_name: 'محمد أحمد الوكيل',
      phone: '+90 555 987 6543',
      country: 'Turkey',
      city: 'Istanbul'
    }
  }
];

export const demoDataService = {
  // إنشاء الجامعات التجريبية
  async createDemoUniversities() {
    try {
      const universities = [
        {
          name: 'Istanbul Technical University',
          name_ar: 'جامعة إسطنبول التقنية',
          country: 'Turkey',
          city: 'Istanbul',
          description: 'Leading technical university in Turkey',
          description_ar: 'جامعة تقنية رائدة في تركيا',
          website: 'https://www.itu.edu.tr',
          founded_year: 1773,
          is_active: true
        },
        {
          name: 'Bilkent University',
          name_ar: 'جامعة بيلكنت',
          country: 'Turkey',
          city: 'Ankara',
          description: 'Private research university',
          description_ar: 'جامعة بحثية خاصة',
          website: 'https://www.bilkent.edu.tr',
          founded_year: 1984,
          is_active: true
        },
        {
          name: 'Middle East Technical University',
          name_ar: 'جامعة الشرق الأوسط التقنية',
          country: 'Turkey',
          city: 'Ankara',
          description: 'Public technical university',
          description_ar: 'جامعة تقنية حكومية',
          website: 'https://www.metu.edu.tr',
          founded_year: 1956,
          is_active: true
        }
      ];

      for (const university of universities) {
        const { data: existing } = await supabase
          .from('universities')
          .select('id')
          .eq('name', university.name)
          .single();

        if (!existing) {
          await supabase.from('universities').insert(university);
          errorHandler.logInfo(`تم إنشاء جامعة: ${university.name_ar}`);
        }
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createDemoUniversities' });
      return false;
    }
  },

  // إنشاء البرامج التجريبية
  async createDemoPrograms() {
    try {
      // الحصول على الجامعات الموجودة
      const { data: universities } = await supabase
        .from('universities')
        .select('id, name')
        .limit(3);

      if (!universities || universities.length === 0) {
        throw new Error('لا توجد جامعات لإنشاء البرامج');
      }

      const programs = [
        {
          name: 'Computer Engineering',
          name_ar: 'هندسة الحاسوب',
          university_id: universities[0].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 6000,
          description: 'Comprehensive computer engineering program',
          description_ar: 'برنامج شامل لهندسة الحاسوب',
          quota: 150,
          is_active: true
        },
        {
          name: 'Computer Science',
          name_ar: 'علوم الحاسوب',
          university_id: universities[1].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 12000,
          description: 'Software and algorithms focus',
          description_ar: 'تركيز على البرمجيات والخوارزميات',
          quota: 100,
          is_active: true
        },
        {
          name: 'Electrical Engineering',
          name_ar: 'الهندسة الكهربائية',
          university_id: universities[2].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 5500,
          description: 'Electronics and power systems',
          description_ar: 'الإلكترونيات وأنظمة الطاقة',
          quota: 140,
          is_active: true
        }
      ];

      for (const program of programs) {
        const { data: existing } = await supabase
          .from('programs')
          .select('id')
          .eq('name', program.name)
          .eq('university_id', program.university_id)
          .single();

        if (!existing) {
          await supabase.from('programs').insert(program);
          errorHandler.logInfo(`تم إنشاء برنامج: ${program.name_ar}`);
        }
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createDemoPrograms' });
      return false;
    }
  },

  // إنشاء إعدادات النظام
  async createSystemSettings() {
    try {
      const settings = [
        {
          key: 'default_commission_rate',
          value: JSON.stringify(5),
          category: 'agent',
          description: 'Default commission rate for agents',
          is_public: false
        },
        {
          key: 'max_applications_per_student',
          value: JSON.stringify(3),
          category: 'application',
          description: 'Maximum applications per student',
          is_public: false
        },
        {
          key: 'notification_email_enabled',
          value: JSON.stringify(true),
          category: 'notification',
          description: 'Enable email notifications',
          is_public: false
        }
      ];

      for (const setting of settings) {
        const { data: existing } = await supabase
          .from('settings')
          .select('id')
          .eq('key', setting.key)
          .single();

        if (!existing) {
          await supabase.from('settings').insert(setting);
          errorHandler.logInfo(`تم إنشاء إعداد: ${setting.key}`);
        }
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createSystemSettings' });
      return false;
    }
  },

  // إنشاء إعدادات الملفات
  async createFileSettings() {
    try {
      const fileSettings = [
        {
          file_type: 'passport',
          category: 'document',
          max_size_mb: 5,
          allowed_extensions: ['pdf', 'jpg', 'png'],
          is_required: true
        },
        {
          file_type: 'transcript',
          category: 'document',
          max_size_mb: 10,
          allowed_extensions: ['pdf'],
          is_required: true
        },
        {
          file_type: 'personal_photo',
          category: 'document',
          max_size_mb: 2,
          allowed_extensions: ['jpg', 'png'],
          is_required: true
        }
      ];

      for (const fileSetting of fileSettings) {
        const { data: existing } = await supabase
          .from('file_settings')
          .select('id')
          .eq('file_type', fileSetting.file_type)
          .single();

        if (!existing) {
          await supabase.from('file_settings').insert(fileSetting);
          errorHandler.logInfo(`تم إنشاء إعداد ملف: ${fileSetting.file_type}`);
        }
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createFileSettings' });
      return false;
    }
  },

  // إنشاء طلبات تجريبية
  async createDemoApplications() {
    try {
      // الحصول على البرامج والطلاب
      const { data: programs } = await supabase
        .from('programs')
        .select('id, name, university_id')
        .limit(3);

      const { data: students } = await supabase
        .from('user_profiles')
        .select('user_id')
        .limit(2);

      if (!programs || !students || programs.length === 0 || students.length === 0) {
        errorHandler.logWarning('لا توجد برامج أو طلاب لإنشاء طلبات تجريبية');
        return false;
      }

      const applications = [
        {
          student_id: students[0].user_id,
          university_id: programs[0].university_id,
          program_id: programs[0].id,
          status: 'pending',
          personal_info: {
            first_name: 'أحمد',
            last_name: 'محمد',
            birth_date: '2000-01-15',
            nationality: 'Saudi Arabia',
            passport_number: 'P123456789'
          },
          academic_info: {
            gpa: 3.8,
            graduation_year: 2022,
            university: 'جامعة الملك سعود',
            degree: 'بكالوريوس هندسة'
          }
        }
      ];

      for (const application of applications) {
        const { data: existing } = await supabase
          .from('applications')
          .select('id')
          .eq('student_id', application.student_id)
          .eq('program_id', application.program_id)
          .single();

        if (!existing) {
          await supabase.from('applications').insert(application);
          errorHandler.logInfo('تم إنشاء طلب تجريبي');
        }
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createDemoApplications' });
      return false;
    }
  },

  // إنشاء رسائل تجريبية
  async createDemoMessages() {
    try {
      const { data: applications } = await supabase
        .from('applications')
        .select('id, student_id')
        .limit(1);

      if (!applications || applications.length === 0) {
        return false;
      }

      const messages = [
        {
          application_id: applications[0].id,
          sender_id: applications[0].student_id,
          sender_role: 'student',
          content: 'مرحباً، أريد معرفة حالة طلبي',
          is_read: false
        }
      ];

      for (const message of messages) {
        await supabase.from('messages').insert(message);
        errorHandler.logInfo('تم إنشاء رسالة تجريبية');
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createDemoMessages' });
      return false;
    }
  },

  // إنشاء البيانات التجريبية الكاملة
  async initializeDemoData() {
    try {
      errorHandler.logInfo('بدء إنشاء البيانات التجريبية...');

      const results = await Promise.allSettled([
        this.createDemoUniversities(),
        this.createSystemSettings(),
        this.createFileSettings()
      ]);

      // انتظار ثانية قبل إنشاء البرامج (للتأكد من حفظ الجامعات)
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.createDemoPrograms();

      // انتظار ثانية أخرى قبل إنشاء الطلبات
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.createDemoApplications();
      await this.createDemoMessages();

      const successCount = results.filter(result => result.status === 'fulfilled').length;
      
      errorHandler.logInfo(`تم إنشاء البيانات التجريبية بنجاح: ${successCount}/${results.length}`);
      
      return {
        success: true,
        message: `تم إنشاء ${successCount} من أصل ${results.length} مجموعات بيانات`,
        details: {
          universities: true,
          programs: true,
          settings: true,
          fileSettings: true,
          applications: true,
          messages: true
        }
      };
    } catch (error) {
      errorHandler.logError(error, { context: 'initializeDemoData' });
      return {
        success: false,
        message: 'فشل في إنشاء البيانات التجريبية',
        error: error instanceof Error ? error.message : 'خطأ غير معروف'
      };
    }
  },

  // إنشاء إشعارات تجريبية
  async createDemoNotifications() {
    try {
      const { data: users } = await supabase
        .from('user_profiles')
        .select('user_id')
        .limit(2);

      if (!users || users.length === 0) {
        return false;
      }

      const notifications = [
        {
          user_id: users[0].user_id,
          title: 'مرحباً بك في النظام',
          message: 'تم إنشاء حسابك بنجاح ويمكنك الآن تقديم الطلبات',
          type: 'success',
          is_read: false
        }
      ];

      for (const notification of notifications) {
        await supabase.from('notifications').insert(notification);
        errorHandler.logInfo('تم إنشاء إشعار تجريبي');
      }

      return true;
    } catch (error) {
      errorHandler.logError(error, { context: 'createDemoNotifications' });
      return false;
    }
  }
};
