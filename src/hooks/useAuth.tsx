
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
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
          localStorage.setItem('userId', session.user.id);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'student'
          });
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('userId', session.user.id);
        }
      } else {
        setUser(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
      }
    });

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          try {
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
            localStorage.setItem('userId', session.user.id);
          } catch (error) {
            console.error('Error fetching user role:', error);
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'student'
            });
            localStorage.setItem('userRole', 'student');
            localStorage.setItem('userId', session.user.id);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;

      if (data?.user) {
        try {
          const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.user.id)
            .single();

          const role = userRole?.role || 'student';
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', data.user.id);

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
        } catch (error) {
          console.error('Error fetching user role:', error);
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('userId', data.user.id);
          navigate('/dashboard/applications');
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "الرجاء التحقق من بريدك الإلكتروني وكلمة المرور",
        variant: "destructive"
      });
      throw error; // Re-throw to allow the login component to handle it
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'admin' | 'agent' = 'student') => {
    try {
      // First register the user in auth system
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            role: role
          }
        }
      });
      
      if (error) throw error;

      // If user was created successfully
      if (data?.user) {
        try {
          // Insert user role directly
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role: role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
          if (roleError) {
            console.error('Error creating user role:', roleError);
          }
        } catch (roleErr) {
          console.error('Error assigning role:', roleErr);
        }
        
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
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
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
