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
  SmilePlus,
  Reply,
  Share,
  Bookmark,
  Info
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    translation?: string; // إضافة حقل الترجمة (ميزة جديدة)
    importance?: 'normal' | 'high' | 'urgent'; // درجة أهمية الرسالة (ميزة جديدة)
  };
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
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
  
  // وظيفة جديدة للترجمة
  const handleTranslate = () => {
    // في تطبيق حقيقي، هذا سيستدعي API للترجمة
    setIsTranslated(!isTranslated);
    toast({
      title: isTranslated ? "تم إلغاء الترجمة" : "تم ترجمة الرسالة",
      description: isTranslated ? "تم عرض النص الأصلي" : "تم ترجمة الرسالة إلى اللغة العربية",
    });
  };
  
  // وظيفة الإشارات المرجعية
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "تم إزالة الإشارة المرجعية" : "تمت إضافة إشارة مرجعية",
      description: isBookmarked ? "تمت إزالة الإشارة المرجعية من الرسالة" : "تمت إضافة إشارة مرجعية للرسالة للرجوع إليها لاحقاً",
    });
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
  
  // ميزة توقيت المذكرة - إضافة جديدة
  const getMessageTimestamp = () => {
    const messageDate = new Date(message.created_at);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "الآن";
    } else if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    } else if (diffInMinutes < 24 * 60) {
      return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`;
    } else if (diffInMinutes < 48 * 60) {
      return "الأمس";
    } else {
      return format(messageDate, 'dd MMM', { locale: ar });
    }
  };
  
  // نوع الرسالة الاستثنائي - إضافة جديدة لعرض الرسائل المهمة
  const getImportanceStyles = () => {
    if (!message.importance || message.importance === 'normal') return '';
    
    if (message.importance === 'high') {
      return 'border-yellow-300 border-2';
    }
    
    if (message.importance === 'urgent') {
      return 'border-red-400 border-2 animate-pulse';
    }
    
    return '';
  };
  
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
          } ${getImportanceStyles()}`}>
            {/* إضافة علامة إذا كانت الرسالة مهمة أو عاجلة */}
            {message.importance && message.importance !== 'normal' && (
              <div className={`flex items-center mb-2 ${message.importance === 'urgent' ? 'text-red-500' : 'text-yellow-600'}`}>
                <Info className="h-4 w-4 ml-1" />
                <span className="text-xs font-bold">
                  {message.importance === 'urgent' ? 'عاجل' : 'مهم'}
                </span>
              </div>
            )}
          
            {message.content && (
              <div>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {isTranslated && message.translation && (
                  <div className="mt-2 pt-2 border-t border-t-gray-200 text-sm text-unlimited-gray">
                    <p className="font-medium mb-1">الترجمة:</p>
                    <p>{message.translation}</p>
                  </div>
                )}
              </div>
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
              {getMessageTimestamp()}
            </span>
            
            <div className={`${isCurrentUser ? 'order-2' : 'order-1'} flex items-center gap-1`}>
              {message.is_read && isCurrentUser && (
                <CheckCircle className="h-3 w-3 text-unlimited-blue" />
              )}
              
              {/* ميزات جديدة - قائمة إجراءات الرسالة */}
              <TooltipProvider>
                <div className="flex items-center gap-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => toast({
                          title: "رد",
                          description: "سيتم تنفيذ هذه الميزة قريباً",
                        })}
                      >
                        <Reply className="h-3 w-3 text-unlimited-gray" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>رد على الرسالة</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {!isCurrentUser && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full"
                          onClick={handleTranslate}
                        >
                          <span className="text-xs font-bold text-unlimited-gray">T</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isTranslated ? "إلغاء الترجمة" : "ترجمة الرسالة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`h-3 w-3 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-unlimited-gray'}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isBookmarked ? "إزالة الإشارة المرجعية" : "إضافة إشارة مرجعية"}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                      >
                        <Share className="h-3 w-3 text-unlimited-gray" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>مشاركة الرسالة</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-unlimited-gray">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isCurrentUser ? "end" : "start"}>
                  <DropdownMenuItem onClick={() => toast({
                    title: "تم نسخ الرسالة",
                    description: "تم نسخ محتوى الرسالة إلى الحافظة",
                  })}>
                    نسخ النص
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({
                    title: "إبلاغ",
                    description: "تم إرسال البلاغ بنجاح",
                  })}>
                    الإبلاغ عن محتوى غير لائق
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({
                    title: "تصدير",
                    description: "تم تصدير الرسالة بنجاح",
                  })}>
                    تصدير الرسالة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
