
import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { turkishUniversities } from '@/data/programsData';
import { getUniversityPrograms } from '@/data/universityPrograms';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import ProgramDetailsComponent from '@/components/universities/ProgramDetails';
import UniversityProgramCard from '@/components/universities/UniversityProgramCard';
import { Button } from '@/components/ui/button';

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const universityIdParam = searchParams.get('universityId');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const programId = id ? parseInt(id) : -1;
  const universityId = universityIdParam ? parseInt(universityIdParam) : 26; // افتراضي بهتشي شهير
  
  // الحصول على بيانات الجامعة والبرنامج
  const university = turkishUniversities.find(uni => uni.id === universityId);
  const allPrograms = getUniversityPrograms(universityId);
  const program = allPrograms.find(prog => prog.id === programId);
  
  // الحصول على البرامج المشابهة
  const similarPrograms = allPrograms.filter(prog => 
    prog.id !== programId && 
    prog.degree === program?.degree && 
    prog.language === program?.language
  ).slice(0, 3);
  
  // التحقق من وجود البرنامج
  useEffect(() => {
    if (!program) {
      toast({
        title: "لم يتم العثور على البرنامج",
        description: "البرنامج الذي تبحث عنه غير موجود",
        variant: "destructive"
      });
      
      // العودة إلى صفحة تفاصيل الجامعة
      navigate(`/universities/${universityId}`);
    }
  }, [program, toast, universityId, navigate]);

  // عنوان الصفحة
  useEffect(() => {
    if (program) {
      document.title = `${program.nameAr} - ${university?.nameAr || university?.name || 'جامعة بهتشي شهير'}`;
    }
    return () => {
      document.title = 'Unlimited Education';
    };
  }, [program, university]);

  if (!program || !university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">البرنامج غير موجود</h1>
          <p className="mb-8">لا يمكن العثور على البرنامج الذي تبحث عنه.</p>
          <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            <Link to={`/universities/${universityId}`}>عرض برامج الجامعة</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* نافذة المسار */}
        <div className="flex items-center mb-6 text-unlimited-gray">
          <Link to="/" className="hover:text-unlimited-blue">الرئيسية</Link>
          <ChevronLeft className="h-4 w-4 mx-1" />
          <Link to="/universities" className="hover:text-unlimited-blue">الجامعات</Link>
          <ChevronLeft className="h-4 w-4 mx-1" />
          <Link to={`/universities/${university.id}`} className="hover:text-unlimited-blue">{university.nameAr || university.name}</Link>
          <ChevronLeft className="h-4 w-4 mx-1" />
          <span className="text-unlimited-blue">{program.nameAr}</span>
        </div>
        
        {/* تفاصيل البرنامج */}
        <ProgramDetailsComponent 
          program={program} 
          universityName={university.nameAr || university.name}
          universityId={university.id}
        />
        
        {/* برامج مشابهة */}
        {similarPrograms.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-unlimited-blue">برامج مشابهة قد تهمك</h2>
              <Button asChild variant="outline">
                <Link to={`/universities/${university.id}`}>
                  عرض كل البرامج 
                  <ChevronRight className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {similarPrograms.map(prog => (
                <UniversityProgramCard 
                  key={prog.id} 
                  program={prog} 
                  universityId={university.id}
                  universityName={university.nameAr || university.name}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                <Link to="/apply">
                  تقدم للالتحاق الآن
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
