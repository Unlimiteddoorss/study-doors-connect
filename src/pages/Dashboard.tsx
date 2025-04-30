
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, School, BookOpen, Search, Calendar, Clock, ArrowRight } from "lucide-react";
import AnnouncementsSection from '@/components/dashboard/AnnouncementsSection';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

// Mock data
const latestStudents = [
  { 
    id: "50992", 
    name: "ناصر أحمد إبراهيم خليل", 
    nationality: "Afghanistan", 
    visaStatus: "Not Applied",
    createdAt: new Date("2024-12-26T09:07:36"),
    avatar: "/lovable-uploads/eb0c5633-c981-4a70-84a3-5274cb91e9e5.png"
  },
  { 
    id: "50246", 
    name: "حشمت الله باشا", 
    nationality: "Afghanistan", 
    visaStatus: "Not Applied",
    createdAt: new Date("2024-08-13T04:34:40"),
    avatar: "/lovable-uploads/6081461c-4214-40a6-ab56-0a9480d441d5.png"
  },
  { 
    id: "50245", 
    name: "عرفان الله باشا", 
    nationality: "Afghanistan", 
    visaStatus: "Not Applied",
    createdAt: new Date("2024-08-13T04:13:52"),
    avatar: "/lovable-uploads/cb9d586d-3538-4a35-9e99-b203ded72cf7.png"
  },
  { 
    id: "49755", 
    name: "كنزا عبيد", 
    nationality: "Algeria", 
    visaStatus: "Not Applied",
    createdAt: new Date("2024-07-18T01:56:34"),
    avatar: "/lovable-uploads/3282f8fb-3607-47d2-a8fa-d442b2cb1485.png"
  }
];

const lastUpdates = [
  {
    id: "1",
    university: "Istanbul Aral University",
    action: "replied to the application",
    timestamp: new Date("2024-07-24T01:52:47"),
    status: "pending-review"
  },
  {
    id: "2",
    action: "Status Changed",
    timestamp: new Date("2023-10-23T11:49:45"),
    status: "pending-review"
  },
  {
    id: "3",
    action: "Status Changed",
    timestamp: new Date("2023-10-23T11:46:00"),
    status: "pending-review"
  },
  {
    id: "4",
    university: "Istanbul Gelisim University",
    action: "replied to the application",
    timestamp: new Date("2023-08-21T07:37:08"),
    status: "pending-review"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 32,
    pendingApplications: 5,
    approvedApplications: 18,
    rejectedApplications: 3,
    completedApplications: 6
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardStats userRole="student" />
        
        <Tabs defaultValue="announcements" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="announcements">الإعلانات</TabsTrigger>
            <TabsTrigger value="students">الطلاب الجدد</TabsTrigger>
            <TabsTrigger value="updates">آخر التحديثات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements" className="space-y-4">
            <AnnouncementsSection />
          </TabsContent>
          
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="bg-unlimited-blue/5 border-b">
                <CardTitle className="text-unlimited-dark-blue text-lg">
                  الطلاب الجدد
                </CardTitle>
                <CardDescription>
                  آخر الطلاب المسجلين في النظام
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 divide-y">
                {latestStudents.map((student) => (
                  <div key={student.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        {student.avatar ? (
                          <img 
                            src={student.avatar} 
                            alt={student.name}
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="h-full w-full bg-unlimited-gray flex items-center justify-center text-white">
                            {student.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-unlimited-dark-blue">{student.name}</h3>
                        <div className="flex items-center text-sm text-unlimited-gray gap-2">
                          <span>
                            {student.nationality}
                          </span>
                          <span className="text-xs">•</span>
                          <span className="text-xs">
                            {formatDistanceToNow(student.createdAt, { addSuffix: true, locale: ar })}
                          </span>
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs bg-gray-100">
                            حالة التأشيرة: {student.visaStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => navigate(`/admin/students/${student.id}`)}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="updates" className="space-y-4">
            <Card>
              <CardHeader className="bg-unlimited-blue/5 border-b">
                <CardTitle className="text-unlimited-dark-blue text-lg">
                  آخر التحديثات
                </CardTitle>
                <CardDescription>
                  آخر التحديثات على الطلبات
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 divide-y">
                {lastUpdates.map((update) => (
                  <div key={update.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-unlimited-blue flex items-center justify-center text-white mr-3">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {update.university ? (
                              <>
                                <span>جامعة </span>
                                <span className="text-unlimited-blue">{update.university.replace('University', '')}</span>
                                <span> ردت على الطلب</span>
                              </>
                            ) : (
                              "تم تغيير الحالة"
                            )}
                          </h4>
                          <p className="text-sm text-unlimited-gray">
                            {formatDistanceToNow(update.timestamp, { addSuffix: true, locale: ar })}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-unlimited-blue/10 text-unlimited-blue border-unlimited-blue/20">
                        قيد المراجعة
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t bg-gray-50 p-4">
                <Button variant="link" className="w-full" onClick={() => navigate('/dashboard/applications')}>
                  عرض جميع التحديثات
                  <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader className="bg-unlimited-blue/5 border-b">
              <CardTitle className="text-unlimited-dark-blue text-lg flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                تقديم طلب جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-unlimited-gray mb-4">
                قم بتقديم طلب للالتحاق بجامعة أو برنامج دراسي من خلال نظامنا.
              </p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="w-full" onClick={() => navigate('/apply')}>
                تقديم طلب جديد
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader className="bg-unlimited-blue/5 border-b">
              <CardTitle className="text-unlimited-dark-blue text-lg flex items-center">
                <School className="h-5 w-5 mr-2" />
                استكشاف الجامعات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-unlimited-gray mb-4">
                اكتشف الجامعات المتاحة في مختلف البلدان وتعرف على البرامج التي تقدمها.
              </p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full" onClick={() => navigate('/universities')}>
                عرض الجامعات
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader className="bg-unlimited-blue/5 border-b">
              <CardTitle className="text-unlimited-dark-blue text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                البرامج الدراسية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-unlimited-gray mb-4">
                اكتشف البرامج الدراسية المتاحة في مختلف التخصصات والجامعات.
              </p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full" onClick={() => navigate('/programs/search')}>
                بحث عن البرامج
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
