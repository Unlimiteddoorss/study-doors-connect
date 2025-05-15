
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';

const FAQAccordion = () => {
  const { t } = useTranslation();
  
  // بيانات الأسئلة الشائعة
  const faqs = [
    {
      question: t('faq.application.question', 'كيف يمكنني التقدم بطلب للدراسة؟'),
      answer: t('faq.application.answer', 'يمكنك التقدم بطلب للدراسة من خلال إنشاء حساب على منصتنا، ثم تعبئة نموذج الطلب الإلكتروني وإرفاق المستندات المطلوبة. سيقوم فريق خبرائنا بمراجعة طلبك والتواصل معك خلال 48 ساعة.')
    },
    {
      question: t('faq.documents.question', 'ما هي المستندات المطلوبة للتقديم؟'),
      answer: t('faq.documents.answer', 'المستندات الأساسية المطلوبة هي: جواز السفر، الشهادة الثانوية مترجمة ومصدقة، كشف الدرجات، شهادة إجادة اللغة (إن وجدت)، السيرة الذاتية، وصورة شخصية. قد تطلب بعض الجامعات أو البرامج مستندات إضافية تحددها عند التقديم.')
    },
    {
      question: t('faq.fees.question', 'كم تبلغ تكاليف التقديم؟'),
      answer: t('faq.fees.answer', 'التسجيل والاستفسار عبر منصتنا مجاني تماماً. تختلف رسوم التقديم للجامعات حسب البلد والجامعة والتخصص. يمكنك الاطلاع على تفاصيل الرسوم لكل برنامج في صفحة البرامج الدراسية أو التواصل مع مستشارينا للحصول على تفاصيل أكثر.')
    },
    {
      question: t('faq.timeline.question', 'ما هي المدة المتوقعة للحصول على القبول؟'),
      answer: t('faq.timeline.answer', 'تختلف مدة الحصول على القبول حسب الجامعة والبرنامج. بشكل عام، قد تستغرق العملية من 2 إلى 8 أسابيع من تاريخ تقديم الطلب الكامل مع جميع المستندات المطلوبة. نقوم بتحديث حالة طلبك باستمرار ليمكنك متابعته من حسابك الشخصي.')
    },
    {
      question: t('faq.visa.question', 'هل تساعدون في إجراءات التأشيرة؟'),
      answer: t('faq.visa.answer', 'نعم، نقدم المساعدة في إجراءات التأشيرة الدراسية بعد الحصول على القبول. يشمل ذلك توفير خطاب القبول، المشورة حول المستندات المطلوبة للتأشيرة، وتجهيز الطالب للمقابلة الشخصية في السفارة إن وجدت.')
    },
    {
      question: t('faq.accommodation.question', 'كيف يمكنني تأمين السكن؟'),
      answer: t('faq.accommodation.answer', 'نقدم خدمة تأمين السكن للطلاب من خلال شبكة شركائنا في البلدان المختلفة. بعد الحصول على القبول، يمكنك طلب هذه الخدمة من خلال حسابك الشخصي أو التواصل مع مستشار الطلاب المخصص لك.')
    },
    {
      question: t('faq.scholarship.question', 'هل يمكنني الحصول على منحة دراسية؟'),
      answer: t('faq.scholarship.answer', 'نعم، توفر العديد من الجامعات والبرامج منحاً دراسية للطلاب المتميزين. نساعدك في تحديد المنح المناسبة لك وإعداد طلبات المنح. يمكنك الاطلاع على تفاصيل المنح المتاحة في قسم المنح الدراسية على منصتنا.')
    },
    {
      question: t('faq.transfers.question', 'هل يمكن التحويل من جامعة إلى أخرى؟'),
      answer: t('faq.transfers.answer', 'نعم، نقدم خدمة مساعدة الطلاب في التحويل بين الجامعات. يعتمد قبول المواد الدراسية السابقة على سياسة الجامعة المستقبلة ومدى توافق المناهج. يرجى التواصل مع مستشارينا لدراسة حالتك بشكل تفصيلي.')
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-unlimited-gray/20">
          <AccordionTrigger className="text-unlimited-dark-blue hover:text-unlimited-blue">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-unlimited-gray">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
