
import * as React from "react"
import { toast } from "@/hooks/use-toast"

export interface ToastCustomProps {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'destructive' | 'success' | 'unlimited'
  className?: string
}

export function useToast() {
  return {
    toast: ({ variant, className, ...props }: ToastCustomProps) => {
      let customClassName = className || '';
      
      if (variant === 'success') {
        customClassName += ' bg-green-500 text-white border-green-600';
      } else if (variant === 'unlimited') {
        customClassName += ' bg-unlimited-blue text-white border-unlimited-dark-blue';
      }
      
      return toast({
        ...props,
        ...(customClassName ? { className: customClassName } : {}),
      });
    },
    dismiss: toast.dismiss,
  };
}

export { toast };
