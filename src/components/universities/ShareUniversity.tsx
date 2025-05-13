
import { useState } from 'react';
import { Share2, Check, Copy, Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShareUniversityProps {
  universityName: string;
  universityId: number;
  className?: string;
  variant?: 'default' | 'subtle';
}

const ShareUniversity = ({ 
  universityName, 
  universityId, 
  className,
  variant = 'default'
}: ShareUniversityProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/universities/${universityId}`;
  const shareText = `تحقق من جامعة ${universityName} على منصة دراسة ابورز!`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedShareUrl = encodeURIComponent(shareUrl);
  
  const shareLinks = [
    {
      name: 'تويتر',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedShareUrl}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1a94df]'
    },
    {
      name: 'فيسبوك',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#1670e0]'
    },
    {
      name: 'لينكد إن',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
      color: 'bg-[#0A66C2] hover:bg-[#0958a8]'
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط الجامعة إلى الحافظة",
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('فشل في نسخ الرابط:', err);
        toast({
          title: "فشل نسخ الرابط",
          description: "حدث خطأ أثناء محاولة نسخ الرابط",
          variant: "destructive",
        });
      });
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant={variant === 'default' ? 'outline' : 'ghost'}
          size="sm" 
          className={cn("", className)}
        >
          <Share2 className="h-4 w-4 ml-2" />
          مشاركة
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">مشاركة جامعة {universityName}</h4>
          
          <div className="flex flex-col gap-2">
            {shareLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className={`justify-start text-white ${link.color}`}
                onClick={() => window.open(link.url, '_blank')}
              >
                <link.icon className="h-4 w-4 ml-2" />
                {link.name}
              </Button>
            ))}
            
            <Button
              variant="outline"
              className="justify-start"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 ml-2 text-green-500" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ الرابط
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareUniversity;
