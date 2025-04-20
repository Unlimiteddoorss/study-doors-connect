
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Upload, Check } from 'lucide-react';
import ApplicationSubmissionHandler from './ApplicationSubmissionHandler';

interface ApplicationFormProps {
  programId?: number;
  programName?: string;
  universityId?: number;
  universityName?: string;
  onApplicationSubmitted?: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(3, { message: 'الاسم مطلوب ويجب أن يكون على الأقل 3 أحرف' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  phone: z.string().min(8, { message: 'رقم الهاتف مطلوب' }),
  nationality: z.string().min(2, { message: 'الجنسية مطلوبة' }),
  passportNumber: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  educationLevel: z.string().optional(),
  previousInstitution: z.string().optional(),
  graduationYear: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  programId,
  programName,
  universityId,
  universityName,
  onApplicationSubmitted,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<{[key: string]: File | null}>({
    passport: null,
    certificate: null,
    photo: null,
    transcript: null,
  });
  const [documentUploads, setDocumentUploads] = useState<{[key: string]: string}>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
      passportNumber: '',
      birthDate: '',
      gender: '',
      educationLevel: '',
      previousInstitution: '',
      graduationYear: '',
      additionalInfo: '',
    },
  });

  const handleFileChange = (documentType: string, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file,
    }));

    if (file) {
      // In a real application, we would upload the file to a server
      // For this demo, we'll simulate the upload
      setDocumentUploads(prev => ({
        ...prev,
        [documentType]: URL.createObjectURL(file),
      }));
      
      toast({
        title: "تم رفع المستند بنجاح",
        description: `${file.name}`,
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Prepare complete form data including documents and program details
    const completeFormData = {
      personalInfo: {
        ...values,
      },
      programId,
      programName,
      universityId,
      universityName,
      documents: Object.entries(documents).map(([type, file]) => ({
        type,
        name: file?.name || '',
        size: file?.size || 0,
        uploaded: !!file,
      })),
    };
    
    console.log("Form data being submitted:", completeFormData);
    
    // In a real application, we would submit to a server
    // For this demo, we'll just log and show success
    setTimeout(() => {
      setIsSubmitting(false);
      if (onApplicationSubmitted) {
        onApplicationSubmitted();
      }
    }, 1000);
    
    return completeFormData;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">تقديم طلب التحاق</h2>
          
          {(programName || universityName) && (
            <div className="mt-2 p-3 bg-blue-50 rounded-md">
              {programName && (
                <p className="text-unlimited-blue">
                  البرنامج: <span className="font-semibold">{programName}</span>
                </p>
              )}
              {universityName && (
                <p className="text-unlimited-blue">
                  الجامعة: <span className="font-semibold">{universityName}</span>
                </p>
              )}
            </div>
          )}
          
          <p className="text-unlimited-gray mt-2">يرجى تعبئة النموذج التالي لتقديم طلب التحاق</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>أدخل معلوماتك الشخصية الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل*</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك الكامل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف*</FormLabel>
                        <FormControl>
                          <Input placeholder="+901234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الجنسية*</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل جنسيتك" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم جواز السفر</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل رقم جواز السفر" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ الميلاد</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنس</FormLabel>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأكاديمية</CardTitle>
                <CardDescription>أدخل معلومات تعليمك السابق</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المستوى التعليمي</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المستوى التعليمي" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high_school">الثانوية العامة</SelectItem>
                          <SelectItem value="bachelor">بكالوريوس</SelectItem>
                          <SelectItem value="master">ماجستير</SelectItem>
                          <SelectItem value="phd">دكتوراه</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="previousInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المؤسسة التعليمية السابقة</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم المدرسة أو الجامعة" {...field} />
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
                        <FormLabel>سنة التخرج</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>الوثائق المطلوبة</CardTitle>
                <CardDescription>يرجى رفع المستندات المطلوبة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">صورة جواز السفر*</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="passport"
                        className="hidden"
                        accept="image/*, application/pdf"
                        onChange={(e) => handleFileChange('passport', e.target.files?.[0] || null)}
                      />
                      <label htmlFor="passport" className="cursor-pointer block">
                        {documents.passport ? (
                          <div className="flex items-center justify-center text-green-600 flex-col">
                            <Check className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">{documents.passport.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-unlimited-gray flex-col">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">اضغط لرفع صورة جواز السفر</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">الشهادة الدراسية*</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="certificate"
                        className="hidden"
                        accept="image/*, application/pdf"
                        onChange={(e) => handleFileChange('certificate', e.target.files?.[0] || null)}
                      />
                      <label htmlFor="certificate" className="cursor-pointer block">
                        {documents.certificate ? (
                          <div className="flex items-center justify-center text-green-600 flex-col">
                            <Check className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">{documents.certificate.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-unlimited-gray flex-col">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">اضغط لرفع الشهادة الدراسية</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">صورة شخصية</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="photo"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                      />
                      <label htmlFor="photo" className="cursor-pointer block">
                        {documents.photo ? (
                          <div className="flex items-center justify-center text-green-600 flex-col">
                            <Check className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">{documents.photo.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-unlimited-gray flex-col">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">اضغط لرفع صورة شخصية</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">كشف درجات</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="transcript"
                        className="hidden"
                        accept="image/*, application/pdf"
                        onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                      />
                      <label htmlFor="transcript" className="cursor-pointer block">
                        {documents.transcript ? (
                          <div className="flex items-center justify-center text-green-600 flex-col">
                            <Check className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">{documents.transcript.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-unlimited-gray flex-col">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">اضغط لرفع كشف الدرجات</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                
                {(!documents.passport || !documents.certificate) && (
                  <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 ml-2" />
                    <p className="text-sm">صورة جواز السفر والشهادة الدراسية مطلوبة</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>معلومات إضافية</CardTitle>
                <CardDescription>أي ملاحظات أو معلومات إضافية ترغب بإضافتها</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="أدخل أي معلومات إضافية قد تكون مفيدة لطلبك..." 
                          className="h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-unlimited-gray">
                بالنقر على "تقديم الطلب"، أنت توافق على أننا قد نتصل بك بخصوص طلبك ونستخدم المعلومات المقدمة وفقًا لسياسة الخصوصية الخاصة بنا.
              </p>
            </div>
            
            <ApplicationSubmissionHandler
              formData={form.getValues()}
              universityId={universityId}
              programId={programId}
              universityName={universityName}
              programName={programName}
              onSubmit={onApplicationSubmitted}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationForm;
