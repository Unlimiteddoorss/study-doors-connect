
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthUser {
  id: string;
  email: string;
  role: 'student' | 'admin' | 'agent';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role?: 'student' | 'admin' | 'agent') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and set user
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
      }

      if (session?.user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: (userRole?.role as 'student' | 'admin' | 'agent') || 'student'
        });

        // Store the role in localStorage to maintain compatibility with existing code
        localStorage.setItem('userRole', userRole?.role || 'student');
      } else {
        setUser(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    };

    getSession();

    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: (userRole?.role as 'student' | 'admin' | 'agent') || 'student'
        });

        localStorage.setItem('userRole', userRole?.role || 'student');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('userRole');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;

      if (data?.user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        const role = userRole?.role || 'student';
        localStorage.setItem('userRole', role);

        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بك في نظام طلبات الإلتحاق"
        });

        // Navigate based on role
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'agent') {
          navigate('/agent');
        } else {
          navigate('/dashboard/applications');
        }
      }
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "الرجاء التحقق من بريدك الإلكتروني وكلمة المرور",
        variant: "destructive"
      });
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'admin' | 'agent' = 'student') => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;

      if (data?.user) {
        // Insert user role
        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: role
        });

        toast({
          title: "تم التسجيل بنجاح",
          description: "يرجى تأكيد بريدك الإلكتروني لإكمال عملية التسجيل"
        });

        // For now, we'll navigate to login
        navigate('/login');
      }
    } catch (error: any) {
      toast({
        title: "خطأ في التسجيل",
        description: error.message || "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      localStorage.removeItem('userRole');
      setUser(null);
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح"
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      toast({
        title: "تم إرسال رابط إعادة تعيين كلمة المرور",
        description: "يرجى التحقق من بريدك الإلكتروني"
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إرسال بريد إعادة تعيين كلمة المرور",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
