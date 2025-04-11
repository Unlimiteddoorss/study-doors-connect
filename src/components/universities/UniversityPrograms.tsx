
import React, { useState, useCallback } from 'react';
import { UniversityProgram } from '@/data/universityPrograms';
import { Button } from '@/components/ui/button';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '@/components/shared/Pagination';
import UniversityProgramCard from './UniversityProgramCard';

interface UniversityProgramsProps {
  programs: UniversityProgram[];
  universityId: number;
  universityName: string;
}

const UniversityPrograms: React.FC<UniversityProgramsProps> = ({ programs, universityId, universityName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [minFee, setMinFee] = useState<number | undefined>(undefined);
  const [maxFee, setMaxFee] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const programsPerPage = 9;

  // استخراج القيم الفريدة للتصفية
  const degrees = Array.from(new Set(programs.map(p => p.degree)));
  const languages = Array.from(new Set(programs.map(p => p.language)));
  const campuses = Array.from(new Set(programs.map(p => p.campus)));

  // وظيفة للحصول على البرامج المصفاة
  const getFilteredPrograms = useCallback(() => {
    return programs.filter(program => {
      // تصفية حسب الدرجة العلمية
      if (selectedDegree !== 'all' && program.degree !== selectedDegree) return false;
      
      // تصفية حسب اللغة
      if (selectedLanguage !== 'all' && program.language !== selectedLanguage) return false;
      
      // تصفية حسب الحرم الجامعي
      if (selectedCampus !== 'all' && program.campus !== selectedCampus) return false;
      
      // تصفية حسب السعر الأدنى
      if (minFee !== undefined && program.discountedFee < minFee) return false;
      
      // تصفية حسب السعر الأقصى
      if (maxFee !== undefined && program.discountedFee > maxFee) return false;
      
      // تصفية حسب البحث
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = program.name.toLowerCase().includes(searchLower);
        const nameArMatch = program.nameAr.toLowerCase().includes(searchLower);
        if (!nameMatch && !nameArMatch) return false;
      }
      
      return true;
    });
  }, [programs, selectedDegree, selectedLanguage, selectedCampus, minFee, maxFee, searchTerm]);

  // الحصول على البرامج المصفاة
  const filteredPrograms = getFilteredPrograms();
  
  // ترتيب البرامج
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.nameAr.localeCompare(b.nameAr);
      case 'priceLow':
        return a.discountedFee - b.discountedFee;
      case 'priceHigh':
        return b.discountedFee - a.discountedFee;
      default:
        return 0;
    }
  });

  // حساب البرامج للصفحة الحالية
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = sortedPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(sortedPrograms.length / programsPerPage);

  // التنقل بين الصفحات
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // إعادة ضبط التصفية
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDegree('all');
    setSelectedLanguage('all');
    setSelectedCampus('all');
    setMinFee(undefined);
    setMaxFee(undefined);
    setSortBy('name');
    setCurrentPage(1);
  };

  // ترجمة اللغة إلى العربية
  const translateLanguage = (lang: string): string => {
    switch(lang) {
      case 'English': return 'الإنجليزية';
      case 'Turkish': return 'التركية';
      case 'Arabic': return 'العربية';
      default: return lang;
    }
  };

  // ترجمة الدرجة العلمية إلى العربية
  const translateDegree = (degree: string): string => {
    switch(degree) {
      case 'Bachelor': return 'بكالوريوس';
      case 'Master': return 'ماجستير';
      case 'PhD': return 'دكتوراه';
      case 'Diploma': return 'دبلوم';
      case 'Vocational School': return 'معهد مهني';
      default: return degree;
    }
  };

  // وجود تصفية نشطة
  const hasActiveFilter = searchTerm || 
                        selectedDegree !== 'all' || 
                        selectedLanguage !== 'all' || 
                        selectedCampus !== 'all' || 
                        minFee !== undefined || 
                        maxFee !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-unlimited-blue">برامج {universityName}</h2>
        
        {/* قسم البحث والتصفية */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              className="pl-10 pr-10"
              placeholder="ابحث عن برنامج..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Select 
            value={selectedDegree} 
            onValueChange={(value) => {
              setSelectedDegree(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الدرجة العلمية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الدرجات</SelectItem>
              {degrees.map(degree => (
                <SelectItem key={degree} value={degree}>
                  {translateDegree(degree)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedLanguage} 
            onValueChange={(value) => {
              setSelectedLanguage(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="لغة الدراسة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع اللغات</SelectItem>
              {languages.map(language => (
                <SelectItem key={language} value={language}>
                  {translateLanguage(language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => {
              const element = document.getElementById('advanced-filters');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            خيارات متقدمة
          </Button>
        </div>
        
        {/* خيارات متقدمة */}
        <div id="advanced-filters" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحرم الجامعي</label>
            <Select 
              value={selectedCampus} 
              onValueChange={(value) => {
                setSelectedCampus(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="جميع الحرم الجامعي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحرم الجامعي</SelectItem>
                {campuses.map(campus => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحد الأدنى للسعر</label>
            <Input
              type="number"
              placeholder="الحد الأدنى للسعر"
              value={minFee || ''}
              onChange={(e) => {
                setMinFee(e.target.value ? parseFloat(e.target.value) : undefined);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحد الأقصى للسعر</label>
            <Input
              type="number"
              placeholder="الحد الأقصى للسعر"
              value={maxFee || ''}
              onChange={(e) => {
                setMaxFee(e.target.value ? parseFloat(e.target.value) : undefined);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="text-unlimited-gray"
            disabled={!hasActiveFilter}
          >
            إعادة ضبط التصفية
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-unlimited-gray">ترتيب حسب:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">الاسم</SelectItem>
                <SelectItem value="priceLow">السعر (الأقل أولاً)</SelectItem>
                <SelectItem value="priceHigh">السعر (الأعلى أولاً)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-unlimited-gray mb-2">
          <span>تم العثور على:</span>
          <span className="font-semibold text-unlimited-blue">{filteredPrograms.length}</span>
          <span>برامج</span>
        </div>
      </div>
      
      {/* قائمة البرامج */}
      {currentPrograms.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-unlimited-gray text-xl">لم يتم العثور على برامج تطابق معايير البحث</p>
          <Button 
            onClick={resetFilters}
            className="mt-4 bg-unlimited-blue hover:bg-unlimited-dark-blue"
          >
            عرض جميع البرامج
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {currentPrograms.map(program => (
            <UniversityProgramCard 
              key={program.id}
              program={program}
              universityId={universityId}
            />
          ))}
        </div>
      )}
      
      {/* ترقيم الصفحات */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default UniversityPrograms;
