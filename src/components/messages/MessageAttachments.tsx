
import { X, FileIcon, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFileIcon, getFileTypeLabel } from '@/utils/messageUtils';
import type { Attachment } from '@/hooks/useMessageAttachments';

interface MessageAttachmentsProps {
  attachments: Attachment[];
  onRemove: (index: number) => void;
  readOnly?: boolean;
}

const MessageAttachments = ({ attachments, onRemove, readOnly = false }: MessageAttachmentsProps) => {
  return (
    <ScrollArea className="w-full border rounded-md p-2">
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className="relative group flex items-center border rounded-md p-2 bg-gray-50"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                {attachment.type.startsWith('image/') ? (
                  <img
                    src={attachment.preview}
                    alt={attachment.file.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-2xl">{getFileIcon(attachment.type)}</span>
                )}
              </div>
              
              <div className="min-w-0">
                <p className="text-sm font-medium truncate max-w-[150px]" title={attachment.file.name}>
                  {attachment.file.name}
                </p>
                <p className="text-xs text-unlimited-gray">
                  {getFileTypeLabel(attachment.type)}
                </p>
              </div>
            </div>

            {!readOnly && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageAttachments;
