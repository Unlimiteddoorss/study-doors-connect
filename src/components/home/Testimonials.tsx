
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '../shared/SectionTitle';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'محمد أحمد',
      image: 'https://i.pravatar.cc/150?img=1',
      role: 'طالب بكالوريوس هندسة',
      university: 'جامعة أوزيجين',
      country: 'تركيا',
      rating: 5,
      text: 'كانت تجربتي مع أبواب غير محدودة ممتازة من كل النواحي. ساعدوني في اختيار التخصص المناسب والجامعة الأفضل، وتابعوا معي خطوة بخطوة حتى بدأت دراستي.'
    },
    {
      id: 2,
      name: 'سارة محمد',
      image: 'https://i.pravatar.cc/150?img=5',
      role: 'طالبة ماجستير إدارة أعمال',
      university: 'جامعة فاتح سلطان محمد',
      country: 'تركيا',
      rating: 5,
      text: 'أشكر فريق أبواب غير محدودة على الدعم الكبير الذي قدموه لي. استطعت الحصول على قبول في جامعة مرموقة وحصلت على منحة دراسية بفضل توجيههم.'
    },
    {
      id: 3,
      name: 'أحمد خالد',
      image: 'https://i.pravatar.cc/150?img=3',
      role: 'طالب دكتوراه علوم حاسوب',
      university: 'جامعة المجر للتكنولوجيا',
      country: 'المجر',
      rating: 4,
      text: 'خدمات استثنائية وفريق عمل محترف. ساعدوني في جميع مراحل التقديم وإجراءات التأشيرة. أنصح بشدة بالتعامل معهم للراغبين في الدراسة في الخارج.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-unlimited-dark-blue text-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="آراء طلابنا"
          subtitle="ما يقوله الطلاب عن تجربتهم معنا"
          centered
          titleClassName="text-white"
          subtitleClassName="text-gray-300"
        />
        
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-unlimited-blue mb-4">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-xl mb-1">{currentTestimonial.name}</h4>
                <p className="text-unlimited-light-blue mb-1">{currentTestimonial.role}</p>
                <p className="text-gray-300 text-sm mb-3">{currentTestimonial.university}, {currentTestimonial.country}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg italic">"&nbsp;{currentTestimonial.text}&nbsp;"</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="border-white/30 hover:bg-white/10">
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="border-white/30 hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
