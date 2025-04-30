
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, User, Lock } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  }),
  rememberMe: z.boolean().default(false),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Simulating API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials with your backend here
      
      // For demo purposes, we'll check specific usernames to assign roles
      let role = 'student';
      
      if (values.username.toLowerCase() === 'admin') {
        role = 'admin';
      } else if (values.username.toLowerCase() === 'agent') {
        role = 'agent';
      }

      // Store role in localStorage
      localStorage.setItem('userRole', role);
      
      // Notify user
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك، ${values.username}!`,
      });
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'agent') {
        navigate('/agent');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من اسم المستخدم وكلمة المرور",
        variant: "destructive",
      });
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-unlimited-blue text-white py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="text-white hover:bg-unlimited-blue/90"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <a href="mailto:info@unlimiteddoors.com" className="text-sm hover:underline">info@unlimiteddoors.com</a>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" className="text-white hover:bg-unlimited-blue/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-unlimited-blue/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-unlimited-blue/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left column for the login form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <img src="/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png" alt="Unlimited Doors Logo" className="h-16 w-auto" />
              </div>
              <h1 className="text-2xl font-bold mb-2">تسجيل الدخول</h1>
              <p className="text-unlimited-gray">يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المستخدم</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="أدخل اسم المستخدم" 
                            {...field} 
                            className="pl-10"
                          />
                        </FormControl>
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-5 w-5" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="أدخل كلمة المرور" 
                            {...field} 
                            className="pl-10"
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-5 w-5" />
                        <Button 
                          type="button"
                          variant="ghost" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-unlimited-gray" />
                          ) : (
                            <Eye className="h-4 w-4 text-unlimited-gray" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id="rememberMe" 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                        <label 
                          htmlFor="rememberMe" 
                          className="text-sm text-unlimited-gray cursor-pointer"
                        >
                          تذكرني
                        </label>
                      </div>
                    )}
                  />

                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-unlimited-blue"
                    onClick={() => navigate('/forgot-password')}
                    type="button"
                  >
                    نسيت كلمة المرور؟
                  </Button>
                </div>

                <Button type="submit" className="w-full">تسجيل الدخول</Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <p className="text-unlimited-gray">
                ليس لديك حساب؟{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-unlimited-blue"
                  onClick={() => navigate('/register')}
                  type="button"
                >
                  إنشاء حساب جديد
                </Button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column for the image/info */}
        <div className="hidden md:flex md:w-1/2 bg-unlimited-blue items-center justify-center p-8">
          <div className="max-w-md text-white text-center">
            <h2 className="text-3xl font-bold mb-6">أبواب بلا حدود</h2>
            <p className="text-xl mb-8">نساعدك في الوصول إلى أهدافك التعليمية وتحقيق طموحاتك الأكاديمية</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">+500</h3>
                <p className="text-sm">جامعة</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">+50</h3>
                <p className="text-sm">دولة</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">+5,000</h3>
                <p className="text-sm">طالب</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">+10,000</h3>
                <p className="text-sm">برنامج دراسي</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-100 py-6 text-unlimited-gray text-center text-sm">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
          <div>الموقع الرسمي: www.unlimiteddoors.com</div>
          <div className="hidden md:block">|</div>
          <div>
            جميع الحقوق محفوظة © 2025 أبواب بلا حدود
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
