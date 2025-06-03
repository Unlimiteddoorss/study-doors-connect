
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Camera,
  Save,
  Edit,
  Shield,
  Bell,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth: string;
  nationality: string;
  bio: string;
  avatar: string;
  academicInfo: {
    currentEducation: string;
    gpa: string;
    graduationYear: string;
    previousSchool: string;
    englishLevel: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    language: string;
    timezone: string;
  };
}

const StudentProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // محاكاة جلب البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile: StudentProfile = {
        id: '1',
        fullName: 'أحمد محمد علي',
        email: 'ahmed.mohamed@email.com',
        phone: '+966501234567',
        country: 'السعودية',
        city: 'الرياض',
        dateOfBirth: '2000-05-15',
        nationality: 'سعودي',
        bio: 'طالب طموح يسعى للحصول على تعليم عالي الجودة في مجال الهندسة.',
        avatar: '',
        academicInfo: {
          currentEducation: 'الثانوية العامة',
          gpa: '3.8',
          graduationYear: '2024',
          previousSchool: 'مدرسة الملك فهد الثانوية',
          englishLevel: 'متوسط'
        },
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          language: 'ar',
          timezone: 'Asia/Riyadh'
        }
      };
      
      setProfile(mockProfile);
    } catch (error) {
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل ملفك الشخصي",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث ملفك الشخصي بنجاح"
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string, section?: string) => {
    if (!profile) return;
    
    if (section) {
      setProfile(prev => prev ? {
        ...prev,
        [section]: {
          ...(prev[section as keyof StudentProfile] as Record<string, any>),
          [field]: value
        }
      } : null);
    } else {
      setProfile(prev => prev ? {
        ...prev,
        [field]: value
      } : null);
    }
  };

  if (!profile) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-unlimited-dark-blue">
              الملف الشخصي
            </h1>
            <p className="text-unlimited-gray mt-2">
              إدارة معلوماتك الشخصية والأكاديمية
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                تعديل الملف
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-xl">
                    {profile.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full p-2"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <h2 className="text-2xl font-bold mb-2">{profile.fullName}</h2>
                <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </span>
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" />
                    {profile.city}, {profile.country}
                  </span>
                </div>
                {profile.bio && (
                  <p className="mt-3 text-gray-600">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="academic">المعلومات الأكاديمية</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
            <TabsTrigger value="preferences">التفضيلات</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-unlimited-blue" />
                  المعلومات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">الجنسية</Label>
                    <Input
                      id="nationality"
                      value={profile.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-unlimited-blue" />
                  المعلومات الأكاديمية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentEducation">المستوى التعليمي الحالي</Label>
                    <Input
                      id="currentEducation"
                      value={profile.academicInfo.currentEducation}
                      onChange={(e) => handleInputChange('currentEducation', e.target.value, 'academicInfo')}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">المعدل التراكمي</Label>
                    <Input
                      id="gpa"
                      value={profile.academicInfo.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value, 'academicInfo')}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">سنة التخرج المتوقعة</Label>
                    <Input
                      id="graduationYear"
                      value={profile.academicInfo.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value, 'academicInfo')}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="englishLevel">مستوى اللغة الإنجليزية</Label>
                    <Select 
                      value={profile.academicInfo.englishLevel}
                      onValueChange={(value) => handleInputChange('englishLevel', value, 'academicInfo')}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">مبتدئ</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="advanced">متقدم</SelectItem>
                        <SelectItem value="native">متحدث أصلي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="previousSchool">المدرسة/الجامعة السابقة</Label>
                  <Input
                    id="previousSchool"
                    value={profile.academicInfo.previousSchool}
                    onChange={(e) => handleInputChange('previousSchool', e.target.value, 'academicInfo')}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-unlimited-blue" />
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="أدخل كلمة المرور الحالية"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="أدخل كلمة المرور الجديدة"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-unlimited-blue" />
                  تفضيلات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                      <p className="text-sm text-gray-600">تلقي الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.preferences.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked.toString(), 'preferences')}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إشعارات الرسائل النصية</h4>
                      <p className="text-sm text-gray-600">تلقي الإشعارات عبر الرسائل النصية</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.preferences.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked.toString(), 'preferences')}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">اللغة المفضلة</Label>
                      <Select 
                        value={profile.preferences.language}
                        onValueChange={(value) => handleInputChange('language', value, 'preferences')}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="tr">Türkçe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">المنطقة الزمنية</Label>
                      <Select 
                        value={profile.preferences.timezone}
                        onValueChange={(value) => handleInputChange('timezone', value, 'preferences')}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Riyadh">الرياض</SelectItem>
                          <SelectItem value="Asia/Dubai">دبي</SelectItem>
                          <SelectItem value="Europe/Istanbul">إسطنبول</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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

export default StudentProfile;
