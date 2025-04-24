
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ApplicationDocuments from '@/components/applications/ApplicationDocuments';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Fetch programs from your data source
import { programs } from '@/data/programsData';

const ProgramApplication = () => {
  const { programId } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [applicationStarted, setApplicationStarted] = useState(false);
  const isRtl = i18n.language === 'ar';
  
  const getLocalizedValue = (enValue: string, arValue: string) => {
    return i18n.language === 'ar' ? arValue : enValue;
  };

  useEffect(() => {
    // Find the program based on the programId parameter
    if (programId) {
      const program = programs.find(p => p.id === parseInt(programId));
      if (program) {
        setSelectedProgram(program);
      } else {
        // If program not found, redirect to programs page
        toast({
          title: t("application.notifications.programNotFound"),
          description: t("application.notifications.programNotFoundDesc"),
          variant: "destructive"
        });
        navigate('/programs');
      }
    }
  }, [programId, navigate, toast, t]);

  const handleBackToPrograms = () => {
    navigate('/programs');
  };

  const handleStartApplication = () => {
    setApplicationStarted(true);
    setActiveStep(1);
    
    toast({
      title: t("application.notifications.applyStart"),
      description: t("application.notifications.applyStartDesc"),
    });
    
    // Track the application start
    try {
      console.log("Application started for program:", selectedProgram?.id);
    } catch (error) {
      console.error("Error tracking application start:", error);
    }
  };

  if (!selectedProgram) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <SectionTitle 
            title={t("application.loading")} 
            subtitle={t("application.loadingDesc")} 
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleBackToPrograms}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("application.backToPrograms")}
          </Button>
          
          <Badge variant="outline" className="bg-unlimited-blue/10 text-unlimited-blue">
            {getLocalizedValue(selectedProgram.level, selectedProgram.levelAr)}
          </Badge>
        </div>

        <SectionTitle 
          title={getLocalizedValue(
            `Apply to ${selectedProgram.title}`, 
            `التقديم لـ ${selectedProgram.titleAr}`
          )}
          subtitle={getLocalizedValue(
            `at ${selectedProgram.university}`, 
            `في ${selectedProgram.universityAr}`
          )}
        />
        
        <div className="max-w-7xl mx-auto mt-8">
          {!applicationStarted ? (
            <Card className="overflow-hidden animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-2">
                  <img 
                    src={selectedProgram.image || "/placeholder.svg"} 
                    alt={getLocalizedValue(selectedProgram.title, selectedProgram.titleAr)} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-3 p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl text-unlimited-blue">
                      {getLocalizedValue(selectedProgram.title, selectedProgram.titleAr)}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {getLocalizedValue(selectedProgram.university, selectedProgram.universityAr)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-unlimited-gray font-medium">
                          {t("application.programCard.country")}:
                        </p>
                        <p>{getLocalizedValue(selectedProgram.country, selectedProgram.countryAr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-unlimited-gray font-medium">
                          {t("application.programCard.duration")}:
                        </p>
                        <p>{getLocalizedValue(selectedProgram.duration, selectedProgram.durationAr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-unlimited-gray font-medium">
                          {t("application.programCard.language")}:
                        </p>
                        <p>{getLocalizedValue(selectedProgram.language, selectedProgram.languageAr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-unlimited-gray font-medium">
                          {t("application.programCard.tuitionFees")}:
                        </p>
                        <div className="flex items-baseline">
                          <span className="text-unlimited-blue font-bold">
                            {getLocalizedValue(selectedProgram.discountedFee, selectedProgram.discountedFeeAr)}
                          </span>
                          <span className="text-unlimited-gray text-sm line-through mx-2">
                            {getLocalizedValue(selectedProgram.tuitionFee, selectedProgram.tuitionFeeAr)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>{t("application.beforeYouApply")}</AlertTitle>
                      <AlertDescription>
                        {t("application.beforeYouApplyDesc")}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="px-0">
                    <Button 
                      onClick={handleStartApplication}
                      className="w-full md:w-auto bg-unlimited-blue hover:bg-unlimited-dark-blue hover-scale"
                    >
                      {t("application.startApplication")}
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <Alert className="bg-unlimited-blue/10 border-unlimited-blue text-unlimited-blue">
                <Info className="h-4 w-4" />
                <AlertTitle>{t("application.applyingTo")}</AlertTitle>
                <AlertDescription>
                  {getLocalizedValue(selectedProgram.title, selectedProgram.titleAr)} - {getLocalizedValue(selectedProgram.university, selectedProgram.universityAr)}
                </AlertDescription>
              </Alert>
              
              <StudentApplicationForm preSelectedProgram={selectedProgram} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramApplication;
