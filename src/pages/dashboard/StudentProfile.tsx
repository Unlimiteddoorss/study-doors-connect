
import { useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Globe, MapPin, Pencil, Upload, Camera, CalendarIcon, Save, MoreHorizontal, Trash2, FileEdit, RefreshCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// List of nationalities
const nationalities = [
  "الأردنية", "الإماراتية", "البحرينية", "التونسية", "الجزائرية", "السعودية", "السودانية",
  "السورية", "العراقية", "العمانية", "الفلسطينية", "القطرية", "الكويتية", "اللبنانية", 
  "الليبية", "المصرية", "المغربية", "اليمنية", "الموريتانية", "الصومالية", "الجيبوتية",
  "جزر القمر", "التركية", "الأمريكية", "البريطانية", "الفرنسية", "الألمانية", "الإيطالية",
  "الإسبانية", "الروسية", "الصينية", "اليابانية", "الكورية الجنوبية", "الهندية", "الباكستانية",
  "الأفغانية", "الإيرانية", "الماليزية", "الإندونيسية", "الفلبينية", "النيجيرية", "الكينية",
  "الإثيوبية", "الجنوب أفريقية", "الكندية", "الأسترالية"
];

// List of countries with visa options
const visaCountries = [
  "تركيا", "الإمارات", "السعودية", "قطر", "مصر", "المغرب", "الأردن", "لبنان", 
  "ماليزيا", "إندونيسيا", "سنغافورة", "تايلاند", "الولايات المتحدة", "كندا", 
  "المملكة المتحدة", "دول منطقة شينغن", "أستراليا", "نيوزيلندا", "اليابان", 
  "كوريا الجنوبية", "البرازيل", "الصين", "روسيا", "جنوب أفريقيا"
];

const StudentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('personal');
  
  const [profileData, setProfileData] = useState({
    firstName: 'محمد',
    lastName: 'أحمد',
    email: 'mohammad.ahmed@example.com',
    phone: '+90 552 123 4567',
    country: 'تركيا',
    city: 'إسطنبول',
    address: 'حي بشكتاش، شارع عثمان رقم 45',
    birthdate: '15/03/1998',
    passportExpiry: '10/05/2028',
    nationality: 'سوري',
    passportNumber: 'S123456789',
    education: 'بكالوريوس علوم الحاسوب - جامعة دمشق',
    languages: 'العربية (أصلي)، الإنجليزية (جيد)، التركية (متوسط)',
    bio: 'طالب طموح يسعى لإكمال دراساته العليا في مجال علوم البيانات والذكاء الاصطناعي.',
    visaCountries: ['تركيا'],
  });

  // Convert string dates to Date objects for the calendar
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    profileData.birthdate ? parseArabicDate(profileData.birthdate) : undefined
  );
  const [passportExpiryDate, setPassportExpiryDate] = useState<Date | undefined>(
    profileData.passportExpiry ? parseArabicDate(profileData.passportExpiry) : undefined
  );

  // Parse date in DD/MM/YYYY format
  function parseArabicDate(dateStr: string): Date | undefined {
    try {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day);
    } catch (error) {
      return undefined;
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If we're canceling edit mode, reset dates to the stored values
      setBirthDate(profileData.birthdate ? parseArabicDate(profileData.birthdate) : undefined);
      setPassportExpiryDate(profileData.passportExpiry ? parseArabicDate(profileData.passportExpiry) : undefined);
    }
  };

  const handleSave = () => {
    // Update the profileData with the formatted dates from the calendar
    const updatedProfileData = {
      ...profileData,
      birthdate: birthDate ? format(birthDate, 'dd/MM/yyyy') : profileData.birthdate,
      passportExpiry: passportExpiryDate ? format(passportExpiryDate, 'dd/MM/yyyy') : profileData.passportExpiry,
    };
    
    setProfileData(updatedProfileData);
    setIsEditing(false);
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBirthDate(profileData.birthdate ? parseArabicDate(profileData.birthdate) : undefined);
    setPassportExpiryDate(profileData.passportExpiry ? parseArabicDate(profileData.passportExpiry) : undefined);
    
    toast({
      title: "تم الإلغاء",
      description: "تم إلغاء التعديلات",
      variant: "destructive"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date);
  };

  const handlePassportExpiryChange = (date: Date | undefined) => {
    setPassportExpiryDate(date);
  };

  const handleUploadProfilePicture = () => {
    toast({
      title: "تحميل الصورة",
      description: "يرجى اختيار صورة شخصية",
    });
  };

  const handleResetProfile = () => {
    toast({
      title: "إعادة تعيين البيانات",
      description: "هل أنت متأكد من إعادة تعيين بياناتك الشخصية؟",
      variant: "destructive",
    });
  };

  const handleVerifyAccount = () => {
    toast({
      title: "توثيق الحساب",
      description: "سيتم إرسال رمز التحقق إلى بريدك الإلكتروني",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">الملف الشخصي</CardTitle>
                <CardDescription>عرض وتحديث معلوماتك الشخصية</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="flex items-center gap-2"
                    >
                      إلغاء
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      حفظ التغييرات
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="default" 
                      onClick={handleEdit}
                      className="flex items-center gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      تعديل البيانات
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleVerifyAccount} className="flex items-center gap-2 cursor-pointer">
                          <FileEdit className="h-4 w-4" />
                          <span>توثيق الحساب</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleUploadProfilePicture} className="flex items-center gap-2 cursor-pointer">
                          <Camera className="h-4 w-4" />
                          <span>تغيير الصورة الشخصية</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleResetProfile} className="text-red-500 flex items-center gap-2 cursor-pointer">
                          <RefreshCcw className="h-4 w-4" />
                          <span>إعادة تعيين البيانات</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          
          <div className="px-6 pb-4 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow">
                  <User size={60} className="text-unlimited-gray" />
                </div>
                {isEditing && (
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0" 
                    onClick={handleUploadProfilePicture}
                  >
                    <Camera size={18} />
                  </Button>
                )}
              </div>
              <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
              <p className="text-unlimited-gray">{profileData.email}</p>
              <div className="mt-4 w-full">
                <Button className="w-full mt-2" variant="outline">مشاهدة المستندات</Button>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="personal">معلومات شخصية</TabsTrigger>
                  <TabsTrigger value="academic">المعلومات الأكاديمية</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">الاسم الأول</label>
                      {isEditing ? (
                        <Input 
                          name="firstName" 
                          value={profileData.firstName} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">الاسم الأخير</label>
                      {isEditing ? (
                        <Input 
                          name="lastName" 
                          value={profileData.lastName} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">البريد الإلكتروني</label>
                      {isEditing ? (
                        <Input 
                          name="email" 
                          value={profileData.email} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                          <Mail size={16} className="text-unlimited-gray" />
                          {profileData.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">رقم الهاتف</label>
                      {isEditing ? (
                        <Input 
                          name="phone" 
                          value={profileData.phone} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                          <Phone size={16} className="text-unlimited-gray" />
                          {profileData.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">البلد</label>
                      {isEditing ? (
                        <Select
                          value={profileData.country}
                          onValueChange={(value) => handleSelectChange('country', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الدولة" />
                          </SelectTrigger>
                          <SelectContent>
                            {visaCountries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                          <Globe size={16} className="text-unlimited-gray" />
                          {profileData.country}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">المدينة</label>
                      {isEditing ? (
                        <Input 
                          name="city" 
                          value={profileData.city} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                          <MapPin size={16} className="text-unlimited-gray" />
                          {profileData.city}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">العنوان</label>
                      {isEditing ? (
                        <Input 
                          name="address" 
                          value={profileData.address} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">تاريخ الميلاد</label>
                      {isEditing ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-right"
                            >
                              <CalendarIcon className="ml-2 h-4 w-4" />
                              {birthDate ? format(birthDate, "dd/MM/yyyy") : <span>اختر التاريخ</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                            <Calendar
                              mode="single"
                              selected={birthDate}
                              onSelect={handleBirthDateChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                              fromYear={1940}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.birthdate}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">الجنسية</label>
                      {isEditing ? (
                        <Select
                          value={profileData.nationality}
                          onValueChange={(value) => handleSelectChange('nationality', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنسية" />
                          </SelectTrigger>
                          <SelectContent className="max-h-80">
                            {nationalities.map((nationality) => (
                              <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.nationality}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">رقم جواز السفر</label>
                      {isEditing ? (
                        <Input 
                          name="passportNumber" 
                          value={profileData.passportNumber} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.passportNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">تاريخ انتهاء الجواز</label>
                      {isEditing ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-right"
                            >
                              <CalendarIcon className="ml-2 h-4 w-4" />
                              {passportExpiryDate ? format(passportExpiryDate, "dd/MM/yyyy") : <span>اختر التاريخ</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                            <Calendar
                              mode="single"
                              selected={passportExpiryDate}
                              onSelect={handlePassportExpiryChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                              defaultMonth={new Date()}
                              disabled={(date) => date < new Date()}
                              fromYear={new Date().getFullYear()}
                              toYear={new Date().getFullYear() + 20}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.passportExpiry}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="academic" className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">المؤهل العلمي</label>
                    {isEditing ? (
                      <Input 
                        name="education" 
                        value={profileData.education} 
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 border rounded-md bg-gray-50">{profileData.education}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">اللغات</label>
                    {isEditing ? (
                      <Input 
                        name="languages" 
                        value={profileData.languages} 
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 border rounded-md bg-gray-50">{profileData.languages}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">نبذة شخصية</label>
                    {isEditing ? (
                      <Textarea 
                        name="bio" 
                        value={profileData.bio} 
                        onChange={handleInputChange}
                        rows={4}
                      />
                    ) : (
                      <p className="p-2 border rounded-md bg-gray-50">{profileData.bio}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
