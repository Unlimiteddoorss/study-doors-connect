import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertTriangle, Calendar, User, FileText, School } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'review' | 'followup' | 'approval' | 'notification';
  status: 'pending' | 'inProgress' | 'completed';
  assignedTo?: string;
  relatedTo?: {
    type: 'student' | 'application' | 'university' | 'program';
    name: string;
  };
}

interface AdminTasksOverviewProps {
  className?: string;
}

const AdminTasksOverview: React.FC<AdminTasksOverviewProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('pending');
  
  // بيانات المهام النموذجية
  const tasks: Task[] = [
    {
      id: '1',
      title: 'مراجعة طلب القبول',
      description: 'مراجعة طلب القبول لجامعة اسطنبول وإرسال التعليقات',
      dueDate: '2025-05-18',
      priority: 'high',
      type: 'review',
      status: 'pending',
      assignedTo: 'محمد أحمد',
      relatedTo: {
        type: 'application',
        name: 'أحمد محمود - طلب القبول #A12345'
      }
    },
    {
      id: '2',
      title: 'متابعة مع وكيل جديد',
      description: 'متابعة التسجيل للوكيل الجديد وتقديم المساعدة اللازمة',
      dueDate: '2025-05-19',
      priority: 'medium',
      type: 'followup',
      status: 'pending',
      assignedTo: 'سارة علي',
      relatedTo: {
        type: 'student',
        name: 'عمر خالد - وكيل جديد'
      }
    },
    {
      id: '3',
      title: 'الموافقة على برنامج دراسي جديد',
      description: 'مراجعة تفاصيل البرنامج الدراسي الجديد والموافقة عليه',
      dueDate: '2025-05-20',
      priority: 'medium',
      type: 'approval',
      status: 'inProgress',
      assignedTo: 'خالد عبدالله',
      relatedTo: {
        type: 'program',
        name: 'هندسة البرمجيات - جامعة أنقرة'
      }
    },
    {
      id: '4',
      title: 'إرسال إشعارات تحديث الوثائق',
      description: 'إرسال تذكير للطلاب بتحديث الوثائق المطلوبة قبل الموعد النهائي',
      dueDate: '2025-05-17',
      priority: 'high',
      type: 'notification',
      status: 'pending',
      assignedTo: 'فاطمة محمد',
      relatedTo: {
        type: 'student',
        name: 'مجموعة طلاب - وثائق التسجيل'
      }
    },
    {
      id: '5',
      title: 'مراجعة معلومات الجامعة',
      description: 'تحديث معلومات جامعة مانشستر وإضافة برامج جديدة',
      dueDate: '2025-05-21',
      priority: 'low',
      type: 'review',
      status: 'completed',
      assignedTo: 'أحمد سامي',
      relatedTo: {
        type: 'university',
        name: 'جامعة مانشستر'
      }
    },
    {
      id: '6',
      title: 'متابعة طلبات التأشيرة',
      description: 'متابعة حالة طلبات التأشيرة للطلاب المقبولين',
      dueDate: '2025-05-19',
      priority: 'high',
      type: 'followup',
      status: 'inProgress',
      assignedTo: 'سارة علي',
      relatedTo: {
        type: 'application',
        name: 'مجموعة طلاب - طلبات التأشيرة'
      }
    },
  ];
  
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'pending') return task.status === 'pending';
    if (activeTab === 'inProgress') return task.status === 'inProgress';
    if (activeTab === 'completed') return task.status === 'completed';
    if (activeTab === 'high') return task.priority === 'high';
    return true;
  });

  const handleCompleteTask = (taskId: string) => {
    toast({
      title: "تم إكمال المهمة",
      description: "تم تحديث حالة المهمة بنجاح",
    });
  };

  const handleAssignTask = (taskId: string) => {
    toast({
      title: "تم إعادة تعيين المهمة",
      description: "تم إعادة تعيين المهمة بنجاح",
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('admin.tasks.highPriority', 'عالية')}</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500 hover:bg-amber-600">{t('admin.tasks.mediumPriority', 'متوسطة')}</Badge>;
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('admin.tasks.lowPriority', 'منخفضة')}</Badge>;
    }
  };
  
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'inProgress':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };
  
  const getRelatedIcon = (type: Task['relatedTo']['type']) => {
    switch (type) {
      case 'student':
        return <User className="h-4 w-4 text-unlimited-blue" />;
      case 'application':
        return <FileText className="h-4 w-4 text-unlimited-blue" />;
      case 'university':
        return <School className="h-4 w-4 text-unlimited-blue" />;
      case 'program':
        return <FileText className="h-4 w-4 text-unlimited-blue" />;
    }
  };

  return (
    <motion.div 
      className={`${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{t('admin.tasks.overview', 'نظرة عامة على المهام')}</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>{t('admin.tasks.pending', 'قيد الانتظار')}: {tasks.filter(t => t.status === 'pending').length}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>{t('admin.tasks.inProgress', 'قيد التنفيذ')}: {tasks.filter(t => t.status === 'inProgress').length}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>{t('admin.tasks.completed', 'مكتمل')}: {tasks.filter(t => t.status === 'completed').length}</span>
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">{t('admin.tasks.all', 'الكل')}</TabsTrigger>
              <TabsTrigger value="pending">{t('admin.tasks.pending', 'قيد الانتظار')}</TabsTrigger>
              <TabsTrigger value="inProgress">{t('admin.tasks.inProgress', 'قيد التنفيذ')}</TabsTrigger>
              <TabsTrigger value="completed">{t('admin.tasks.completed', 'مكتمل')}</TabsTrigger>
              <TabsTrigger value="high">{t('admin.tasks.highPriority', 'عالية الأهمية')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-0">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-unlimited-gray" />
                        <span className="text-sm text-unlimited-gray">{task.dueDate}</span>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-unlimited-gray text-sm mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-unlimited-blue" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        {task.relatedTo && (
                          <div className="flex items-center gap-1">
                            <span className="text-unlimited-gray mx-1">|</span>
                            {getRelatedIcon(task.relatedTo.type)}
                            <span>{task.relatedTo.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignTask(task.id)}
                        >
                          {t('admin.tasks.reassign', 'إعادة تعيين')}
                        </Button>
                        
                        {task.status !== 'completed' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            {t('admin.tasks.markComplete', 'إكمال')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-unlimited-gray/50 mb-2" />
                  <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">
                    {t('admin.tasks.noTasks', 'لا توجد مهام')}
                  </h3>
                  <p className="text-unlimited-gray">
                    {t('admin.tasks.allCompleted', 'لقد أكملت جميع المهام المخصصة لك، أحسنت!')}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4 mt-0">
              {filteredTasks.filter(task => task.status === 'pending').length > 0 ? (
                filteredTasks.filter(task => task.status === 'pending').map((task) => (
                  <motion.div 
                    key={task.id}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-unlimited-gray" />
                        <span className="text-sm text-unlimited-gray">{task.dueDate}</span>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-unlimited-gray text-sm mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-unlimited-blue" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        {task.relatedTo && (
                          <div className="flex items-center gap-1">
                            <span className="text-unlimited-gray mx-1">|</span>
                            {getRelatedIcon(task.relatedTo.type)}
                            <span>{task.relatedTo.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignTask(task.id)}
                        >
                          {t('admin.tasks.reassign', 'إعادة تعيين')}
                        </Button>
                        
                        {task.status !== 'completed' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            {t('admin.tasks.markComplete', 'إكمال')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-unlimited-gray/50 mb-2" />
                  <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">
                    {t('admin.tasks.noPendingTasks', 'لا توجد مهام قيد الانتظار')}
                  </h3>
                  <p className="text-unlimited-gray">
                    {t('admin.tasks.noPendingTasksDescription', 'لا توجد مهام معلقة حاليًا. يرجى التحقق لاحقًا.')}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inProgress" className="space-y-4 mt-0">
              {filteredTasks.filter(task => task.status === 'inProgress').length > 0 ? (
                filteredTasks.filter(task => task.status === 'inProgress').map((task) => (
                  <motion.div 
                    key={task.id}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-unlimited-gray" />
                        <span className="text-sm text-unlimited-gray">{task.dueDate}</span>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-unlimited-gray text-sm mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-unlimited-blue" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        {task.relatedTo && (
                          <div className="flex items-center gap-1">
                            <span className="text-unlimited-gray mx-1">|</span>
                            {getRelatedIcon(task.relatedTo.type)}
                            <span>{task.relatedTo.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignTask(task.id)}
                        >
                          {t('admin.tasks.reassign', 'إعادة تعيين')}
                        </Button>
                        
                        {task.status !== 'completed' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            {t('admin.tasks.markComplete', 'إكمال')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-unlimited-gray/50 mb-2" />
                  <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">
                    {t('admin.tasks.noInProgressTasks', 'لا توجد مهام قيد التنفيذ')}
                  </h3>
                  <p className="text-unlimited-gray">
                    {t('admin.tasks.noInProgressTasksDescription', 'لا توجد مهام قيد التنفيذ حاليًا. يرجى التحقق لاحقًا.')}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-0">
              {filteredTasks.filter(task => task.status === 'completed').length > 0 ? (
                filteredTasks.filter(task => task.status === 'completed').map((task) => (
                  <motion.div 
                    key={task.id}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-unlimited-gray" />
                        <span className="text-sm text-unlimited-gray">{task.dueDate}</span>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-unlimited-gray text-sm mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-unlimited-blue" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        {task.relatedTo && (
                          <div className="flex items-center gap-1">
                            <span className="text-unlimited-gray mx-1">|</span>
                            {getRelatedIcon(task.relatedTo.type)}
                            <span>{task.relatedTo.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignTask(task.id)}
                        >
                          {t('admin.tasks.reassign', 'إعادة تعيين')}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-unlimited-gray/50 mb-2" />
                  <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">
                    {t('admin.tasks.noCompletedTasks', 'لا توجد مهام مكتملة')}
                  </h3>
                  <p className="text-unlimited-gray">
                    {t('admin.tasks.noCompletedTasksDescription', 'لا توجد مهام مكتملة حاليًا. يرجى التحقق لاحقًا.')}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="high" className="space-y-4 mt-0">
              {filteredTasks.filter(task => task.priority === 'high').length > 0 ? (
                filteredTasks.filter(task => task.priority === 'high').map((task) => (
                  <motion.div 
                    key={task.id}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-unlimited-gray" />
                        <span className="text-sm text-unlimited-gray">{task.dueDate}</span>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-unlimited-gray text-sm mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-unlimited-blue" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        {task.relatedTo && (
                          <div className="flex items-center gap-1">
                            <span className="text-unlimited-gray mx-1">|</span>
                            {getRelatedIcon(task.relatedTo.type)}
                            <span>{task.relatedTo.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignTask(task.id)}
                        >
                          {t('admin.tasks.reassign', 'إعادة تعيين')}
                        </Button>
                        
                        {task.status !== 'completed' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            {t('admin.tasks.markComplete', 'إكمال')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-unlimited-gray/50 mb-2" />
                  <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">
                    {t('admin.tasks.noHighPriorityTasks', 'لا توجد مهام ذات أولوية عالية')}
                  </h3>
                  <p className="text-unlimited-gray">
                    {t('admin.tasks.noHighPriorityTasksDescription', 'لا توجد مهام ذات أولوية عالية حاليًا. يرجى التحقق لاحقًا.')}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            {t('admin.tasks.viewArchived', 'عرض المهام المؤرشفة')}
          </Button>
          <Button size="sm">
            {t('admin.tasks.createNew', 'إنشاء مهمة جديدة')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminTasksOverview;
