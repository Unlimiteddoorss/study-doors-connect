
import { useState } from 'react';
import { SmileIcon, ThumbsUp, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

// Emoji reactions with their display and count
interface Reaction {
  emoji: string;
  label: string;
  count: number;
  userReacted: boolean;
}

interface MessageReactionsProps {
  messageId: string;
  className?: string;
  align?: 'start' | 'center' | 'end';
  initialReactions?: Reaction[];
  onReactionChange?: (messageId: string, reactions: Reaction[]) => void;
}

const defaultReactions: Reaction[] = [
  { emoji: '👍', label: 'موافق', count: 0, userReacted: false },
  { emoji: '❤️', label: 'أحببت', count: 0, userReacted: false },
  { emoji: '😂', label: 'مضحك', count: 0, userReacted: false },
  { emoji: '😮', label: 'واو', count: 0, userReacted: false },
  { emoji: '😢', label: 'حزين', count: 0, userReacted: false },
  { emoji: '🙏', label: 'شكراً', count: 0, userReacted: false },
];

const MessageReactions = ({ 
  messageId, 
  className,
  align = 'center',
  initialReactions = [],
  onReactionChange 
}: MessageReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>(
    initialReactions.length > 0 ? initialReactions : defaultReactions
  );
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (index: number) => {
    const newReactions = [...reactions];
    
    // Toggle reaction
    if (newReactions[index].userReacted) {
      newReactions[index].count = Math.max(0, newReactions[index].count - 1);
      newReactions[index].userReacted = false;
    } else {
      newReactions[index].count += 1;
      newReactions[index].userReacted = true;
    }
    
    setReactions(newReactions);
    setShowReactions(false);
    
    if (onReactionChange) {
      onReactionChange(messageId, newReactions);
    }
  };

  // Get visible reactions (ones with count > 0)
  const visibleReactions = reactions.filter(r => r.count > 0);

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {/* Display active reactions */}
      {visibleReactions.map((reaction, index) => (
        <Button
          key={`${reaction.emoji}-${index}`}
          variant="ghost"
          size="sm"
          className={cn(
            "h-6 py-1 px-1.5 text-xs rounded-full",
            reaction.userReacted && "bg-unlimited-light-blue/20 text-unlimited-blue"
          )}
          onClick={() => handleReaction(reactions.findIndex(r => r.emoji === reaction.emoji))}
        >
          <span className="mr-1">{reaction.emoji}</span>
          <span>{reaction.count}</span>
        </Button>
      ))}
      
      {/* Add reaction button */}
      <DropdownMenu open={showReactions} onOpenChange={setShowReactions}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
          >
            <SmileIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={align} 
          className="flex p-1 gap-1 min-w-0"
        >
          {reactions.map((reaction, index) => (
            <Button
              key={`reaction-${index}`}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-unlimited-light-blue/10",
                reaction.userReacted && "bg-unlimited-light-blue/20"
              )}
              onClick={() => handleReaction(index)}
              title={reaction.label}
            >
              {reaction.emoji}
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageReactions;
