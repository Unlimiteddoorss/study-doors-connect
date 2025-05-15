
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/ui/chart"; // Changed from DonutChart to PieChart
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { BarChart, LineChart } from "@/components/ui/chart";

export interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  const [activePeriod, setActivePeriod] = useState<"day" | "week" | "month" | "year">("month");
  
  // Dummy data for the charts
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
  
  // Application status data
  const applicationStatusData = [
    { name: 'Pending', value: 85 },
    { name: 'In Progress', value: 124 },
    { name: 'Approved', value: 196 },
    { name: 'Rejected', value: 42 },
    { name: 'Completed', value: 167 }
  ];
  
  // Monthly applications data for line chart
  const monthlyApplicationsData = [
    { name: 'Jan', Applications: 124 },
    { name: 'Feb', Applications: 142 },
    { name: 'Mar', Applications: 156 },
    { name: 'Apr', Applications: 180 },
    { name: 'May', Applications: 205 },
    { name: 'Jun', Applications: 247 },
    { name: 'Jul', Applications: 268 },
    { name: 'Aug', Applications: 312 },
    { name: 'Sep', Applications: 285 },
    { name: 'Oct', Applications: 264 },
    { name: 'Nov', Applications: 278 },
    { name: 'Dec', Applications: 295 }
  ];
  
  // Top universities data
  const topUniversitiesData = [
    { name: 'Istanbul Technical University', Students: 450 },
    { name: 'Bilkent University', Students: 380 },
    { name: 'Middle East Technical University', Students: 340 },
    { name: 'Bogazici University', Students: 320 },
    { name: 'Ankara University', Students: 290 }
  ];

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={activePeriod} onValueChange={(value: "day" | "week" | "month" | "year") => setActivePeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Students by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
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
            <PieChart
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
      
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={applicationStatusData}
                index="name"
                category="value"
                colors={['#FCD34D', '#60A5FA', '#34D399', '#F87171', '#8B5CF6']}
                valueFormatter={(value) => `${value} تطبيق`}
                className="h-80"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyApplicationsData}
                index="name"
                categories={["Applications"]}
                colors={["#3B82F6"]}
                valueFormatter={(value) => `${value} تطبيق`}
                className="h-80"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="universities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Universities</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={topUniversitiesData}
                index="name"
                categories={["Students"]}
                colors={["#3B82F6"]}
                valueFormatter={(value) => `${value} طالب`}
                className="h-80"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80 grid place-items-center">
              <p className="text-lg text-unlimited-gray">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
