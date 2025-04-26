
import { useTranslation } from "react-i18next";

interface StepProps {
  currentStep: number;
}

const ApplicationSteps = ({ currentStep }: StepProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const steps = [
    { id: 1, title: t("application.steps.personal", "المعلومات الشخصية") },
    { id: 2, title: t("application.steps.documents", "المستندات") },
    { id: 3, title: t("application.steps.academic", "المعلومات الأكاديمية") },
    { id: 4, title: t("application.steps.program", "اختيار البرنامج") },
    { id: 5, title: t("application.steps.review", "المراجعة والتقديم") },
  ];

  return (
    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center ${step.id !== steps.length ? 'flex-1' : ''}`}
        >
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step.id 
                  ? 'bg-unlimited-blue text-white' 
                  : 'bg-gray-100 text-unlimited-gray'}`}
            >
              {step.id}
            </div>
            <span className="mx-3 text-sm text-unlimited-gray whitespace-nowrap">{step.title}</span>
          </div>
          {step.id !== steps.length && (
            <div 
              className={`flex-1 h-0.5 ${
                currentStep > step.id ? 'bg-unlimited-blue' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicationSteps;
