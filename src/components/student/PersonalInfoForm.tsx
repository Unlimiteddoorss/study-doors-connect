
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { ar, enUS } from 'date-fns/locale';

interface PersonalInfoFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

const PersonalInfoForm = ({ initialData = {}, onSave }: PersonalInfoFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    gender: initialData.gender || 'male',
    birthDate: initialData.birthDate ? new Date(initialData.birthDate) : undefined,
    nationality: initialData.nationality || '',
    passportNumber: initialData.passportNumber || '',
    address: initialData.address || '',
    city: initialData.city || '',
    country: initialData.country || '',
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  
  // التحقق من البيانات المدخلة
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};
    
    if (touched.firstName && !formData.firstName) {
      newErrors.firstName = t('validation.required', 'هذا الحقل مطلوب');
    }
    
    if (touched.lastName && !formData.lastName) {
      newErrors.lastName = t('validation.required', 'هذا الحقل مطلوب');
    }
    
    if (touched.email) {
      if (!formData.email) {
        newErrors.email = t('validation.required', 'هذا الحقل مطلوب');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('validation.invalidEmail', 'البريد الإلكتروني غير صحيح');
      }
    }
    
    if (touched.phone) {
      if (!formData.phone) {
        newErrors.phone = t('validation.required', 'هذا الحقل مطلوب');
      } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = t('validation.invalidPhone', 'رقم الهاتف غير صحيح');
      }
    }
    
    setErrors(newErrors);
  }, [formData, touched, t]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Save data immediately for use in next step
    onSave({
      ...formData,
      [field]: value
    });
  };
  
  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };
  
  const handleSaveClick = () => {
    // Mark all fields as touched for validation
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setTouched(allTouched);
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.personalInfoIncomplete', 'المعلومات الشخصية غير مكتملة'),
        variant: 'destructive',
      });
      return;
    }
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.correctErrors', 'يرجى تصحيح الأخطاء قبل المتابعة'),
        variant: 'destructive',
      });
      return;
    }
    
    // Save data
    onSave(formData);
    
    // Show success message
    toast({
      title: t('application.form.saved', 'تم الحفظ'),
      description: t('application.form.personalInfoSaved', 'تم حفظ المعلومات الشخصية'),
    });
  };
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <Label htmlFor="firstName" className={errors.firstName ? 'text-red-500' : ''}>
            {t("application.personal.firstName", "الاسم الأول")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder={t("application.personal.firstNamePlaceholder", "أدخل اسمك الأول")} 
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            className={errors.firstName ? 'border-red-300' : ''}
            required
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className={errors.lastName ? 'text-red-500' : ''}>
            {t("application.personal.lastName", "اسم العائلة")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="lastName" 
            placeholder={t("application.personal.lastNamePlaceholder", "أدخل اسم عائلتك")} 
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            className={errors.lastName ? 'border-red-300' : ''}
            required
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? 'text-red-500' : ''}>
            {t("application.personal.email", "البريد الإلكتروني")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email"
            placeholder="example@example.com" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={errors.email ? 'border-red-300' : ''}
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className={errors.phone ? 'text-red-500' : ''}>
            {t("application.personal.phone", "رقم الهاتف")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="+1234567890" 
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={errors.phone ? 'border-red-300' : ''}
            required
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="passportNumber">
            {t("application.personal.passportNumber", "رقم جواز السفر")}
          </Label>
          <Input 
            id="passportNumber" 
            placeholder={t("application.personal.passportNumberPlaceholder", "أدخل رقم جواز السفر")} 
            value={formData.passportNumber}
            onChange={(e) => handleInputChange('passportNumber', e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label>{t("application.personal.gender", "الجنس")} <span className="text-red-500">*</span></Label>
          <RadioGroup 
            value={formData.gender} 
            onValueChange={(value) => handleInputChange('gender', value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{t("application.personal.male", "ذكر")}</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{t("application.personal.female", "أنثى")}</Label>
            </div>
          </RadioGroup>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <Label>{t("application.personal.birthDate", "تاريخ الميلاد")} <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full md:w-[280px] justify-start text-start font-normal",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {formData.birthDate ? format(formData.birthDate, "PPP", { 
                  locale: isRtl ? ar : enUS 
                }) : t("application.personal.selectDate", "اختر تاريخ")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.birthDate}
                onSelect={(date) => handleInputChange('birthDate', date)}
                initialFocus
                locale={isRtl ? ar : enUS}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <Label>{t("application.personal.nationality", "الجنسية")} <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.nationality} 
            onValueChange={(value) => handleInputChange('nationality', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("application.personal.selectNationality", "اختر الجنسية")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sa">السعودية</SelectItem>
              <SelectItem value="ae">الإمارات</SelectItem>
              <SelectItem value="kw">الكويت</SelectItem>
              <SelectItem value="qa">قطر</SelectItem>
              <SelectItem value="om">عمان</SelectItem>
              <SelectItem value="bh">البحرين</SelectItem>
              <SelectItem value="eg">مصر</SelectItem>
              <SelectItem value="jo">الأردن</SelectItem>
              <SelectItem value="sy">سوريا</SelectItem>
              <SelectItem value="lb">لبنان</SelectItem>
              <SelectItem value="iq">العراق</SelectItem>
              <SelectItem value="ye">اليمن</SelectItem>
              <SelectItem value="ps">فلسطين</SelectItem>
              <SelectItem value="sd">السودان</SelectItem>
              <SelectItem value="ly">ليبيا</SelectItem>
              <SelectItem value="ma">المغرب</SelectItem>
              <SelectItem value="tn">تونس</SelectItem>
              <SelectItem value="dz">الجزائر</SelectItem>
              <SelectItem value="tr">تركيا</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-2">
          <Label htmlFor="address">
            {t("application.personal.address", "العنوان")}
          </Label>
          <Input 
            id="address" 
            placeholder={t("application.personal.addressPlaceholder", "أدخل عنوانك")} 
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="city">
              {t("application.personal.city", "المدينة")}
            </Label>
            <Input 
              id="city" 
              placeholder={t("application.personal.cityPlaceholder", "أدخل مدينتك")} 
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">
              {t("application.personal.country", "البلد")}
            </Label>
            <Input 
              id="country" 
              placeholder={t("application.personal.countryPlaceholder", "أدخل بلدك")} 
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-sm text-unlimited-gray">
          <span className="text-red-500">*</span> {t('application.personal.requiredFields', 'حقول مطلوبة')}
        </p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            type="button"
            onClick={handleSaveClick}
            className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
          >
            {t('application.buttons.saveProgress', 'حفظ التقدم')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
