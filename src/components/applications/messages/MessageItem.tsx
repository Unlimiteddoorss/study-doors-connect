
import { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  Download, 
  FileText, 
  Image, 
  CheckCircle, 
  Play, 
  Pause, 
  SmilePlus 
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { addReaction, getCommonReactions } from '@/services/messageService';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageItemProps {
  message: {
    id: string;
    sender_id: string;
    sender_role: string;
    content: string;
    attachments?: {
      name: string;
      size: number;
      type: string;
      url?: string;
    }[];
    voice_message?: {
      duration: number;
      url: string;
    };
    reactions?: {
      emoji: string;
      user_id: string;
      username: string;
    }[];
    created_at: string;
    is_read: boolean;
  };
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const getSenderName = (role: string) => {
    switch (role) {
      case 'student':
        return 'أنت';
      case 'advisor':
        return 'المستشار التعليمي';
      case 'university':
        return 'ممثل الجامعة';
      default:
        return role;
    }
  };
  
  const getSenderInitial = (role: string) => {
    switch (role) {
      case 'student':
        return 'أ';
      case 'advisor':
        return 'م';
      case 'university':
        return 'ج';
      default:
        return 'X';
    }
  };
  
  const getAvatarColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-unlimited-blue text-white';
      case 'advisor':
        return 'bg-green-500 text-white';
      case 'university':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };
  
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  const formatVoiceDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handlePlayVoice = () => {
    // In a real app, this would play the voice message
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate voice message playing with progress updates
      let currentProgress = 0;
      const totalDuration = message.voice_message?.duration || 30;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress((currentProgress / totalDuration) * 100);
        
        if (currentProgress >= totalDuration) {
          clearInterval(interval);
          setIsPlaying(false);
          setProgress(0);
        }
      }, 1000);
    } else {
      // Pause logic would go here
      setProgress(0);
    }
  };
  
  const handleAddReaction = async (emoji: string) => {
    try {
      await addReaction(
        message.id,
        'student-1', // Current user ID
        emoji,
        'أنت' // Current username
      );
      
      toast({
        title: "تمت إضافة رد",
        description: `تم إضافة الرد بنجاح`,
      });
    } catch (error) {
      console.error('Error adding reaction:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الرد",
        variant: "destructive"
      });
    }
  };
  
  const commonReactions = getCommonReactions();
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[85%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isCurrentUser && (
          <Avatar className="w-10 h-10">
            <AvatarFallback className={`text-base ${getAvatarColor(message.sender_role)}`}>
              {getSenderInitial(message.sender_role)}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          {!isCurrentUser && (
            <div className="mb-1 text-sm text-unlimited-gray">
              {getSenderName(message.sender_role)}
            </div>
          )}
          
          {/* Message content */}
          <div className={`rounded-lg p-3 shadow-sm ${
            isCurrentUser 
              ? 'bg-unlimited-blue text-white rounded-tr-none' 
              : 'bg-white border rounded-tl-none'
          }`}>
            {message.content && (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
            
            {/* Voice message */}
            {message.voice_message && (
              <div className={`mt-2 p-2 rounded-lg flex items-center gap-2 ${
                isCurrentUser ? 'bg-unlimited-dark-blue' : 'bg-gray-100'
              }`}>
                <Button 
                  size="sm" 
                  variant={isCurrentUser ? "secondary" : "outline"} 
                  className="h-8 w-8 rounded-full p-0 flex-shrink-0"
                  onClick={handlePlayVoice}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="w-full flex-grow">
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        isCurrentUser ? 'bg-white' : 'bg-unlimited-blue'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-gray-200' : 'text-gray-500'
                  }`}>
                    {formatVoiceDuration(message.voice_message.duration)}
                  </div>
                </div>
              </div>
            )}
            
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-md flex items-center gap-2 ${
                      isCurrentUser ? 'bg-unlimited-dark-blue' : 'bg-gray-100'
                    }`}
                  >
                    {attachment.type.includes('image') ? (
                      <div className="relative">
                        <Image className="h-4 w-4 absolute top-1 left-1 z-10 bg-white rounded-full p-0.5" />
                        <div className="h-10 w-10 rounded bg-gray-200 overflow-hidden">
                          {attachment.url && (
                            <img 
                              src={attachment.url} 
                              alt={attachment.name} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={`p-2 rounded-md ${
                        isCurrentUser ? 'bg-white/20' : 'bg-unlimited-blue/10'
                      }`}>
                        <FileText className={`h-5 w-5 ${
                          isCurrentUser ? 'text-white' : 'text-unlimited-blue'
                        }`} />
                      </div>
                    )}
                    
                    <div className="flex-grow overflow-hidden">
                      <div className="truncate font-medium text-sm">
                        {attachment.name}
                      </div>
                      <div className={`text-xs ${
                        isCurrentUser ? 'text-gray-200' : 'text-gray-500'
                      }`}>
                        {formatFileSize(attachment.size)}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant={isCurrentUser ? "secondary" : "outline"}
                      className="flex-shrink-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className={`mt-1 flex gap-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {message.reactions.map((reaction, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 rounded-full px-2 py-0.5 flex items-center gap-1 text-sm border shadow-sm"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-xs text-gray-600">{reaction.username}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Message info */}
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs text-unlimited-gray ${isCurrentUser ? 'order-1' : 'order-2'}`}>
              {format(new Date(message.created_at), 'HH:mm', { locale: ar })}
            </span>
            
            <div className={`${isCurrentUser ? 'order-2' : 'order-1'} flex items-center gap-1`}>
              {message.is_read && isCurrentUser && (
                <CheckCircle className="h-3 w-3 text-unlimited-blue" />
              )}
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full"
                  >
                    <SmilePlus className="h-4 w-4 text-unlimited-gray" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align={isCurrentUser ? "end" : "start"}>
                  <div className="flex gap-1">
                    {commonReactions.map((emoji) => (
                      <button
                        key={emoji}
                        className="p-1.5 text-lg hover:bg-gray-100 rounded-full"
                        onClick={() => handleAddReaction(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
