
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlusCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface StudentApplicationHeaderProps {
  showNewButton?: boolean;
  step?: number;
  numberOfSteps?: number;
}

const StudentApplicationHeader = ({ 
  showNewButton = true,
  step,
  numberOfSteps = 3
}: StudentApplicationHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">
          {t("application.submit.title", "تقديم طلب")}
          {step && numberOfSteps && (
            <Badge variant="outline" className="mr-2 bg-unlimited-blue/5 border-unlimited-blue/20">
              الخطوة {step} من {numberOfSteps}
            </Badge>
          )}
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-unlimited-gray">
            {t("application.submit.subtitle", "أكمل المعلومات المطلوبة وقدم طلبك")}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-unlimited-gray">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t("application.submit.tooltip", "قم بتعبئة النموذج بعناية وتأكد من صحة جميع البيانات قبل التقديم. يمكنك حفظ النموذج والعودة إليه لاحقاً لإكماله.")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
      </div>

      {showNewButton && (
        <Button 
          onClick={() => navigate('/apply')}
          className="sm:self-start flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          {t("application.myApplications.newApplication", "طلب جديد")}
        </Button>
      )}
    </div>
  );
};

export default StudentApplicationHeader;
