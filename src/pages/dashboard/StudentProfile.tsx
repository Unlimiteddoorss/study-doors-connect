
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Globe, MapPin, Pencil, Upload, Camera } from 'lucide-react';

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
    nationality: 'سوري',
    passportNumber: 'S123456789',
    passportExpiry: '10/05/2028',
    education: 'بكالوريوس علوم الحاسوب - جامعة دمشق',
    languages: 'العربية (أصلي)، الإنجليزية (جيد)، التركية (متوسط)',
    bio: 'طالب طموح يسعى لإكمال دراساته العليا في مجال علوم البيانات والذكاء الاصطناعي.',
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProfilePicture = () => {
    toast({
      title: "تحميل الصورة",
      description: "يرجى اختيار صورة شخصية",
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
              <Button variant={isEditing ? "default" : "outline"} onClick={handleEdit}>
                {isEditing ? 'إلغاء' : 'تعديل البيانات'}
              </Button>
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
                        <Input 
                          name="country" 
                          value={profileData.country} 
                          onChange={handleInputChange}
                        />
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
                        <Input 
                          name="birthdate" 
                          value={profileData.birthdate} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="p-2 border rounded-md bg-gray-50">{profileData.birthdate}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">الجنسية</label>
                      {isEditing ? (
                        <Input 
                          name="nationality" 
                          value={profileData.nationality} 
                          onChange={handleInputChange}
                        />
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
                        <Input 
                          name="passportExpiry" 
                          value={profileData.passportExpiry} 
                          onChange={handleInputChange}
                        />
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
          
          {isEditing && (
            <CardFooter className="flex justify-end border-t p-4">
              <Button onClick={handleSave}>
                <Pencil className="mr-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
