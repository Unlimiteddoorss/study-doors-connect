
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  // Dummy data for the donut charts
  const studentsByCountry = [
    { name: 'Turkey', value: 1200 },
    { name: 'Egypt', value: 850 },
    { name: 'Saudi Arabia', value: 640 },
    { name: 'UAE', value: 480 },
    { name: 'Kuwait', value: 320 }
  ];

  const programsData = [
    { name: 'Engineering', value: 600 },
    { name: 'Medicine', value: 450 },
    { name: 'Business', value: 520 },
    { name: 'Arts', value: 380 },
    { name: 'Science', value: 480 }
  ];

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Students by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={studentsByCountry}
            index="name"
            category="value" 
            colors={['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']}
            valueFormatter={(value) => `${value} طالب`}
            className="h-80"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Programs Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={programsData}
            index="name"
            category="value"
            colors={['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']}
            valueFormatter={(value) => `${value}`}
            className="h-80"
          />
        </CardContent>
      </Card>
    </div>
  );
}
