
import { useState } from 'react';
import { File, Image, FileText, X, Download, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AudioPlayer } from '@/components/ui/audio-player';

interface AttachmentPreviewProps {
  type: 'image' | 'document' | 'audio' | 'video' | 'other';
  fileName: string;
  fileSize?: string;
  url: string;
  thumbnail?: string;
  className?: string;
  onRemove?: () => void;
  removable?: boolean;
}

const AttachmentPreview = ({
  type,
  fileName,
  fileSize,
  url,
  thumbnail,
  className,
  onRemove,
  removable = false,
}: AttachmentPreviewProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const getFileIcon = () => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-unlimited-blue" />;
      case 'document':
        return <FileText className="h-5 w-5 text-unlimited-blue" />;
      case 'audio':
        return <File className="h-5 w-5 text-unlimited-blue" />;
      case 'video':
        return <File className="h-5 w-5 text-unlimited-blue" />;
      default:
        return <File className="h-5 w-5 text-unlimited-blue" />;
    }
  };

  const renderPreviewContent = () => {
    switch (type) {
      case 'image':
        return (
          <img 
            src={url} 
            alt={fileName} 
            className="max-w-full max-h-[80vh] object-contain"
          />
        );
      case 'audio':
        return <AudioPlayer src={url} className="w-full max-w-xl" />;
      case 'video':
        return (
          <video 
            src={url} 
            controls 
            className="max-w-full max-h-[80vh]"
          >
            Your browser does not support the video tag.
          </video>
        );
      case 'document':
      case 'other':
      default:
        return (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <File className="h-16 w-16 text-unlimited-blue mb-4" />
            <h3 className="text-lg font-medium mb-2">{fileName}</h3>
            {fileSize && <p className="text-unlimited-gray text-sm mb-4">{fileSize}</p>}
            <div className="flex gap-2">
              <Button asChild>
                <a href={url} download={fileName}>
                  <Download className="h-4 w-4 mr-2" />
                  تحميل الملف
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  فتح في نافذة جديدة
                </a>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "relative border rounded-md overflow-hidden bg-muted/20",
      className
    )}>
      {/* Preview Thumbnail */}
      <div className="flex items-center p-2">
        {type === 'image' && thumbnail ? (
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer group">
                <img 
                  src={thumbnail || url} 
                  alt={fileName} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <Eye className="h-5 w-5 text-white" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 sm:p-6">
              {renderPreviewContent()}
            </DialogContent>
          </Dialog>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 bg-muted/50 rounded-md">
            {getFileIcon()}
          </div>
        )}
        
        <div className="flex-1 mx-3 truncate">
          <div className="font-medium truncate">{fileName}</div>
          {fileSize && <div className="text-unlimited-gray text-xs">{fileSize}</div>}
        </div>
        
        <div className="flex gap-1">
          {type !== 'image' && (
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-2 sm:p-6">
                {renderPreviewContent()}
              </DialogContent>
            </Dialog>
          )}
          
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href={url} download={fileName} title="تحميل">
              <Download className="h-4 w-4" />
            </a>
          </Button>
          
          {removable && onRemove && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-unlimited-gray hover:text-unlimited-danger"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Type-specific content */}
      {type === 'audio' && (
        <div className="px-2 pb-2">
          <AudioPlayer src={url} compact />
        </div>
      )}
    </div>
  );
};

export default AttachmentPreview;
