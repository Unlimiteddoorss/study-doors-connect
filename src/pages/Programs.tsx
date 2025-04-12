
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import { dummyPrograms } from '@/data/programsData';

const Programs = () => {
  useEffect(() => {
    document.title = 'البرامج الدراسية - أبواب بلا حدود';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPrograms, setFilteredPrograms] = useState(dummyPrograms);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter programs based on search query
    const filtered = dummyPrograms.filter(program => 
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrograms(filtered);
  };

  const resetFilters = () => {
    setFilteredPrograms(dummyPrograms);
    setSearchQuery('');
    setShowFilters(false);
  };
  
  return (
    <MainLayout>
      <div className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">البرامج الدراسية</h1>
          <p className="text-lg max-w-2xl mx-auto text-center">اكتشف مجموعة واسعة من البرامج الدراسية في أفضل الجامعات حول العالم</p>
          
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="ابحث عن برنامج دراسي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white text-unlimited-dark-blue"
              />
              <Button type="submit" className="bg-white text-unlimited-blue hover:bg-gray-100">
                <Search className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 justify-center">
            <TabsTrigger value="all">جميع البرامج</TabsTrigger>
            <TabsTrigger value="bachelor">البكالوريوس</TabsTrigger>
            <TabsTrigger value="master">الماجستير</TabsTrigger>
            <TabsTrigger value="phd">الدكتوراه</TabsTrigger>
          </TabsList>
          
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-unlimited-gray mb-2">الدولة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">جميع الدول</option>
                  <option value="turkey">تركيا</option>
                  <option value="cyprus">قبرص</option>
                  <option value="hungary">المجر</option>
                  <option value="poland">بولندا</option>
                </select>
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">اللغة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">جميع اللغات</option>
                  <option value="turkish">التركية</option>
                  <option value="english">الإنجليزية</option>
                  <option value="arabic">العربية</option>
                </select>
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">التخصص</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="">جميع التخصصات</option>
                  <option value="business">إدارة الأعمال</option>
                  <option value="engineering">الهندسة</option>
                  <option value="medicine">الطب</option>
                  <option value="computer-science">علوم الحاسوب</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={resetFilters}
                  className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                >
                  إعادة ضبط
                </Button>
              </div>
            </div>
          )}
          
          <TabsContent value="all">
            <ProgramsGrid programs={filteredPrograms} />
          </TabsContent>
          
          <TabsContent value="bachelor">
            <ProgramsGrid programs={filteredPrograms.filter(p => p.degree === "bachelor")} />
          </TabsContent>
          
          <TabsContent value="master">
            <ProgramsGrid programs={filteredPrograms.filter(p => p.degree === "master")} />
          </TabsContent>
          
          <TabsContent value="phd">
            <ProgramsGrid programs={filteredPrograms.filter(p => p.degree === "phd")} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Programs;
