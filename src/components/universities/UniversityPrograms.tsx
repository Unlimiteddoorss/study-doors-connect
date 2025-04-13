
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, GraduationCap, Clock, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UniversityProgram } from '@/data/universityPrograms';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { availableDegrees, availableLanguages } from '@/data/universityPrograms';

interface UniversityProgramsProps {
  programs: UniversityProgram[];
  universityId: string | number;
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
  const [filteredPrograms, setFilteredPrograms] = useState<UniversityProgram[]>(programs);
  const [activeTab, setActiveTab] = useState<'bachelor' | 'master' | 'phd' | 'vocational'>('bachelor');

  // فلترة البرامج
  useEffect(() => {
    let result = programs;
    
    // فلترة حسب البحث
    if (searchTerm.trim() !== '') {
      result = result.filter(program => 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // فلترة حسب التبويب النشط
    if (activeTab === 'bachelor') {
      result = result.filter(p => p.degree === 'Bachelor');
    } else if (activeTab === 'master') {
      result = result.filter(p => p.degree === 'Master');
    } else if (activeTab === 'phd') {
      result = result.filter(p => p.degree === 'PhD');
    } else if (activeTab === 'vocational') {
      result = result.filter(p => p.degree === 'Vocational School' || p.degree === 'Diploma');
    }
    
    // فلترة حسب الدرجة العلمية
    if (selectedDegree !== 'all') {
      result = result.filter(p => p.degree === selectedDegree);
    }
    
    // فلترة حسب لغة الدراسة
    if (selectedLanguage !== 'all') {
      result = result.filter(p => p.language === selectedLanguage);
    }
    
    setFilteredPrograms(result);
  }, [searchTerm, programs, selectedDegree, selectedLanguage, activeTab]);

  // تجميع برامج الدراسات العليا
  const bachelorPrograms = programs.filter(p => p.degree === 'Bachelor');
  const masterPrograms = programs.filter(p => p.degree === 'Master');
  const phdPrograms = programs.filter(p => p.degree === 'PhD');
  const vocationalPrograms = programs.filter(p => p.degree === 'Vocational School' || p.degree === 'Diploma');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="ابحث عن برنامج دراسي..."
              className="pl-3 pr-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع اللغات</SelectItem>
              {availableLanguages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang === 'English' ? 'الإنجليزية' : lang === 'Turkish' ? 'التركية' : 'العربية'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDegree} onValueChange={setSelectedDegree}>
            <SelectTrigger>
              <SelectValue placeholder="الدرجة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الدرجات</SelectItem>
              {availableDegrees.map(degree => (
                <SelectItem key={degree} value={degree}>
                  {degree === 'Bachelor' ? 'بكالوريوس' : 
                   degree === 'Master' ? 'ماجستير' : 
                   degree === 'PhD' ? 'دكتوراه' : 
                   degree === 'Diploma' ? 'دبلوم' : 'مدرسة مهنية'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b overflow-x-auto">
          <Button
            variant={activeTab === 'bachelor' ? "default" : "ghost"}
            className={`rounded-none ${activeTab === 'bachelor' ? 'bg-unlimited-blue text-white' : ''}`}
            onClick={() => setActiveTab('bachelor')}
          >
            برامج البكالوريوس ({bachelorPrograms.length})
          </Button>
          <Button
            variant={activeTab === 'master' ? "default" : "ghost"}
            className={`rounded-none ${activeTab === 'master' ? 'bg-unlimited-blue text-white' : ''}`}
            onClick={() => setActiveTab('master')}
          >
            برامج الماجستير ({masterPrograms.length})
          </Button>
          <Button
            variant={activeTab === 'phd' ? "default" : "ghost"}
            className={`rounded-none ${activeTab === 'phd' ? 'bg-unlimited-blue text-white' : ''}`}
            onClick={() => setActiveTab('phd')}
          >
            برامج الدكتوراه ({phdPrograms.length})
          </Button>
          <Button
            variant={activeTab === 'vocational' ? "default" : "ghost"}
            className={`rounded-none ${activeTab === 'vocational' ? 'bg-unlimited-blue text-white' : ''}`}
            onClick={() => setActiveTab('vocational')}
          >
            البرامج المهنية ({vocationalPrograms.length})
          </Button>
        </div>
      </div>

      {filteredPrograms.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold mb-2">لا توجد برامج تطابق البحث</h3>
          <p className="text-unlimited-gray mb-6">
            حاول تغيير معايير البحث أو استكشاف برامج أخرى
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedDegree('all');
            setSelectedLanguage('all');
          }}>
            عرض جميع البرامج
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPrograms.map((program) => (
            <Link 
              to={`/programs/${program.id}?universityId=${universityId}`}
              key={program.id} 
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{program.nameAr}</CardTitle>
                      <CardDescription className="mt-1">{program.name}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={program.language === 'English' ? 'default' : 'outline'}>
                        {program.language === 'English' ? 'EN' : program.language === 'Turkish' ? 'TR' : 'AR'}
                      </Badge>
                      {program.available ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                          متاح للتسجيل
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          غير متاح
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-unlimited-gray">
                      <GraduationCap className="h-4 w-4" />
                      <span>{program.degree === 'Bachelor' ? 'بكالوريوس' :
                             program.degree === 'Master' ? 'ماجستير' :
                             program.degree === 'PhD' ? 'دكتوراه' : 'دبلوم'} - {program.campus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-unlimited-gray">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-unlimited-gray">
                      <DollarSign className="h-4 w-4" />
                      <span className={program.discountedFee < program.tuitionFee ? "line-through text-gray-400" : ""}>
                        ${program.tuitionFee}
                      </span>
                      {program.discountedFee < program.tuitionFee && (
                        <span className="text-green-600 font-semibold">${program.discountedFee}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-end w-full">
                    <Button variant="outline">عرض التفاصيل</Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {filteredPrograms.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            <Link to="/apply">تقدم للالتحاق في {universityName}</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default UniversityPrograms;
