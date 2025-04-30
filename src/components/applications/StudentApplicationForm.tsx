
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CalendarIcon, GraduationCap, School, User } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const applicationFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: 'الإسم الأول مطلوب' }),
  middleName: z.string(),
  lastName: z.string().min(2, { message: 'الإسم الأخير مطلوب' }),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.date(),
  nationality: z.string().min(1, { message: 'الجنسية مطلوبة' }),
  passportNumber: z.string().min(1, { message: 'رقم جواز السفر مطلوب' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صحيح' }),
  phone: z.string().min(1, { message: 'رقم الهاتف مطلوب' }),
  residenceCountry: z.string().min(1, { message: 'بلد الإقامة مطلوبة' }),
  residenceCity: z.string(),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  
  // Family Information
  fathersName: z.string(),
  mothersName: z.string(),
  
  // Educational Background
  educationLevel: z.enum(['highschool', 'bachelor', 'master', 'doctorate']),
  universityName: z.string(),
  graduationYear: z.string(),
  gpa: z.string(),
  educationCountry: z.string(),
  
  // Program Details
  desiredCountry: z.string(),
  desiredUniversity: z.string(),
  desiredProgram: z.string(),
  degreeLevel: z.enum(['bachelor', 'master', 'doctorate']),
  desiredSemester: z.enum(['fall', 'spring', 'summer']),
  academicYear: z.string(),
  
  // Additional Information
  englishProficiency: z.enum(['beginner', 'intermediate', 'advanced', 'native', 'certified']),
  englishTest: z.enum(['none', 'toefl', 'ielts', 'duolingo']).optional(),
  englishScore: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const defaultValues: Partial<ApplicationFormValues> = {
  middleName: '',
  gender: 'male',
  dateOfBirth: new Date(1995, 0, 1),
  maritalStatus: 'single',
  educationLevel: 'bachelor',
  desiredSemester: 'fall',
  englishProficiency: 'intermediate',
  degreeLevel: 'bachelor',
  academicYear: '2025-2026',
};

const StudentApplicationForm = ({ onSubmit }: { onSubmit: (data: ApplicationFormValues) => void }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues,
  });
  
  const nextStep = () => {
    if (currentStep === 1) {
      form.trigger(['firstName', 'lastName', 'gender', 'dateOfBirth', 'nationality', 'passportNumber', 'email', 'phone', 'residenceCountry', 'maritalStatus']);
      if (
        !form.formState.errors.firstName &&
        !form.formState.errors.lastName &&
        !form.formState.errors.gender &&
        !form.formState.errors.dateOfBirth &&
        !form.formState.errors.nationality &&
        !form.formState.errors.passportNumber &&
        !form.formState.errors.email &&
        !form.formState.errors.phone &&
        !form.formState.errors.residenceCountry &&
        !form.formState.errors.maritalStatus
      ) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      form.trigger(['educationLevel', 'universityName', 'graduationYear', 'gpa', 'educationCountry']);
      if (
        !form.formState.errors.educationLevel &&
        !form.formState.errors.universityName &&
        !form.formState.errors.graduationYear &&
        !form.formState.errors.gpa &&
        !form.formState.errors.educationCountry
      ) {
        setCurrentStep(3);
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitForm = (data: ApplicationFormValues) => {
    onSubmit(data);
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };
  
  const getStepStatus = (step: number) => {
    if (step < currentStep) {
      return 'completed';
    }
    if (step === currentStep) {
      return 'current';
    }
    return 'pending';
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer",
                  getStepStatus(step) === 'completed' ? "bg-unlimited-blue text-white" :
                  getStepStatus(step) === 'current' ? "bg-unlimited-blue/10 border border-unlimited-blue text-unlimited-blue" :
                  "bg-gray-100 text-gray-400"
                )}
                onClick={() => handleStepClick(step)}
              >
                {step}
              </div>
              {step < 3 && (
                <div 
                  className={cn(
                    "h-px w-16",
                    getStepStatus(step + 1) === 'completed' || getStepStatus(step) === 'completed' ? "bg-unlimited-blue" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex sm:hidden">
          <span className="text-unlimited-dark-blue">
            الخطوة {currentStep} من 3
          </span>
        </div>
        <div className="hidden sm:block">
          <div className="text-sm">
            {currentStep === 1 && <span className="text-unlimited-blue font-medium">البيانات الشخصية</span>}
            {currentStep === 2 && <span className="text-unlimited-blue font-medium">البيانات الأكاديمية</span>}
            {currentStep === 3 && <span className="text-unlimited-blue font-medium">الخطوة الأخيرة</span>}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-unlimited-blue" />
                  البيانات الشخصية
                </CardTitle>
                <CardDescription>يرجى تعبئة المعلومات الشخصية الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الأول*</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم الأول" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم الأب</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم الأب" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الأخير*</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم الأخير" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الجنس*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الجنس" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">أنثى</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>تاريخ الميلاد*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: ar })
                                ) : (
                                  <span>اختر التاريخ</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1940-01-01")
                              }
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الجنسية*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الجنسية" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Afghanistan">أفغانستان</SelectItem>
                            <SelectItem value="Algeria">الجزائر</SelectItem>
                            <SelectItem value="Egypt">مصر</SelectItem>
                            <SelectItem value="Iraq">العراق</SelectItem>
                            <SelectItem value="Jordan">الأردن</SelectItem>
                            <SelectItem value="Kuwait">الكويت</SelectItem>
                            <SelectItem value="Lebanon">لبنان</SelectItem>
                            <SelectItem value="Libya">ليبيا</SelectItem>
                            <SelectItem value="Morocco">المغرب</SelectItem>
                            <SelectItem value="Palestine">فلسطين</SelectItem>
                            <SelectItem value="Qatar">قطر</SelectItem>
                            <SelectItem value="Saudi Arabia">المملكة العربية السعودية</SelectItem>
                            <SelectItem value="Somalia">الصومال</SelectItem>
                            <SelectItem value="Sudan">السودان</SelectItem>
                            <SelectItem value="Syria">سوريا</SelectItem>
                            <SelectItem value="Tunisia">تونس</SelectItem>
                            <SelectItem value="Yemen">اليمن</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم جواز السفر*</FormLabel>
                        <FormControl>
                          <Input placeholder="رقم جواز السفر" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف*</FormLabel>
                        <FormControl>
                          <Input placeholder="+XXX XXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="residenceCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>بلد الإقامة*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر بلد الإقامة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Afghanistan">أفغانستان</SelectItem>
                            <SelectItem value="Algeria">الجزائر</SelectItem>
                            <SelectItem value="Egypt">مصر</SelectItem>
                            <SelectItem value="Iraq">العراق</SelectItem>
                            <SelectItem value="Jordan">الأردن</SelectItem>
                            <SelectItem value="Kuwait">الكويت</SelectItem>
                            <SelectItem value="Lebanon">لبنان</SelectItem>
                            <SelectItem value="Libya">ليبيا</SelectItem>
                            <SelectItem value="Morocco">المغرب</SelectItem>
                            <SelectItem value="Palestine">فلسطين</SelectItem>
                            <SelectItem value="Qatar">قطر</SelectItem>
                            <SelectItem value="Saudi Arabia">المملكة العربية السعودية</SelectItem>
                            <SelectItem value="Somalia">الصومال</SelectItem>
                            <SelectItem value="Sudan">السودان</SelectItem>
                            <SelectItem value="Syria">سوريا</SelectItem>
                            <SelectItem value="Tunisia">تونس</SelectItem>
                            <SelectItem value="Turkey">تركيا</SelectItem>
                            <SelectItem value="Yemen">اليمن</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="residenceCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder="المدينة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الحالة الاجتماعية*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الحالة الاجتماعية" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">أعزب</SelectItem>
                          <SelectItem value="married">متزوج</SelectItem>
                          <SelectItem value="divorced">مطلق</SelectItem>
                          <SelectItem value="widowed">أرمل</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fathersName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم الأب</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم الأب" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mothersName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم الأم</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم الأم" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-unlimited-blue" />
                  المؤهلات الأكاديمية
                </CardTitle>
                <CardDescription>يرجى تعبئة معلومات المؤهلات الدراسية السابقة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>أخر مؤهل دراسي*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المؤهل الدراسي" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="highschool">الثانوية العامة</SelectItem>
                          <SelectItem value="bachelor">بكالوريوس</SelectItem>
                          <SelectItem value="master">ماجستير</SelectItem>
                          <SelectItem value="doctorate">دكتوراه</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="universityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم المؤسسة التعليمية*</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم الجامعة/المدرسة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سنة التخرج*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر سنة التخرج" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => (
                              <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
                                {new Date().getFullYear() - i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المعدل التراكمي*</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: 3.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="educationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>بلد الدراسة*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر بلد الدراسة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Afghanistan">أفغانستان</SelectItem>
                            <SelectItem value="Algeria">الجزائر</SelectItem>
                            <SelectItem value="Egypt">مصر</SelectItem>
                            <SelectItem value="Iraq">العراق</SelectItem>
                            <SelectItem value="Jordan">الأردن</SelectItem>
                            <SelectItem value="Kuwait">الكويت</SelectItem>
                            <SelectItem value="Lebanon">لبنان</SelectItem>
                            <SelectItem value="Libya">ليبيا</SelectItem>
                            <SelectItem value="Morocco">المغرب</SelectItem>
                            <SelectItem value="Palestine">فلسطين</SelectItem>
                            <SelectItem value="Qatar">قطر</SelectItem>
                            <SelectItem value="Saudi Arabia">المملكة العربية السعودية</SelectItem>
                            <SelectItem value="Somalia">الصومال</SelectItem>
                            <SelectItem value="Sudan">السودان</SelectItem>
                            <SelectItem value="Syria">سوريا</SelectItem>
                            <SelectItem value="Tunisia">تونس</SelectItem>
                            <SelectItem value="Yemen">اليمن</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-unlimited-blue" />
                  البرنامج الدراسي المرغوب
                </CardTitle>
                <CardDescription>يرجى تحديد البرنامج الأكاديمي الذي ترغب بدراسته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="desiredCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدولة*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الدولة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Turkey">تركيا</SelectItem>
                          <SelectItem value="United Kingdom">المملكة المتحدة</SelectItem>
                          <SelectItem value="United States">الولايات المتحدة</SelectItem>
                          <SelectItem value="Canada">كندا</SelectItem>
                          <SelectItem value="Germany">ألمانيا</SelectItem>
                          <SelectItem value="France">فرنسا</SelectItem>
                          <SelectItem value="Malaysia">ماليزيا</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="desiredUniversity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجامعة*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجامعة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Istanbul Medipol University">جامعة إسطنبول ميديبول</SelectItem>
                          <SelectItem value="Istanbul Technical University">جامعة إسطنبول التقنية</SelectItem>
                          <SelectItem value="Ozyegin University">جامعة أوزيغين</SelectItem>
                          <SelectItem value="Sabanci University">جامعة سابانجي</SelectItem>
                          <SelectItem value="Kent University">جامعة كينت</SelectItem>
                          <SelectItem value="Istanbul Areal University">جامعة إسطنبول أريل</SelectItem>
                          <SelectItem value="Istanbul Gelisim University">جامعة إسطنبول غيليشيم</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="degreeLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المستوى الدراسي*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المستوى الدراسي" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bachelor">بكالوريوس</SelectItem>
                            <SelectItem value="master">ماجستير</SelectItem>
                            <SelectItem value="doctorate">دكتوراه</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredProgram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التخصص*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر التخصص" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Business Administration">إدارة الأعمال</SelectItem>
                            <SelectItem value="Computer Engineering">هندسة الحاسوب</SelectItem>
                            <SelectItem value="Medicine">الطب البشري</SelectItem>
                            <SelectItem value="Dentistry">طب الأسنان</SelectItem>
                            <SelectItem value="Civil Engineering">الهندسة المدنية</SelectItem>
                            <SelectItem value="Mechanical Engineering">الهندسة الميكانيكية</SelectItem>
                            <SelectItem value="Economics">الاقتصاد</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العام الدراسي*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر العام الدراسي" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                            <SelectItem value="2026-2027">2026-2027</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="desiredSemester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الفصل الدراسي*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الفصل الدراسي" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fall">الخريفي</SelectItem>
                            <SelectItem value="spring">الربيعي</SelectItem>
                            <SelectItem value="summer">الصيفي</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="englishProficiency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مستوى اللغة الإنجليزية*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر مستوى اللغة الإنجليزية" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">مبتدئ</SelectItem>
                            <SelectItem value="intermediate">متوسط</SelectItem>
                            <SelectItem value="advanced">متقدم</SelectItem>
                            <SelectItem value="native">لغة أم</SelectItem>
                            <SelectItem value="certified">حاصل على شهادة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="englishTest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اختبارات اللغة الإنجليزية</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الاختبار" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">لا يوجد</SelectItem>
                            <SelectItem value="toefl">TOEFL</SelectItem>
                            <SelectItem value="ielts">IELTS</SelectItem>
                            <SelectItem value="duolingo">Duolingo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="englishScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدرجة (إذا كانت متوفرة)</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 90 (TOEFL) / 7.0 (IELTS)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات إضافية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="يمكنك إضافة أي معلومات أخرى تود مشاركتها معنا"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                الخطوة السابقة
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="gap-1"
              >
                الخطوة التالية
                <ArrowRight className="h-4 w-4 ml-1 rtl:rotate-180" />
              </Button>
            ) : (
              <Button type="submit">
                تقديم الطلب
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentApplicationForm;
