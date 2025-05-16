
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield, ShieldOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AdminToggle() {
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleAdminMode();
    toast({
      title: isAdminMode ? "وضع المدير معطل" : "وضع المدير مفعل",
      description: isAdminMode 
        ? "تم إلغاء تفعيل أدوات الإدارة" 
        : "تم تفعيل أدوات الإدارة، يمكنك الآن التحكم بجميع أقسام الموقع",
      variant: isAdminMode ? "default" : "unlimited",
    });
  };

  return (
    <Button 
      onClick={handleToggle}
      variant={isAdminMode ? "unlimited" : "outline"}
      size="sm"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
    >
      {isAdminMode ? (
        <>
          <ShieldOff className="h-4 w-4 ml-2" />
          إيقاف وضع المدير
        </>
      ) : (
        <>
          <Shield className="h-4 w-4 ml-2" />
          تفعيل وضع المدير
        </>
      )}
    </Button>
  );
}
