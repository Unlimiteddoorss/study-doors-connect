
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Check, Calendar, Smartphone, Link as LinkIcon, Phone } from 'lucide-react';

interface AnnouncementProps {
  onClose?: () => void;
}

const TurkishUniversitiesAnnouncement = ({ onClose }: AnnouncementProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the announcement was previously closed
    const announcementClosed = localStorage.getItem('turkishAnnouncementClosed');
    
    if (announcementClosed && (new Date().getTime() - parseInt(announcementClosed)) < 86400000) {
      // If closed within the last 24 hours, don't show it
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Save the close timestamp
    localStorage.setItem('turkishAnnouncementClosed', new Date().getTime().toString());
    
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-4 mb-6 relative animate-fade-in">
      <button 
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="إغلاق الإعلان"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="md:w-1/6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-3xl font-bold">🎓</span>
          </div>
        </div>
        
        <div className="md:w-3/6">
          <h3 className="text-lg font-bold mb-2">بدأ التقديم على الجامعات الحكومية التركية 2025!</h3>
          <p className="mb-2 text-sm text-white/90">
            #أبواب_بلا_حدود_التعليمية #unlimiteddoorss
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
              <Check className="h-3.5 w-3.5 mr-1" />
              <span>تقديم مباشر على الجامعات</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
              <Check className="h-3.5 w-3.5 mr-1" />
              <span>متابعة الطلب أولاً بأول</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>إشعارك بمواعيد النتائج</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/6 space-y-2 flex flex-col items-center md:items-end">
          <Button asChild className="w-full md:w-auto bg-white hover:bg-white/90 text-purple-800">
            <Link to="/turkish-applications">
              قدم طلبك الآن
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm">
            <a href="https://forms.gle/jsEjLmiDw3Fb7NKx8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:bg-white/20 py-1 px-2 rounded transition-colors"
            >
              <LinkIcon className="h-3.5 w-3.5 mr-1" />
              <span>نموذج التسجيل</span>
            </a>
            <a href="https://wa.me/905524212214" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:bg-white/20 py-1 px-2 rounded transition-colors"
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurkishUniversitiesAnnouncement;
