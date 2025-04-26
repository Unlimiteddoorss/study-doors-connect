
import { useTranslation } from "react-i18next";

const StudentApplicationHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="text-right mb-8">
      <h1 className="text-2xl font-bold text-unlimited-dark-blue mb-2">{t("application.submit.title")}</h1>
      <p className="text-unlimited-gray">{t("application.submit.subtitle")}</p>
    </div>
  );
};

export default StudentApplicationHeader;
