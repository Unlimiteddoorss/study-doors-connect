
import { 
  type ToastActionElement, 
  type ToastProps 
} from "@/components/ui/toast"

import {
  useToast as useToastPrimitive,
  toast as toastPrimitive
} from "@/components/ui/toaster"

export const useToast = useToastPrimitive;
export const toast = toastPrimitive;

export type { ToastActionElement, ToastProps };
