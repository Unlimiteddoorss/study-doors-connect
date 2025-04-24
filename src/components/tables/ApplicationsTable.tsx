
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ExternalLink, MessageSquare, FileText, Eye, Clock, Download, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Application {
  id: number | string;
  program: string;
  programId?: number;
  university: string;
  status: string;
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

interface ApplicationsTableProps {
  applications: Application[];
  handleViewApplication: (application: Application) => void;
  handleDeleteApplication?: (id: string | number) => void;
  handleUpdateStatus?: (id: string | number, status: string) => void;
}

export const ApplicationsTable = ({ 
  applications,
  handleViewApplication,
  handleDeleteApplication,
  handleUpdateStatus 
}: ApplicationsTableProps) => {
  const { t, i18n } = useTranslation();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">{t("application.status.approved")}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">{t("application.status.rejected")}</Badge>;
      case 'review':
        return <Badge className="bg-amber-500">{t("application.status.review")}</Badge>;
      case 'documents':
        return <Badge className="bg-blue-500">{t("application.status.documents")}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">{t("application.status.pending")}</Badge>;
      case 'conditional':
        return <Badge className="bg-purple-500">{t("application.status.conditional")}</Badge>;
      case 'paid':
        return <Badge className="bg-emerald-500">{t("application.status.paid")}</Badge>;
      case 'registered':
        return <Badge className="bg-indigo-500">{t("application.status.registered")}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const handleMessageClick = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleDocumentClick = (application: Application) => {
    setSelectedApplication(application);
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("application.table.id")}</TableHead>
            <TableHead>{t("application.table.program")}</TableHead>
            <TableHead className="hidden md:table-cell">{t("application.table.university")}</TableHead>
            <TableHead>{t("application.table.status")}</TableHead>
            <TableHead className="hidden md:table-cell">{t("application.table.date")}</TableHead>
            <TableHead>{t("application.table.documents")}</TableHead>
            <TableHead>{t("application.table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{app.id}</TableCell>
              <TableCell>{app.program}</TableCell>
              <TableCell className="hidden md:table-cell">{app.university}</TableCell>
              <TableCell>{getStatusBadge(app.status)}</TableCell>
              <TableCell className="hidden md:table-cell">{app.date}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDocumentClick(app)}
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{app.documents?.filter(doc => doc.status === 'uploaded').length || 0}/{app.documents?.length || 0}</span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("application.documents.viewUpload")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleViewApplication(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("application.actions.viewDetails")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleMessageClick(app)}>
                          <div className="relative">
                            <MessageSquare className="h-4 w-4" />
                            {app.messages > 0 && (
                              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center" variant="destructive">
                                {app.messages}
                              </Badge>
                            )}
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("application.actions.messages")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleDocumentClick(app)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("application.actions.documents")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-unlimited-gray mb-2" />
                  <p className="text-unlimited-gray">{t("application.noApplications.message")}</p>
                  <Button variant="outline" className="mt-4">
                    {t("application.noApplications.apply")}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Messages Dialog */}
      <Dialog 
        open={selectedApplication !== null && window.location.hash === '#messages'} 
        onOpenChange={() => {
          setSelectedApplication(null);
          window.history.pushState("", document.title, window.location.pathname);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("application.messages.title")}</DialogTitle>
            <DialogDescription>
              {t("application.messages.subtitle", { program: selectedApplication?.program, university: selectedApplication?.university })}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 h-96 overflow-auto border rounded-md p-4 bg-gray-50">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className={`max-w-[80%] bg-unlimited-blue text-white p-3 rounded-lg ${i18n.language === 'ar' ? 'self-start' : 'self-end'}`}>
                  <p>{t("application.messages.sampleMessage1")}</p>
                  <div className="text-xs text-unlimited-light mt-1">{t("application.messages.sampleTime1")}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`max-w-[80%] bg-white p-3 rounded-lg shadow-sm ${i18n.language === 'ar' ? 'self-end' : 'self-start'}`}>
                  <p>{t("application.messages.sampleMessage2")}</p>
                  <div className="text-xs text-unlimited-gray mt-1">{t("application.messages.sampleTime2")}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`max-w-[80%] bg-unlimited-blue text-white p-3 rounded-lg ${i18n.language === 'ar' ? 'self-start' : 'self-end'}`}>
                  <p>{t("application.messages.sampleMessage3")}</p>
                  <div className="text-xs text-unlimited-light mt-1">{t("application.messages.sampleTime3")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <input 
              type="text" 
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue focus:border-transparent" 
              placeholder={t("application.messages.inputPlaceholder")}
            />
            <Button>{t("application.messages.send")}</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Documents Dialog */}
      <Dialog 
        open={selectedApplication !== null && window.location.hash === '#documents'} 
        onOpenChange={() => {
          setSelectedApplication(null);
          window.history.pushState("", document.title, window.location.pathname);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("application.documents.title")}</DialogTitle>
            <DialogDescription>
              {t("application.documents.subtitle", { program: selectedApplication?.program, university: selectedApplication?.university })}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedApplication?.documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-unlimited-gray" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-unlimited-gray">
                      {doc.status === 'uploaded' && t("application.documents.statusUploaded")}
                      {doc.status === 'required' && t("application.documents.statusRequired")}
                      {doc.status === 'approved' && t("application.documents.statusApproved")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {doc.status === 'uploaded' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      {t("application.documents.download")}
                    </Button>
                  )}
                  {doc.status === 'required' && (
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      {t("application.documents.upload")}
                    </Button>
                  )}
                  {doc.status === 'approved' && (
                    <Badge className="bg-green-500">
                      {t("application.documents.approved")}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {(!selectedApplication?.documents || selectedApplication.documents.length === 0) && (
              <div className="text-center p-6">
                <FileText className="h-12 w-12 mx-auto text-unlimited-gray mb-2" />
                <p>{t("application.documents.noDocuments")}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsTable;
