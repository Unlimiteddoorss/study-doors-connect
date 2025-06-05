
import { supabase } from '@/integrations/supabase/client';
import { errorHandler } from '@/utils/errorHandler';

export interface RealDemoDataResult {
  success: boolean;
  message: string;
  details?: any;
}

export const realDemoDataService = {
  async initializeUniversities(): Promise<RealDemoDataResult> {
    try {
      // حذف البيانات الموجودة أولاً
      await supabase.from('programs').delete().neq('id', 0);
      await supabase.from('universities').delete().neq('id', 0);

      // إضافة الجامعات
      const { data: universities, error: universitiesError } = await supabase
        .from('universities')
        .insert([
          {
            name: 'Istanbul Technical University',
            name_ar: 'جامعة إسطنبول التقنية',
            country: 'Turkey',
            city: 'Istanbul',
            description: 'One of the world\'s oldest technical universities, founded in 1773',
            description_ar: 'واحدة من أقدم الجامعات التقنية في العالم، تأسست عام 1773',
            website: 'https://www.itu.edu.tr',
            image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
            founded_year: 1773,
            is_active: true
          },
          {
            name: 'Bilkent University',
            name_ar: 'جامعة بيلكنت',
            country: 'Turkey',
            city: 'Ankara',
            description: 'A leading private research university in Turkey',
            description_ar: 'جامعة بحثية خاصة رائدة في تركيا',
            website: 'https://www.bilkent.edu.tr',
            image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
            founded_year: 1984,
            is_active: true
          },
          {
            name: 'Middle East Technical University',
            name_ar: 'جامعة الشرق الأوسط التقنية',
            country: 'Turkey',
            city: 'Ankara',
            description: 'A prominent public technical university in Turkey',
            description_ar: 'جامعة تقنية حكومية بارزة في تركيا',
            website: 'https://www.metu.edu.tr',
            image_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
            founded_year: 1956,
            is_active: true
          },
          {
            name: 'Koç University',
            name_ar: 'جامعة كوتش',
            country: 'Turkey',
            city: 'Istanbul',
            description: 'A prestigious private university known for excellence in education',
            description_ar: 'جامعة خاصة مرموقة معروفة بالتميز في التعليم',
            website: 'https://www.ku.edu.tr',
            image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
            founded_year: 1993,
            is_active: true
          },
          {
            name: 'Sabancı University',
            name_ar: 'جامعة صبانجي',
            country: 'Turkey',
            city: 'Istanbul',
            description: 'A young and dynamic private research university',
            description_ar: 'جامعة بحثية خاصة شابة وديناميكية',
            website: 'https://www.sabanciuniv.edu',
            image_url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800',
            founded_year: 1994,
            is_active: true
          }
        ])
        .select();

      if (universitiesError) {
        throw universitiesError;
      }

      if (!universities || universities.length === 0) {
        throw new Error('فشل في إضافة الجامعات');
      }

      return {
        success: true,
        message: `تم إضافة ${universities.length} جامعات بنجاح`,
        details: { universitiesCount: universities.length }
      };
    } catch (error) {
      errorHandler.logError(error, { context: 'initializeUniversities' });
      return {
        success: false,
        message: 'فشل في إضافة الجامعات: ' + (error as Error).message
      };
    }
  },

  async initializePrograms(): Promise<RealDemoDataResult> {
    try {
      // جلب الجامعات الموجودة
      const { data: universities, error: universitiesError } = await supabase
        .from('universities')
        .select('id, name')
        .order('id');

      if (universitiesError || !universities || universities.length === 0) {
        throw new Error('لا توجد جامعات في قاعدة البيانات');
      }

      console.log('Universities found:', universities);

      // إضافة البرامج
      const programs = [
        {
          name: 'Computer Engineering',
          name_ar: 'هندسة الحاسوب',
          university_id: universities[0].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 8500,
          description: 'Comprehensive computer engineering program covering software and hardware',
          description_ar: 'برنامج شامل في هندسة الحاسوب يغطي البرمجيات والأجهزة',
          quota: 120,
          is_active: true
        },
        {
          name: 'Computer Science',
          name_ar: 'علوم الحاسوب',
          university_id: universities[0].id,
          degree_type: 'Master',
          language: 'English',
          duration: 2,
          tuition_fee: 12000,
          description: 'Advanced computer science program with research focus',
          description_ar: 'برنامج متقدم في علوم الحاسوب مع التركيز على البحث',
          quota: 60,
          is_active: true
        },
        {
          name: 'International Relations',
          name_ar: 'العلاقات الدولية',
          university_id: universities[1].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 15000,
          description: 'World-class international relations program',
          description_ar: 'برنامج عالمي في العلاقات الدولية',
          quota: 80,
          is_active: true
        },
        {
          name: 'Business Administration',
          name_ar: 'إدارة الأعمال',
          university_id: universities[1].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 14000,
          description: 'Top-ranked business administration program',
          description_ar: 'برنامج إدارة أعمال من الدرجة الأولى',
          quota: 150,
          is_active: true
        },
        {
          name: 'Mechanical Engineering',
          name_ar: 'الهندسة الميكانيكية',
          university_id: universities[2].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 4,
          tuition_fee: 6000,
          description: 'Strong mechanical engineering program',
          description_ar: 'برنامج قوي في الهندسة الميكانيكية',
          quota: 130,
          is_active: true
        }
      ];

      if (universities.length >= 4) {
        programs.push({
          name: 'Medicine',
          name_ar: 'الطب',
          university_id: universities[3].id,
          degree_type: 'Bachelor',
          language: 'English',
          duration: 6,
          tuition_fee: 25000,
          description: 'World-class medical education',
          description_ar: 'تعليم طبي عالمي المستوى',
          quota: 100,
          is_active: true
        });
      }

      const { data: addedPrograms, error: programsError } = await supabase
        .from('programs')
        .insert(programs)
        .select();

      if (programsError) {
        throw programsError;
      }

      return {
        success: true,
        message: `تم إضافة ${addedPrograms?.length || 0} برامج بنجاح`,
        details: { programsCount: addedPrograms?.length || 0 }
      };
    } catch (error) {
      errorHandler.logError(error, { context: 'initializePrograms' });
      return {
        success: false,
        message: 'فشل في إضافة البرامج: ' + (error as Error).message
      };
    }
  },

  async initializeSettings(): Promise<RealDemoDataResult> {
    try {
      // حذف الإعدادات الموجودة
      await supabase.from('settings').delete().neq('id', 0);
      await supabase.from('file_settings').delete().neq('id', 0);

      // إضافة إعدادات النظام
      const { error: settingsError } = await supabase
        .from('settings')
        .insert([
          {
            key: 'default_commission_rate',
            value: '10',
            category: 'commission',
            description: 'Default commission rate for agents',
            is_public: false
          },
          {
            key: 'max_file_size',
            value: '10',
            category: 'files',
            description: 'Maximum file size in MB',
            is_public: true
          },
          {
            key: 'enable_notifications',
            value: 'true',
            category: 'general',
            description: 'Enable system notifications',
            is_public: true
          }
        ]);

      if (settingsError) {
        throw settingsError;
      }

      // إضافة إعدادات الملفات
      const { error: fileSettingsError } = await supabase
        .from('file_settings')
        .insert([
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
            file_type: 'cv',
            category: 'document',
            max_size_mb: 5,
            allowed_extensions: ['pdf', 'doc', 'docx'],
            is_required: true
          }
        ]);

      if (fileSettingsError) {
        throw fileSettingsError;
      }

      return {
        success: true,
        message: 'تم إضافة إعدادات النظام بنجاح'
      };
    } catch (error) {
      errorHandler.logError(error, { context: 'initializeSettings' });
      return {
        success: false,
        message: 'فشل في إضافة الإعدادات: ' + (error as Error).message
      };
    }
  },

  async initializeCompleteData(): Promise<RealDemoDataResult> {
    try {
      console.log('Starting complete data initialization...');

      // المرحلة 1: إضافة الجامعات
      const universitiesResult = await this.initializeUniversities();
      if (!universitiesResult.success) {
        return universitiesResult;
      }

      // المرحلة 2: إضافة البرامج
      const programsResult = await this.initializePrograms();
      if (!programsResult.success) {
        return programsResult;
      }

      // المرحلة 3: إضافة الإعدادات
      const settingsResult = await this.initializeSettings();
      if (!settingsResult.success) {
        return settingsResult;
      }

      return {
        success: true,
        message: 'تم إنشاء جميع البيانات التجريبية بنجاح',
        details: {
          universities: universitiesResult.details,
          programs: programsResult.details,
          settings: true
        }
      };
    } catch (error) {
      errorHandler.logError(error, { context: 'initializeCompleteData' });
      return {
        success: false,
        message: 'فشل في إنشاء البيانات التجريبية: ' + (error as Error).message
      };
    }
  }
};
