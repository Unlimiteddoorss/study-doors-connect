
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const quotaData = [
  {
    program: "MBA",
    total: 100,
    filled: 75,
    remaining: 25
  },
  {
    program: "هندسة البرمجيات",
    total: 150,
    filled: 120,
    remaining: 30
  },
  {
    program: "الطب البشري",
    total: 80,
    filled: 78,
    remaining: 2
  },
  {
    program: "إدارة الأعمال",
    total: 200,
    filled: 150,
    remaining: 50
  }
];

export function ProgramQuotas() {
  return (
    <Card className="col-span-full lg:col-span-2 w-full">
      <CardHeader>
        <CardTitle className="text-xl">الحصص المتبقية في البرامج</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quotaData.map((program) => (
            <div key={program.program} className="space-y-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="font-medium text-sm sm:text-base">{program.program}</span>
                <span className="text-xs sm:text-sm text-unlimited-gray whitespace-nowrap">
                  {program.remaining} مقعد متبقي
                </span>
              </div>
              <Progress 
                value={(program.filled / program.total) * 100} 
                className="h-2 w-full bg-gray-100"
              />
              <div className="flex justify-between items-center text-xs text-unlimited-gray">
                <span>{program.filled} مقعد مشغول</span>
                <span>{program.total} إجمالي المقاعد</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
