
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudentApplicationFormProps {
  type: 'personal' | 'academic';
  value: any;
  onChange: (value: any) => void;
}

const StudentApplicationForm = ({ type, value, onChange }: StudentApplicationFormProps) => {
  const handleChange = (field: string, fieldValue: any) => {
    onChange({ ...value, [field]: fieldValue });
  };

  if (type === 'personal') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">الاسم الأول</Label>
            <Input 
              id="firstName"
              value={value?.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="أدخل الاسم الأول"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">اسم العائلة</Label>
            <Input 
              id="lastName"
              value={value?.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="أدخل اسم العائلة"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input 
              id="email"
              type="email"
              value={value?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input 
              id="phone"
              value={value?.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="أدخل رقم الهاتف"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nationality">الجنسية</Label>
            <Select 
              value={value?.nationality || ''} 
              onValueChange={(val) => handleChange('nationality', val)}
            >
              <SelectTrigger id="nationality">
                <SelectValue placeholder="اختر الجنسية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saudi">سعودي</SelectItem>
                <SelectItem value="emirati">إماراتي</SelectItem>
                <SelectItem value="qatari">قطري</SelectItem>
                <SelectItem value="kuwaiti">كويتي</SelectItem>
                <SelectItem value="bahraini">بحريني</SelectItem>
                <SelectItem value="omani">عماني</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">الجنس</Label>
            <Select 
              value={value?.gender || ''} 
              onValueChange={(val) => handleChange('gender', val)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="اختر الجنس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">ذكر</SelectItem>
                <SelectItem value="female">أنثى</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">العنوان</Label>
          <Textarea 
            id="address"
            value={value?.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="أدخل العنوان"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education">المستوى التعليمي</Label>
            <Select 
              value={value?.education || ''} 
              onValueChange={(val) => handleChange('education', val)}
            >
              <SelectTrigger id="education">
                <SelectValue placeholder="اختر المستوى التعليمي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high_school">ثانوية عامة</SelectItem>
                <SelectItem value="bachelor">بكالوريوس</SelectItem>
                <SelectItem value="master">ماجستير</SelectItem>
                <SelectItem value="phd">دكتوراه</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">التخصص</Label>
            <Input 
              id="major"
              value={value?.major || ''}
              onChange={(e) => handleChange('major', e.target.value)}
              placeholder="أدخل التخصص"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">المؤسسة التعليمية</Label>
            <Input 
              id="institution"
              value={value?.institution || ''}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="أدخل اسم المؤسسة التعليمية"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">سنة التخرج</Label>
            <Input 
              id="graduationYear"
              type="number"
              value={value?.graduationYear || ''}
              onChange={(e) => handleChange('graduationYear', e.target.value)}
              placeholder="أدخل سنة التخرج"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpa">المعدل التراكمي</Label>
          <Input 
            id="gpa"
            value={value?.gpa || ''}
            onChange={(e) => handleChange('gpa', e.target.value)}
            placeholder="أدخل المعدل التراكمي"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="academicAchievements">الإنجازات الأكاديمية</Label>
          <Textarea 
            id="academicAchievements"
            value={value?.academicAchievements || ''}
            onChange={(e) => handleChange('academicAchievements', e.target.value)}
            placeholder="أدخل الإنجازات الأكاديمية"
          />
        </div>
      </div>
    );
  }
};

export default StudentApplicationForm;
