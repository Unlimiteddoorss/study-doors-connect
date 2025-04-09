
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, GraduationCap, Loader2, Upload } from 'lucide-react';
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
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Define the form schema
const applicationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف مطلوب" }),
  nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
  birthDate: z.date({
    required_error: "تاريخ الميلاد مطلوب",
  }),
  educationLevel: z.string().min(1, { message: "المستوى التعليمي مطلوب" }),
  preferredProgram: z.string().min(1, { message: "البرنامج المفضل مطلوب" }),
  preferredUniversity: z.string().optional(),
  preferredCountry: z.string().min(1, { message: "البلد المفضل مطلوب" }),
  englishLevel: z.string().min(1, { message: "مستوى اللغة الإنجليزية مطلوب" }),
  additionalInfo: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const StudentApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      educationLevel: "",
      preferredProgram: "",
      preferredUniversity: "",
      preferredCountry: "",
      englishLevel: "",
      additionalInfo: "",
    },
  });

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setDocuments(prevDocs => [...prevDocs, ...fileList]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prevDocs => prevDocs.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsSubmitting(true);

    try {
      // Here we would normally send the form data to a backend API
      // For now we'll simulate a successful submission
      console.log("Form values:", values);
      console.log("Uploaded documents:", documents);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success notification
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم مراجعة طلبك وسنتواصل معك قريباً",
      });

      // Redirect to dashboard or confirmation page
      navigate("/dashboard");
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-unlimited-dark-blue">تقديم طلب التحاق</h2>
        <p className="text-unlimited-gray">املأ النموذج التالي للبدء في رحلتك الدراسية</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل</FormLabel>
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
                  <FormLabel>البريد الإلكتروني</FormLabel>
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
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
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
                  <FormLabel>الجنسية</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل جنسيتك" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>تاريخ الميلاد</FormLabel>
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
                          date > new Date() || date < new Date("1950-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المستوى التعليمي الحالي</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى التعليمي" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high_school">ثانوية عامة</SelectItem>
                      <SelectItem value="diploma">دبلوم</SelectItem>
                      <SelectItem value="bachelor">بكالوريوس</SelectItem>
                      <SelectItem value="master">ماجستير</SelectItem>
                      <SelectItem value="phd">دكتوراه</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredProgram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البرنامج المفضل</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البرنامج المفضل" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="business">إدارة الأعمال</SelectItem>
                      <SelectItem value="cs">علوم الحاسوب</SelectItem>
                      <SelectItem value="engineering">الهندسة</SelectItem>
                      <SelectItem value="medicine">الطب</SelectItem>
                      <SelectItem value="arts">الفنون والعلوم الإنسانية</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredUniversity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الجامعة المفضلة (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسم الجامعة المفضلة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البلد المفضل للدراسة</FormLabel>
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
                      <SelectItem value="egypt">مصر</SelectItem>
                      <SelectItem value="syria">سوريا</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="englishLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مستوى اللغة الإنجليزية</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى اللغة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدئ</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                      <SelectItem value="fluent">طليق</SelectItem>
                      <SelectItem value="native">اللغة الأم</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>معلومات إضافية (اختياري)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="أضف أي معلومات إضافية ترغب في مشاركتها معنا" 
                    {...field}
                    className="min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>المستندات المطلوبة</FormLabel>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-unlimited-gray mb-2" />
              </div>
              <p className="text-unlimited-gray mb-2">قم بإرفاق المستندات المطلوبة (جواز السفر، الشهادات الأكاديمية، إلخ)</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-2"
              >
                اختر الملفات
              </Button>
              <input
                id="file-upload"
                name="documents"
                type="file"
                multiple
                onChange={handleDocumentsChange}
                className="hidden"
              />
            </div>

            {documents.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">الملفات المرفقة:</h4>
                <ul className="space-y-2">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm truncate">{doc.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                      >
                        حذف
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري إرسال الطلب...
                </>
              ) : (
                <>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  تقديم الطلب
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentApplicationForm;
