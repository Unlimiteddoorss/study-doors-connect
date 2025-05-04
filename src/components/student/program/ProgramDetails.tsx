
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, Building, Globe } from "lucide-react";
import { Program, University } from '../ProgramSelectionForm';

interface ProgramDetailsProps {
  program: Program;
  university: University;
  isRtl: boolean;
  countries: { value: string; label: string }[];
}

const ProgramDetails = ({ program, university, isRtl, countries }: ProgramDetailsProps) => {
  const { t } = useTranslation();
  
  // Helper function to determine degree from title
  const getDegreeFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('بكالوريوس')) return 'bachelor';
    if (lowerTitle.includes('ماجستير')) return 'master';
    if (lowerTitle.includes('دكتوراه')) return 'phd';
    if (lowerTitle.includes('دبلوم')) return 'diploma';
    return 'bachelor'; // Default
  };

  return (
    <Card className="mt-6 border border-unlimited-blue">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <School className="h-5 w-5 text-unlimited-blue" />
            <h3 className="text-lg font-medium">
              {isRtl && program.nameAr ? program.nameAr : program.title}
            </h3>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-unlimited-gray" />
              <span>
                {isRtl && university.nameAr ? university.nameAr : university.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-unlimited-gray" />
              <span>
                {university.city}, {countries.find(c => c.value === university.country)?.label}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-unlimited-blue/10">
                {getDegreeFromTitle(program.title)}
              </Badge>
              {program.duration && (
                <Badge variant="outline" className="bg-unlimited-blue/10">
                  {program.duration}
                </Badge>
              )}
              {program.language && (
                <Badge variant="outline" className="bg-unlimited-blue/10">
                  {program.language}
                </Badge>
              )}
              {(program.tuitionFee || program.fee) && (
                <Badge variant="outline" className="bg-unlimited-blue/10">
                  {typeof program.tuitionFee === 'number' 
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(program.tuitionFee as number)
                    : program.fee || program.tuitionFee}
                </Badge>
              )}
            </div>
          </div>
          
          {program.description && (
            <div className="mt-4 text-sm text-unlimited-gray">
              <p>{program.description}</p>
            </div>
          )}
          
          {/* Admission Requirements */}
          {program.admissionRequirements && program.admissionRequirements.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">{t('application.program.admissionRequirements')}</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {program.admissionRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramDetails;
