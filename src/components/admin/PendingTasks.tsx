
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PendingTasks() {
  const tasks = [
    {
      id: "task1",
      title: "مراجعة طلب محمد أحمد",
      priority: "عالية",
      dueDate: "اليوم",
      type: "review"
    },
    {
      id: "task2",
      title: "التحقق من مستندات سمية خالد",
      priority: "متوسطة",
      dueDate: "غداً",
      type: "documents"
    },
    {
      id: "task3",
      title: "الرد على استفسارات يوسف محمود",
      priority: "منخفضة",
      dueDate: "خلال 3 أيام",
      type: "message"
    },
    {
      id: "task4",
      title: "تحديث معلومات جامعة إسطنبول",
      priority: "متوسطة",
      dueDate: "خلال أسبوع",
      type: "update"
    }
  ];

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
      case "documents": return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "message": return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case "update": return <AlertCircle className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
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
            <Button size="sm" className="h-7 bg-unlimited-blue hover:bg-unlimited-dark-blue">
              <CheckCircle className="h-3 w-3 mr-1" />
              إتمام
            </Button>
          </div>
        </div>
      ))}
      
      <div className="text-center">
        <Button variant="link" className="text-unlimited-blue">
          عرض جميع المهام
        </Button>
      </div>
    </div>
  );
}
