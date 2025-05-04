
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PreferencesFormProps {
  preferredLanguage: string;
  setPreferredLanguage: (value: string) => void;
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
}

const PreferencesForm = ({
  preferredLanguage,
  setPreferredLanguage,
  additionalNotes,
  setAdditionalNotes
}: PreferencesFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mt-6">
      <h4 className="font-medium">{t('application.program.additionalPreferences')}</h4>
      
      <div className="space-y-2">
        <Label>{t('application.program.preferredLanguage')}</Label>
        <RadioGroup 
          value={preferredLanguage} 
          onValueChange={setPreferredLanguage}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="english" id="english" />
            <Label htmlFor="english">{t('application.program.languages.english')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="turkish" id="turkish" />
            <Label htmlFor="turkish">{t('application.program.languages.turkish')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="arabic" id="arabic" />
            <Label htmlFor="arabic">{t('application.program.languages.arabic')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="french" id="french" />
            <Label htmlFor="french">{t('application.program.languages.french')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">{t('application.program.languages.other')}</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">{t('application.program.additionalNotes')}</Label>
        <Textarea 
          id="notes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder={t('application.program.notesPlaceholder')}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default PreferencesForm;
