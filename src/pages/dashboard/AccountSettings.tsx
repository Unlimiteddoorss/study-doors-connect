
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { Lock, Key, Globe, UserCog, BellRing, Shield, Monitor, CreditCard, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountManagement from '@/components/auth/AccountManagement';
import SecuritySettings from '@/components/auth/SecuritySettings';
import NotificationSettings from '@/components/student/NotificationSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { changeLanguage, getCurrentLanguage } from '@/i18n/config';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const AccountSettings = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      changeLanguage(lang);
      toast({
        title: t('auth.preferences.languageChanged'),
        description: t('auth.preferences.languageChangedDesc'),
      });
    }
  };

  const [integrations, setIntegrations] = useState([
    { id: 'google', name: 'Google', connected: true, icon: '🔄' },
    { id: 'microsoft', name: 'Microsoft', connected: false, icon: '🔄' },
    { id: 'facebook', name: 'Facebook', connected: false, icon: '🔄' },
  ]);

  const handleIntegrationToggle = (id: string, newState: boolean) => {
    setIntegrations(integrations.map(item => 
      item.id === id ? {...item, connected: newState} : item
    ));
    
    toast({
      title: newState 
        ? t('auth.integrations.connected', { name: id }) 
        : t('auth.integrations.disconnected', { name: id }),
      description: newState
        ? t('auth.integrations.connectedDesc')
        : t('auth.integrations.disconnectedDesc'),
    });
  };

  const [subscriptionTier, setSubscriptionTier] = useState('free');

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('auth.accountSettings.title')}</h1>
            <p className="text-unlimited-gray">{t('auth.accountSettings.subtitle')}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="mr-2 bg-unlimited-blue text-white">{t('auth.accountStatus.active')}</Badge>
            <Badge variant="outline" className="border-green-500 text-green-600">{t('auth.lastUpdated', { date: '10 مايو 2025' })}</Badge>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 overflow-x-auto">
            <TabsTrigger value="personal">
              <UserCog className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.personalInfo')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.personal')}</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.securitySettings')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.security')}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellRing className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.notifications')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.notifs')}</span>
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Key className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.subAccounts')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.accounts')}</span>
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Globe className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.preferences')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.prefs')}</span>
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">{t('auth.accountSettings.billing')}</span>
              <span className="inline md:hidden">{t('auth.accountSettings.bill')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.personalInfo.title')}</CardTitle>
                    <CardDescription>
                      {t('auth.personalInfo.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t('auth.personalInfo.firstName')}</Label>
                        <input
                          id="firstName"
                          type="text"
                          defaultValue="أحمد"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t('auth.personalInfo.lastName')}</Label>
                        <input
                          id="lastName"
                          type="text"
                          defaultValue="محمود"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">{t('auth.personalInfo.email')}</Label>
                      <input
                        id="email"
                        type="email"
                        defaultValue="ahmed@example.com"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                      />
                      <p className="text-sm text-unlimited-gray mt-1">{t('auth.personalInfo.emailNote')}</p>
                    </div>
                    <div>
                      <Label htmlFor="phone">{t('auth.personalInfo.phone')}</Label>
                      <input
                        id="phone"
                        type="tel"
                        defaultValue="+90 555 123 4567"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">{t('auth.personalInfo.country')}</Label>
                      <select
                        id="country"
                        defaultValue="tr"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                      >
                        <option value="tr">تركيا</option>
                        <option value="sa">المملكة العربية السعودية</option>
                        <option value="eg">مصر</option>
                        <option value="jo">الأردن</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="bio">{t('auth.personalInfo.bio')}</Label>
                      <textarea
                        id="bio"
                        rows={3}
                        defaultValue="طالب طموح يسعى للدراسة في تركيا وتحقيق أهدافه الأكاديمية."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue mt-1"
                      ></textarea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">{t('common.cancel')}</Button>
                    <Button onClick={() => {
                      toast({
                        title: t('auth.personalInfo.saved'),
                        description: t('auth.personalInfo.savedDesc'),
                      });
                    }}>
                      {t('common.save')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.profilePhoto.title')}</CardTitle>
                    <CardDescription>
                      {t('auth.profilePhoto.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-unlimited-light-blue flex items-center justify-center text-4xl mb-4">
                      أ م
                    </div>
                    <Button variant="outline" className="w-full mb-2">
                      {t('auth.profilePhoto.upload')}
                    </Button>
                    <Button variant="ghost" className="w-full text-unlimited-gray">
                      {t('auth.profilePhoto.remove')}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{t('auth.dataExport.title')}</CardTitle>
                    <CardDescription>
                      {t('auth.dataExport.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      {t('auth.dataExport.download')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.preferences.title')}</CardTitle>
                    <CardDescription>
                      {t('auth.preferences.description')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        {t('auth.preferences.language')}
                      </h3>
                      <RadioGroup 
                        defaultValue={currentLanguage}
                        onValueChange={handleLanguageChange}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="ar" id="ar" />
                          <Label htmlFor="ar" className="flex-1 cursor-pointer">
                            <div className="font-medium">العربية</div>
                            <div className="text-sm text-unlimited-gray">اللغة العربية</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="en" id="en" />
                          <Label htmlFor="en" className="flex-1 cursor-pointer">
                            <div className="font-medium">English</div>
                            <div className="text-sm text-unlimited-gray">English Language</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="fr" id="fr" />
                          <Label htmlFor="fr" className="flex-1 cursor-pointer">
                            <div className="font-medium">Français</div>
                            <div className="text-sm text-unlimited-gray">Langue française</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="tr" id="tr" />
                          <Label htmlFor="tr" className="flex-1 cursor-pointer">
                            <div className="font-medium">Türkçe</div>
                            <div className="text-sm text-unlimited-gray">Türk dili</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        {t('auth.preferences.theme')}
                      </h3>
                      <RadioGroup 
                        defaultValue="light"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t('auth.preferences.lightTheme')}</div>
                            <div className="text-sm text-unlimited-gray">{t('auth.preferences.lightThemeDesc')}</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t('auth.preferences.darkTheme')}</div>
                            <div className="text-sm text-unlimited-gray">{t('auth.preferences.darkThemeDesc')}</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors col-span-full">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system" className="flex-1 cursor-pointer">
                            <div className="font-medium">{t('auth.preferences.systemTheme')}</div>
                            <div className="text-sm text-unlimited-gray">{t('auth.preferences.systemThemeDesc')}</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        {t('auth.preferences.dateFormat')}
                      </h3>
                      <RadioGroup 
                        defaultValue="dd/mm/yyyy"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="dd/mm/yyyy" id="dmySlash" />
                          <Label htmlFor="dmySlash" className="flex-1 cursor-pointer">
                            <div className="font-medium">DD/MM/YYYY</div>
                            <div className="text-sm text-unlimited-gray">10/05/2025</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="mm/dd/yyyy" id="mdySlash" />
                          <Label htmlFor="mdySlash" className="flex-1 cursor-pointer">
                            <div className="font-medium">MM/DD/YYYY</div>
                            <div className="text-sm text-unlimited-gray">05/10/2025</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="dd-mm-yyyy" id="dmyDash" />
                          <Label htmlFor="dmyDash" className="flex-1 cursor-pointer">
                            <div className="font-medium">DD-MM-YYYY</div>
                            <div className="text-sm text-unlimited-gray">10-05-2025</div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse border p-3 rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="yyyy-mm-dd" id="ymdDash" />
                          <Label htmlFor="ymdDash" className="flex-1 cursor-pointer">
                            <div className="font-medium">YYYY-MM-DD</div>
                            <div className="text-sm text-unlimited-gray">2025-05-10</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button onClick={() => {
                      toast({
                        title: t('auth.preferences.saved'),
                        description: t('auth.preferences.savedDesc'),
                      });
                    }}>
                      {t('common.savePreferences')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.preferences.accessibility')}</CardTitle>
                    <CardDescription>
                      {t('auth.preferences.accessibilityDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="largeText" className="font-medium block">
                          {t('auth.preferences.largeText')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">{t('auth.preferences.largeTextDesc')}</p>
                      </div>
                      <Switch id="largeText" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animations" className="font-medium block">
                          {t('auth.preferences.reduceMotion')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">{t('auth.preferences.reduceMotionDesc')}</p>
                      </div>
                      <Switch id="animations" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="contrast" className="font-medium block">
                          {t('auth.preferences.highContrast')}
                        </Label>
                        <p className="text-sm text-unlimited-gray">{t('auth.preferences.highContrastDesc')}</p>
                      </div>
                      <Switch id="contrast" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{t('auth.preferences.integrations')}</CardTitle>
                    <CardDescription>
                      {t('auth.preferences.integrationsDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {integrations.map(integration => (
                      <div key={integration.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center rounded bg-unlimited-light-blue text-unlimited-blue">
                            {integration.icon}
                          </div>
                          <div>
                            <Label htmlFor={`integration-${integration.id}`} className="font-medium block">
                              {integration.name}
                            </Label>
                            <p className="text-xs text-unlimited-gray">
                              {integration.connected ? t('auth.preferences.connected') : t('auth.preferences.disconnected')}
                            </p>
                          </div>
                        </div>
                        <Switch 
                          id={`integration-${integration.id}`} 
                          checked={integration.connected}
                          onCheckedChange={(checked) => handleIntegrationToggle(integration.id, checked)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.billing.title')}</CardTitle>
                    <CardDescription>
                      {t('auth.billing.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-unlimited-light-blue/10 rounded-lg border border-unlimited-light-blue/20">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Badge className="bg-unlimited-blue text-white">
                          {t('auth.billing.currentPlan')}
                        </Badge>
                        {subscriptionTier === 'free' ? t('auth.billing.freePlan') : t('auth.billing.proPlan')}
                      </h3>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span>{t('auth.billing.expires')}</span>
                          <span className="font-medium">
                            {subscriptionTier === 'free' ? t('auth.billing.never') : '10 يونيو 2025'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>{t('auth.billing.nextPayment')}</span>
                          <span className="font-medium">
                            {subscriptionTier === 'free' ? '—' : '10 يونيو 2025'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>{t('auth.billing.paymentMethod')}</span>
                          <span className="font-medium">
                            {subscriptionTier === 'free' ? '—' : 'Visa •••• 4242'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        {subscriptionTier === 'free' ? (
                          <Button className="w-full">
                            {t('auth.billing.upgradeToPro')}
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            {t('auth.billing.managePlan')}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('auth.billing.paymentHistory')}</h3>
                      
                      {subscriptionTier === 'free' ? (
                        <div className="text-center py-8 text-unlimited-gray">
                          {t('auth.billing.noPayments')}
                        </div>
                      ) : (
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{t('auth.billing.date')}</th>
                              <th className="text-left py-2">{t('auth.billing.amount')}</th>
                              <th className="text-left py-2">{t('auth.billing.status')}</th>
                              <th className="text-right py-2">{t('auth.billing.invoice')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3">10 مايو 2025</td>
                              <td className="py-3">$9.99</td>
                              <td className="py-3">
                                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">
                                  {t('auth.billing.paid')}
                                </Badge>
                              </td>
                              <td className="py-3 text-right">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <ArrowUpRight className="h-3 w-3" />
                                  PDF
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3">10 أبريل 2025</td>
                              <td className="py-3">$9.99</td>
                              <td className="py-3">
                                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">
                                  {t('auth.billing.paid')}
                                </Badge>
                              </td>
                              <td className="py-3 text-right">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <ArrowUpRight className="h-3 w-3" />
                                  PDF
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('auth.billing.plansComparison')}</CardTitle>
                    <CardDescription>
                      {t('auth.billing.plansDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-3 rounded-lg border mb-2 ${subscriptionTier === 'free' ? 'border-unlimited-blue bg-unlimited-light-blue/5' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{t('auth.billing.freePlan')}</h4>
                          <p className="text-sm text-unlimited-gray">{t('auth.billing.freePlanDesc')}</p>
                        </div>
                        <Badge variant={subscriptionTier === 'free' ? 'default' : 'outline'} className="ml-2">
                          {subscriptionTier === 'free' ? t('auth.billing.current') : t('auth.billing.free')}
                        </Badge>
                      </div>
                      
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-unlimited-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('auth.billing.feature1')}
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-unlimited-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('auth.billing.feature2')}
                        </li>
                      </ul>
                    </div>
                    
                    <div className={`p-3 rounded-lg border ${subscriptionTier === 'pro' ? 'border-unlimited-blue bg-unlimited-light-blue/5' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{t('auth.billing.proPlan')}</h4>
                          <p className="text-sm text-unlimited-gray">{t('auth.billing.proPlanDesc')}</p>
                        </div>
                        <Badge variant={subscriptionTier === 'pro' ? 'default' : 'outline'} className="ml-2">
                          {subscriptionTier === 'pro' ? t('auth.billing.current') : '$9.99/mo'}
                        </Badge>
                      </div>
                      
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-unlimited-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('auth.billing.proFeature1')}
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-unlimited-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('auth.billing.proFeature2')}
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-unlimited-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('auth.billing.proFeature3')}
                        </li>
                      </ul>
                    </div>
                    
                    {subscriptionTier === 'free' ? (
                      <Button className="w-full mt-2">
                        {t('auth.billing.upgradeToPro')}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full mt-2">
                        {t('auth.billing.downgradeToFree')}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
