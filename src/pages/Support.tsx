
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FAQAccordion from '@/components/support/FAQAccordion';
import SupportContactForm from '@/components/support/SupportContactForm';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react';

const Support = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold text-unlimited-dark-blue mb-2">
              {t('support.title', 'مركز المساعدة والدعم')}
            </h1>
            <p className="text-unlimited-gray max-w-2xl mx-auto">
              {t('support.subtitle', 'احصل على إجابات لاستفساراتك وتواصل معنا للحصول على المساعدة. فريق الدعم متاح لمساعدتك في كل خطوة من رحلتك التعليمية.')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="faq" className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {t('support.faq', 'الأسئلة الشائعة')}
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-1">
                  <Mail className="h-4 w-4 mr-1" />
                  {t('support.contact', 'اتصل بنا')}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {t('support.chat', 'الدعم المباشر')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-unlimited-dark-blue mb-6">
                      {t('support.frequentlyAskedQuestions', 'الأسئلة الشائعة')}
                    </h2>
                    <FAQAccordion />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold text-unlimited-dark-blue mb-6">
                          {t('support.contactUs', 'اتصل بنا')}
                        </h2>
                        <SupportContactForm />
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium text-unlimited-dark-blue">
                          {t('support.contactInfo', 'معلومات الاتصال')}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-unlimited-blue/10 text-unlimited-blue mr-3">
                              <Mail className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{t('support.email', 'البريد الإلكتروني')}</p>
                              <a href="mailto:support@unlimiteddoorss.com" className="text-unlimited-blue hover:underline">
                                support@unlimiteddoorss.com
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-unlimited-blue/10 text-unlimited-blue mr-3">
                              <Phone className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{t('support.phone', 'الهاتف')}</p>
                              <a href="tel:+905001234567" className="text-unlimited-blue hover:underline" dir="ltr">
                                +90 500 123 4567
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-unlimited-blue/10 text-unlimited-blue mr-3">
                              <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{t('support.socialMedia', 'وسائل التواصل الاجتماعي')}</p>
                              <div className="flex space-x-2 rtl:space-x-reverse mt-1">
                                <a href="#" className="text-unlimited-blue hover:text-unlimited-dark-blue">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="#" className="text-unlimited-blue hover:text-unlimited-dark-blue">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" className="text-unlimited-blue hover:text-unlimited-dark-blue">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 border-t pt-6">
                          <h3 className="text-lg font-medium text-unlimited-dark-blue mb-3">
                            {t('support.workingHours', 'ساعات العمل')}
                          </h3>
                          <div className="space-y-2">
                            <p className="flex justify-between">
                              <span className="text-unlimited-gray">{t('support.weekdays', 'الاثنين - الجمعة')}:</span>
                              <span className="font-medium">9:00 - 18:00</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-unlimited-gray">{t('support.saturday', 'السبت')}:</span>
                              <span className="font-medium">10:00 - 15:00</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-unlimited-gray">{t('support.sunday', 'الأحد')}:</span>
                              <span className="font-medium">{t('support.closed', 'مغلق')}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="chat">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center h-[400px] text-center">
                    <MessageSquare className="h-16 w-16 text-unlimited-blue/20 mb-4" />
                    <h2 className="text-xl font-semibold text-unlimited-dark-blue mb-2">
                      {t('support.liveChat', 'الدعم المباشر')}
                    </h2>
                    <p className="text-unlimited-gray mb-6 max-w-md">
                      {t('support.liveChatDesc', 'خدمة الدعم المباشر متاحة خلال ساعات العمل. يرجى تسجيل الدخول لبدء محادثة مع أحد مستشارينا.')}
                    </p>
                    <button 
                      className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6 py-2 rounded-md transition-colors"
                    >
                      {t('support.startChat', 'بدء محادثة')}
                    </button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Support;
