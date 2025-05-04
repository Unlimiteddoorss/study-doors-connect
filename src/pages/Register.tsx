
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { User, School, UserPlus, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const Register = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<'student' | 'university' | 'agent'>('student');
  const [step, setStep] = useState(1);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock steps for university and agent registration
  const renderSteps = () => {
    if (userType === 'student') {
      return null; // Student registration is handled by RegisterForm
    }
    
    return (
      <div className="flex flex-col space-y-8">
        {step === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold text-unlimited-dark-blue">
              {userType === 'university' ? t('register.university.basicInfo') : t('register.agent.basicInfo')}
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-4">
              {/* Placeholder for first step form fields */}
              <p className="text-unlimited-gray">
                {userType === 'university' 
                  ? t('register.university.basicInfoDescription')
                  : t('register.agent.basicInfoDescription')
                }
              </p>
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
                >
                  {t('common.continue')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold text-unlimited-dark-blue">
              {userType === 'university' ? t('register.university.details') : t('register.agent.details')}
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-4">
              {/* Placeholder for second step form fields */}
              <p className="text-unlimited-gray">
                {userType === 'university' 
                  ? t('register.university.detailsDescription')
                  : t('register.agent.detailsDescription')
                }
              </p>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('common.back')}
                </Button>
                
                <Button 
                  onClick={() => setStep(3)}
                  className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
                >
                  {t('common.continue')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-unlimited-dark-blue">
                {userType === 'university' ? t('register.university.success') : t('register.agent.success')}
              </h3>
              <p className="text-unlimited-gray mt-2">
                {userType === 'university' 
                  ? t('register.university.successDescription')
                  : t('register.agent.successDescription')
                }
              </p>
            </motion.div>
            
            <div className="flex justify-center mt-6">
              <Button 
                onClick={() => window.location.href = "/login"}
                className="bg-unlimited-blue hover:bg-unlimited-dark-blue"
              >
                {t('common.goToLogin')}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-[800px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">
              {t('register.title')}
            </h2>
            <p className="mt-2 text-unlimited-gray">
              {t('register.subtitle')}
            </p>
          </div>
          
          <Card className="border-2 border-gray-100">
            <CardContent className="p-0">
              <Tabs 
                value={userType} 
                onValueChange={(value) => {
                  setUserType(value as 'student' | 'university' | 'agent');
                  setStep(1);
                }}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 bg-gray-100 rounded-none mb-6">
                  <TabsTrigger 
                    value="student" 
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-unlimited-blue rounded-none"
                  >
                    <User className="h-4 w-4" />
                    {t('register.student')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="university" 
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-unlimited-blue rounded-none"
                  >
                    <School className="h-4 w-4" />
                    {t('register.university')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="agent" 
                    className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-unlimited-blue rounded-none"
                  >
                    <UserPlus className="h-4 w-4" />
                    {t('register.agent')}
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="student">
                    <RegisterForm />
                  </TabsContent>
                  
                  <TabsContent value="university">
                    {renderSteps()}
                  </TabsContent>
                  
                  <TabsContent value="agent">
                    {renderSteps()}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-unlimited-gray">
              {t('register.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-unlimited-blue hover:underline font-medium">
                {t('register.login')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Register;
