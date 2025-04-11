
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Award, Calendar, GraduationCap, Globe, MapPin, Search, University } from 'lucide-react';

const scholarshipsData = [
  {
    id: 1,
    title: 'منحة جامعة اسطنبول للطلاب المتفوقين',
    university: 'جامعة اسطنبول',
    country: 'Turkey',
    coveragePercent: 100,
    deadline: '15 سبتمبر 2025',
    studyLevel: ['Bachelor', 'Master'],
    description: 'منحة كاملة تغطي الرسوم الدراسية والسكن للطلاب المتفوقين أكاديميًا وفي اختبارات القبول.',
    requirements: 'معدل GPA لا يقل عن 3.5، اجتياز اختبار القبول بنسبة 80% أو أعلى',
    badge: 'منحة كاملة',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'منحة التفوق الأكاديمي - جامعة هنغاريا للتكنولوجيا',
    university: 'جامعة هنغاريا للتكنولوجيا',
    country: 'Hungary',
    coveragePercent: 75,
    deadline: '1 أكتوبر 2025',
    studyLevel: ['Bachelor', 'Master', 'Doctorate'],
    description: 'منحة جزئية للطلاب المتفوقين في مجالات الهندسة والعلوم والتكنولوجيا.',
    requirements: 'معدل GPA لا يقل عن 3.2، خبرة بحثية أو مشاريع سابقة',
    badge: 'تغطية 75%',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'منحة الأعمال والاقتصاد - جامعة أوزيجين',
    university: 'جامعة أوزيجين',
    country: 'Turkey',
    coveragePercent: 50,
    deadline: '30 نوفمبر 2025',
    studyLevel: ['Bachelor'],
    description: 'منحة جزئية لدراسة تخصصات الأعمال والاقتصاد والمالية للطلاب الموهوبين.',
    requirements: 'معدل GPA لا يقل عن 3.0، اجتياز المقابلة الشخصية، توصية من أستاذين',
    badge: 'تغطية 50%',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'منحة الطب والعلوم الصحية - جامعة القاهرة',
    university: 'جامعة القاهرة',
    country: 'Egypt',
    coveragePercent: 80,
    deadline: '15 ديسمبر 2025',
    studyLevel: ['Master', 'Doctorate'],
    description: 'منحة للدراسات العليا في مجالات الطب والعلوم الصحية للطلاب المتميزين.',
    requirements: 'معدل GPA لا يقل عن 3.7، خبرة بحثية سابقة، نشر ورقة علمية واحدة على الأقل',
    badge: 'تغطية 80%',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'منحة علوم الحاسوب والذكاء الاصطناعي - جامعة فاتح سلطان محمد',
    university: 'جامعة فاتح سلطان محمد',
    country: 'Turkey',
    coveragePercent: 60,
    deadline: '1 يناير 2026',
    studyLevel: ['Master'],
    description: 'منحة لدراسة تخصصات علوم الحاسوب والذكاء الاصطناعي وعلم البيانات.',
    requirements: 'معدل GPA لا يقل عن 3.3، خلفية برمجية قوية، اجتياز اختبار القبول التقني',
    badge: 'تغطية 60%',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'منحة اللغات والترجمة - جامعة السوربون أبوظبي',
    university: 'جامعة السوربون أبوظبي',
    country: 'United Arab Emirates',
    coveragePercent: 70,
    deadline: '15 فبراير 2026',
    studyLevel: ['Bachelor', 'Master'],
    description: 'منحة لدراسة اللغات والترجمة والأدب المقارن للطلاب الموهوبين لغوياً.',
    requirements: 'إتقان لغتين على الأقل، معدل GPA لا يقل عن 3.2، اجتياز اختبار الكفاءة اللغوية',
    badge: 'تغطية 70%',
    image: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=2032&auto=format&fit=crop'
  }
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarshipsData);
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = scholarshipsData.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           scholarship.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = selectedLevel === 'all' || 
                          scholarship.studyLevel.includes(selectedLevel);
      
      return matchesSearch && matchesLevel;
    });
    
    setFilteredScholarships(filtered);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setFilteredScholarships(scholarshipsData);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="المنح الدراسية"
          subtitle="استكشف فرص المنح الدراسية المتاحة في الجامعات العالمية"
        />
        
        {/* Search form */}
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن منح دراسية، جامعات، أو دول..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-unlimited-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <select
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-unlimited-blue"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">جميع المستويات الدراسية</option>
                <option value="Bachelor">البكالوريوس</option>
                <option value="Master">الماجستير</option>
                <option value="Doctorate">الدكتوراه</option>
              </select>
              
              <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">بحث</Button>
              
              {(searchTerm || selectedLevel !== 'all') && (
                <Button type="button" variant="outline" onClick={resetFilters}>
                  إعادة ضبط
                </Button>
              )}
            </div>
          </form>
        </div>
        
        {/* Results info */}
        <div className="mb-6">
          <p className="text-unlimited-gray">
            تم العثور على <span className="font-semibold text-unlimited-blue">{filteredScholarships.length}</span> منحة دراسية
          </p>
        </div>
        
        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-all border-t-4 border-t-unlimited-blue">
              <div className="relative h-40">
                <img 
                  src={scholarship.image}
                  alt={scholarship.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-unlimited-blue">{scholarship.badge}</Badge>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <University className="h-4 w-4 mr-1 text-unlimited-gray" />
                  <span className="text-sm text-unlimited-gray">{scholarship.university}</span>
                </div>
                <h3 className="font-bold text-lg">{scholarship.title}</h3>
              </CardHeader>
              
              <CardContent className="space-y-3 pb-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-unlimited-gray" />
                    <span>{scholarship.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-unlimited-blue" />
                    <span className="text-unlimited-blue font-semibold">
                      {scholarship.coveragePercent}% تغطية
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1 text-unlimited-gray" />
                    <span>{scholarship.studyLevel.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-unlimited-gray" />
                    <span>{scholarship.deadline}</span>
                  </div>
                </div>
                
                <p className="text-sm text-unlimited-gray line-clamp-2">
                  {scholarship.description}
                </p>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/scholarships/${scholarship.id}`}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-unlimited-gray mb-4">لم يتم العثور على منح دراسية تطابق بحثك</p>
            <Button onClick={resetFilters}>إعادة ضبط البحث</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Scholarships;
