
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";

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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">الحصص المتبقية في البرامج</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotaData.map((program) => (
            <div key={program.program} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{program.program}</span>
                <span className="text-sm text-unlimited-gray">
                  {program.remaining} مقعد متبقي
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-unlimited-blue rounded-full transition-all"
                  style={{ width: `${(program.filled / program.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
