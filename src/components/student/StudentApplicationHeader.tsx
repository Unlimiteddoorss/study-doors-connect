
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentApplicationHeaderProps {
  showNewButton?: boolean;
}

const StudentApplicationHeader = ({ showNewButton }: StudentApplicationHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">{t("application.submit.title", "تقديم طلب")}</h1>
        <p className="text-unlimited-gray">{t("application.submit.subtitle", "أكمل المعلومات المطلوبة وقدم طلبك")}</p>
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
