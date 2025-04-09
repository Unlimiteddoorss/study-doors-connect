
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="عن أبواب غير محدودة"
          subtitle="نمهد الطريق لمستقبلك التعليمي"
        />
        
        <div className="max-w-4xl mx-auto mt-10 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-unlimited-dark-blue mb-3">من نحن</h3>
            <p className="text-unlimited-gray">
              تأسست شركة "أبواب غير محدودة" عام 1992 بهدف مساعدة الطلاب من مختلف أنحاء العالم في تحقيق أحلامهم الأكاديمية. 
              نحن نعمل كجسر يربط بين الطلاب الطموحين والجامعات المرموقة في مختلف البلدان، ونوفر خدمات شاملة تتضمن الإرشاد الأكاديمي، 
              والمساعدة في التسجيل، وتأمين القبولات، وتقديم الدعم المتواصل طوال الرحلة التعليمية.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-unlimited-dark-blue mb-3">رؤيتنا</h3>
            <p className="text-unlimited-gray">
              نسعى لأن نكون الرائدين عالمياً في مجال الخدمات التعليمية، وأن نفتح أبواباً غير محدودة للطلاب نحو مستقبل تعليمي متميز، 
              من خلال تقديم خدمات ذات جودة عالية وحلول مبتكرة تلبي احتياجات الطلاب وتطلعاتهم.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-unlimited-dark-blue mb-3">رسالتنا</h3>
            <p className="text-unlimited-gray">
              تتمثل رسالتنا في تمكين الطلاب من تحقيق أهدافهم الأكاديمية والمهنية من خلال توجيههم نحو أفضل البرامج الدراسية 
              التي تتناسب مع قدراتهم وطموحاتهم، وتوفير الدعم المستمر لهم في كافة مراحل دراستهم.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-unlimited-dark-blue mb-3">خدماتنا</h3>
            <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
              <li>الاستشارات الأكاديمية المتخصصة</li>
              <li>المساعدة في اختيار البرنامج الدراسي المناسب</li>
              <li>تأمين القبولات في أفضل الجامعات</li>
              <li>المساعدة في إجراءات التأشيرة والإقامة</li>
              <li>خدمات الاستقبال والتوجيه</li>
              <li>متابعة شاملة خلال فترة الدراسة</li>
              <li>دعم ما بعد التخرج والتوظيف</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-unlimited-dark-blue mb-3">لماذا تختار أبواب غير محدودة؟</h3>
            <ul className="list-disc list-inside space-y-2 text-unlimited-gray">
              <li>خبرة تزيد عن 30 عاماً في مجال الخدمات التعليمية</li>
              <li>شراكات استراتيجية مع أكثر من 100 جامعة حول العالم</li>
              <li>فريق من المستشارين المتخصصين في مختلف المجالات الأكاديمية</li>
              <li>دعم متكامل من بداية التسجيل وحتى التخرج</li>
              <li>خدمات مخصصة حسب احتياجات كل طالب</li>
              <li>نسبة نجاح عالية في تأمين القبولات والتأشيرات</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
