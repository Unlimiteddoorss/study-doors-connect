
import { useTranslation } from "react-i18next";
import { useState } from "react";
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
  });
  
  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Save data immediately for use in next step
    onSave({
      ...formData,
      [field]: value
    });
  };
  
  const handleSaveClick = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: t('application.validation.error', 'خطأ في البيانات'),
        description: t('application.validation.personalInfoIncomplete', 'المعلومات الشخصية غير مكتملة'),
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("application.personal.firstName", "الاسم الأول")}</Label>
          <Input 
            id="firstName" 
            placeholder={t("application.personal.firstNamePlaceholder", "أدخل اسمك الأول")} 
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("application.personal.lastName", "اسم العائلة")}</Label>
          <Input 
            id="lastName" 
            placeholder={t("application.personal.lastNamePlaceholder", "أدخل اسم عائلتك")} 
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("application.personal.email", "البريد الإلكتروني")}</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="example@example.com" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("application.personal.phone", "رقم الهاتف")}</Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="+1234567890" 
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>{t("application.personal.gender", "الجنس")}</Label>
        <RadioGroup 
          defaultValue={formData.gender} 
          onValueChange={(value) => handleInputChange('gender', value)}
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

      <div className="space-y-4">
        <Label>{t("application.personal.birthDate", "تاريخ الميلاد")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-start font-normal",
                !formData.birthDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className={`${isRtl ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {formData.birthDate ? format(formData.birthDate, "PPP") : t("application.personal.selectDate", "اختر تاريخ")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.birthDate}
              onSelect={(date) => handleInputChange('birthDate', date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <Label>{t("application.personal.nationality", "الجنسية")}</Label>
        <Select 
          value={formData.nationality} 
          onValueChange={(value) => handleInputChange('nationality', value)}
        >
          <SelectTrigger className="w-[280px]">
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

export default PersonalInfoForm;
