
import { useToast } from '@/hooks/use-toast';

interface ErrorReport {
  type: 'typescript' | 'runtime' | 'network' | 'ui';
  message: string;
  file?: string;
  line?: number;
  suggestion?: string;
}

export class ErrorFixer {
  private static instance: ErrorFixer;
  private errors: ErrorReport[] = [];

  static getInstance(): ErrorFixer {
    if (!ErrorFixer.instance) {
      ErrorFixer.instance = new ErrorFixer();
    }
    return ErrorFixer.instance;
  }

  // إضافة خطأ جديد
  addError(error: ErrorReport) {
    this.errors.push(error);
    this.analyzeAndSuggestFix(error);
  }

  // تحليل الخطأ واقتراح حل
  private analyzeAndSuggestFix(error: ErrorReport) {
    let suggestion = '';

    switch (error.type) {
      case 'typescript':
        suggestion = this.getTypeScriptSuggestion(error.message);
        break;
      case 'runtime':
        suggestion = this.getRuntimeSuggestion(error.message);
        break;
      case 'network':
        suggestion = this.getNetworkSuggestion(error.message);
        break;
      case 'ui':
        suggestion = this.getUISuggestion(error.message);
        break;
    }

    error.suggestion = suggestion;
    console.log(`خطأ: ${error.message}\nاقتراح الحل: ${suggestion}`);
  }

  private getTypeScriptSuggestion(message: string): string {
    if (message.includes("Property") && message.includes("does not exist")) {
      return "تأكد من أن الخاصية موجودة في النوع المحدد أو أضف علامة استفهام للخصائص الاختيارية";
    }
    if (message.includes("Type") && message.includes("is not assignable")) {
      return "تحقق من تطابق الأنواع أو استخدم type assertion إذا كنت متأكداً";
    }
    if (message.includes("Cannot find module")) {
      return "تأكد من أن المسار صحيح وأن الملف موجود، أو قم بتثبيت الحزمة المطلوبة";
    }
    return "راجع رسالة الخطأ وتأكد من صحة الأنواع المستخدمة";
  }

  private getRuntimeSuggestion(message: string): string {
    if (message.includes("Cannot read property") || message.includes("Cannot read properties")) {
      return "تأكد من أن المتغير ليس null أو undefined قبل الوصول لخصائصه";
    }
    if (message.includes("is not a function")) {
      return "تأكد من أن المتغير هو دالة قبل استدعائها";
    }
    if (message.includes("Maximum call stack")) {
      return "هناك تكرار لانهائي، تحقق من الدوال المتداخلة";
    }
    return "راجع رسالة الخطأ وتأكد من صحة المنطق";
  }

  private getNetworkSuggestion(message: string): string {
    if (message.includes("404")) {
      return "تأكد من صحة URL المطلوب";
    }
    if (message.includes("500")) {
      return "خطأ في الخادم، تحقق من إعدادات الباك اند";
    }
    if (message.includes("timeout")) {
      return "انتهت مهلة الطلب، تحقق من سرعة الاتصال";
    }
    return "تحقق من اتصال الشبكة وإعدادات API";
  }

  private getUISuggestion(message: string): string {
    if (message.includes("Each child in a list should have a unique")) {
      return "أضف prop key فريد لكل عنصر في القائمة";
    }
    if (message.includes("Cannot update a component while rendering")) {
      return "تجنب تحديث الحالة أثناء الرندر، استخدم useEffect";
    }
    return "راجع تركيب المكونات وتأكد من صحة JSX";
  }

  // الحصول على جميع الأخطاء
  getErrors(): ErrorReport[] {
    return this.errors;
  }

  // مسح الأخطاء
  clearErrors() {
    this.errors = [];
  }

  // إحصائيات الأخطاء
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      typescript: this.errors.filter(e => e.type === 'typescript').length,
      runtime: this.errors.filter(e => e.type === 'runtime').length,
      network: this.errors.filter(e => e.type === 'network').length,
      ui: this.errors.filter(e => e.type === 'ui').length
    };
    return stats;
  }
}

// Hook لاستخدام نظام إصلاح الأخطاء
export const useErrorFixer = () => {
  const { toast } = useToast();
  const errorFixer = ErrorFixer.getInstance();

  const reportError = (error: ErrorReport) => {
    errorFixer.addError(error);
    
    toast({
      title: "تم اكتشاف خطأ",
      description: error.suggestion || "راجع console للتفاصيل",
      variant: "destructive"
    });
  };

  const reportTypeScriptError = (message: string, file?: string, line?: number) => {
    reportError({
      type: 'typescript',
      message,
      file,
      line
    });
  };

  const reportRuntimeError = (message: string) => {
    reportError({
      type: 'runtime',
      message
    });
  };

  const reportNetworkError = (message: string) => {
    reportError({
      type: 'network',
      message
    });
  };

  const reportUIError = (message: string) => {
    reportError({
      type: 'ui',
      message
    });
  };

  return {
    reportError,
    reportTypeScriptError,
    reportRuntimeError,
    reportNetworkError,
    reportUIError,
    getErrors: () => errorFixer.getErrors(),
    clearErrors: () => errorFixer.clearErrors(),
    getErrorStats: () => errorFixer.getErrorStats()
  };
};
