
import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, FileText, Building, Users, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuickActionsPanelProps {
  className?: string;
}

const QuickActionsPanel = ({ className = '' }: QuickActionsPanelProps) => {
  const actions = [
    { icon: PlusCircle, label: 'إضافة طالب', onClick: () => console.log('Add student clicked'), color: 'bg-unlimited-blue' },
    { icon: Building, label: 'إضافة جامعة', onClick: () => console.log('Add university clicked'), color: 'bg-unlimited-success' },
    { icon: FileText, label: 'إنشاء تقرير', onClick: () => console.log('Create report clicked'), color: 'bg-unlimited-warning' },
    { icon: RefreshCw, label: 'تحديث البيانات', onClick: () => console.log('Refresh data clicked'), color: 'bg-unlimited-gray' },
    { icon: Download, label: 'تصدير البيانات', onClick: () => console.log('Export data clicked'), color: 'bg-unlimited-dark-blue' }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className={`p-4 bg-white rounded-lg shadow-md ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold mb-3 text-unlimited-dark-blue">إجراءات سريعة</h3>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {actions.map((action, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 transition-all ${action.color} text-white hover:scale-110`}
                    onClick={action.onClick}
                  >
                    <action.icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default QuickActionsPanel;
