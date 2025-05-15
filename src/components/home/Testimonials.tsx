
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  university: string;
  country: string;
  image: string;
  rating: number;
  text: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'محمد العلي',
      role: 'طالب هندسة',
      university: 'جامعة إسطنبول التقنية',
      country: 'سوريا',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'ساعدتني أبواب غير محدودة في تحقيق حلمي بالدراسة في تركيا. كان فريق العمل متعاونًا جدًا وقدم لي كل المساعدة التي احتجتها من بداية التقديم حتى الحصول على القبول والتأشيرة.'
    },
    {
      id: 2,
      name: 'فاطمة الزهراء',
      role: 'طالبة طب',
      university: 'جامعة أنقرة',
      country: 'مصر',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'تجربتي مع أبواب غير محدودة كانت ممتازة من كل النواحي. استطاعوا مساعدتي في اختيار الجامعة المناسبة وتقديم طلبي بشكل صحيح، كما ساعدوني في الحصول على منحة دراسية جزئية.'
    },
    {
      id: 3,
      name: 'عبدالله الراشد',
      role: 'طالب إدارة أعمال',
      university: 'جامعة بيلكنت',
      country: 'السعودية',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      text: 'أشكر فريق أبواب غير محدودة على المتابعة المستمرة والدعم المقدم طوال فترة التقديم. استطاعوا حل جميع المشكلات التي واجهتني وتذليل الصعوبات في عملية القبول.'
    },
    {
      id: 4,
      name: 'مريم الحسن',
      role: 'طالبة علوم حاسوب',
      university: 'جامعة الشرق الأوسط التقنية',
      country: 'الأردن',
      image: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'خدمة احترافية وسريعة، والأهم من ذلك أنها صادقة. وجدت كل ما وعدوني به على أرض الواقع. أنصح كل الطلاب الراغبين بالدراسة في الخارج بالتعامل مع أبواب غير محدودة.'
    }
  ];

  return (
    <div className="bg-unlimited-light-blue/5 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">شهادات طلابنا</h2>
          <p className="text-unlimited-gray max-w-3xl mx-auto">
            استمع إلى تجارب طلابنا الذين ساعدناهم في تحقيق أحلامهم الأكاديمية وبدء مسيرتهم التعليمية في الخارج
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-unlimited-blue/10" />
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-unlimited-blue/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="mr-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-unlimited-gray">{testimonial.role} | {testimonial.country}</p>
                  </div>
                </div>
                
                <p className="text-sm mb-4 line-clamp-4">{testimonial.text}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array(5).fill(0).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`h-4 w-4 ${index < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-xs text-unlimited-blue font-medium">{testimonial.university}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
