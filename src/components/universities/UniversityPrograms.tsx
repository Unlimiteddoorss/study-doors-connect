
import { useState } from 'react';
import { UniversityProgram } from '@/data/universityPrograms';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import UniversityProgramCard from './UniversityProgramCard';

interface UniversityProgramsProps {
  programs: UniversityProgram[];
  universityId: string;
  universityName: string;
}

const UniversityPrograms: React.FC<UniversityProgramsProps> = ({
  programs,
  universityId,
  universityName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // حساب برامج الدراسة حسب الدرجة العلمية
  const bachelorPrograms = programs.filter(p => p.degree === 'Bachelor');
  const masterPrograms = programs.filter(p => p.degree === 'Master');
  const phdPrograms = programs.filter(p => p.degree === 'PhD');
  const otherPrograms = programs.filter(p => 
    p.degree !== 'Bachelor' && 
    p.degree !== 'Master' && 
    p.degree !== 'PhD'
  );

  // تصفية البرامج حسب البحث والفلاتر
  const filterPrograms = (programList: UniversityProgram[]) => {
    return programList.filter(program => {
      const matchSearch = searchTerm === '' || 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        program.nameAr.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchLanguage = selectedLanguage === 'all' || 
        program.language === selectedLanguage;
      
      return matchSearch && matchLanguage;
    });
  };

  // الحصول على اللغات الفريدة المتوفرة في البرامج
  const availableLanguages = Array.from(new Set(programs.map(p => p.language)));

  // تحضير البرامج المصفاة لكل تبويب
  const filteredBachelorPrograms = filterPrograms(bachelorPrograms);
  const filteredMasterPrograms = filterPrograms(masterPrograms);
  const filteredPhdPrograms = filterPrograms(phdPrograms);
  const filteredOtherPrograms = filterPrograms(otherPrograms);

  return (
    <div className="space-y-8">
      {/* فلاتر البحث */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="ابحث عن برنامج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
          <div className="w-full md:w-40">
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="اللغة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع اللغات</SelectItem>
                {availableLanguages.map(lang => (
                  <SelectItem key={lang} value={lang}>
                    {lang === 'English' ? 'الإنجليزية' : 
                     lang === 'Turkish' ? 'التركية' : 
                     lang === 'Arabic' ? 'العربية' : lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* عرض البرامج حسب التصنيف */}
      <Tabs defaultValue="bachelor">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="bachelor" className="text-sm md:text-base">
            البكالوريوس ({bachelorPrograms.length})
          </TabsTrigger>
          <TabsTrigger value="master" className="text-sm md:text-base">
            الماجستير ({masterPrograms.length})
          </TabsTrigger>
          <TabsTrigger value="phd" className="text-sm md:text-base">
            الدكتوراه ({phdPrograms.length})
          </TabsTrigger>
          <TabsTrigger value="other" className="text-sm md:text-base">
            أخرى ({otherPrograms.length})
          </TabsTrigger>
        </TabsList>

        {/* برامج البكالوريوس */}
        <TabsContent value="bachelor">
          {filteredBachelorPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredBachelorPrograms.map(program => (
                <UniversityProgramCard
                  key={program.id}
                  program={program}
                  universityId={universityId}
                  universityName={universityName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-unlimited-gray">
              لا توجد برامج بكالوريوس متطابقة مع معايير البحث.
            </div>
          )}
        </TabsContent>

        {/* برامج الماجستير */}
        <TabsContent value="master">
          {filteredMasterPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredMasterPrograms.map(program => (
                <UniversityProgramCard
                  key={program.id}
                  program={program}
                  universityId={universityId}
                  universityName={universityName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-unlimited-gray">
              لا توجد برامج ماجستير متطابقة مع معايير البحث.
            </div>
          )}
        </TabsContent>

        {/* برامج الدكتوراه */}
        <TabsContent value="phd">
          {filteredPhdPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredPhdPrograms.map(program => (
                <UniversityProgramCard
                  key={program.id}
                  program={program}
                  universityId={universityId}
                  universityName={universityName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-unlimited-gray">
              لا توجد برامج دكتوراه متطابقة مع معايير البحث.
            </div>
          )}
        </TabsContent>

        {/* البرامج الأخرى */}
        <TabsContent value="other">
          {filteredOtherPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredOtherPrograms.map(program => (
                <UniversityProgramCard
                  key={program.id}
                  program={program}
                  universityId={universityId}
                  universityName={universityName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-unlimited-gray">
              لا توجد برامج أخرى متطابقة مع معايير البحث.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* زر التقدم للجامعة */}
      <div className="flex justify-center mt-8">
        <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-lg px-8">
          <a href={`/apply?university=${universityId}`}>
            تقديم طلب للالتحاق بالجامعة
          </a>
        </Button>
      </div>
    </div>
  );
};

export default UniversityPrograms;
