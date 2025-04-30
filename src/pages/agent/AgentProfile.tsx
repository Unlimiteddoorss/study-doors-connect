
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, User, Mail, Phone, MapPin, Globe, Lock, Shield } from 'lucide-react';

const AgentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data for agent profile
  const [profile, setProfile] = useState({
    name: 'خالد الأحمد',
    email: 'khalid@example.com',
    phone: '+966501234567',
    country: 'المملكة العربية السعودية',
    address: 'الرياض، حي الورود',
    website: 'www.khalidagent.com',
    bio: 'وكيل تعليمي متخصص في جامعات المملكة العربية السعودية وتركيا، خبرة 5 سنوات في مجال الاستشارات التعليمية.',
  });
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم حفظ التغييرات بنجاح",
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  
  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">الملف الشخصي</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>تعديل الملف الشخصي</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>إلغاء</Button>
              <Button onClick={handleSaveProfile}>حفظ التغييرات</Button>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              المعلومات الشخصية
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              الأمان
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>
                  إدارة معلوماتك الشخصية وبيانات التواصل
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-unlimited-gray" />
                      <Label>الاسم</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-unlimited-gray" />
                      <Label>البريد الإلكتروني</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-unlimited-gray" />
                      <Label>رقم الهاتف</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-unlimited-gray" />
                      <Label>الدولة</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="country"
                        value={profile.country}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.country}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-unlimited-gray" />
                      <Label>العنوان</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.address}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-unlimited-gray" />
                      <Label>الموقع الإلكتروني</Label>
                    </div>
                    {isEditing ? (
                      <Input 
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-unlimited-dark-blue font-medium">{profile.website}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-unlimited-gray" />
                    <Label>نبذة تعريفية</Label>
                  </div>
                  {isEditing ? (
                    <Textarea 
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  ) : (
                    <p className="text-unlimited-dark-blue font-medium">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>الأمان</CardTitle>
                <CardDescription>
                  إدارة إعدادات الأمان وكلمة المرور
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-unlimited-gray" />
                      <div>
                        <p className="font-medium">تغيير كلمة المرور</p>
                        <p className="text-sm text-unlimited-gray">قم بتحديث كلمة المرور الخاصة بك</p>
                      </div>
                    </div>
                    <Button variant="outline">تغيير</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-unlimited-gray" />
                      <div>
                        <p className="font-medium">المصادقة الثنائية</p>
                        <p className="text-sm text-unlimited-gray">زيادة أمان حسابك باستخدام المصادقة الثنائية</p>
                      </div>
                    </div>
                    <Button variant="outline">تفعيل</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentProfile;
