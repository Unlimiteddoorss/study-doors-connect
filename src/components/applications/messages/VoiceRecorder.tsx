
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AudioPlayer } from '@/components/ui/audio-player';

interface VoiceRecorderProps {
  onRecordingComplete?: (blob: Blob, audioUrl: string) => void;
  onCancel?: () => void;
}

const VoiceRecorder = ({ onRecordingComplete, onCancel }: VoiceRecorderProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setRecordedBlob(audioBlob);
        setIsRecording(false);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "بدء التسجيل",
        description: "تم بدء تسجيل رسالة صوتية جديدة"
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "خطأ في الوصول للميكروفون",
        description: "يرجى التأكد من إتاحة الوصول للميكروفون",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast({
        title: "تم الانتهاء من التسجيل",
        description: "يمكنك الآن الاستماع للتسجيل قبل إرساله"
      });
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioUrl(null);
    setRecordedBlob(null);
    setIsRecording(false);
    setRecordingTime(0);
    
    if (onCancel) {
      onCancel();
    }
  };

  const sendRecording = () => {
    if (recordedBlob && audioUrl && onRecordingComplete) {
      onRecordingComplete(recordedBlob, audioUrl);
      setAudioUrl(null);
      setRecordedBlob(null);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="p-3 border rounded-lg bg-background">
      {!audioUrl ? (
        <div className="flex items-center gap-3">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            className={isRecording ? "animate-pulse" : ""}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4 mr-1" />
                {formatTime(recordingTime)} | إيقاف
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-1" />
                تسجيل رسالة صوتية
              </>
            )}
          </Button>
          
          {isRecording && (
            <Button
              onClick={cancelRecording}
              variant="outline"
              size="sm"
            >
              <Trash className="h-4 w-4 mr-1" />
              إلغاء
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AudioPlayer src={audioUrl} />
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={cancelRecording}
            >
              <Trash className="h-4 w-4 mr-1" />
              حذف
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={sendRecording}
            >
              <Send className="h-4 w-4 mr-1" />
              إرسال
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
