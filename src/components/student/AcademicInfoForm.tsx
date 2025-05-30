
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AcademicInfoFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

const AcademicInfoForm = ({ initialData = {}, onSave }: AcademicInfoFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    education: initialData.education || '',
    graduationYear: initialData.graduationYear || '',
    gpa: initialData.gpa || '',
    englishProficiency: initialData.englishProficiency || 'intermediate',
    previousStudy: initialData.previousStudy || '',
    achievements: initialData.achievements || '',
    hasScholarship: initialData.hasScholarship || 'no',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // حفظ البيانات فورًا لاستخدامها في الخطوة التالية
    onSave({
      ...formData,
      [field]: value
    });
  };

  const handleSaveClick = () => {
    // التحقق من البيانات المطلوبة
    if (!formData.education) {
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.educationRequired', 'المؤهل الدراسي مطلوب'),
        variant: 'destructive',
      });
      return;
    }
    
    // حفظ البيانات
    onSave(formData);
    
    // عرض رسالة نجاح
    toast({
      title: t('application.form.saved', 'تم الحفظ'),
      description: t('application.form.academicInfoSaved', 'تم حفظ المعلومات الأكاديمية'),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.academic.title', 'المعلومات الأكاديمية')}</h3>
        <p className="text-unlimited-gray">{t('application.academic.description', 'أدخل معلوماتك الأكاديمية ومؤهلاتك التعليمية.')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="education">{t('application.academic.lastEducation', 'آخر مؤهل دراسي')}</Label>
          <Select 
            value={formData.education} 
            onValueChange={(value) => handleInputChange('education', value)}
          >
            <SelectTrigger id="education">
              <SelectValue placeholder={t('application.academic.selectEducation', 'اختر المؤهل')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high_school">{t('application.academic.highSchool', 'ثانوية عامة')}</SelectItem>
              <SelectItem value="bachelor">{t('application.academic.bachelor', 'بكالوريوس')}</SelectItem>
              <SelectItem value="master">{t('application.academic.master', 'ماجستير')}</SelectItem>
              <SelectItem value="phd">{t('application.academic.phd', 'دكتوراه')}</SelectItem>
              <SelectItem value="other">{t('application.academic.other', 'أخرى')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="graduationYear">{t('application.academic.graduationYear', 'سنة التخرج')}</Label>
          <Select 
            value={formData.graduationYear} 
            onValueChange={(value) => handleInputChange('graduationYear', value)}
          >
            <SelectTrigger id="graduationYear">
              <SelectValue placeholder={t('application.academic.selectYear', 'اختر السنة')} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gpa">{t('application.academic.gpa', 'المعدل التراكمي')}</Label>
          <Input
            id="gpa"
            placeholder={t('application.academic.gpaPlaceholder', 'مثال: 3.5 من 4.0')}
            value={formData.gpa}
            onChange={(e) => handleInputChange('gpa', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="englishProficiency">{t('application.academic.englishLevel', 'مستوى اللغة الإنجليزية')}</Label>
          <Select 
            value={formData.englishProficiency} 
            onValueChange={(value) => handleInputChange('englishProficiency', value)}
          >
            <SelectTrigger id="englishProficiency">
              <SelectValue placeholder={t('application.academic.selectEnglishLevel', 'اختر المستوى')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">{t('application.academic.beginner', 'مبتدئ')}</SelectItem>
              <SelectItem value="intermediate">{t('application.academic.intermediate', 'متوسط')}</SelectItem>
              <SelectItem value="advanced">{t('application.academic.advanced', 'متقدم')}</SelectItem>
              <SelectItem value="fluent">{t('application.academic.fluent', 'طليق')}</SelectItem>
              <SelectItem value="native">{t('application.academic.native', 'لغة أم')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="previousStudy">{t('application.academic.previousStudy', 'دراسات سابقة')}</Label>
        <Textarea
          id="previousStudy"
          placeholder={t('application.academic.previousStudyPlaceholder', 'أدخل معلومات عن دراساتك السابقة (اختياري)')}
          className="h-24"
          value={formData.previousStudy}
          onChange={(e) => handleInputChange('previousStudy', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="achievements">{t('application.academic.achievements', 'الإنجازات والشهادات')}</Label>
        <Textarea
          id="achievements"
          placeholder={t('application.academic.achievementsPlaceholder', 'أدخل الإنجازات والشهادات التي حصلت عليها (اختياري)')}
          className="h-24"
          value={formData.achievements}
          onChange={(e) => handleInputChange('achievements', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>{t('application.academic.applyScholarship', 'هل تريد التقديم على منحة دراسية؟')}</Label>
        <RadioGroup 
          value={formData.hasScholarship} 
          onValueChange={(value) => handleInputChange('hasScholarship', value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="yes" id="scholarship-yes" />
            <Label htmlFor="scholarship-yes">{t('application.academic.yes', 'نعم')}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="no" id="scholarship-no" />
            <Label htmlFor="scholarship-no">{t('application.academic.no', 'لا')}</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSaveClick}
          className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
        >
          {t('application.buttons.saveProgress', 'حفظ التقدم')}
        </Button>
      </div>
    </div>
  );
};

export default AcademicInfoForm;
