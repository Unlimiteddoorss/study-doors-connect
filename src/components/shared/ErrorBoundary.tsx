
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً، حدث خطأ ما</h2>
            <p className="text-unlimited-gray mb-6">
              نعتذر عن هذا الخطأ. يرجى محاولة تحديث الصفحة أو العودة لاحقاً.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded text-unlimited-gray text-sm overflow-auto max-h-32 text-right">
                <p className="font-bold">تفاصيل الخطأ:</p>
                <p>{this.state.error.toString()}</p>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث الصفحة
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                العودة للصفحة السابقة
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
