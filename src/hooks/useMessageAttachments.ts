
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { formatFileSize } from '@/utils/messageUtils';

export interface Attachment {
  file: File;
  preview: string;
  type: string;
}

export const useMessageAttachments = (maxFiles: number = 5, maxSize: number = 5) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  const validateFile = (file: File): boolean => {
    // التحقق من حجم الملف
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: t("messages.attachments.error.tooLarge"),
        description: `${file.name} (${formatFileSize(file.size)}) ${t("messages.attachments.error.maxSize", { size: maxSize })}`,
        variant: "destructive"
      });
      return false;
    }

    // التحقق من نوع الملف
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t("messages.attachments.error.invalidType"),
        description: `${file.name} ${t("messages.attachments.error.allowedTypes")}`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const addAttachments = (files: FileList | null) => {
    if (!files) return;

    // التحقق من الحد الأقصى لعدد الملفات
    if (attachments.length + files.length > maxFiles) {
      toast({
        title: t("messages.attachments.error.tooMany"),
        description: t("messages.attachments.error.maxFiles", { count: maxFiles }),
        variant: "destructive"
      });
      return;
    }

    const newAttachments = Array.from(files)
      .filter(validateFile)
      .map(file => ({
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
    hasAttachments: attachments.length > 0,
    isFull: attachments.length >= maxFiles
  };
};
