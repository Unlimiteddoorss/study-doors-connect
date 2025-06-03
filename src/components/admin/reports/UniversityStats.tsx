
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, TrendingUp, GraduationCap } from 'lucide-react';

const universityData = [
  {
    name: 'جامعة إسطنبول',
    students: 245,
    applications: 156,
    acceptanceRate: 85,
    popularPrograms: ['الهندسة', 'الطب', 'إدارة الأعمال']
  },
  {
    name: 'جامعة أنقرة',
    students: 198,
    applications: 134,
    acceptanceRate: 78,
    popularPrograms: ['الهندسة', 'الحقوق', 'الآداب']
  },
  {
    name: 'جامعة إزمير',
    students: 167,
    applications: 112,
    acceptanceRate: 82,
    popularPrograms: ['الطب', 'الصيدلة', 'التمريض']
  }
];

export const UniversityStats = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {universityData.map((university, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-unlimited-blue" />
              {university.name}
            </CardTitle>
            <CardDescription>
              إحصائيات الطلاب والبرامج
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-unlimited-blue" />
                  <span className="text-sm text-gray-600">الطلاب</span>
                </div>
                <p className="text-2xl font-bold text-unlimited-blue">{university.students}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">معدل القبول</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{university.acceptanceRate}%</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-1 mb-2">
                <GraduationCap className="h-4 w-4 text-unlimited-blue" />
                <span className="text-sm font-medium">البرامج الأكثر طلباً</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {university.popularPrograms.map((program, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
