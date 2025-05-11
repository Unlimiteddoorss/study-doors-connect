
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { School, FileText, Calendar, MapPin, UserPlus, Clock, Check, AlertCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define Turkish universities
const turkishUniversities = [
  { id: "bartin", name: "Bartın Üniversitesi", city: "بارتن", fee: "مجاناً", deadline: "11/05/2025" },
  { id: "nigde", name: "Niğde Ömer Halisdemir Üniversitesi", city: "نيغدة", fee: "مجاناً", deadline: "16/05/2025" },
  { id: "tokat", name: "Tokat Gaziosmanpaşa Üniversitesi", city: "توكات", fee: "مجاناً", deadline: "01/06/2025" },
  { id: "kastamonu", name: "Kastamonu Üniversitesi", city: "كاستامونو", fee: "مجاناً", deadline: "10/06/2025" },
  { id: "ankara", name: "Ankara Yıldırım Beyazıt Üniversitesi", city: "انقرة", fee: "750 ₺", deadline: "13/06/2025" },
  { id: "yalova", name: "Yalova Üniversitesi", city: "يالوفا", fee: "مجاناً", deadline: "16/06/2025" },
  { id: "hacettepe", name: "Hacettepe Üniversitesi", city: "انقرة", fee: "مجاناً", deadline: "21/06/2025" },
];

// Certificate types
const certificateTypes = [
  { id: "high-school", label: "ثانوية" },
  { id: "turkish-high-school", label: "ثانوية تركية" },
  { id: "sat", label: "SAT" },
  { id: "tryos", label: "TR-YÖS" },
];

// Define form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(10, { message: "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل" }),
  nationality: z.string().min(2, { message: "يرجى إدخال الجنسية" }),
  certificateType: z.string({ required_error: "يرجى اختيار نوع الشهادة" }),
  universityChoices: z.array(z.string()).min(1, { message: "يرجى اختيار جامعة واحدة على الأقل" }),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على الشروط والأحكام للمتابعة",
  }),
});

const TurkishUniversityApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("submit-application");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      certificateType: "",
      universityChoices: [],
      agreeTerms: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Application values:", values);
    
    // Store in localStorage for demo purposes
    const applications = JSON.parse(localStorage.getItem("turkishUniversityApplications") || "[]");
    const newApplication = {
      id: `APP-${Date.now()}`,
      ...values,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    applications.push(newApplication);
    localStorage.setItem("turkishUniversityApplications", JSON.stringify(applications));
    
    // Show success notification
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: "سنتواصل معك قريباً لمتابعة طلبك",
    });
    
    // Reset form
    form.reset();
    
    // Switch to track tab
    setActiveTab("track-application");
  };

  const handleUniversityToggle = (universityId: string) => {
    setSelectedUniversities(current => 
      current.includes(universityId)
        ? current.filter(id => id !== universityId)
        : [...current, universityId]
    );
    
    form.setValue(
      "universityChoices", 
      form.getValues("universityChoices").includes(universityId)
        ? form.getValues("universityChoices").filter(id => id !== universityId)
        : [...form.getValues("universityChoices"), universityId]
    );
  };

  const trackApplication = (applicationId: string) => {
    // In a real application, this would query the database
    // For the demo, we'll show a success message
    toast({
      title: "تتبع الطلب",
      description: `جاري معالجة طلبك رقم ${applicationId}`,
    });
    
    // Ideally would navigate to a detail page
    // navigate(`/applications/${applicationId}`);
  };

  // Get stored applications from localStorage for demo
  const applications = JSON.parse(localStorage.getItem("turkishUniversityApplications") || "[]");
  
  // Example application statuses for tracking tab
  const statuses = {
    pending: { label: "قيد المراجعة", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "قيد المعالجة", color: "bg-blue-100 text-blue-800" },
    accepted: { label: "مقبول", color: "bg-green-100 text-green-800" },
    rejected: { label: "مرفوض", color: "bg-red-100 text-red-800" },
  };

  return (
    <MainLayout>
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-unlimited-blue mb-4">التسجيل في الجامعات الحكومية التركية 2025</h1>
          <p className="text-unlimited-gray mb-6">
            قم بتقديم طلب التسجيل في الجامعات الحكومية التركية من خلال منصتنا. نساعدك في إكمال الأوراق المطلوبة وترجمتها وتصديقها ومتابعة طلبك خلال مراحل التقديم المختلفة.
          </p>
          
          <div className="bg-unlimited-light-blue/20 border border-unlimited-light-blue rounded-lg p-4 mb-6">
            <h2 className="flex items-center font-bold text-unlimited-blue mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              تواريخ مهمة
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>بدء التقديم للجامعات الحكومية التركية: <strong>14 أبريل 2025</strong></li>
              <li>انتهاء التقديم للدفعة الأولى: <strong>16 مايو 2025</strong></li>
              <li>إعلان نتائج الدفعة الأولى: <strong>30 مايو 2025</strong></li>
            </ul>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="submit-application" className="text-base py-3">
              <FileText className="w-4 h-4 mr-2" />
              تقديم طلب
            </TabsTrigger>
            <TabsTrigger value="track-application" className="text-base py-3">
              <Clock className="w-4 h-4 mr-2" />
              تتبع طلبك
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit-application">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>نموذج التقديم للجامعات الحكومية التركية</CardTitle>
                    <CardDescription>
                      يرجى ملء جميع البيانات المطلوبة واختيار الجامعات التي ترغب بالتقديم عليها
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>البريد الإلكتروني</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" type="email" {...field} />
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
                                <FormLabel>رقم الهاتف (مع رمز الدولة)</FormLabel>
                                <FormControl>
                                  <Input placeholder="+90...." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="certificateType"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>نوع الشهادة</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="اختر نوع الشهادة" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {certificateTypes.map(cert => (
                                      <SelectItem key={cert.id} value={cert.id}>
                                        {cert.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  اختر نوع الشهادة التي تمتلكها للتقديم على الجامعات
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="universityChoices"
                          render={() => (
                            <FormItem>
                              <FormLabel>اختر الجامعات</FormLabel>
                              <div className="grid grid-cols-1 gap-3 mt-2">
                                {turkishUniversities.map(university => (
                                  <div 
                                    key={university.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                      selectedUniversities.includes(university.id)
                                        ? "border-unlimited-blue bg-unlimited-light-blue/10"
                                        : "border-gray-200 hover:border-unlimited-blue/50"
                                    }`}
                                    onClick={() => handleUniversityToggle(university.id)}
                                  >
                                    <div className="flex items-center">
                                      <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                        selectedUniversities.includes(university.id)
                                          ? "bg-unlimited-blue text-white"
                                          : "bg-gray-100"
                                      }`}>
                                        {selectedUniversities.includes(university.id) && (
                                          <Check className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-medium">{university.name}</p>
                                        <div className="flex flex-wrap items-center text-sm text-unlimited-gray mt-1">
                                          <span className="flex items-center ml-3">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {university.city}
                                          </span>
                                          <span className="flex items-center ml-3">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            آخر موعد: {university.deadline}
                                          </span>
                                          <span>
                                            الرسوم: {university.fee}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <FormDescription>
                                يمكنك اختيار أكثر من جامعة للتقديم عليها
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="agreeTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <input
                                  type="checkbox" 
                                  className="h-5 w-5"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none mr-3">
                                <FormLabel>
                                  أوافق على الشروط والأحكام وسياسة الخصوصية
                                </FormLabel>
                                <FormDescription>
                                  بالنقر على هذا المربع، أنت توافق على شروط وأحكام التقديم وسياسة الخصوصية الخاصة بنا.
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <UserPlus className="h-4 w-4 mr-2" />
                          تقديم الطلب
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات التقديم</CardTitle>
                    <CardDescription>
                      تفاصيل مهمة حول عملية التقديم للجامعات التركية
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-unlimited-blue flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          الوثائق المطلوبة
                        </h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-unlimited-success mr-2 mt-1 flex-shrink-0" />
                            <span>صورة من جواز السفر (ساري المفعول)</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-unlimited-success mr-2 mt-1 flex-shrink-0" />
                            <span>الشهادة الثانوية أو ما يعادلها</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-unlimited-success mr-2 mt-1 flex-shrink-0" />
                            <span>كشف علامات الثانوية العامة</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-unlimited-success mr-2 mt-1 flex-shrink-0" />
                            <span>صورة شخصية بخلفية بيضاء</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-unlimited-success mr-2 mt-1 flex-shrink-0" />
                            <span>نتيجة امتحان اليوس أو SAT (إن وجد)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-unlimited-blue flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          ملاحظات هامة
                        </h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li>سيتم التواصل معك بعد تقديم الطلب لاستكمال باقي الإجراءات</li>
                          <li>رسوم التقديم تختلف حسب الجامعة وتدفع بعد مراجعة الطلب</li>
                          <li>يمكنك تتبع حالة طلبك من خلال الصفحة الخاصة بتتبع الطلبات</li>
                        </ul>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-unlimited-blue flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          المواعيد المهمة
                        </h3>
                        <div className="mt-2 space-y-3">
                          {turkishUniversities.slice(0, 4).map((uni) => (
                            <div key={uni.id} className="flex justify-between text-sm">
                              <span>{uni.name}</span>
                              <span className="font-medium">{uni.deadline}</span>
                            </div>
                          ))}
                          <Button variant="link" className="p-0 h-auto text-unlimited-blue" asChild>
                            <a href="/universities">عرض كل المواعيد</a>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-unlimited-blue">تحتاج مساعدة؟</h3>
                        <p className="text-sm mt-2">يمكنك التواصل معنا عبر:</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>البريد الإلكتروني: contact@example.com</p>
                          <p>الهاتف: +90xxxx-xxx-xxx</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="track-application">
            <Card>
              <CardHeader>
                <CardTitle>تتبع طلبات التقديم الخاصة بك</CardTitle>
                <CardDescription>
                  يمكنك متابعة حالة طلبات التقديم من هنا
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications && applications.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>الجامعات</TableHead>
                        <TableHead>تاريخ التقديم</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app: any) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.id}</TableCell>
                          <TableCell>
                            {app.universityChoices.map((uniId: string) => {
                              const uni = turkishUniversities.find(u => u.id === uniId);
                              return uni ? (
                                <div key={uniId} className="mb-1 text-sm">
                                  {uni.name}
                                </div>
                              ) : null;
                            })}
                          </TableCell>
                          <TableCell>{new Date(app.submittedAt).toLocaleDateString('ar-EG')}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${statuses[app.status as keyof typeof statuses].color}`}>
                              {statuses[app.status as keyof typeof statuses].label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => trackApplication(app.id)}
                            >
                              عرض التفاصيل
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center p-8">
                    <Clock className="h-12 w-12 text-unlimited-gray mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">لا توجد طلبات مقدمة حتى الآن</h3>
                    <p className="text-unlimited-gray mb-4">
                      قم بتقديم طلب جديد من خلال نموذج التقديم
                    </p>
                    <Button onClick={() => setActiveTab("submit-application")}>
                      تقديم طلب جديد
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={() => setActiveTab("submit-application")}>
                  تقديم طلب جديد
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  تحميل دليل التقديم
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TurkishUniversityApplication;
