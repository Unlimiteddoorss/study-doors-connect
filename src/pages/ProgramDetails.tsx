
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, MapPin, Clock, DollarSign, Users, GraduationCap, Globe, ArrowRight } from 'lucide-react';

interface Program {
  id: number;
  name: string;
  name_ar: string;
  degree_type: string;
  language: string;
  duration: number;
  tuition_fee: number;
  description: string;
  description_ar: string;
  quota: number;
  universities: {
    name: string;
    name_ar: string;
    country: string;
    city: string;
    image_url: string;
  };
}

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProgramDetails();
  }, [id]);

  const fetchProgramDetails = async () => {
    if (!id) {
      navigate('/programs');
      return;
    }

    try {
      setIsLoading(true);
      const programId = parseInt(id, 10);
      
      if (isNaN(programId)) {
        console.error('Invalid program ID:', id);
        toast({
          title: "خطأ",
          description: "رقم البرنامج غير صحيح",
          variant: "destructive",
        });
        navigate('/programs');
        return;
      }

      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          universities (
            name,
            name_ar,
            country,
            city,
            image_url
          )
        `)
        .eq('id', programId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching program:', error);
        toast({
          title: "خطأ",
          description: "فشل في جلب تفاصيل البرنامج",
          variant: "destructive",
        });
        navigate('/programs');
        return;
      }

      setProgram(data);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    navigate(`/apply?program=${id}`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">جاري تحميل تفاصيل البرنامج...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">البرنامج غير موجود</h1>
            <Button onClick={() => navigate('/programs')}>
              العودة إلى البرامج
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>الرئيسية</span>
              <ArrowRight className="h-4 w-4" />
              <span>البرامج</span>
              <ArrowRight className="h-4 w-4" />
              <span className="text-blue-500">{program.name_ar || program.name}</span>
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  {program.name_ar || program.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{program.universities.name_ar || program.universities.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>{program.universities.country}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleApply} size="lg">
                <GraduationCap className="h-4 w-4 mr-2" />
                التقديم للبرنامج
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>نبذة عن البرنامج</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {program.description_ar || program.description || 'لا يوجد وصف متاح للبرنامج حالياً.'}
                  </p>
                </CardContent>
              </Card>

              {/* University Info */}
              <Card>
                <CardHeader>
                  <CardTitle>الجامعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {program.universities.image_url && (
                      <img
                        src={program.universities.image_url}
                        alt={program.universities.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {program.universities.name_ar || program.universities.name}
                      </h3>
                      <p className="text-gray-600">
                        {program.universities.city}, {program.universities.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Info */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات البرنامج</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">نوع الدرجة:</span>
                    <Badge variant="outline">{program.degree_type}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">لغة التدريس:</span>
                    <span className="font-medium">{program.language}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      المدة:
                    </span>
                    <span className="font-medium">{program.duration} سنوات</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      الرسوم:
                    </span>
                    <span className="font-medium text-blue-500">
                      ${program.tuition_fee.toLocaleString()}
                    </span>
                  </div>
                  
                  {program.quota && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        المقاعد:
                      </span>
                      <span className="font-medium">{program.quota}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button onClick={handleApply} className="w-full" size="lg">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    التقديم للبرنامج
                  </Button>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    ابدأ رحلتك الأكاديمية معنا
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
