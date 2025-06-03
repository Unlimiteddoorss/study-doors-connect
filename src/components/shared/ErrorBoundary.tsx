
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { errorHandler } from '@/utils/errorHandler';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = Date.now().toString();
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error using our improved error handler
    errorHandler.logError(error, {
      errorInfo,
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  handleReportError = (): void => {
    if (this.state.error) {
      // Send detailed error report
      errorHandler.logError(this.state.error, {
        userAction: 'manual_report',
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
      });
      
      alert('تم إرسال تقرير الخطأ. شكراً لك على المساعدة في تحسين النظام.');
    }
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً، حدث خطأ ما</h2>
            <p className="text-unlimited-gray mb-6">
              نعتذر عن هذا الخطأ. يرجى محاولة تحديث الصفحة أو العودة لاحقاً.
            </p>
            {this.state.errorId && (
              <div className="mb-6 p-4 bg-gray-100 rounded text-unlimited-gray text-sm">
                <p className="font-bold">رقم الخطأ:</p>
                <p className="font-mono">{this.state.errorId}</p>
              </div>
            )}
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-gray-100 rounded text-unlimited-gray text-sm overflow-auto max-h-32 text-right">
                <p className="font-bold">تفاصيل الخطأ (وضع التطوير):</p>
                <p>{this.state.error.toString()}</p>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button onClick={this.handleReset}>
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة المحاولة
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                العودة للصفحة السابقة
              </Button>
              <Button 
                variant="secondary" 
                onClick={this.handleReportError}
                size="sm"
              >
                إبلاغ عن الخطأ
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
