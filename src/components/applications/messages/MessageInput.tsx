
import { useState, FormEvent, useRef } from 'react';
import { Send, Paperclip, X, Image, File, AlertCircle, Smile, Maximize2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { createMessage } from '@/services/messageService';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MessageInputProps {
  applicationId: string;
  onMessageSent: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'text/plain'
];

const fileTypeIcons: Record<string, JSX.Element> = {
  'application/pdf': <File className="h-4 w-4 text-red-500" />,
  'image/jpeg': <Image className="h-4 w-4 text-blue-500" />,
  'image/png': <Image className="h-4 w-4 text-blue-500" />,
  'image/jpg': <Image className="h-4 w-4 text-blue-500" />,
  'application/msword': <File className="h-4 w-4 text-blue-800" />,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <File className="h-4 w-4 text-blue-800" />,
  'application/vnd.ms-excel': <File className="h-4 w-4 text-green-700" />,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <File className="h-4 w-4 text-green-700" />,
  'application/zip': <File className="h-4 w-4 text-orange-500" />,
  'text/plain': <File className="h-4 w-4 text-gray-500" />
};

const MessageInput = ({ applicationId, onMessageSent }: MessageInputProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [expandedInput, setExpandedInput] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && attachments.length === 0) return;
    
    setIsLoading(true);
    
    try {
      // 模拟上传进度
      if (attachments.length > 0) {
        setIsUploading(true);
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 5;
          const newProgress: {[key: string]: number} = {};
          attachments.forEach(file => {
            newProgress[file.name] = progress > 100 ? 100 : progress;
          });
          setUploadProgress(newProgress);
          
          if (progress >= 100) {
            clearInterval(progressInterval);
            setIsUploading(false);
          }
        }, 150);
      }
      
      // في تطبيق حقيقي، ستحصل على هوية المستخدم ودوره من سياق المصادقة
      const userId = 'student-1';
      const userRole = 'student';
      
      // إنشاء كائن رسالة
      const newMessage = {
        id: uuidv4(),
        application_id: applicationId,
        sender_id: userId,
        sender_role: userRole,
        content: message.trim(),
        attachments: attachments.length > 0 ? attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })) : null,
        created_at: new Date().toISOString(),
        is_read: false
      };
      
      // إرسال الرسالة إلى الخادم
      await createMessage(newMessage);
      
      // إعادة تعيين النموذج
      setMessage('');
      setAttachments([]);
      setUploadProgress({});
      setExpandedInput(false);
      
      // إشعار المكون الأب
      onMessageSent();
      
      toast({
        title: t('messages.sent', 'تم إرسال الرسالة'),
        description: t('messages.sentDescription', 'تم إرسال رسالتك بنجاح'),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('messages.error', 'خطأ في الإرسال'),
        description: t('messages.errorDescription', 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // التحقق من حجم الملف ونوعه
      const validFiles: File[] = [];
      const invalidFiles: {name: string, reason: string}[] = [];
      
      fileArray.forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
          invalidFiles.push({
            name: file.name,
            reason: 'حجم الملف كبير جداً (الحد الأقصى: 10 ميجابايت)'
          });
        } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          invalidFiles.push({
            name: file.name,
            reason: 'نوع الملف غير مدعوم'
          });
        } else {
          validFiles.push(file);
        }
      });
      
      if (invalidFiles.length > 0) {
        toast({
          title: 'خطأ في تحميل الملفات',
          description: (
            <div className="space-y-2">
              {invalidFiles.map((file, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{file.name}</strong>: {file.reason}
                  </span>
                </div>
              ))}
            </div>
          ),
          variant: 'destructive'
        });
      }
      
      setAttachments(prev => [...prev, ...validFiles]);
    }
    
    // إعادة تعيين قيمة عنصر إدخال الملف للسماح بتحديد نفس الملف مرة أخرى
    if (e.target.files) {
      e.target.value = '';
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleExpandInput = () => {
    setExpandedInput(!expandedInput);
    
    // التركيز على مربع النص عند التوسيع
    if (!expandedInput) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const openFileInput = (type: 'file' | 'image') => {
    if (type === 'file' && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === 'image' && imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const previewAttachment = (file: File) => {
    setPreviewFile(file);
    setShowFilePreview(true);
  };

  // قائمة الرموز التعبيرية المستخدمة بشكل شائع
  const commonEmojis = ['😊', '👍', '🙏', '❤️', '👏', '🎉', '🤔', '😂', '🚀', '📝', '📑', '👨‍🎓', '🏫', '📚'];

  // تحويل حجم الملف إلى صيغة مقروءة
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`border-t pt-4 transition-all duration-300 ${expandedInput ? 'pb-4' : ''}`}>
        {attachments.length > 0 && (
          <div className="mb-3">
            <div className="text-sm font-medium mb-2 flex justify-between items-center">
              <div className="flex items-center">
                <Paperclip className="h-4 w-4 ml-1" />
                المرفقات
                <Badge variant="outline" className="mr-2">
                  {attachments.length}
                </Badge>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setAttachments([])}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-auto py-1"
              >
                <Trash2 className="h-4 w-4 ml-1" />
                حذف الكل
              </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
              {attachments.map((file, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border hover:bg-gray-100 cursor-pointer"
                  onClick={() => previewAttachment(file)}
                >
                  <div className="flex items-center overflow-hidden">
                    <div className="bg-white p-1.5 rounded ml-2 shadow-sm">
                      {fileTypeIcons[file.type] || <File className="h-4 w-4 text-unlimited-gray" />}
                    </div>
                    <div className="overflow-hidden">
                      <div className="truncate max-w-[200px] text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-unlimited-gray">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {isUploading && uploadProgress[file.name] && uploadProgress[file.name] < 100 ? (
                      <div className="w-20 ml-2">
                        <Progress value={uploadProgress[file.name]} className="h-1.5" />
                      </div>
                    ) : null}
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAttachment(index);
                      }}
                      className="text-gray-500 hover:text-red-500 p-1.5"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className={`transition-all duration-300 ${expandedInput ? 'h-40' : 'h-auto'}`}>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messages.placeholder', 'اكتب رسالتك هنا...')}
            className={`resize-none mb-2 transition-all duration-300 ${expandedInput ? 'h-full' : 'h-[80px]'}`}
            rows={expandedInput ? 6 : 3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !expandedInput) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <input
              type="file"
              id="image-upload"
              ref={imageInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Paperclip className="h-5 w-5 text-unlimited-gray" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full justify-start text-sm h-auto py-2"
                    onClick={() => openFileInput('file')}
                  >
                    <File className="h-4 w-4 ml-2" />
                    إرفاق ملف
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full justify-start text-sm h-auto py-2"
                    onClick={() => openFileInput('image')}
                  >
                    <Image className="h-4 w-4 ml-2" />
                    إرفاق صورة
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Smile className="h-5 w-5 text-unlimited-gray" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="grid grid-cols-7 gap-2">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className="text-xl hover:bg-gray-100 p-1 rounded"
                      onClick={() => addEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-full"
                    onClick={toggleExpandInput}
                  >
                    <Maximize2 className="h-5 w-5 text-unlimited-gray" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{expandedInput ? 'تصغير' : 'توسيع'} مربع النص</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || (!message.trim() && attachments.length === 0)}
            className="gap-1.5 px-4"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {t('messages.send', 'إرسال')}
          </Button>
        </div>
      </form>
      
      <Dialog open={showFilePreview} onOpenChange={setShowFilePreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>معاينة الملف</DialogTitle>
          </DialogHeader>
          
          {previewFile && (
            <div className="p-4">
              {previewFile.type.startsWith('image/') ? (
                <div>
                  <img 
                    src={URL.createObjectURL(previewFile)} 
                    alt={previewFile.name} 
                    className="max-h-[400px] w-auto mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center p-8 border rounded-lg">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    {fileTypeIcons[previewFile.type] || <File className="h-8 w-8 text-unlimited-gray" />}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{previewFile.name}</h3>
                  <p className="text-unlimited-gray">{formatFileSize(previewFile.size)}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilePreview(false)}>
              إغلاق
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (previewFile) {
                  const index = attachments.findIndex(a => a.name === previewFile.name);
                  if (index !== -1) {
                    removeAttachment(index);
                  }
                }
                setShowFilePreview(false);
              }}
            >
              <Trash2 className="h-4 w-4 ml-1" />
              حذف الملف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageInput;
