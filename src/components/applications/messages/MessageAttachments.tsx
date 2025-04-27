
import { FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Attachment } from '@/hooks/useMessageAttachments';

interface MessageAttachmentsProps {
  attachments: Attachment[];
  onRemove: (index: number) => void;
  isPreview?: boolean;
}

const MessageAttachments = ({ attachments, onRemove, isPreview = false }: MessageAttachmentsProps) => {
  const getFileIcon = (type: string) => {
    // Return the appropriate icon based on file type
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    return '📎';
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {attachments.map((attachment, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 px-2 py-1 rounded-md ${
            isPreview ? 'bg-gray-100' : 'bg-blue-50'
          }`}
        >
          <span>{getFileIcon(attachment.type)}</span>
          <span className="text-sm truncate max-w-[120px]">
            {attachment.file.name}
          </span>
          {!isPreview && (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove attachment</span>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageAttachments;
