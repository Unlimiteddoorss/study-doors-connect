
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <Card>
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student">طالب</TabsTrigger>
          <TabsTrigger value="agent">وكيل</TabsTrigger>
          <TabsTrigger value="university">جامعة</TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          <TabsContent value="student" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                الاسم الكامل
              </label>
              <Input id="name" placeholder="أدخل اسمك الكامل" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input id="email" type="email" placeholder="example@domain.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                رقم الهاتف
              </label>
              <Input id="phone" placeholder="+XXX XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                تأكيد كلمة المرور
              </label>
              <Input id="confirmPassword" type="password" placeholder="********" />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input type="checkbox" id="terms" className="rounded text-unlimited-blue" />
              <label htmlFor="terms" className="text-sm text-unlimited-gray">
                أوافق على الشروط والأحكام وسياسة الخصوصية
              </label>
            </div>
            <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
              إنشاء حساب
            </Button>
            <div className="text-center text-sm text-unlimited-gray">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-unlimited-blue hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="agent" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="agentName" className="text-sm font-medium">
                اسم الوكالة
              </label>
              <Input id="agentName" placeholder="أدخل اسم الوكالة" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contactPerson" className="text-sm font-medium">
                اسم الشخص المسؤول
              </label>
              <Input id="contactPerson" placeholder="أدخل اسم الشخص المسؤول" />
            </div>
            <div className="space-y-2">
              <label htmlFor="agentEmail" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input id="agentEmail" type="email" placeholder="example@domain.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="agentPhone" className="text-sm font-medium">
                رقم الهاتف
              </label>
              <Input id="agentPhone" placeholder="+XXX XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                الدولة
              </label>
              <Input id="country" placeholder="أدخل الدولة" />
            </div>
            <div className="space-y-2">
              <label htmlFor="agentPassword" className="text-sm font-medium">
                كلمة المرور
              </label>
              <Input id="agentPassword" type="password" placeholder="********" />
            </div>
            <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
              إنشاء حساب وكيل
            </Button>
            <div className="text-center text-sm text-unlimited-gray">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-unlimited-blue hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="university" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="uniName" className="text-sm font-medium">
                اسم الجامعة
              </label>
              <Input id="uniName" placeholder="أدخل اسم الجامعة" />
            </div>
            <div className="space-y-2">
              <label htmlFor="uniContactPerson" className="text-sm font-medium">
                اسم الشخص المسؤول
              </label>
              <Input
                id="uniContactPerson"
                placeholder="أدخل اسم الشخص المسؤول"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="uniEmail" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input id="uniEmail" type="email" placeholder="example@university.edu" />
            </div>
            <div className="space-y-2">
              <label htmlFor="uniPhone" className="text-sm font-medium">
                رقم الهاتف
              </label>
              <Input id="uniPhone" placeholder="+XXX XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label htmlFor="uniWebsite" className="text-sm font-medium">
                الموقع الإلكتروني
              </label>
              <Input id="uniWebsite" placeholder="https://www.university.edu" />
            </div>
            <div className="space-y-2">
              <label htmlFor="uniPassword" className="text-sm font-medium">
                كلمة المرور
              </label>
              <Input id="uniPassword" type="password" placeholder="********" />
            </div>
            <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
              إنشاء حساب جامعة
            </Button>
            <div className="text-center text-sm text-unlimited-gray">
              للتواصل مع فريق الدعم لمزيد من المعلومات:{" "}
              <Link to="/support" className="text-unlimited-blue hover:underline">
                اضغط هنا
              </Link>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
