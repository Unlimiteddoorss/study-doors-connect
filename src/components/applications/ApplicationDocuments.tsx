
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DocumentUpload, { DocumentType } from './DocumentUpload';
import { applicationDocumentTypes } from '@/data/documentTypes';
import { useToast } from '@/hooks/use-toast';

// For demo purposes only - in a real app this would come from an API
const generateDemoFiles = (applicationId: number) => {
  // If application ID is odd, return some demo files
  if (applicationId % 2 === 1) {
    return applicationDocumentTypes.map(doc => ({
      ...doc,
      files: doc.id === 'passport' || doc.id === 'photo' ? [
        {
          id: `${doc.id}-1`,
          name: `${doc.name} Document`,
          nameAr: `مستند ${doc.nameAr}`,
          type: doc.id === 'passport' ? 'application/pdf' : 'image/jpeg',
          size: 1024 * 1024, // 1MB
          url: '/placeholder.svg',
          status: doc.id === 'passport' ? 'verified' : 'uploaded',
          lastModified: new Date().toISOString()
        }
      ] : []
    }));
  }
  return applicationDocumentTypes;
};

interface ApplicationDocumentsProps {
  programName: string;
  universityName: string;
  applicationId: number;
  readOnly?: boolean;
}

const ApplicationDocuments = ({
  programName,
  universityName,
  applicationId,
  readOnly = false
}: ApplicationDocumentsProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        // In a real app, this would be an API call
        setIsLoading(true);
        setTimeout(() => {
          const demoDocuments = generateDemoFiles(applicationId);
          setDocuments(demoDocuments);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading documents:', error);
        toast({
          title: t('documents.error'),
          description: t('documents.loadError'),
          variant: 'destructive'
        });
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, [applicationId, toast, t]);

  const handleDocumentUpload = async (documentTypeId: string, file: File) => {
    try {
      // Create a new file entry
      const fileId = `${Date.now()}-${file.name}`;
      const newFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: 'uploading' as const,
        uploadProgress: 0,
        lastModified: new Date().toISOString()
      };

      // Add the file to the correct document type
      setDocuments(prevDocuments => prevDocuments.map(doc => {
        if (doc.id === documentTypeId) {
          return {
            ...doc,
            files: [...doc.files, newFile]
          };
        }
        return doc;
      }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Update file status to uploaded when complete
          setTimeout(() => {
            setDocuments(prevDocuments => prevDocuments.map(doc => {
              if (doc.id === documentTypeId) {
                return {
                  ...doc,
                  files: doc.files.map(f => 
                    f.id === fileId ? { ...f, status: 'uploaded', uploadProgress: 100 } : f
                  )
                };
              }
              return doc;
            }));
          }, 500);
        } else {
          // Update progress
          setDocuments(prevDocuments => prevDocuments.map(doc => {
            if (doc.id === documentTypeId) {
              return {
                ...doc,
                files: doc.files.map(f => 
                  f.id === fileId ? { ...f, uploadProgress: progress } : f
                )
              };
            }
            return doc;
          }));
        }
      }, 300);

      return Promise.resolve();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: t('documents.error'),
        description: t('documents.uploadError'),
        variant: 'destructive'
      });
      return Promise.reject(error);
    }
  };

  const handleDocumentDelete = (documentTypeId: string, fileId: string) => {
    setDocuments(prevDocuments => prevDocuments.map(doc => {
      if (doc.id === documentTypeId) {
        return {
          ...doc,
          files: doc.files.filter(file => file.id !== fileId)
        };
      }
      return doc;
    }));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-unlimited-blue mb-4">
          {t('documents.applicationDocuments')}
        </h2>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-medium">{programName}</h3>
              <p className="text-sm text-unlimited-gray">{universityName}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-unlimited-gray">
                <span className="font-medium">{t('documents.applicationId')}:</span> #{applicationId}
              </p>
            </div>
          </div>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('documents.importantNote')}</AlertTitle>
          <AlertDescription>
            {readOnly ? 
              t('documents.cannotModifyNote') : 
              t('documents.documentRequirementsNote')}
          </AlertDescription>
        </Alert>

        <DocumentUpload 
          documents={documents}
          onDocumentUpload={handleDocumentUpload}
          onDocumentDelete={handleDocumentDelete}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default ApplicationDocuments;
