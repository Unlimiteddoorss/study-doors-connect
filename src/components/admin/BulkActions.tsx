import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  ChevronDown, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Download,
  Mail,
  Archive
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onBulkAction: (action: string, items: string[]) => void;
  actions?: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    variant?: 'default' | 'destructive';
    requiresConfirmation?: boolean;
  }>;
}

export const BulkActions = ({ 
  selectedItems, 
  totalItems, 
  onSelectAll, 
  onBulkAction,
  actions 
}: BulkActionsProps) => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{key: string; label: string} | null>(null);

  const defaultActions = [
    {
      key: 'approve',
      label: 'قبول المحدد',
      icon: <CheckCircle className="h-4 w-4" />,
      variant: 'default' as const
    },
    {
      key: 'reject',
      label: 'رفض المحدد',
      icon: <XCircle className="h-4 w-4" />,
      variant: 'default' as const,
      requiresConfirmation: true
    },
    {
      key: 'export',
      label: 'تصدير المحدد',
      icon: <Download className="h-4 w-4" />,
      variant: 'default' as const
    },
    {
      key: 'send_email',
      label: 'إرسال بريد إلكتروني',
      icon: <Mail className="h-4 w-4" />,
      variant: 'default' as const
    },
    {
      key: 'archive',
      label: 'أرشفة المحدد',
      icon: <Archive className="h-4 w-4" />,
      variant: 'default' as const,
      requiresConfirmation: true
    },
    {
      key: 'delete',
      label: 'حذف المحدد',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
      requiresConfirmation: true
    }
  ];

  const availableActions = actions || defaultActions;

  const handleAction = (actionKey: string, actionLabel: string, requiresConfirmation?: boolean) => {
    if (selectedItems.length === 0) {
      toast({
        title: "لا توجد عناصر محددة",
        description: "يرجى تحديد عنصر واحد على الأقل",
        variant: "destructive"
      });
      return;
    }

    if (requiresConfirmation) {
      setPendingAction({ key: actionKey, label: actionLabel });
      setShowConfirmDialog(true);
    } else {
      executeAction(actionKey, actionLabel);
    }
  };

  const executeAction = (actionKey: string, actionLabel: string) => {
    onBulkAction(actionKey, selectedItems);
    
    toast({
      title: "تم تنفيذ الإجراء",
      description: `تم ${actionLabel} على ${selectedItems.length} عنصر`
    });

    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < totalItems;

  return (
    <>
      <div className="flex items-center gap-4 p-3 bg-gray-50 border rounded-lg">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            className={isIndeterminate ? 'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground' : ''}
          />
          <span className="text-sm font-medium">
            {selectedItems.length > 0 
              ? `${selectedItems.length} من ${totalItems} محدد`
              : `تحديد الكل (${totalItems})`
            }
          </span>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  إجراءات مجمعة
                  <ChevronDown className="h-4 w-4 mr-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {availableActions.map((action, index) => (
                  <React.Fragment key={action.key}>
                    <DropdownMenuItem
                      onClick={() => handleAction(action.key, action.label, action.requiresConfirmation)}
                      className={action.variant === 'destructive' ? 'text-red-600 focus:text-red-600' : ''}
                    >
                      {action.icon}
                      <span className="mr-2">{action.label}</span>
                    </DropdownMenuItem>
                    {index < availableActions.length - 1 && action.variant === 'destructive' && (
                      <DropdownMenuSeparator />
                    )}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectAll(false)}
            >
              إلغاء التحديد
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الإجراء</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من {pendingAction?.label} على {selectedItems.length} عنصر؟
              هذا الإجراء لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingAction && executeAction(pendingAction.key, pendingAction.label)}
              className="bg-red-600 hover:bg-red-700"
            >
              تأكيد
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
