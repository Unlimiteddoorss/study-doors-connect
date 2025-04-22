import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getUniversityPrograms } from '@/data/universityPrograms';
import { turkishUniversities } from '@/data/programsData';
import { ExternalLink, MapPin, Globe, School, Calendar, Users, Trophy, Mail, Phone, Clock, CheckCircle, XCircle } from 'lucide-react';

const UniversityDetails = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const [university, setUniversity] = useState<any>(null);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    if (universityId) {
      const id = parseInt(universityId, 10);
      const foundUniversity = turkishUniversities.find(uni => uni.id === id);
      setUniversity(foundUniversity);

      const universityPrograms = getUniversityPrograms(id);
      setPrograms(universityPrograms);
    }
  }, [universityId]);

  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <SectionTitle title="الجامعة غير موجودة" subtitle="لم يتم العثور على الجامعة المحددة." />
        </div>
      </MainLayout>
    );
  }

  const getStatusColor = (available: boolean) => {
    return available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title={university.nameAr}
          subtitle={university.description}
        />

        {/* University Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* University Image */}
              <div>
                <img
                  src={university.image}
                  alt={university.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>

              {/* University Details */}
              <div>
                <h2 className="text-2xl font-bold mb-4">{university.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{university.city}, {university.country}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span>النوع: {university.type}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <School className="h-5 w-5 text-gray-500" />
                  <span>تأسست عام: {university.founded}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>عدد البرامج: {university.programsCount}+</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>الطلاب: {university.students}+</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-gray-500" />
                  <span>التصنيف العالمي: {university.globalRanking}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-gray-500" />
                  <span>التصنيف المحلي: {university.localRanking}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>الرسوم: {university.fees}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span>اللغات: {university.languages?.join(', ') || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-gray-500" />
                  <span>الاعتمادات: {university.accreditations?.join(', ') || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-gray-500" />
                  <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-unlimited-blue hover:underline">
                    الموقع الرسمي
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Programs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">البرامج المتاحة في {university.nameAr}</h2>
          {programs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">اسم البرنامج</TableHead>
                    <TableHead>اللغة</TableHead>
                    <TableHead>الدرجة</TableHead>
                    <TableHead>الحرم الجامعي</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>الرسوم الأصلية</TableHead>
                    <TableHead>الرسوم بعد الخصم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.nameAr}</TableCell>
                      <TableCell>{program.language}</TableCell>
                      <TableCell>{program.degree}</TableCell>
                      <TableCell>{program.campus}</TableCell>
                      <TableCell>{program.duration}</TableCell>
                      <TableCell>{program.tuitionFee}</TableCell>
                      <TableCell>{program.discountedFee}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={getStatusColor(program.available)}>
                          {program.available ? 'متاح' : 'غير متاح'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card className="text-center p-6">
              <CardContent>
                <p className="text-lg text-gray-500">لا توجد برامج متاحة حاليًا في هذه الجامعة.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>info@example.com</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>+90 555 555 5555</span>
            </div>
            <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
              <Link to="/contact">تواصل مع الجامعة</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UniversityDetails;
