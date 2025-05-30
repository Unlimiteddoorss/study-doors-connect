
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ChevronLeft, ChevronRight, FileText, GraduationCap, Loader2, Upload, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Define the form schema
const applicationSchema = z.object({
  // Personal Information
  personalInfo: z.object({
    firstName: z.string().min(2, { message: "الاسم الأول مطلوب" }),
    lastName: z.string().min(2, { message: "الاسم الأخير مطلوب" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
    phone: z.string().min(10, { message: "رقم الهاتف مطلوب" }),
    nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
    passportId: z.string().min(1, { message: "رقم جواز السفر مطلوب" }),
    passportIssueDate: z.date({
      required_error: "تاريخ إصدار جواز السفر مطلوب",
    }),
    passportExpiryDate: z.date({
      required_error: "تاريخ انتهاء جواز السفر مطلوب",
    }),
    birthDate: z.date({
      required_error: "تاريخ الميلاد مطلوب",
    }),
    residenceCountry: z.string().min(1, { message: "بلد الإقامة مطلوب" }),
    gender: z.enum(["male", "female"], {
      required_error: "الجنس مطلوب",
    }),
    maritalStatus: z.enum(["single", "married"], {
      required_error: "الحالة الاجتماعية مطلوبة",
    }),
    fatherName: z.string().min(1, { message: "اسم الأب مطلوب" }),
    fatherPhone: z.string().optional(),
    motherName: z.string().min(1, { message: "اسم الأم مطلوب" }),
    residenceAddress: z.string().optional(),
    visaNeeded: z.string().optional(),
  }),
  
  // Education Information
  educationInfo: z.object({
    degree: z.string().min(1, { message: "المستوى التعليمي مطلوب" }),
    highSchoolName: z.string().min(1, { message: "اسم المدرسة الثانوية مطلوب" }),
    gpa: z.string().optional(),
    highSchoolCountry: z.string().min(1, { message: "بلد التخرج مطلوب" }),
    englishLevel: z.string().min(1, { message: "مستوى اللغة الإنجليزية مطلوب" }),
    isTransferStudent: z.boolean().optional(),
    hasBlueCard: z.boolean().optional(),
    hasResidencePermit: z.boolean().optional(),
  }),
  
  // Program Preferences
  programPreferences: z.object({
    preferredProgram: z.string().min(1, { message: "البرنامج المفضل مطلوب" }),
    preferredUniversity: z.string().optional(),
    preferredCountry: z.string().min(1, { message: "البلد المفضل مطلوب" }),
  }),
  
  // Additional Information
  additionalInfo: z.object({
    comments: z.string().optional(),
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const StudentApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<{
    diplomas: File[];
    transcripts: File[];
    passport: File[];
    languageCertificates: File[];
    motivationLetters: File[];
    recommendationLetters: File[];
    other: File[];
  }>({
    diplomas: [],
    transcripts: [],
    passport: [],
    languageCertificates: [],
    motivationLetters: [],
    recommendationLetters: [],
    other: [],
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        passportId: "",
        fatherName: "",
        fatherPhone: "",
        motherName: "",
        residenceAddress: "",
        visaNeeded: "",
      },
      educationInfo: {
        degree: "",
        highSchoolName: "",
        gpa: "",
        highSchoolCountry: "",
        englishLevel: "",
        isTransferStudent: false,
        hasBlueCard: false,
        hasResidencePermit: false,
      },
      programPreferences: {
        preferredProgram: "",
        preferredUniversity: "",
        preferredCountry: "",
      },
      additionalInfo: {
        comments: "",
      },
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStudentPhoto(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (type: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setDocuments(prev => ({
        ...prev,
        [type]: [...prev[type], ...fileList]
      }));
    }
  };

  const removeDocument = (type: keyof typeof documents, index: number) => {
    setDocuments(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const removePhoto = () => {
    setStudentPhoto(null);
    setPhotoPreview(null);
  };

  const nextStep = () => {
    if (currentStep === 1 && !studentPhoto) {
      toast({
        title: "صورة الطالب مطلوبة",
        description: "يرجى إرفاق صورة شخصية للطالب",
        variant: "destructive",
      });
      return;
    }
    
    switch (currentStep) {
      case 1:
        // Validate personal info fields
        form.trigger(["personalInfo"]);
        const personalInfoErrors = form.formState.errors.personalInfo;
        if (!personalInfoErrors) {
          setCurrentStep(prev => prev + 1);
        }
        break;
      case 2:
        // Check if at least passport document is uploaded
        if (documents.passport.length === 0) {
          toast({
            title: "صورة جواز السفر مطلوبة",
            description: "يرجى إرفاق صورة جواز السفر",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep(prev => prev + 1);
        break;
      case 3:
        // Validate education fields
        form.trigger(["educationInfo"]);
        const educationErrors = form.formState.errors.educationInfo;
        if (!educationErrors) {
          setCurrentStep(prev => prev + 1);
        }
        break;
      case 4:
        // Validate program preferences
        form.trigger(["programPreferences"]);
        const programErrors = form.formState.errors.programPreferences;
        if (!programErrors) {
          setCurrentStep(prev => prev + 1);
        }
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!studentPhoto) {
      toast({
        title: "صورة الطالب مطلوبة",
        description: "يرجى إرفاق صورة شخصية للطالب",
        variant: "destructive",
      });
      return;
    }
    
    if (documents.passport.length === 0) {
      toast({
        title: "صورة جواز السفر مطلوبة",
        description: "يرجى إرفاق صورة جواز السفر",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here we would normally send the form data to a backend API
      console.log("Form values:", values);
      console.log("Student photo:", studentPhoto);
      console.log("Uploaded documents:", documents);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate an application ID
      const applicationId = `APP-${Date.now().toString().slice(-8)}`;

      // Show success notification with the application ID
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: `رقم طلبك هو: ${applicationId}. سيتم مراجعة طلبك وسنتواصل معك قريباً.`,
      });

      // Redirect to dashboard or applications page
      navigate("/dashboard/applications");
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">طلب التحاق جديد</h2>
            <p className="text-unlimited-gray mt-1">استكمل جميع البيانات المطلوبة للتقديم</p>
          </div>
          
          {/* Application steps */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center ${step < currentStep ? 'text-unlimited-success' : step === currentStep ? 'text-unlimited-blue' : 'text-unlimited-gray'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2
                  ${step < currentStep ? 'bg-unlimited-success text-white' : 
                    step === currentStep ? 'bg-unlimited-blue text-white' : 
                    'bg-unlimited-gray/20 text-unlimited-gray'}`}
                >
                  {step < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className={`text-sm font-medium ${step === currentStep ? 'text-unlimited-blue' : ''}`}>
                  {step === 1 && 'المعلومات الشخصية'}
                  {step === 2 && 'المستندات'}
                  {step === 3 && 'المعلومات التعليمية'}
                  {step === 4 && 'تفاصيل البرنامج'}
                  {step === 5 && 'المراجعة والتأكيد'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Mobile steps indicator */}
          <div className="md:hidden">
            <span className="text-sm font-medium text-unlimited-blue">
              الخطوة {currentStep} من 5
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
          <div
            className="bg-unlimited-blue h-2 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Student Photo */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">صورة الطالب</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                      {photoPreview ? (
                        <div className="relative">
                          <Avatar className="w-40 h-40">
                            <AvatarImage src={photoPreview} alt="Student" />
                            <AvatarFallback>صورة</AvatarFallback>
                          </Avatar>
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center w-full">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="rounded-full bg-unlimited-blue/10 p-3">
                              <Upload className="h-8 w-8 text-unlimited-blue" />
                            </div>
                            <p className="text-unlimited-gray text-sm">
                              أضف صورة شخصية للطالب
                            </p>
                            <p className="text-unlimited-gray text-xs">
                              (مطلوب)
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('photo-upload')?.click()}
                              className="mt-2"
                            >
                              اختر صورة
                            </Button>
                          </div>
                        </div>
                      )}
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Personal Information Form */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">المعلومات الشخصية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="personalInfo.firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الاسم الأول*</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل الاسم الأول كما في جواز السفر" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الاسم الأخير*</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل الاسم الأخير كما في جواز السفر" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.email"
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
                          name="personalInfo.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رقم الهاتف*</FormLabel>
                              <FormControl>
                                <Input placeholder="+1234567890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.nationality"
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
                                  <SelectItem value="algeria">الجزائر</SelectItem>
                                  <SelectItem value="egypt">مصر</SelectItem>
                                  <SelectItem value="jordan">الأردن</SelectItem>
                                  <SelectItem value="lebanon">لبنان</SelectItem>
                                  <SelectItem value="morocco">المغرب</SelectItem>
                                  <SelectItem value="palestine">فلسطين</SelectItem>
                                  <SelectItem value="syria">سوريا</SelectItem>
                                  <SelectItem value="tunisia">تونس</SelectItem>
                                  <SelectItem value="other">أخرى</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.passportId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رقم جواز السفر*</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل رقم جواز السفر" {...field} />
                              </FormControl>
                              <p className="text-xs text-unlimited-gray mt-1">جوازات السفر السورية والفلسطينية يجب ألا تتضمن حرف N</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.passportIssueDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>تاريخ إصدار جواز السفر*</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full text-start font-normal ${
                                        !field.value ? "text-muted-foreground" : ""
                                      }`}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd/MM/yyyy", { locale: ar })
                                      ) : (
                                        <span>اختر تاريخ الإصدار</span>
                                      )}
                                      <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.passportExpiryDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>تاريخ انتهاء جواز السفر*</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full text-start font-normal ${
                                        !field.value ? "text-muted-foreground" : ""
                                      }`}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd/MM/yyyy", { locale: ar })
                                      ) : (
                                        <span>اختر تاريخ الانتهاء</span>
                                      )}
                                      <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.birthDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>تاريخ الميلاد*</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full text-start font-normal ${
                                        !field.value ? "text-muted-foreground" : ""
                                      }`}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd/MM/yyyy", { locale: ar })
                                      ) : (
                                        <span>اختر تاريخ الميلاد</span>
                                      )}
                                      <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() - 14))
                                    }
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <p className="text-xs text-unlimited-gray mt-1">يجب أن يكون عمر الطالب أكبر من 14 سنة</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.residenceCountry"
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
                                  <SelectItem value="algeria">الجزائر</SelectItem>
                                  <SelectItem value="egypt">مصر</SelectItem>
                                  <SelectItem value="jordan">الأردن</SelectItem>
                                  <SelectItem value="lebanon">لبنان</SelectItem>
                                  <SelectItem value="morocco">المغرب</SelectItem>
                                  <SelectItem value="palestine">فلسطين</SelectItem>
                                  <SelectItem value="syria">سوريا</SelectItem>
                                  <SelectItem value="tunisia">تونس</SelectItem>
                                  <SelectItem value="turkey">تركيا</SelectItem>
                                  <SelectItem value="other">أخرى</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.gender"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>الجنس*</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-x-4 rtl:space-x-reverse"
                                >
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">ذكر</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">أنثى</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.maritalStatus"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>الحالة الاجتماعية*</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-x-4 rtl:space-x-reverse"
                                >
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="single" id="single" />
                                    <Label htmlFor="single">أعزب</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="married" id="married" />
                                    <Label htmlFor="married">متزوج</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                        <FormField
                          control={form.control}
                          name="personalInfo.fatherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم الأب*</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل اسم الأب" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.fatherPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رقم هاتف الأب</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل رقم هاتف الأب (اختياري)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalInfo.motherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم الأم*</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل اسم الأم" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <FormField
                          control={form.control}
                          name="personalInfo.residenceAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>عنوان الإقامة في الخارج</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="أدخل عنوان الإقامة في البلد المضيف (اختياري)"
                                  {...field}
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <FormField
                          control={form.control}
                          name="personalInfo.visaNeeded"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>تأشيرة مطلوبة من*</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر البلد المطلوب تأشيرة منه" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="turkey">تركيا</SelectItem>
                                  <SelectItem value="hungary">المجر</SelectItem>
                                  <SelectItem value="poland">بولندا</SelectItem>
                                  <SelectItem value="czechia">التشيك</SelectItem>
                                  <SelectItem value="cyprus">قبرص</SelectItem>
                                  <SelectItem value="none">لا يحتاج تأشيرة</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">المستندات المطلوبة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Diplomas */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-semibold">شهادة الثانوية العامة*</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('diploma-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          إضافة ملف
                        </Button>
                      </div>
                      <input
                        id="diploma-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleDocumentChange('diplomas')}
                        className="hidden"
                      />
                      
                      <div className="border rounded-md p-4 bg-gray-50 min-h-[120px]">
                        {documents.diplomas.length > 0 ? (
                          <ul className="space-y-2">
                            {documents.diplomas.map((doc, index) => (
                              <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-unlimited-blue mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument('diplomas', index)}
                                >
                                  <X className="h-4 w-4 text-unlimited-danger" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-4">
                            <p className="text-unlimited-gray text-sm">لم يتم إضافة ملفات بعد</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Transcripts */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-semibold">كشف العلامات</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('transcript-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          إضافة ملف
                        </Button>
                      </div>
                      <input
                        id="transcript-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleDocumentChange('transcripts')}
                        className="hidden"
                      />
                      
                      <div className="border rounded-md p-4 bg-gray-50 min-h-[120px]">
                        {documents.transcripts.length > 0 ? (
                          <ul className="space-y-2">
                            {documents.transcripts.map((doc, index) => (
                              <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-unlimited-blue mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument('transcripts', index)}
                                >
                                  <X className="h-4 w-4 text-unlimited-danger" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-4">
                            <p className="text-unlimited-gray text-sm">لم يتم إضافة ملفات بعد</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Passport */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-semibold">صورة جواز السفر*</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('passport-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          إضافة ملف
                        </Button>
                      </div>
                      <input
                        id="passport-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleDocumentChange('passport')}
                        className="hidden"
                      />
                      
                      <div className="border rounded-md p-4 bg-gray-50 min-h-[120px]">
                        {documents.passport.length > 0 ? (
                          <ul className="space-y-2">
                            {documents.passport.map((doc, index) => (
                              <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-unlimited-blue mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument('passport', index)}
                                >
                                  <X className="h-4 w-4 text-unlimited-danger" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-4">
                            <p className="text-unlimited-gray text-sm text-red-500 font-semibold">مطلوب*</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Language Certificates */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-semibold">شهادات اللغة</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('language-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          إضافة ملف
                        </Button>
                      </div>
                      <input
                        id="language-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleDocumentChange('languageCertificates')}
                        className="hidden"
                      />
                      
                      <div className="border rounded-md p-4 bg-gray-50 min-h-[120px]">
                        {documents.languageCertificates.length > 0 ? (
                          <ul className="space-y-2">
                            {documents.languageCertificates.map((doc, index) => (
                              <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-unlimited-blue mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument('languageCertificates', index)}
                                >
                                  <X className="h-4 w-4 text-unlimited-danger" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-4">
                            <p className="text-unlimited-gray text-sm">لم يتم إضافة ملفات بعد</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Step 3: Education Information */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">المعلومات التعليمية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="educationInfo.degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المؤهل التعليمي*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المؤهل التعليمي" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high_school">ثانوية عامة</SelectItem>
                              <SelectItem value="diploma">دبلوم</SelectItem>
                              <SelectItem value="bachelor">بكالوريوس</SelectItem>
                              <SelectItem value="master">ماجستير</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="educationInfo.highSchoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المدرسة/الجامعة*</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم المدرسة أو الجامعة" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="educationInfo.gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المعدل الدراسي</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل المعدل الدراسي" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="educationInfo.highSchoolCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>بلد التخرج*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر بلد التخرج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="algeria">الجزائر</SelectItem>
                              <SelectItem value="egypt">مصر</SelectItem>
                              <SelectItem value="jordan">الأردن</SelectItem>
                              <SelectItem value="lebanon">لبنان</SelectItem>
                              <SelectItem value="morocco">المغرب</SelectItem>
                              <SelectItem value="palestine">فلسطين</SelectItem>
                              <SelectItem value="syria">سوريا</SelectItem>
                              <SelectItem value="tunisia">تونس</SelectItem>
                              <SelectItem value="other">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="educationInfo.englishLevel"
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
                              <SelectItem value="certified">معتمد (توفل/آيلتس)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="font-medium">معلومات إضافية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="educationInfo.isTransferStudent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 rtl:space-x-reverse">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>طالب منقول</FormLabel>
                              <p className="text-xs text-unlimited-gray">
                                هل أنت طالب منقول من جامعة أخرى؟
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="educationInfo.hasBlueCard"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 rtl:space-x-reverse">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>امتلاك البطاقة الزرقاء</FormLabel>
                              <p className="text-xs text-unlimited-gray">
                                هل تمتلك بطاقة زرقاء؟
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="educationInfo.hasResidencePermit"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 rtl:space-x-reverse">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>تصريح إقامة</FormLabel>
                              <p className="text-xs text-unlimited-gray">
                                هل لديك تصريح إقامة في البلد المضيف؟
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Step 4: Program Preferences */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">تفاصيل البرنامج</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="programPreferences.preferredProgram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البرنامج المفضل*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر البرنامج المفضل" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="medicine">الطب البشري</SelectItem>
                              <SelectItem value="dentistry">طب الأسنان</SelectItem>
                              <SelectItem value="pharmacy">الصيدلة</SelectItem>
                              <SelectItem value="engineering">الهندسة</SelectItem>
                              <SelectItem value="business">إدارة الأعمال</SelectItem>
                              <SelectItem value="computer_science">علوم الحاسوب</SelectItem>
                              <SelectItem value="other">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="programPreferences.preferredUniversity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الجامعة المفضلة</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الجامعة المفضلة (اختياري)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="istanbul">جامعة اسطنبول</SelectItem>
                              <SelectItem value="ankara">جامعة أنقرة</SelectItem>
                              <SelectItem value="marmara">جامعة مرمرة</SelectItem>
                              <SelectItem value="bogazici">جامعة بوغازيتشي</SelectItem>
                              <SelectItem value="other">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="programPreferences.preferredCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البلد المفضل*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر البلد المفضل" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="turkey">تركيا</SelectItem>
                              <SelectItem value="hungary">المجر</SelectItem>
                              <SelectItem value="poland">بولندا</SelectItem>
                              <SelectItem value="czechia">التشيك</SelectItem>
                              <SelectItem value="cyprus">قبرص</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <FormField
                      control={form.control}
                      name="additionalInfo.comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ملاحظات إضافية</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="أي ملاحظات أو استفسارات إضافية تود إضافتها..."
                              {...field}
                              className="resize-none h-32"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Step 5: Review and Submit */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">مراجعة وإرسال الطلب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-unlimited-dark-blue font-semibold mb-4">المعلومات الشخصية</h3>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">الاسم الكامل:</p>
                            <p className="font-medium">{form.getValues().personalInfo.firstName} {form.getValues().personalInfo.lastName}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">البريد الإلكتروني:</p>
                            <p className="font-medium">{form.getValues().personalInfo.email}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">رقم الهاتف:</p>
                            <p className="font-medium">{form.getValues().personalInfo.phone}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">الجنسية:</p>
                            <p className="font-medium">{form.getValues().personalInfo.nationality}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-unlimited-dark-blue font-semibold mb-4">تفاصيل البرنامج</h3>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">البرنامج المفضل:</p>
                            <p className="font-medium">{form.getValues().programPreferences.preferredProgram}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">الجامعة المفضلة:</p>
                            <p className="font-medium">{form.getValues().programPreferences.preferredUniversity || "لم يتم التحديد"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="text-unlimited-gray">البلد المفضل:</p>
                            <p className="font-medium">{form.getValues().programPreferences.preferredCountry}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-unlimited-dark-blue font-semibold mb-4">المستندات المرفقة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-unlimited-gray mb-2">صورة شخصية:</p>
                          {photoPreview ? (
                            <img src={photoPreview} alt="صورة الطالب" className="w-20 h-20 object-cover rounded-md" />
                          ) : (
                            <p className="text-red-500">لم يتم إرفاق صورة شخصية</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-unlimited-gray mb-2">جواز السفر:</p>
                          {documents.passport.length > 0 ? (
                            <p className="text-unlimited-success">{documents.passport.length} ملفات مرفقة</p>
                          ) : (
                            <p className="text-red-500">لم يتم إرفاق جواز السفر</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-unlimited-gray mb-2">شهادة الثانوية:</p>
                          {documents.diplomas.length > 0 ? (
                            <p className="text-unlimited-success">{documents.diplomas.length} ملفات مرفقة</p>
                          ) : (
                            <p className="text-red-500">لم يتم إرفاق شهادة الثانوية</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <p className="text-unlimited-gray text-center">
                          بالضغط على زر "إرسال الطلب"، أنت توافق على سياسة الخصوصية وشروط الخدمة الخاصة بنا.
                        </p>
                        
                        <div className="w-full max-w-md">
                          <Button 
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                جاري إرسال الطلب...
                              </>
                            ) : (
                              'إرسال الطلب'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2 rtl:rotate-180" />
                  الخطوة السابقة
                </Button>
              ) : (
                <div />
              )}
              
              <Button 
                type="button"
                onClick={nextStep}
                className="flex items-center"
              >
                الخطوة التالية
                <ChevronLeft className="h-4 w-4 ml-2 rtl:rotate-180" />
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default StudentApplicationForm;
