import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ExternalLink, MessageSquare, FileText } from "lucide-react";

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
  handleDeleteApplication: (id: string) => void;
  handleUpdateStatus: (id: string, status: string) => void;
}

export const ApplicationsTable = ({ 
  applications,
  handleViewApplication,
  handleDeleteApplication,
  handleUpdateStatus 
}: ApplicationsTableProps) => {
  const { t } = useTranslation();
  
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
              <TableCell>{app.status}</TableCell>
              <TableCell className="hidden md:table-cell">{app.date}</TableCell>
              <TableCell>Documents</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleViewApplication(app)}>
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleMessageClick(String(app.id))}>
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Messages</span>
                    {app.messages > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center" variant="destructive">
                        {app.messages}
                      </Badge>
                    )}
                  </Button>
                  <Button size="icon" variant="ghost">
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
  );
};

const handleMessageClick = (applicationId: string) => {
  alert(`Open messages for application ${applicationId}`);
};
