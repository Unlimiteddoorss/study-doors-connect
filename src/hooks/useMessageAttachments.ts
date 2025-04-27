
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export interface Attachment {
  file: File;
  preview: string;
  type: string;
}

export const useMessageAttachments = (maxFiles: number = 5, maxSize: number = 5) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  const addAttachments = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: t("messages.attachments.error.tooLarge"),
          description: t("messages.attachments.error.maxSize", { size: maxSize }),
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    if (attachments.length + newFiles.length > maxFiles) {
      toast({
        title: t("messages.attachments.error.tooMany"),
        description: t("messages.attachments.error.maxFiles", { count: maxFiles }),
        variant: "destructive"
      });
      return;
    }

    const newAttachments = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].preview);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const clearAttachments = () => {
    attachments.forEach(attachment => {
      URL.revokeObjectURL(attachment.preview);
    });
    setAttachments([]);
  };

  return {
    attachments,
    addAttachments,
    removeAttachment,
    clearAttachments,
    hasAttachments: attachments.length > 0
  };
};
