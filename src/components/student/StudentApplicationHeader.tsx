
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StudentApplicationHeaderProps {
  showNewButton?: boolean;
}

const StudentApplicationHeader = ({ showNewButton = true }: StudentApplicationHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate("/apply");
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">
            {t("application.title", "طلب الإلتحاق بالجامعات")}
          </h1>
          <p className="text-unlimited-gray">
            {t("application.subtitle", "قدم طلبك للإلتحاق بإحدى الجامعات والبرامج المتاحة")}
          </p>
        </div>

        {showNewButton && (
          <Button 
            onClick={handleNewApplication}
            className="sm:self-start gap-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
          >
            <PlusCircle className="h-4 w-4" />
            {t("application.buttons.newApplication", "طلب إلتحاق جديد")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentApplicationHeader;
