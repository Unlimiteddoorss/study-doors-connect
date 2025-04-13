
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type TaskPriority = 'high' | 'medium' | 'low';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
};

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  high: { label: 'عالية', color: 'bg-unlimited-danger text-white' },
  medium: { label: 'متوسطة', color: 'bg-unlimited-warning text-white' },
  low: { label: 'منخفضة', color: 'bg-unlimited-success text-white' },
};

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'مراجعة طلب أحمد محمد',
    description: 'مراجعة وثائق الطلب والتأكد من اكتمالها',
    completed: false,
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'تأكيد قبول سارة في جامعة تورنتو',
    description: 'إرسال بريد إلكتروني لتأكيد القبول',
    completed: false,
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'تحديث قائمة البرامج الدراسية',
    description: 'إضافة البرامج الجديدة للعام الدراسي 2023-2024',
    completed: false,
    priority: 'low',
  },
  {
    id: 'task-4',
    title: 'متابعة طلب التأشيرة لعمر خالد',
    description: 'التحقق من حالة طلب التأشيرة والمستندات المطلوبة',
    completed: false,
    priority: 'high',
  },
  {
    id: 'task-5',
    title: 'تنظيم اجتماع مع الوكلاء',
    description: 'مناقشة الخطة التسويقية للربع القادم',
    completed: false,
    priority: 'medium',
  },
];

export function PendingTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((t) => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "تم إعادة فتح المهمة" : "تم إكمال المهمة",
        description: task.title,
      });
    }
  };

  const completeAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true }))
    );

    toast({
      title: "تم إكمال جميع المهام",
      description: "تم تحديث حالة جميع المهام بنجاح",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start space-x-2 rtl:space-x-reverse p-2 rounded-md ${
              task.completed ? 'bg-gray-50 opacity-70' : ''
            }`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${task.completed ? 'line-through text-unlimited-gray' : ''}`}>
                  {task.title}
                </h4>
                <Badge className={priorityConfig[task.priority].color}>
                  {priorityConfig[task.priority].label}
                </Badge>
              </div>
              <p className="text-xs text-unlimited-gray mt-1">{task.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          className="text-unlimited-success"
          onClick={completeAll}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          إكمال الكل
        </Button>
      </div>
    </div>
  );
}
