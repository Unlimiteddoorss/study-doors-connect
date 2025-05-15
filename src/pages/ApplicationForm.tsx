
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StudentApplicationForm = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">معلومات الطلب</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم الكامل</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الهاتف</label>
              <input 
                type="tel" 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الجنسية</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">التخصص المطلوب</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المرحلة الدراسية</label>
              <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option>بكالوريوس</option>
                <option>ماجستير</option>
                <option>دكتوراه</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">الملاحظات الإضافية</label>
            <textarea 
              rows={4}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">المستندات المطلوبة</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-md text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">اسحب وأفلت الملفات هنا أو</p>
              <button type="button" className="bg-unlimited-blue text-white px-4 py-2 rounded-md">اختر ملفات</button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PDF, JPG (5MB كحد أقصى)</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6 py-2 rounded-md"
            >
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ApplicationForm = () => {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">تقديم طلب جديد</h1>
        <StudentApplicationForm />
      </div>
    </DashboardLayout>
  );
};

export default ApplicationForm;
