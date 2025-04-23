import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import {
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  Check,
  Clock,
  AlertCircle,
  PlusCircle,
  Upload,
  Search,
  X,
  Edit,
  Calendar,
  FileUp,
  Mail
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'documents' | 'conditional' | 'paid' | 'registered';

interface Application {
  id: number | string;
  program: string;
  programId?: number;
  university: string;
  status: ApplicationStatus;
  date: string;
  statusColor: string;
  messages: number;
  academicYear?: string;
  semester?: string;
  pinCode?: string;
  scholarshipStatus?: string;
  assignedTo?: string;
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
}

const StudentApplications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<{applicationId: string | number, docName: string} | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Application>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const statusConfig = {
    pending: { label: t('application.status.pending'), color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" /> },
    review: { label: t('application.status.review'), color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4" /> },
    documents: { label: t('application.status.documents'), color: 'bg-purple-100 text-purple-800', icon: <FileText className="h-4 w-4" /> },
    approved: { label: t('application.status.approved'), color: 'bg-green-100 text-green-800', icon: <Check className="h-4 w-4" /> },
    rejected: { label: t('application.status.rejected'), color: 'bg-red-100 text-red-800', icon: <X className="h-4 w-4" /> },
    conditional: { label: t('application.status.conditional'), color: 'bg-indigo-100 text-indigo-800', icon: <AlertCircle className="h-4 w-4" /> },
    paid: { label: t('application.status.paid'), color: 'bg-emerald-100 text-emerald-800', icon: <Check className="h-4 w-4" /> },
    registered: { label: t('application.status.registered'), color: 'bg-teal-100 text-teal-800', icon: <Check className="h-4 w-4" /> },
  };
  
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
        
        if (apiEndpoint) {
          try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`${apiEndpoint}/student/applications?userId=${userId}`);
            if (response.ok) {
              const data = await response.json();
              setApplications(data);
              localStorage.setItem('studentApplications', JSON.stringify(data));
              return;
            }
          } catch (apiError) {
            console.error("API fetch failed, falling back to local storage:", apiError);
          }
        }
        
        const storedApps = localStorage.getItem('studentApplications');
        if (storedApps) {
          const parsedApps = JSON.parse(storedApps);
          const processedApps = parsedApps.map((app: any) => ({
            ...app,
            statusColor: app.statusColor || getStatusColorFromStatus(app.status),
            academicYear: app.academicYear || "2025-2026",
            semester: app.semester || (app.date && new Date(app.date).getMonth() > 6 ? "Fall" : "Spring"),
            pinCode: app.pinCode || generateRandomPinCode(),
            messages: app.messages || 0
          }));
          setApplications(processedApps);
        }
      } catch (error) {
        console.error("Error loading applications:", error);
        toast({
          title: t("application.error.loadFailed"),
          description: t("application.error.loadFailedDesc"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, [toast, t]);

  const getStatusColorFromStatus = (status: ApplicationStatus) => {
    return statusConfig[status]?.color || 'bg-gray-100 text-gray-800';
  };
  
  const generateRandomPinCode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const getFilteredApplications = () => {
    let filtered = applications;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(app => app.status === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.program.toLowerCase().includes(query) ||
        app.university.toLowerCase().includes(query) ||
        app.id.toString().includes(query)
      );
    }
    
    filtered = [...filtered].sort((a, b) => {
      let compareA = a[sortField];
      let compareB = b[sortField];
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        if (sortDirection === 'asc') {
          return compareA.localeCompare(compareB);
        } else {
          return compareB.localeCompare(compareA);
        }
      } else {
        if (sortDirection === 'asc') {
          return compareA > compareB ? 1 : -1;
        } else {
          return compareB > compareA ? 1 : -1;
        }
      }
    });
    
    return filtered;
  };

  const handleSort = (field: keyof Application) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleMessageClick = (applicationId: number | string) => {
    toast({
      title: t("application.notifications.messageOpen"),
      description: t("application.notifications.messageOpenDesc", { id: applicationId }),
    });
    navigate(`/messages?applicationId=${applicationId}`);
  };

  const handleDownloadDocument = (applicationId: number | string, document: string) => {
    toast({
      title: t("application.notifications.downloading"),
      description: t("application.notifications.downloadingDesc", { document }),
    });
    
    const samplePDF = new Blob(['This is a sample document'], { type: 'application/pdf' });
    const url = URL.createObjectURL(samplePDF);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document}_${applicationId}.pdf`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadDocument = (applicationId: number | string, docName: string) => {
    setSelectedDocument({ applicationId, docName });
    setIsUploadDialogOpen(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files.length || !selectedDocument) return;
    
    const file = files[0];
    console.log(`Uploading ${file.name} for application ${selectedDocument.applicationId}`);
    
    const updatedApplications = applications.map(app => {
      if (app.id === selectedDocument.applicationId) {
        const updatedDocuments = app.documents.map(doc => {
          if (doc.name === selectedDocument.docName) {
            return { ...doc, status: 'uploaded' as const };
          }
          return doc;
        });
        return { ...app, documents: updatedDocuments };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
    
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
    if (apiEndpoint) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('applicationId', selectedDocument.applicationId.toString());
      formData.append('documentName', selectedDocument.docName);
      
      fetch(`${apiEndpoint}/documents/upload`, {
        method: 'POST',
        body: formData,
      }).catch(error => {
        console.error('Error uploading document to API:', error);
      });
    }
    
    toast({
      title: t("application.notifications.uploadSuccess"),
      description: t("application.notifications.uploadSuccessDesc", { document: selectedDocument.docName }),
    });
    
    setIsUploadDialogOpen(false);
  };

  const handleNewApplication = () => {
    navigate('/apply');
  };
  
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsDetailsDialogOpen(true);
  };
  
  const exportToExcel = () => {
    const headers = ['ID', 'Program', 'University', 'Status', 'Date', 'Academic Year', 'Semester', 'PIN Code'];
    const filteredApps = getFilteredApplications();
    
    let csvContent = headers.join(',') + '\n';
    
    filteredApps.forEach(app => {
      const row = [
        app.id,
        `"${app.program.replace(/"/g, '""')}"`,
        `"${app.university.replace(/"/g, '""')}"`,
        statusConfig[app.status].label,
        app.date,
        app.academicYear || '',
        app.semester || '',
        app.pinCode || ''
      ];
      csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    if (exportRef.current) {
      exportRef.current.href = url;
      exportRef.current.download = 'my_applications.csv';
      exportRef.current.click();
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    toast({
      title: t("application.export.success"),
      description: t("application.export.successDesc"),
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl">{t("application.myApplications.title")}</CardTitle>
              <CardDescription>{t("application.myApplications.subtitle")}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button onClick={handleNewApplication} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                {t("application.myApplications.newApplication")}
              </Button>
              <Button variant="outline" onClick={exportToExcel} className="gap-2">
                <Download className="h-4 w-4" />
                {t("application.export.toExcel")}
              </Button>
              <a ref={exportRef} className="hidden"></a>
            </div>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid grid-cols-9">
                <TabsTrigger value="all">{t("application.tabs.all")}</TabsTrigger>
                <TabsTrigger value="pending">{t("application.status.pending")}</TabsTrigger>
                <TabsTrigger value="review">{t("application.status.review")}</TabsTrigger>
                <TabsTrigger value="documents">{t("application.status.documents")}</TabsTrigger>
                <TabsTrigger value="conditional">{t("application.status.conditional")}</TabsTrigger>
                <TabsTrigger value="approved">{t("application.status.approved")}</TabsTrigger>
                <TabsTrigger value="paid">{t("application.status.paid")}</TabsTrigger>
                <TabsTrigger value="registered">{t("application.status.registered")}</TabsTrigger>
                <TabsTrigger value="rejected">{t("application.status.rejected")}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="p-0 pt-4">
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray" />
                    <Input 
                      placeholder={t("application.search.applications")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="current">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder={t("application.filter.academicYear")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">2025-2026</SelectItem>
                      <SelectItem value="previous">2024-2025</SelectItem>
                      <SelectItem value="next">2026-2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unlimited-blue"></div>
                  </div>
                ) : (
                  <>
                    {getFilteredApplications().length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead 
                                className={`cursor-pointer ${sortField === 'id' ? 'bg-gray-50' : ''}`}
                                onClick={() => handleSort('id')}
                              >
                                {t("application.table.id")} 
                                {sortField === 'id' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                              </TableHead>
                              <TableHead 
                                className={`cursor-pointer ${sortField === 'program' ? 'bg-gray-50' : ''}`}
                                onClick={() => handleSort('program')}
                              >
                                {t("application.table.program")}
                                {sortField === 'program' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                              </TableHead>
                              <TableHead 
                                className={`cursor-pointer ${sortField === 'university' ? 'bg-gray-50' : ''}`}
                                onClick={() => handleSort('university')}
                              >
                                {t("application.table.university")}
                                {sortField === 'university' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                              </TableHead>
                              <TableHead 
                                className={`cursor-pointer ${sortField === 'status' ? 'bg-gray-50' : ''}`}
                                onClick={() => handleSort('status')}
                              >
                                {t("application.table.status")}
                                {sortField === 'status' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                              </TableHead>
                              <TableHead 
                                className={`cursor-pointer ${sortField === 'date' ? 'bg-gray-50' : ''}`}
                                onClick={() => handleSort('date')}
                              >
                                {t("application.table.date")}
                                {sortField === 'date' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                              </TableHead>
                              <TableHead>{t("application.table.documents")}</TableHead>
                              <TableHead>{t("application.table.actions")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getFilteredApplications().map((app) => (
                              <TableRow key={app.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">{app.id}</TableCell>
                                <TableCell>{app.program}</TableCell>
                                <TableCell>{app.university}</TableCell>
                                <TableCell>
                                  <Badge className={statusConfig[app.status].color + " flex w-fit items-center gap-1"}>
                                    {statusConfig[app.status].icon}
                                    {statusConfig[app.status].label}
                                  </Badge>
                                </TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    {app.documents.filter(d => d.status === 'required').length > 0 ? (
                                      <Badge variant="destructive" className="rounded-full px-2 py-0 text-xs">
                                        {app.documents.filter(d => d.status === 'required').length}
                                      </Badge>
                                    ) : null}
                                    {app.documents.filter(d => d.status === 'uploaded').length > 0 ? (
                                      <Badge variant="outline" className="rounded-full px-2 py-0 text-xs">
                                        {app.documents.filter(d => d.status === 'uploaded').length}
                                      </Badge>
                                    ) : null}
                                    {app.documents.filter(d => d.status === 'approved').length > 0 ? (
                                      <Badge variant="default" className="rounded-full px-2 py-0 text-xs">
                                        {app.documents.filter(d => d.status === 'approved').length}
                                      </Badge>
                                    ) : null}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Button size="icon" variant="ghost" onClick={() => handleViewDetails(app)}>
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">View Details</span>
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleMessageClick(app.id)}>
                                      <MessageSquare className="h-4 w-4" />
                                      <span className="sr-only">Messages</span>
                                      {app.messages > 0 && (
                                        <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center" variant="destructive">
                                          {app.messages}
                                        </Badge>
                                      )}
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => navigate(`/dashboard/applications/${app.id}`)}>
                                      <FileText className="h-4 w-4" />
                                      <span className="sr-only">View Application</span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 mx-auto mb-2 text-unlimited-gray" />
                        <p className="text-unlimited-gray mb-4">{t("application.noApplications.message")}</p>
                        <Button onClick={handleNewApplication} className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          {t("application.noApplications.apply")}
                        </Button>
                      </div>
                    )}
                    
                    {getFilteredApplications().length > 0 && (
                      <div className="mt-4 text-sm text-unlimited-gray text-center">
                        {t("application.table.showing", { count: getFilteredApplications().length, total: applications.length })}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("application.upload.title")}</DialogTitle>
            <DialogDescription>
              {t("application.upload.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document">{t("application.upload.documentLabel", { name: selectedDocument?.docName })}</Label>
              <Input
                id="document"
                type="file"
                ref={fileInputRef}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <p className="text-sm text-unlimited-gray">{t("application.upload.requirements")}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              {t("application.buttons.cancel")}
            </Button>
            <Button type="submit" onClick={() => {
              if (fileInputRef.current) {
                handleFileUpload(fileInputRef.current.files);
              }
            }}>
              <Upload className="mr-2 h-4 w-4" />
              {t("application.buttons.upload")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>{t("application.details.title", { id: selectedApplication.id })}</DialogTitle>
                <DialogDescription>
                  {t("application.details.subtitle", { program: selectedApplication.program, university: selectedApplication.university })}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t("application.details.applicationInfo")}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-unlimited-gray">{t("application.table.id")}:</div>
                      <div>{selectedApplication.id}</div>
                      <div className="text-unlimited-gray">{t("application.table.date")}:</div>
                      <div>{selectedApplication.date}</div>
                      <div className="text-unlimited-gray">{t("application.table.status")}:</div>
                      <div>
                        <Badge className={statusConfig[selectedApplication.status].color}>
                          {statusConfig[selectedApplication.status].label}
                        </Badge>
                      </div>
                      <div className="text-unlimited-gray">{t("application.details.pinCode")}:</div>
                      <div>{selectedApplication.pinCode || '-'}</div>
                      <div className="text-unlimited-gray">{t("application.details.academicYear")}:</div>
                      <div>{selectedApplication.academicYear || '2025-2026'}</div>
                      <div className="text-unlimited-gray">{t("application.details.semester")}:</div>
                      <div>{selectedApplication.semester || 'Fall'}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t("application.details.programInfo")}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-unlimited-gray">{t("application.table.program")}:</div>
                      <div>{selectedApplication.program}</div>
                      <div className="text-unlimited-gray">{t("application.table.university")}:</div>
                      <div>{selectedApplication.university}</div>
                      <div className="text-unlimited-gray">{t("application.details.scholarship")}:</div>
                      <div>{selectedApplication.scholarshipStatus || t("application.details.notApplied")}</div>
                      <div className="text-unlimited-gray">{t("application.details.assignedTo")}:</div>
                      <div>{selectedApplication.assignedTo || t("application.details.unassigned")}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t("application.details.requiredDocuments")}</h4>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("application.details.documentName")}</TableHead>
                          <TableHead>{t("application.details.status")}</TableHead>
                          <TableHead>{t("application.table.actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedApplication.documents.map((doc, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{doc.name}</TableCell>
                            <TableCell>
                              <Badge variant={
                                doc.status === 'required' ? 'destructive' : 
                                doc.status === 'uploaded' ? 'outline' : 
                                'default'
                              }>
                                {doc.status === 'required' 
                                  ? t("application.documents.required") 
                                  : doc.status === 'uploaded' 
                                    ? t("application.documents.uploaded") 
                                    : t("application.documents.approved")}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {doc.status === 'required' ? (
                                <Button size="sm" variant="outline" onClick={() => {
                                  setIsDetailsDialogOpen(false);
                                  setTimeout(() => {
                                    handleUploadDocument(selectedApplication.id, doc.name);
                                  }, 300);
                                }}>
                                  <Upload className="h-4 w-4 mr-1" />
                                  {t("application.buttons.upload")}
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(selectedApplication.id, doc.name)}>
                                  <Download className="h-4 w-4 mr-1" />
                                  {t("application.buttons.download")}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t("application.details.applicationTimeline")}</h4>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{t("application.timeline.submitted")}</div>
                        <div className="text-sm text-unlimited-gray">{selectedApplication.date}</div>
                      </div>
                    </div>
                    
                    {selectedApplication.status !== 'pending' && (
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t("application.timeline.review")}</div>
                          <div className="text-sm text-unlimited-gray">{t("application.timeline.reviewDesc")}</div>
                        </div>
                      </div>
                    )}
                    
                    {['conditional', 'approved', 'paid', 'registered'].includes(selectedApplication.status) && (
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t("application.timeline.approved")}</div>
                          <div className="text-sm text-unlimited-gray">{t("application.timeline.approvedDesc")}</div>
                        </div>
                      </div>
                    )}
                    
                    {['paid', 'registered'].includes(selectedApplication.status) && (
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t("application.timeline.paid")}</div>
                          <div className="text-sm text-unlimited-gray">{t("application.timeline.paidDesc")}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedApplication.status === 'registered' && (
                      <div className="flex items-start gap-3">
                        <div className="bg-teal-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t("application.timeline.registered")}</div>
                          <div className="text-sm text-unlimited-gray">{t("application.timeline.registeredDesc")}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedApplication.status === 'rejected' && (
                      <div className="flex items-start gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <X className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t("application.timeline.rejected")}</div>
                          <div className="text-sm text-unlimited-gray">{t("application.timeline.rejectedDesc")}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <div className="flex flex-wrap justify-end gap-2 w-full">
                  <Button variant="outline" onClick={() => handleMessageClick(selectedApplication.id)}>
                    <Mail className="mr-2 h-4 w-4" />
                    {t("application.buttons.contactAdvisor")}
                  </Button>
                  <Button onClick={() => navigate(`/dashboard/applications/${selectedApplication.id}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    {t("application.buttons.fullView")}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentApplications;
