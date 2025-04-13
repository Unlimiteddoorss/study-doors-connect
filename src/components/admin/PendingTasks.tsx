
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileCheck,
  FileEdit,
  Trash,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export function PendingTasks() {
  const [tasks, setTasks] = useState([
    {
      id: "task1",
      title: "مراجعة طلب محمد أحمد",
      priority: "عالية",
      dueDate: "اليوم",
      type: "review",
      description: "مراجعة طلب التسجيل والتحقق من اكتمال المستندات",
      isCompleted: false
    },
    {
      id: "task2",
      title: "التحقق من مستندات سمية خالد",
      priority: "متوسطة",
      dueDate: "غداً",
      type: "documents",
      description: "التحقق من صحة الشهادات المرفقة والمصادقة عليها",
      isCompleted: false
    },
    {
      id: "task3",
      title: "الرد على استفسارات يوسف محمود",
      priority: "منخفضة",
      dueDate: "خلال 3 أيام",
      type: "message",
      description: "الرد على الاستفسارات المتعلقة بالتسجيل في جامعة اسطنبول",
      isCompleted: false
    },
    {
      id: "task4",
      title: "تحديث معلومات جامعة إسطنبول",
      priority: "متوسطة",
      dueDate: "خلال أسبوع",
      type: "update",
      description: "تحديث المعلومات الخاصة بالجامعة والبرامج المتاحة",
      isCompleted: false
    }
  ]);
  
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    priority: 'متوسطة',
    dueDate: '',
    description: '',
    type: 'review'
  });
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية": return "text-red-500 bg-red-50";
      case "متوسطة": return "text-orange-500 bg-orange-50";
      case "منخفضة": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "review": return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "documents": return <FileCheck className="h-5 w-5 text-blue-500" />;
      case "message": return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "update": return <FileEdit className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: true } : task
    ));
    
    toast({
      title: "تم إكمال المهمة",
      description: "تم تحديث حالة المهمة بنجاح",
    });
    
    setSelectedTask(null);
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "تم حذف المهمة",
      description: "تم حذف المهمة بنجاح",
    });
    
    setSelectedTask(null);
  };

  const handleCompleteWithNotes = () => {
    if (selectedTask && notes.trim()) {
      // In a real app, you would save the notes to a database
      handleCompleteTask(selectedTask.id);
      setNotes('');
      
      toast({
        title: "تم إكمال المهمة مع إضافة ملاحظات",
        description: "تم حفظ الملاحظات وتحديث حالة المهمة بنجاح",
      });
    }
  };
  
  const handleAddNewTask = () => {
    if (newTaskForm.title.trim() && newTaskForm.dueDate) {
      const newTask = {
        id: `task${Date.now()}`,
        title: newTaskForm.title,
        priority: newTaskForm.priority,
        dueDate: newTaskForm.dueDate,
        type: newTaskForm.type,
        description: newTaskForm.description,
        isCompleted: false
      };
      
      setTasks([newTask, ...tasks]);
      
      toast({
        title: "تمت إضافة المهمة",
        description: "تم إضافة المهمة الجديدة بنجاح",
      });
      
      // Reset form
      setNewTaskForm({
        title: '',
        priority: 'متوسطة',
        dueDate: '',
        description: '',
        type: 'review'
      });
      
      setShowNewTaskDialog(false);
    }
  };

  // Filter out completed tasks
  const pendingTasks = tasks.filter(task => !task.isCompleted);

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">المهام المعلقة ({pendingTasks.length})</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-unlimited-blue"
          onClick={() => setShowNewTaskDialog(true)}
        >
          <PlusCircle className="h-4 w-4 ml-1" />
          مهمة جديدة
        </Button>
        
        <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مهمة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">عنوان المهمة</label>
                <input
                  type="text"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({...newTaskForm, title: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="أدخل عنوان المهمة"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">الأولوية</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({...newTaskForm, priority: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="عالية">عالية</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="منخفضة">منخفضة</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">موعد الاستحقاق</label>
                  <input
                    type="text"
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm({...newTaskForm, dueDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="مثال: غداً، خلال 3 أيام"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">نوع المهمة</label>
                <select
                  value={newTaskForm.type}
                  onChange={(e) => setNewTaskForm({...newTaskForm, type: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="review">مراجعة</option>
                  <option value="documents">مستندات</option>
                  <option value="message">رسائل</option>
                  <option value="update">تحديث</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">الوصف</label>
                <textarea
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({...newTaskForm, description: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="وصف المهمة"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>إلغاء</Button>
              <Button onClick={handleAddNewTask}>إضافة المهمة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {pendingTasks.map(task => (
        <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-unlimited-blue/10 p-2 rounded-full">
              {getTaskIcon(task.type)}
            </div>
            <div>
              <h4 className="font-medium text-sm">{task.title}</h4>
              <div className="flex gap-2 items-center mt-1">
                <Clock className="h-3 w-3 text-unlimited-gray" />
                <span className="text-xs text-unlimited-gray">{task.dueDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 bg-unlimited-blue hover:bg-unlimited-dark-blue" onClick={() => setSelectedTask(task)}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  إتمام
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إكمال المهمة</DialogTitle>
                </DialogHeader>
                
                {selectedTask && (
                  <div className="py-4">
                    <h3 className="font-bold text-lg mb-2">{selectedTask.title}</h3>
                    <p className="text-unlimited-gray mb-4">{selectedTask.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">إضافة ملاحظات (اختياري)</h4>
                      <Textarea
                        placeholder="أضف ملاحظاتك هنا..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                <DialogFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-green-500 text-white hover:bg-green-600" 
                    onClick={notes.trim() ? handleCompleteWithNotes : () => handleCompleteTask(selectedTask?.id)}
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    إتمام المهمة
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-red-500 text-white hover:bg-red-600" 
                    onClick={() => handleDeleteTask(selectedTask?.id)}
                  >
                    <Trash className="h-4 w-4 ml-1" />
                    حذف المهمة
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
      
      {pendingTasks.length === 0 && (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h3 className="font-medium">لا توجد مهام معلقة</h3>
          <p className="text-unlimited-gray">جميع المهام مكتملة!</p>
        </div>
      )}
      
      <div className="text-center">
        <Button variant="link" className="text-unlimited-blue">
          عرض جميع المهام
        </Button>
      </div>
    </div>
  );
}
