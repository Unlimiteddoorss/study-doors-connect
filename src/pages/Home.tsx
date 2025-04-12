
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

const Home = () => {
  useEffect(() => {
    document.title = 'Unlimited Education - الرئيسية';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-unlimited-blue mb-4">مرحباً بكم في أبواب غير محدودة</h1>
          <p className="text-lg text-unlimited-gray max-w-2xl mx-auto">
            بوابتك نحو مستقبل تعليمي متميز. نوفر لك الفرص الدراسية المناسبة في أفضل الجامعات حول العالم.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-3 text-unlimited-blue">استكشف الدول</h2>
            <p className="text-unlimited-gray mb-4">تعرف على فرص الدراسة في مختلف الدول وأفضل الوجهات التعليمية</p>
            <Link 
              to="/countries"
              className="inline-block bg-unlimited-blue text-white px-4 py-2 rounded hover:bg-unlimited-dark-blue transition-colors"
            >
              عرض الدول
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-3 text-unlimited-blue">الجامعات التركية</h2>
            <p className="text-unlimited-gray mb-4">استكشف أفضل الجامعات في تركيا وتعرف على برامجها الأكاديمية</p>
            <Link 
              to="/turkish-universities"
              className="inline-block bg-unlimited-blue text-white px-4 py-2 rounded hover:bg-unlimited-dark-blue transition-colors"
            >
              عرض الجامعات
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-3 text-unlimited-blue">تواصل معنا</h2>
            <p className="text-unlimited-gray mb-4">هل لديك استفسارات أو تحتاج إلى مساعدة؟ فريقنا جاهز للرد عليك</p>
            <Link 
              to="/contact"
              className="inline-block bg-unlimited-blue text-white px-4 py-2 rounded hover:bg-unlimited-dark-blue transition-colors"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            to="/login"
            className="inline-block bg-unlimited-blue text-white px-6 py-3 rounded-lg hover:bg-unlimited-dark-blue transition-colors mr-4"
          >
            تسجيل الدخول
          </Link>
          <Link 
            to="/register"
            className="inline-block border border-unlimited-blue text-unlimited-blue px-6 py-3 rounded-lg hover:bg-unlimited-blue/10 transition-colors"
          >
            إنشاء حساب
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
