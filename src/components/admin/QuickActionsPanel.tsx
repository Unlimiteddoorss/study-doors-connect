
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Plus, 
  FileText, 
  User, 
  Building, 
  BookOpen, 
  BarChart, 
  Settings,
  MessageSquare,
  Bell,
  Upload,
  Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface QuickActionsPanelProps {
  className?: string;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const QuickActionsPanel = ({ className }: QuickActionsPanelProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const actionGroups = [
    {
      title: t('admin.quickActions.create'),
      actions: [
        {
          icon: <FileText className="h-4 w-4" />,
          label: t('admin.quickActions.newApplication'),
          onClick: () => console.log('Create new application'),
          color: 'text-blue-500 bg-blue-50',
        },
        {
          icon: <User className="h-4 w-4" />,
          label: t('admin.quickActions.newStudent'),
          onClick: () => console.log('Create new student'),
          color: 'text-green-500 bg-green-50',
        },
        {
          icon: <User className="h-4 w-4" />,
          label: t('admin.quickActions.newAgent'),
          onClick: () => console.log('Create new agent'),
          color: 'text-purple-500 bg-purple-50',
        },
        {
          icon: <Building className="h-4 w-4" />,
          label: t('admin.quickActions.newUniversity'),
          onClick: () => console.log('Create new university'),
          color: 'text-orange-500 bg-orange-50',
        },
        {
          icon: <BookOpen className="h-4 w-4" />,
          label: t('admin.quickActions.newProgram'),
          onClick: () => console.log('Create new program'),
          color: 'text-teal-500 bg-teal-50',
        }
      ]
    },
    {
      title: t('admin.quickActions.manage'),
      actions: [
        {
          icon: <MessageSquare className="h-4 w-4" />,
          label: t('admin.quickActions.messages'),
          onClick: () => console.log('View messages'),
          color: 'text-indigo-500 bg-indigo-50',
        },
        {
          icon: <Bell className="h-4 w-4" />,
          label: t('admin.quickActions.notifications'),
          onClick: () => console.log('View notifications'),
          color: 'text-red-500 bg-red-50',
        },
        {
          icon: <BarChart className="h-4 w-4" />,
          label: t('admin.quickActions.reports'),
          onClick: () => console.log('Generate reports'),
          color: 'text-sky-500 bg-sky-50',
        },
        {
          icon: <Settings className="h-4 w-4" />,
          label: t('admin.quickActions.settings'),
          onClick: () => console.log('Open settings'),
          color: 'text-gray-500 bg-gray-50',
        }
      ]
    },
    {
      title: t('admin.quickActions.dataManagement'),
      actions: [
        {
          icon: <Upload className="h-4 w-4" />,
          label: t('admin.quickActions.importData'),
          onClick: () => console.log('Import data'),
          color: 'text-amber-500 bg-amber-50',
        },
        {
          icon: <Download className="h-4 w-4" />,
          label: t('admin.quickActions.exportData'),
          onClick: () => console.log('Export data'),
          color: 'text-cyan-500 bg-cyan-50',
        }
      ]
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className={className}>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('admin.quickActions.title')}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-h-[70vh] overflow-y-auto"
        >
          {actionGroups.map((group, index) => (
            <div key={index} className={cn("p-4", index > 0 && "border-t")}>
              <h3 className="text-sm font-medium text-unlimited-gray mb-3">{group.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {group.actions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    variants={itemVariants}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    <div className={`p-2 rounded-full ${action.color} mb-2`}>
                      {action.icon}
                    </div>
                    <span className="text-xs">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickActionsPanel;
