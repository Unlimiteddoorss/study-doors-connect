
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AgentApplicationsList } from '@/components/agent/AgentApplicationsList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Filter, PlusCircle, Eye, MessageCircle, Users } from 'lucide-react';

const AgentApplications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for filters
  const universities = [
    "جامعة إسطنبول التقنية",
    "جامعة القاهرة",
    "جامعة الملك سعود",
  ];

  const handleAddApplication = () => {
    setIsAddDialogOpen(true);
  };

  const handleSelectStudent = () => {
    setIsAddDialogOpen(false);
    // Navigate to application form with selected student
    navigate('/dashboard/new-application');
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">طلبات التحاق الطلاب</h1>
          <Button onClick={handleAddApplication} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            طلب التحاق جديد
          </Button>
        </div>
        
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث برقم الطلب، اسم الطالب، أو البريد الإلكتروني"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="conditional">قبول مشروط</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الجامعة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الجامعات</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AgentApplicationsList
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            universityFilter={universityFilter}
          />
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>طلب التحاق جديد</DialogTitle>
            <DialogDescription>اختر الطالب لبدء طلب التحاق جديد</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">اختر الطالب</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الطالب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">أحمد محمد</SelectItem>
                  <SelectItem value="student2">سارة خالد</SelectItem>
                  <SelectItem value="student3">محمد علي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-gray-500 text-sm">أو</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <Users className="h-4 w-4" />
              اختر من قائمة الطلاب
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSelectStudent}>
              متابعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AgentApplications;
