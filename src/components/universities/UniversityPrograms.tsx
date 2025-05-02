
import React, { useState } from 'react';
import { UniversityProgram } from '@/data/universityPrograms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { School, MapPin, DollarSign, Languages, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pagination from '@/components/shared/Pagination';

interface ProgramFilters {
  degree: string;
  language: string;
  campus: string;
  minPrice: number | null;
  maxPrice: number | null;
  searchTerm: string;
}

interface UniversityProgramsProps {
  programs: UniversityProgram[];
  universityId: number;
  universityName: string;
}

const UniversityPrograms: React.FC<UniversityProgramsProps> = ({ programs, universityId, universityName }) => {
  const [filters, setFilters] = useState<ProgramFilters>({
    degree: '',
    language: '',
    campus: '',
    minPrice: null,
    maxPrice: null,
    searchTerm: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const programsPerPage = 9;

  // استخراج القيم الفريدة للتصفية
  const degrees = Array.from(new Set(programs.map(p => p.degree)));
  const languages = Array.from(new Set(programs.map(p => p.language)));
  const campuses = Array.from(new Set(programs.map(p => p.campus)));

  // تطبيق التصفية
  const filteredPrograms = programs.filter(program => {
    // تصفية حسب الدرجة العلمية
    if (filters.degree && program.degree !== filters.degree) return false;
    
    // تصفية حسب اللغة
    if (filters.language && program.language !== filters.language) return false;
    
    // تصفية حسب الحرم الجامعي
    if (filters.campus && program.campus !== filters.campus) return false;
    
    // تصفية حسب السعر الأدنى
    if (filters.minPrice !== null && program.discountedFee < filters.minPrice) return false;
    
    // تصفية حسب السعر الأقصى
    if (filters.maxPrice !== null && program.discountedFee > filters.maxPrice) return false;
    
    // تصفية حسب البحث
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const nameMatch = program.name.toLowerCase().includes(searchLower);
      const nameArMatch = program.nameAr.toLowerCase().includes(searchLower);
      if (!nameMatch && !nameArMatch) return false;
    }
    
    return true;
  });
  
  // ترتيب البرامج
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
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
    setFilters({
      degree: '',
      language: '',
      campus: '',
      minPrice: null,
      maxPrice: null,
      searchTerm: ''
    });
    setSortBy('name');
    setCurrentPage(1);
  };

  // تحويل اللغة إلى العربية
  const translateLanguage = (lang: string): string => {
    switch(lang) {
      case 'English': return 'الإنجليزية';
      case 'Turkish': return 'التركية';
      case 'Arabic': return 'العربية';
      default: return lang;
    }
  };

  // تحويل الدرجة العلمية إلى العربية
  const translateDegree = (degree: string): string => {
    switch(degree) {
      case 'Bachelor': return 'بكالوريوس';
      case 'Master': return 'ماجستير';
      case 'PhD': return 'دكتوراه';
      case 'Diploma': return 'دبلوم';
      default: return degree;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-unlimited-blue">برامج {universityName}</h2>
        
        {/* قسم البحث والتصفية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">ابحث عن برنامج</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              placeholder="اسم البرنامج..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الدرجة العلمية</label>
            <select
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              value={filters.degree}
              onChange={(e) => setFilters({...filters, degree: e.target.value})}
            >
              <option value="">جميع الدرجات العلمية</option>
              {degrees.map(degree => (
                <option key={degree} value={degree}>{translateDegree(degree)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">لغة الدراسة</label>
            <select
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              value={filters.language}
              onChange={(e) => setFilters({...filters, language: e.target.value})}
            >
              <option value="">جميع اللغات</option>
              {languages.map(language => (
                <option key={language} value={language}>{translateLanguage(language)}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحرم الجامعي</label>
            <select
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              value={filters.campus}
              onChange={(e) => setFilters({...filters, campus: e.target.value})}
            >
              <option value="">جميع الحرم الجامعي</option>
              {campuses.map(campus => (
                <option key={campus} value={campus}>{campus}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحد الأدنى للسعر</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              placeholder="الحد الأدنى للسعر"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters({
                ...filters, 
                minPrice: e.target.value ? parseFloat(e.target.value) : null
              })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-unlimited-gray">الحد الأقصى للسعر</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
              placeholder="الحد الأقصى للسعر"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters({
                ...filters, 
                maxPrice: e.target.value ? parseFloat(e.target.value) : null
              })}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="text-unlimited-gray"
          >
            إعادة ضبط التصفية
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-unlimited-gray">ترتيب حسب:</span>
            <select
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-unlimited-blue"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">الاسم</option>
              <option value="priceLow">السعر (الأقل أولا)</option>
              <option value="priceHigh">السعر (الأعلى أولا)</option>
            </select>
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
            <Card key={program.id} className="overflow-hidden hover:border-unlimited-blue transition-all">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 p-6">
                    <h3 className="font-bold text-xl mb-2 text-unlimited-blue">{program.nameAr}</h3>
                    <p className="text-unlimited-gray mb-4">{program.name}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <School className="h-3 w-3" />
                        {translateDegree(program.degree)}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Languages className="h-3 w-3" />
                        {translateLanguage(program.language)}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {program.campus}
                      </Badge>
                      {program.duration && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {program.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 md:col-span-1 bg-gray-50 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-unlimited-gray">الرسوم الدراسية:</div>
                        <div className="font-semibold">
                          <DollarSign className="w-4 h-4 inline-block text-unlimited-blue" />
                          {program.tuitionFee.toLocaleString()} USD
                        </div>
                      </div>
                      
                      {program.discountedFee < program.tuitionFee && (
                        <div>
                          <div className="text-sm text-unlimited-gray">بعد الخصم:</div>
                          <div className="font-semibold text-green-600">
                            <DollarSign className="w-4 h-4 inline-block" />
                            {program.discountedFee.toLocaleString()} USD
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-sm text-unlimited-gray">رسوم التأمين:</div>
                        <div className="font-semibold">
                          <DollarSign className="w-4 h-4 inline-block" />
                          {program.depositFee.toLocaleString()} USD
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-unlimited-gray">رسوم السنة التحضيرية:</div>
                        <div className="font-semibold">
                          <DollarSign className="w-4 h-4 inline-block" />
                          {program.prepFee.toLocaleString()} USD
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:col-span-1 flex flex-col justify-center items-center bg-gray-50 border-r border-gray-200">
                    <Badge className={program.available ? "bg-green-600 mb-4" : "bg-red-600 mb-4"}>
                      {program.available ? "متاح للتسجيل" : "مغلق للتسجيل"}
                    </Badge>
                    
                    <Button asChild className="w-full mb-2 bg-unlimited-blue hover:bg-unlimited-dark-blue">
                      <Link to={`/apply?program=${program.id}&university=${universityId}`}>
                        تقدم الآن
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/programs/${program.id}`}>
                        التفاصيل
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
