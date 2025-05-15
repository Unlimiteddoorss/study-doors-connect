
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SupportContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // هنا سيتم إرسال البيانات إلى الخادم (API)
    try {
      // محاكاة إرسال البيانات - يمكن استبدالها بطلب API حقيقي
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('support.formSubmitted', 'تم إرسال رسالتك بنجاح'),
        description: t('support.formSubmittedDesc', 'سيقوم فريق الدعم بالتواصل معك في أقرب وقت ممكن.'),
      });
      
      // إعادة تعيين النموذج
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: t('support.errorSubmitting', 'خطأ في إرسال الرسالة'),
        description: t('support.errorSubmittingDesc', 'يرجى المحاولة مرة أخرى لاحقاً.'),
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const categories = [
    { value: 'general', label: t('support.categories.general', 'استفسارات عامة') },
    { value: 'application', label: t('support.categories.application', 'طلبات التقديم') },
    { value: 'technical', label: t('support.categories.technical', 'مشاكل تقنية') },
    { value: 'payment', label: t('support.categories.payment', 'المدفوعات والرسوم') },
    { value: 'visa', label: t('support.categories.visa', 'التأشيرات والإقامة') },
    { value: 'other', label: t('support.categories.other', 'أخرى') },
  ];

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t('support.form.name', 'الاسم الكامل')} *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t('support.form.namePlaceholder', 'أدخل اسمك الكامل')}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t('support.form.email', 'البريد الإلكتروني')} *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t('support.form.emailPlaceholder', 'أدخل بريدك الإلكتروني')}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            {t('support.form.phone', 'رقم الهاتف')}
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('support.form.phonePlaceholder', 'أدخل رقم هاتفك')}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            {t('support.form.category', 'الفئة')} *
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder={t('support.form.categoryPlaceholder', 'اختر فئة الاستفسار')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          {t('support.form.subject', 'الموضوع')} *
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder={t('support.form.subjectPlaceholder', 'أدخل موضوع رسالتك')}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t('support.form.message', 'الرسالة')} *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={t('support.form.messagePlaceholder', 'اكتب تفاصيل استفسارك أو رسالتك هنا...')}
          className="resize-none"
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('support.form.sending', 'جاري الإرسال...')}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {t('support.form.send', 'إرسال الرسالة')}
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default SupportContactForm;
