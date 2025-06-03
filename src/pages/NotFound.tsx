import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Search, Home, Clock, ChevronLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import TurkishUniversitiesAnnouncement from '@/components/announcements/TurkishUniversitiesAnnouncement';

const suggestedPages = [
  { title: "الصفحة الرئيسية", url: "/" },
  { title: "استكشف الجامعات", url: "/universities" },
  { title: "التخصصات المتاحة", url: "/programs" },
  { title: "التقديم للجامعات", url: "/apply" },
  { title: "المنح الدراسية", url: "/scholarships" },
  { title: "تواصل معنا", url: "/contact" },
];

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // في الواقع هنا سنذهب إلى صفحة البحث، لكن لأغراض العرض نذهب للبرامج
      navigate(`/programs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>404 - الصفحة غير موجودة | أبواب بلا حدود التعليمية</title>
        <meta name="description" content="عذراً، الصفحة التي تبحث عنها غير موجودة" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <TurkishUniversitiesAnnouncement />
        
        <div className="text-center mb-12">
          <h1 className="text-8xl font-bold text-unlimited-dark-blue dark:text-unlimited-light-blue mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">عذراً، الصفحة التي تبحث عنها غير موجودة</h2>
          <p className="text-unlimited-gray mb-6">
            ربما تم نقل الصفحة أو تغيير عنوانها أو حذفها
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="flex gap-2">
              <Link to="/">
                <Home className="h-5 w-5" />
                <span>الرئيسية</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                تواصل معنا
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-unlimited-gray">
            <Clock className="h-4 w-4" />
            <span>سيتم توجيهك تلقائياً إلى الصفحة الرئيسية خلال</span>
            <span className="text-unlimited-blue font-bold">{countdown}</span>
            <span>ثانية</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-10">
          <h3 className="font-semibold text-lg mb-4">البحث في الموقع</h3>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="ابحث عن الصفحة أو المحتوى..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue dark:bg-gray-700 dark:text-white"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-1" />
              <span>بحث</span>
            </Button>
          </form>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">صفحات قد تهمك</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedPages.map((page, index) => (
              <Link 
                key={index} 
                to={page.url}
                className="flex items-center gap-2 p-3 rounded-md hover:bg-unlimited-light-blue dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-unlimited-blue" />
                <span>{page.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
