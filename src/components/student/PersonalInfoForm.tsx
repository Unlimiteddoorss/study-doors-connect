
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PersonalInfoForm = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("application.personal.firstName")}</Label>
          <Input 
            id="firstName" 
            placeholder={t("application.personal.firstNamePlaceholder")} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("application.personal.lastName")}</Label>
          <Input 
            id="lastName" 
            placeholder={t("application.personal.lastNamePlaceholder")} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("application.personal.email")}</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="example@example.com" 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("application.personal.phone")}</Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="+1234567890" 
            required
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>{t("application.personal.gender")}</Label>
        <RadioGroup defaultValue="male">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">{t("application.personal.male")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">{t("application.personal.female")}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>{t("application.personal.birthDate")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-start font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : t("application.personal.selectDate")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <Label>{t("application.personal.nationality")}</Label>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={t("application.personal.selectNationality")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sa">السعودية</SelectItem>
            <SelectItem value="ae">الإمارات</SelectItem>
            <SelectItem value="kw">الكويت</SelectItem>
            <SelectItem value="qa">قطر</SelectItem>
            <SelectItem value="om">عمان</SelectItem>
            <SelectItem value="bh">البحرين</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
