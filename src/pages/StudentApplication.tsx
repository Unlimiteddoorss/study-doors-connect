
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { StudentApplicationForm } from '@/components/applications/StudentApplicationForm';
import { StudentApplicationFormSubmit } from '@/components/applications/StudentApplicationFormSubmit';
import { ApplicationSubmissionHandler } from '@/components/applications/ApplicationSubmissionHandler';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookOpen, University, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const [academicInfo, setAcademicInfo] = useState({});
  const [universities, setUniversities] = useState([
    { id: 1, name: 'جامعة الملك سعود', name_ar: 'جامعة الملك سعود', country: 'المملكة العربية السعودية', city: 'الرياض' },
    { id: 2, name: 'Istanbul Technical University', name_ar: 'جامعة إسطنبول التقنية', country: 'تركيا', city: 'إسطنبول' },
    { id: 3, name: 'Cairo University', name_ar: 'جامعة القاهرة', country: 'مصر', city: 'القاهرة' },
  ]);
  
  const [programs, setPrograms] = useState([
    { id: 1, university_id: 1, name: 'Software Engineering', name_ar: 'هندسة البرمجيات', degree_type: 'bachelor' },
    { id: 2, university_id: 1, name: 'Computer Science', name_ar: 'علوم الحاسب', degree_type: 'bachelor' },
    { id: 3, university_id: 2, name: 'Medicine', name_ar: 'الطب البشري', degree_type: 'medicine' },
    { id: 4, university_id: 2, name: 'Civil Engineering', name_ar: 'الهندسة المدنية', degree_type: 'bachelor' },
    { id: 5, university_id: 3, name: 'Business Administration', name_ar: 'إدارة الأعمال', degree_type: 'master' },
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const filteredPrograms = programs.filter(program => 
    !selectedUniversity || program.university_id === selectedUniversity
  );
  
  const handleSubmit = async () => {
    if (!selectedUniversity || !selectedProgram) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار الجامعة والبرنامج الدراسي",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would submit to Supabase here
      // For now, we'll simulate a submission
      
      setTimeout(() => {
        toast({
          title: "تم تقديم الطلب بنجاح",
          description: "سيتم مراجعة طلبك والرد عليك في أقرب وقت",
        });
        
        navigate('/dashboard/applications');
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم طلبك. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">تقديم طلب التحاق</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>اختيار الجامعة والبرنامج</CardTitle>
            <CardDescription>قم باختيار الجامعة والبرنامج الدراسي الذي ترغب بالتقديم إليه</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="university">الجامعة</Label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Select value={selectedUniversity?.toString()} onValueChange={(value) => setSelectedUniversity(Number(value))}>
                      <SelectTrigger id="university" className="w-full">
                        <SelectValue placeholder="اختر الجامعة" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map(uni => (
                          <SelectItem key={uni.id} value={uni.id.toString()}>
                            {uni.name_ar} - {uni.city}, {uni.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="program">البرنامج الدراسي</Label>
                <Select 
                  value={selectedProgram?.toString()} 
                  onValueChange={(value) => setSelectedProgram(Number(value))}
                  disabled={!selectedUniversity}
                >
                  <SelectTrigger id="program" className="w-full">
                    <SelectValue placeholder={selectedUniversity ? "اختر البرنامج الدراسي" : "اختر الجامعة أولاً"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPrograms.map(program => (
                      <SelectItem key={program.id} value={program.id.toString()}>
                        {program.name_ar} ({program.degree_type === 'bachelor' ? 'بكالوريوس' : 
                          program.degree_type === 'master' ? 'ماجستير' : 
                          program.degree_type === 'phd' ? 'دكتوراه' : 
                          program.degree_type === 'medicine' ? 'طب' : program.degree_type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedUniversity && selectedProgram && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold text-unlimited-dark-blue mb-2">ملخص الطلب</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <University className="h-5 w-5 mt-1 text-unlimited-blue" />
                      <div>
                        <p className="text-sm text-unlimited-gray">الجامعة</p>
                        <p className="font-medium">
                          {universities.find(u => u.id === selectedUniversity)?.name_ar}
                        </p>
                        <p className="text-sm text-unlimited-gray">
                          {universities.find(u => u.id === selectedUniversity)?.city}, 
                          {universities.find(u => u.id === selectedUniversity)?.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 mt-1 text-unlimited-blue" />
                      <div>
                        <p className="text-sm text-unlimited-gray">البرنامج الدراسي</p>
                        <p className="font-medium">
                          {programs.find(p => p.id === selectedProgram)?.name_ar}
                        </p>
                        <p className="text-sm text-unlimited-gray">
                          {programs.find(p => p.id === selectedProgram)?.degree_type === 'bachelor' ? 'بكالوريوس' : 
                           programs.find(p => p.id === selectedProgram)?.degree_type === 'master' ? 'ماجستير' : 
                           programs.find(p => p.id === selectedProgram)?.degree_type === 'phd' ? 'دكتوراه' : 
                           programs.find(p => p.id === selectedProgram)?.degree_type === 'medicine' ? 'طب' : 
                           programs.find(p => p.id === selectedProgram)?.degree_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>بيانات طلب الالتحاق</CardTitle>
            <CardDescription>يرجى تعبئة النموذج التالي بالبيانات المطلوبة</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
                <TabsTrigger value="academic">البيانات الأكاديمية</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="pt-6">
                <StudentApplicationForm
                  type="personal"
                  value={personalInfo}
                  onChange={setPersonalInfo}
                />
              </TabsContent>
              <TabsContent value="academic" className="pt-6">
                <StudentApplicationForm
                  type="academic"
                  value={academicInfo}
                  onChange={setAcademicInfo}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">حفظ كمسودة</Button>
            <StudentApplicationFormSubmit
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              university={universities.find(u => u.id === selectedUniversity)}
              program={programs.find(p => p.id === selectedProgram)}
              isValid={!!selectedUniversity && !!selectedProgram}
            />
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplication;
