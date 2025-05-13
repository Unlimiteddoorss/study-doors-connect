
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Reply, Download } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import MessageReactions from './MessageReactions';
import AttachmentPreview from './AttachmentPreview';
import { AudioPlayer } from '@/components/ui/audio-player';

interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'other';
  fileName: string;
  fileSize?: string;
  url: string;
  thumbnail?: string;
}

export interface MessageBubbleProps {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  content: string;
  timestamp: string;
  isUser: boolean;
  isRead?: boolean;
  attachments?: MessageAttachment[];
  onReply?: (id: string) => void;
  className?: string;
}

const MessageBubble = ({
  id,
  sender,
  content,
  timestamp,
  isUser,
  isRead = false,
  attachments = [],
  onReply,
  className,
}: MessageBubbleProps) => {
  const [showActions, setShowActions] = useState(false);

  const messageColorClass = isUser 
    ? 'bg-unlimited-light-blue text-unlimited-dark-blue' 
    : 'bg-gray-100 dark:bg-gray-800 text-unlimited-gray-900 dark:text-unlimited-gray-100';

  const messageAlignClass = isUser ? 'ml-auto' : 'mr-auto';
  
  const hasAttachments = attachments.length > 0;
  
  // Format text content with line breaks
  const formattedContent = content.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line || ' '}
    </span>
  ));

  return (
    <div className={cn(
      "group flex w-full mb-4 max-w-[85%]",
      isUser ? 'justify-end' : 'justify-start',
      className
    )}>
      <div className={cn("flex", isUser ? 'flex-row-reverse' : 'flex-row')}>
        {/* Avatar for non-user messages */}
        {!isUser && (
          <Avatar className={cn("h-8 w-8", isUser ? 'ml-2' : 'mr-2')}>
            <AvatarImage src={sender.avatar} alt={sender.name} />
            <AvatarFallback>{sender.initials || sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        <div className={cn("flex flex-col", isUser ? 'items-end' : 'items-start')}>
          {/* Message metadata */}
          <div className={cn(
            "flex items-center text-xs text-unlimited-gray mb-1",
            isUser ? 'flex-row' : 'flex-row-reverse'
          )}>
            {!isUser && <span className="font-medium">{sender.name}</span>}
            <span className={cn(isUser ? 'ml-1' : 'mr-1')}>⦁</span>
            <span className="text-unlimited-gray/70">{timestamp}</span>
            {isUser && isRead && (
              <span className="text-unlimited-blue ml-1">✓</span>
            )}
          </div>
          
          {/* Message content */}
          <div 
            className={cn(
              "relative rounded-lg py-2 px-3 mb-1 max-w-md",
              messageColorClass,
              messageAlignClass,
              hasAttachments && 'space-y-2'
            )}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            {/* Show attachments */}
            {hasAttachments && (
              <div className="space-y-2 mb-2">
                {attachments.map((attachment) => (
                  <AttachmentPreview
                    key={attachment.id}
                    type={attachment.type}
                    fileName={attachment.fileName}
                    fileSize={attachment.fileSize}
                    url={attachment.url}
                    thumbnail={attachment.thumbnail}
                  />
                ))}
              </div>
            )}
            
            {/* Text content */}
            {content && <div className="text-sm leading-relaxed">{formattedContent}</div>}
            
            {/* Message actions that appear on hover */}
            <div 
              className={cn(
                "absolute top-1 flex opacity-0 group-hover:opacity-100 transition-opacity",
                isUser ? '-left-12' : '-right-12'
              )}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isUser ? "end" : "start"} className="w-40">
                  {onReply && (
                    <DropdownMenuItem onClick={() => onReply(id)}>
                      <Reply className="mr-2 h-4 w-4" />
                      <span>رد</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content)}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span>نسخ النص</span>
                  </DropdownMenuItem>
                  {hasAttachments && (
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>تحميل المرفقات</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {onReply && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 ml-1"
                  onClick={() => onReply(id)}
                >
                  <Reply className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Message reactions */}
          <div className={cn(
            "h-6",
            isUser ? 'pr-2' : 'pl-2'
          )}>
            <MessageReactions 
              messageId={id} 
              align={isUser ? "end" : "start"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
