import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { errorHandler } from '@/utils/errorHandler';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  createDemoAccount: (email: string, password: string, role: string, profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const RealAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          setUserRole(null);
          setUserProfile(null);
          setLoading(false);
        }

        errorHandler.logInfo(`مصادقة المستخدم: ${event}`, { 
          event, 
          userId: session?.user?.id 
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user role with fallback to 'student'
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleError && roleError.code !== 'PGRST116') {
        errorHandler.logError(roleError, { context: 'fetchUserRole', userId });
      }
      
      // Set role with fallback to 'student' if no role found
      const role = roleData?.role || 'student';
      setUserRole(role);

      // If no role exists, create one
      if (!roleData && roleError?.code === 'PGRST116') {
        try {
          await supabase
            .from('user_roles')
            .insert({
              user_id: userId,
              role: 'student'
            });
          errorHandler.logInfo('تم إنشاء دور افتراضي للمستخدم', { userId, role: 'student' });
        } catch (createRoleError) {
          errorHandler.logError(createRoleError, { context: 'createDefaultRole', userId });
        }
      }

      // Fetch user profile with fallback creation
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        errorHandler.logError(profileError, { context: 'fetchUserProfile', userId });
      }

      setUserProfile(profileData);

      // If no profile exists, create one
      if (!profileData && profileError?.code === 'PGRST116') {
        try {
          const { data: newProfile } = await supabase
            .from('user_profiles')
            .insert({
              id: userId,
              user_id: userId,
              full_name: 'مستخدم جديد'
            })
            .select()
            .single();
          
          setUserProfile(newProfile);
          errorHandler.logInfo('تم إنشاء ملف شخصي افتراضي', { userId });
        } catch (createProfileError) {
          errorHandler.logError(createProfileError, { context: 'createDefaultProfile', userId });
        }
      }

      errorHandler.logInfo('تم جلب بيانات المستخدم', { 
        userId, 
        role,
        hasProfile: !!profileData 
      });
    } catch (error) {
      errorHandler.logError(error, { context: 'fetchUserData', userId });
    } finally {
      setLoading(false);
    }
  };

  const createDemoAccount = async (email: string, password: string, role: string, profileData: any) => {
    try {
      setLoading(true);
      
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: profileData.full_name,
            role: role
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          // User already exists, try to sign in
          await signIn(email, password);
          return;
        }
        throw error;
      }

      if (data.user) {
        // Create user profile
        await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            user_id: data.user.id,
            full_name: profileData.full_name,
            phone: profileData.phone,
            country: profileData.country,
            city: profileData.city
          });

        // Create user role
        await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: role
          });

        errorHandler.logInfo('تم إنشاء حساب تجريبي جديد', { 
          userId: data.user.id,
          email: data.user.email,
          role: role
        });
      }
    } catch (error: any) {
      errorHandler.logError(error, { context: 'createDemoAccount', email, role });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        errorHandler.logError(error, { context: 'signIn', email });
        throw error;
      }

      errorHandler.logInfo('تم تسجيل الدخول بنجاح', { 
        userId: data.user?.id,
        email: data.user?.email 
      });

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في النظام"
      });
    } catch (error: any) {
      const errorMessage = error.message === 'Invalid login credentials' 
        ? 'بيانات الدخول غير صحيحة'
        : 'حدث خطأ في تسجيل الدخول';
      
      toast({
        title: "خطأ في تسجيل الدخول",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role || 'student'
          }
        }
      });

      if (error) {
        errorHandler.logError(error, { context: 'signUp', email });
        throw error;
      }

      if (data.user) {
        try {
          await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              user_id: data.user.id,
              full_name: userData.full_name,
              phone: userData.phone,
              country: userData.country,
              city: userData.city
            });
        } catch (profileError) {
          errorHandler.logWarning('فشل في إنشاء ملف المستخدم', { 
            userId: data.user.id, 
            error: profileError 
          });
        }

        try {
          await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role: userData.role || 'student'
            });
        } catch (roleError) {
          errorHandler.logWarning('فشل في إنشاء دور المستخدم', { 
            userId: data.user.id, 
            error: roleError 
          });
        }
      }

      errorHandler.logInfo('تم إنشاء حساب جديد', { 
        userId: data.user?.id,
        email: data.user?.email,
        role: userData.role
      });

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب"
      });
    } catch (error: any) {
      const errorMessage = error.message.includes('already registered')
        ? 'هذا البريد الإلكتروني مسجل مسبقاً'
        : 'حدث خطأ في إنشاء الحساب';
      
      toast({
        title: "خطأ في إنشاء الحساب",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        errorHandler.logError(error, { context: 'signOut' });
        throw error;
      }

      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserProfile(null);

      errorHandler.logInfo('تم تسجيل الخروج بنجاح');
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "شكراً لاستخدام النظام"
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        errorHandler.logError(error, { context: 'resetPassword', email });
        throw error;
      }

      errorHandler.logInfo('تم إرسال رابط إعادة تعيين كلمة المرور', { email });
      
      toast({
        title: "تم إرسال الرابط",
        description: "تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور"
      });
    } catch (error) {
      toast({
        title: "خطأ في إرسال الرابط",
        description: "حدث خطأ في إرسال رابط إعادة التعيين",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      setLoading(true);

      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (profileError) {
        errorHandler.logError(profileError, { context: 'updateProfile', userId: user.id });
        throw profileError;
      }

      await fetchUserData(user.id);

      errorHandler.logInfo('تم تحديث ملف المستخدم', { userId: user.id, updates });
      
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم حفظ التغييرات بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ في تحديث الملف الشخصي",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userRole,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    createDemoAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
