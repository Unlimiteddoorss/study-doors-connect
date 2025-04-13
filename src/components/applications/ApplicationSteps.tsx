
import { Check, User, FileText, GraduationCap, ClipboardCheck, Presentation } from 'lucide-react';

interface ApplicationStepProps {
  currentStep: number;
  onStepChange?: (step: number) => void;
  steps: {
    id: number;
    label: string;
    icon: React.ReactNode;
  }[];
}

export const ApplicationSteps = ({ 
  currentStep = 1,
  onStepChange, 
  steps 
}: ApplicationStepProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between w-full mb-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col items-center">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${idx + 1 <= currentStep 
                  ? 'bg-unlimited-blue border-unlimited-blue text-white' 
                  : 'border-unlimited-gray/30 bg-white text-unlimited-gray'}
                ${onStepChange ? 'cursor-pointer hover:border-unlimited-blue' : ''}
              `}
              onClick={() => onStepChange && onStepChange(idx + 1)}
            >
              {idx + 1 < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <div className="flex items-center justify-center">
                  {step.icon || <span>{idx + 1}</span>}
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 w-max text-xs font-medium text-unlimited-gray">
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-between w-full mt-2 mb-8">
        {steps.slice(0, -1).map((_, idx) => (
          <div 
            key={idx} 
            className={`absolute h-0.5 transition-colors ${idx + 2 <= currentStep ? 'bg-unlimited-blue' : 'bg-gray-300'}`}
            style={{ 
              left: `${(idx * 100) / (steps.length - 1)}%`, 
              right: `${100 - ((idx + 1) * 100) / (steps.length - 1)}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const defaultApplicationSteps = [
  { 
    id: 1, 
    label: "المعلومات الشخصية", 
    icon: <User className="h-5 w-5" /> 
  },
  { 
    id: 2, 
    label: "المستندات", 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    id: 3, 
    label: "المعلومات الأكاديمية", 
    icon: <GraduationCap className="h-5 w-5" /> 
  },
  { 
    id: 4, 
    label: "تفاصيل البرنامج", 
    icon: <Presentation className="h-5 w-5" /> 
  },
  { 
    id: 5, 
    label: "المراجعة والتأكيد", 
    icon: <ClipboardCheck className="h-5 w-5" /> 
  }
];
