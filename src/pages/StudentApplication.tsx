
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';

const StudentApplication = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="طلب التحاق"
          subtitle="قدم طلبك للالتحاق بأفضل الجامعات العالمية"
        />
        
        <div className="max-w-4xl mx-auto mt-10">
          <StudentApplicationForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentApplication;
