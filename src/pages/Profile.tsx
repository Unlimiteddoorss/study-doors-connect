
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Profile = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الملف الشخصي</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="/images/placeholder.svg" 
                  alt="صورة الملف الشخصي"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-unlimited-blue text-white p-2 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-xl font-bold">أحمد محمد</h2>
              <p className="text-unlimited-gray dark:text-gray-300">ahmed@example.com</p>
              <p className="text-unlimited-gray dark:text-gray-300">رقم الطالب: STD-1234</p>
            </div>
          </div>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
              <TabsTrigger value="academic">المعلومات الأكاديمية</TabsTrigger>
              <TabsTrigger value="documents">الوثائق</TabsTrigger>
              <TabsTrigger value="settings">إعدادات الحساب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الأول</label>
                    <input 
                      type="text" 
                      defaultValue="أحمد"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم العائلة</label>
                    <input 
                      type="text" 
                      defaultValue="محمد"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      defaultValue="ahmed@example.com"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      defaultValue="+90 555 123 4567"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الميلاد</label>
                    <input 
                      type="date" 
                      defaultValue="1995-05-15"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الجنسية</label>
                    <input 
                      type="text" 
                      defaultValue="سوري"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الدولة</label>
                    <input 
                      type="text" 
                      defaultValue="تركيا"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المدينة</label>
                    <input 
                      type="text" 
                      defaultValue="إسطنبول"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">العنوان</label>
                  <input 
                    type="text" 
                    defaultValue="حي البشتاك، شارع الحرية، بناء رقم 45"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white">
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">آخر شهادة</label>
                    <input 
                      type="text" 
                      defaultValue="الثانوية العامة - الفرع العلمي"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">سنة التخرج</label>
                    <input 
                      type="text" 
                      defaultValue="2022"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المعدل</label>
                    <input 
                      type="text" 
                      defaultValue="87%"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">مستوى اللغة الإنجليزية</label>
                    <select 
                      defaultValue="b2"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="a1">A1 - مبتدئ</option>
                      <option value="a2">A2 - مبتدئ متقدم</option>
                      <option value="b1">B1 - متوسط</option>
                      <option value="b2">B2 - متوسط متقدم</option>
                      <option value="c1">C1 - متقدم</option>
                      <option value="c2">C2 - متقن</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">شهادة اللغة</label>
                    <input 
                      type="text" 
                      defaultValue="TOEFL - 85"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الشهادة</label>
                    <input 
                      type="date" 
                      defaultValue="2022-10-15"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white">
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-md dark:border-gray-700">
                    <h3 className="font-semibold mb-2">جواز السفر</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-unlimited-gray dark:text-gray-300">passport.pdf</span>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button className="text-unlimited-blue hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-unlimited-gray dark:text-gray-300 hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                        <button className="text-unlimited-danger hover:text-red-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md dark:border-gray-700">
                    <h3 className="font-semibold mb-2">الشهادة الثانوية</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-unlimited-gray dark:text-gray-300">high_school_diploma.pdf</span>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button className="text-unlimited-blue hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-unlimited-gray dark:text-gray-300 hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                        <button className="text-unlimited-danger hover:text-red-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md dark:border-gray-700">
                    <h3 className="font-semibold mb-2">شهادة TOEFL</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-unlimited-gray dark:text-gray-300">toefl_certificate.pdf</span>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button className="text-unlimited-blue hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-unlimited-gray dark:text-gray-300 hover:text-unlimited-dark-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                        <button className="text-unlimited-danger hover:text-red-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    إضافة وثيقة جديدة
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <div className="border-b pb-4 dark:border-gray-700">
                  <h3 className="font-semibold mb-4">تغيير كلمة المرور</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">كلمة المرور الحالية</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">كلمة المرور الجديدة</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">تأكيد كلمة المرور الجديدة</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white">
                        تغيير كلمة المرور
                      </Button>
                    </div>
                  </form>
                </div>
                
                <div className="border-b pb-4 dark:border-gray-700">
                  <h3 className="font-semibold mb-4">إعدادات الإشعارات</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">إشعارات البريد الإلكتروني</label>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-unlimited-blue" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">إشعارات تحديثات الطلبات</label>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-unlimited-blue" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">إشعارات الرسائل الجديدة</label>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-unlimited-blue" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">النشرة الإخبارية والعروض</label>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded text-unlimited-blue" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">حذف الحساب</h3>
                  <p className="text-sm text-unlimited-gray dark:text-gray-300 mb-4">
                    سيؤدي حذف حسابك إلى إزالة جميع بياناتك الشخصية من النظام. هذه العملية لا يمكن التراجع عنها.
                  </p>
                  <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">
                    حذف الحساب
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
