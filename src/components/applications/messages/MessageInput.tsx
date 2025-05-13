
import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  PaperclipIcon, 
  Smile, 
  X, 
  Mic, 
  Image as ImageIcon, 
  FileText,
  Plus,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import VoiceRecorder from './VoiceRecorder';
import AttachmentPreview from './AttachmentPreview';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'other';
  fileName: string;
  fileSize: string;
  url: string;
  thumbnail?: string;
  file: File;
}

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: Attachment[]) => void;
  onTypingChange?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput = ({ 
  onSendMessage, 
  onTypingChange,
  placeholder = "اكتب رسالتك هنا...", 
  disabled = false 
}: MessageInputProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [expandAttachOptions, setExpandAttachOptions] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle text input changes
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Signal typing state
    if (onTypingChange) {
      onTypingChange(true);
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to indicate when user stops typing
      typingTimeoutRef.current = setTimeout(() => {
        if (onTypingChange) onTypingChange(false);
      }, 1000);
    }
  };

  // Add emoji to message
  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير جداً",
          description: "الحد الأقصى لحجم الملف هو 20 ميجابايت",
          variant: "destructive"
        });
        return;
      }
      
      const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const url = URL.createObjectURL(file);
      
      let type: Attachment['type'] = 'other';
      let thumbnail: string | undefined = undefined;
      
      if (file.type.startsWith('image/')) {
        type = 'image';
        thumbnail = url;
      } else if (file.type.startsWith('audio/')) {
        type = 'audio';
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      } else if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('sheet')) {
        type = 'document';
      }
      
      const fileSize = formatFileSize(file.size);
      
      setAttachments(prev => [
        ...prev,
        { id, type, fileName: file.name, fileSize, url, thumbnail, file }
      ]);
    });
    
    // Reset file input
    e.target.value = '';
  };

  // Format file size for display (e.g. 2.5 MB)
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  };

  // Remove attachment
  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const updated = prev.filter(attachment => attachment.id !== id);
      const removed = prev.find(attachment => attachment.id === id);
      
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      
      return updated;
    });
  };

  // Handle voice recording completion
  const handleVoiceRecordingComplete = (blob: Blob, audioUrl: string) => {
    const id = `audio-${Date.now()}`;
    const fileName = `تسجيل صوتي ${new Date().toLocaleTimeString()}.wav`;
    const fileSize = formatFileSize(blob.size);
    
    // Convert blob to File
    const audioFile = new File([blob], fileName, { type: 'audio/wav' });
    
    setAttachments(prev => [
      ...prev,
      { id, type: 'audio', fileName, fileSize, url: audioUrl, file: audioFile }
    ]);
    
    setShowVoiceRecorder(false);
  };

  // Send message function
  const sendMessage = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSendMessage(message, attachments.length > 0 ? attachments : undefined);
      setMessage('');
      
      // Cleanup attachment URLs
      attachments.forEach(attachment => {
        URL.revokeObjectURL(attachment.url);
      });
      
      setAttachments([]);
      setShowVoiceRecorder(false);
      
      // Reset typing state
      if (onTypingChange && typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        onTypingChange(false);
      }
    }
  };

  // Attach specific file types
  const handleAttachImage = () => {
    fileInputRef.current?.setAttribute('accept', 'image/*');
    fileInputRef.current?.click();
    setExpandAttachOptions(false);
  };

  const handleAttachDocument = () => {
    fileInputRef.current?.setAttribute('accept', '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt');
    fileInputRef.current?.click();
    setExpandAttachOptions(false);
  };

  const handleAttachAudio = () => {
    fileInputRef.current?.setAttribute('accept', 'audio/*');
    fileInputRef.current?.click();
    setExpandAttachOptions(false);
  };

  // Auto-resize the textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [message]);

  // Send message on Enter, but allow Shift+Enter for new lines
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        URL.revokeObjectURL(attachment.url);
      });
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [attachments]);

  return (
    <div className="border-t bg-white dark:bg-[#1e293b] p-3">
      {/* Attachments previews */}
      {attachments.length > 0 && (
        <div className="mb-3 space-y-2">
          {attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              type={attachment.type}
              fileName={attachment.fileName}
              fileSize={attachment.fileSize}
              url={attachment.url}
              thumbnail={attachment.thumbnail}
              removable
              onRemove={() => removeAttachment(attachment.id)}
            />
          ))}
        </div>
      )}
      
      {/* Voice recorder */}
      {showVoiceRecorder && (
        <div className="mb-3">
          <VoiceRecorder
            onRecordingComplete={handleVoiceRecordingComplete}
            onCancel={() => setShowVoiceRecorder(false)}
          />
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Message textarea */}
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-10 max-h-32 py-2 pl-10 resize-none overflow-y-auto"
            rows={1}
          />
          
          {/* Emoji picker */}
          <div className="absolute left-2 bottom-2">
            <DropdownMenu open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-2">
                <div className="grid grid-cols-7 gap-1">
                  {['😊', '😂', '❤️', '👍', '🙏', '🎉', '😍', '😎', '🤔', '😢', '😡', '🤯', '👏', '💯', '🔥', '✅', '⭐', '💪', '🤝', '🙌', '👌'
                  ].map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="hover:bg-unlimited-light-blue/10 rounded p-1 text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Attachment button */}
        <DropdownMenu open={expandAttachOptions} onOpenChange={setExpandAttachOptions}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              disabled={disabled}
              aria-label="إرفاق ملف"
            >
              {expandAttachOptions ? <ChevronUp className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-32">
            <DropdownMenuItem onClick={handleAttachImage} className="cursor-pointer">
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>صورة</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAttachDocument} className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>مستند</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAttachAudio} className="cursor-pointer">
              <PaperclipIcon className="mr-2 h-4 w-4" />
              <span>ملف آخر</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setShowVoiceRecorder(prev => !prev);
                setExpandAttachOptions(false);
              }} 
              className="cursor-pointer"
            >
              <Mic className="mr-2 h-4 w-4" />
              <span>تسجيل صوتي</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        
        {/* Send button */}
        <Button
          onClick={sendMessage}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
