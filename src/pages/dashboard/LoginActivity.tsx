
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Shield, Calendar, Clock, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface LoginAttempt {
  email: string;
  timestamp: string;
  success: boolean;
  ipAddress: string;
  userAgent: string;
  location?: string;
}

const LoginActivity = () => {
  const { t } = useTranslation();
  const [loginHistory, setLoginHistory] = useState<LoginAttempt[]>([]);

  useEffect(() => {
    // In a real application, this would fetch from an API
    // For demo purposes, we'll use localStorage
    const storedHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    
    // If no history exists, create some demo data
    if (storedHistory.length === 0) {
      const demoHistory = [
        {
          email: 'user@example.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          success: true,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
          location: 'Cairo, Egypt',
        },
        {
          email: 'user@example.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          success: true,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
          location: 'Cairo, Egypt',
        },
        {
          email: 'user@example.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          success: false,
          ipAddress: '203.0.113.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'Unknown Location',
        },
      ];
      
      localStorage.setItem('loginHistory', JSON.stringify(demoHistory));
      setLoginHistory(demoHistory);
    } else {
      setLoginHistory(storedHistory);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('loginHistory');
    setLoginHistory([]);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t('loginActivity.title')}</h1>
            <p className="text-unlimited-gray">{t('loginActivity.description')}</p>
          </div>
          <Button variant="outline" onClick={clearHistory}>
            {t('loginActivity.clearHistory')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('loginActivity.totalLogins')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-unlimited-blue mr-3" />
                <span className="text-3xl font-bold">
                  {loginHistory.filter(log => log.success).length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('loginActivity.failedAttempts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-unlimited-danger mr-3" />
                <span className="text-3xl font-bold">
                  {loginHistory.filter(log => !log.success).length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('loginActivity.lastLogin')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-unlimited-gray mr-3" />
                <span className="text-md">
                  {loginHistory.length > 0
                    ? format(new Date(loginHistory[0].timestamp), 'yyyy-MM-dd HH:mm:ss')
                    : t('loginActivity.noLogins')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('loginActivity.recentActivity')}</CardTitle>
            <CardDescription>{t('loginActivity.recentActivityDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {loginHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('loginActivity.status')}</TableHead>
                    <TableHead>{t('loginActivity.date')}</TableHead>
                    <TableHead>{t('loginActivity.time')}</TableHead>
                    <TableHead>{t('loginActivity.ipAddress')}</TableHead>
                    <TableHead>{t('loginActivity.location')}</TableHead>
                    <TableHead>{t('loginActivity.device')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginHistory.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {log.success ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                            <span>{t('loginActivity.successful')}</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="h-5 w-5 text-unlimited-danger mr-1" />
                            <span>{t('loginActivity.failed')}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(log.timestamp), 'yyyy-MM-dd')}
                      </TableCell>
                      <TableCell>
                        {format(new Date(log.timestamp), 'HH:mm:ss')}
                      </TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-unlimited-gray mr-1" />
                          <span>{log.location || 'Unknown'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {log.userAgent.split('(')[0]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-unlimited-gray">
                <p>{t('loginActivity.noActivityFound')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoginActivity;
