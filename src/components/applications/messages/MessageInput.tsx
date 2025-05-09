
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { sendMessage } from '@/services/messageService';
import { 
  PaperclipIcon, 
  X, 
  Send, 
  Image, 
  FileText, 
  Smile,
  Mic,
  MicOff, 
  MessageSquare
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface MessageInputProps {
  applicationId: string;
  onMessageSent: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ applicationId, onMessageSent }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const commonEmojis = ['😊', '👍', '❤️', '🎉', '👏', '🙏', '👋', '🤔', '😂', '✅', '🔥'];
  
  // Clean up recording timer when component unmounts
  useEffect(() => {
    return () => {
      if (recordingTimer) {
        clearInterval(recordingTimer);
      }
    };
  }, [recordingTimer]);
  
  const handleSendMessage = async () => {
    if ((!message.trim() && attachments.length === 0) || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would handle file uploads here
      // For simplicity, we'll just simulate it
      const attachmentData = attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // This is just for demo purposes
      }));
      
      // Send message to server (in this case, our mock service)
      await sendMessage(
        applicationId,
        'student-1', // Hardcoded for demo
        message,
        attachmentData
      );
      
      // Clear form and notify parent
      setMessage('');
      setAttachments([]);
      onMessageSent();
      
      // Show success toast
      toast({
        title: t('messages.sent', 'تم إرسال الرسالة'),
        description: t('messages.sentSuccess', 'تم إرسال رسالتك بنجاح'),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: t('messages.error', 'خطأ'),
        description: t('messages.sendError', 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleStartRecording = () => {
    // In a real application, this would activate the microphone and start recording
    setIsRecording(true);
    
    // Start a timer to track recording duration
    const timer = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
    
    setRecordingTimer(timer);
    
    toast({
      title: "بدء التسجيل",
      description: "جاري تسجيل الرسالة الصوتية...",
    });
  };
  
  const handleStopRecording = async () => {
    // In a real application, this would stop the recording and process the audio file
    if (recordingTimer) {
      clearInterval(recordingTimer);
    }
    
    setIsRecording(false);
    
    // Only save if recording lasted more than 1 second
    if (recordingDuration > 1) {
      try {
        setIsSubmitting(true);
        
        // Simulate sending a voice message
        await sendMessage(
          applicationId,
          'student-1',
          '',
          [],
          { duration: recordingDuration, url: '#' }
        );
        
        onMessageSent();
        
        toast({
          title: "تم التسجيل",
          description: `تم إرسال رسالة صوتية مدتها ${recordingDuration} ثانية`,
        });
      } catch (error) {
        console.error('Error sending voice message:', error);
        
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء إرسال الرسالة الصوتية",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "تم إلغاء التسجيل",
        description: "التسجيل قصير جداً، تم الإلغاء",
      });
    }
    
    setRecordingDuration(0);
  };
  
  const handleCancelRecording = () => {
    if (recordingTimer) {
      clearInterval(recordingTimer);
    }
    
    setIsRecording(false);
    setRecordingDuration(0);
    
    toast({
      title: "تم الإلغاء",
      description: "تم إلغاء التسجيل الصوتي",
    });
  };
  
  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      // Clear the input so the same file can be selected again
      e.target.value = '';
    }
  };
  
  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleAddEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    
    // Focus on textarea after adding emoji
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Automatically resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  }, [message]);
  
  return (
    <div className="w-full">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 max-h-24 overflow-y-auto p-2 bg-gray-50 rounded-md">
          {attachments.map((file, index) => (
            <div 
              key={index}
              className="bg-white border rounded-md px-2 py-1 flex items-center gap-2 text-sm shadow-sm"
            >
              {file.type.includes('image') ? (
                <Image className="h-4 w-4 text-unlimited-gray" />
              ) : (
                <FileText className="h-4 w-4 text-unlimited-gray" />
              )}
              <span className="truncate max-w-[100px]">{file.name}</span>
              <span className="text-xs text-unlimited-gray">
                {file.size < 1024 * 1024
                  ? `${Math.round(file.size / 1024)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 rounded-full"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Voice recording UI */}
      {isRecording ? (
        <div className="flex items-center gap-2 p-3 border rounded-lg bg-red-50 mb-2">
          <div className="animate-pulse">
            <Mic className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-700">
                جاري التسجيل...
              </span>
              <span className="text-sm text-red-700">
                {formatRecordingTime(recordingDuration)}
              </span>
            </div>
            <Progress 
              value={(recordingDuration % 5) * 20} 
              className="h-1 mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancelRecording}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleStopRecording}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          {/* Attachment options */}
          <div className="flex-shrink-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" type="button">
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex gap-2 p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Image className="h-4 w-4" />
                    صورة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="h-4 w-4" />
                    ملف
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
              className="hidden"
            />
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          {/* Voice recorder button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-shrink-0"
                  onClick={handleStartRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>تسجيل رسالة صوتية</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Message input */}
          <div className="flex-grow relative">
            <Textarea
              ref={textareaRef}
              placeholder={t('messages.typePlaceholder', 'اكتب رسالتك هنا...')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              className="resize-none min-h-[60px] pr-8"
              rows={1}
            />
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 bottom-2 h-6 w-6 p-0 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-4 w-4 text-unlimited-gray" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="end">
                <div className="grid grid-cols-6 gap-1">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      className="p-1.5 text-lg hover:bg-gray-100 rounded"
                      onClick={() => handleAddEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Send button */}
          <Button
            type="button"
            disabled={(!message.trim() && attachments.length === 0) || isSubmitting}
            onClick={handleSendMessage}
            className="flex-shrink-0"
          >
            {isSubmitting ? (
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
            ) : (
              <Send className="h-4 w-4 ml-1" />
            )}
            {t('messages.send', 'إرسال')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
