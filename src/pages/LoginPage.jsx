import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, AlertCircle, ShieldCheck, Sparkles, User, KeyRound, ShieldAlert } from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';
import { 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  resetPassword 
} from '../firebase/config';

export default function LoginPage({ onNavigate, onLoginSuccess, initialAdminMode = false }) {
  const [isAdminMode, setIsAdminMode] = useState(initialAdminMode);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const cleanFirebaseError = (error) => {
    const code = error.code || '';
    if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password')) {
      return 'Invalid email or password. Please verify and try again.';
    }
    if (code.includes('auth/user-not-found')) {
      return 'No account found with this email address. Please create an account.';
    }
    if (code.includes('auth/email-already-in-use')) {
      return 'This email address is already registered. Please sign in instead.';
    }
    if (code.includes('auth/weak-password')) {
      return 'Password should be at least 6 characters.';
    }
    if (code.includes('auth/popup-closed-by-user')) {
      return 'Google sign-in window was closed.';
    }
    if (code.includes('auth/network-request-failed')) {
      return 'Network connection error. Please check your internet connection.';
    }
    return error.message || 'Authentication failed. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. SPECIFIC PRIVATE ADMIN CREDENTIAL VERIFICATION
    if (cleanEmail === 'sachin@gmail.com' && cleanPass === 'sachinjammu') {
      const adminProfile = {
        uid: 'admin-sachin-master',
        email: 'sachin@gmail.com',
        displayName: 'Sachin (Admin)',
        role: 'admin'
      };

      // Also try Firebase sign-in or register in background for persistence
      try {
        await loginWithEmail('sachin@gmail.com', 'sachinjammu').catch(async () => {
          await registerWithEmail('sachin@gmail.com', 'sachinjammu').catch(() => {});
        });
      } catch (e) {
        // Fallback continues with verified local master admin session
      }

      setUserProfile(adminProfile);
      setSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(adminProfile);
        } else {
          onNavigate('Admin');
        }
      }, 700);
      setLoading(false);
      return;
    }

    // If attempting Admin mode with wrong credentials
    if (isAdminMode) {
      setTimeout(() => {
        setErrorMessage('Access Denied: Invalid administrator credentials for private portal.');
        setLoading(false);
      }, 500);
      return;
    }

    // 2. STANDARD CUSTOMER AUTHENTICATION (Firebase)
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await registerWithEmail(email, password);
      } else {
        userCredential = await loginWithEmail(email, password);
      }

      const user = userCredential.user;
      const isMasterAdmin = (user.email === 'sachin@gmail.com');
      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        role: isMasterAdmin ? 'admin' : 'customer'
      };

      setUserProfile(profile);
      setSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(profile);
        } else {
          onNavigate(profile.role === 'admin' ? 'Admin' : 'Home');
        }
      }, 800);
    } catch (err) {
      setErrorMessage(cleanFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      const user = result.user;
      const isMasterAdmin = (user.email === 'sachin@gmail.com');
      
      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (isMasterAdmin ? 'Sachin (Admin)' : 'Veda Customer'),
        photoURL: user.photoURL,
        role: isMasterAdmin ? 'admin' : 'customer'
      };

      setUserProfile(profile);
      setSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(profile);
        } else {
          onNavigate(profile.role === 'admin' ? 'Admin' : 'Home');
        }
      }, 800);
    } catch (err) {
      setErrorMessage(cleanFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address above to receive password reset instructions.');
      return;
    }
    try {
      await resetPassword(email);
      alert(`Password reset instructions have been sent to ${email}.`);
    } catch (err) {
      setErrorMessage(cleanFirebaseError(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5EC] flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Top Bar with Back to Store Button */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-10 pt-4 sm:pt-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('Home')}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#183B2B] hover:text-[#8C682D] transition-colors bg-white/80 backdrop-blur-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#DFD5C0] shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </button>

        <span className="text-[10px] sm:text-[11px] font-medium text-[#7A8C81] bg-[#EFE6D2]/60 px-2.5 sm:px-3 py-1 rounded-full border border-[#DECFA8]/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          <span>{isAdminMode ? 'Private Admin Access' : 'Encrypted Portal'}</span>
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-8 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
          
          {/* LEFT COLUMN: Brand & Typography */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-5 lg:pr-4 text-left">
            
            <div className="mb-2 sm:mb-4">
              <VedaFinderLogo size="md" showTagline={true} />
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-[54px] font-bold text-[#231F1C] leading-[1.15] sm:leading-[1.12] tracking-tight">
              Pure Ayurveda<br />
              for a <span className="text-[#183B2B]">Healthier</span><br className="hidden sm:inline" />
              {' '}Tomorrow
            </h1>

            <p className="text-xs sm:text-base text-[#5D6B63] max-w-md font-normal leading-relaxed">
              Experience the wisdom of ancient granthas with purified Bhasmas, Rasayanas, and Agnisip Herbal Infusions.
            </p>

            {/* Ayurvedic Luxury Box Artwork */}
            <div className="pt-2 max-w-lg hidden lg:block">
              <div className="w-full h-72 sm:h-80 flex items-center justify-start drop-shadow-2xl">
                <img 
                  src="/images/ayurvedic-box-mortar.png" 
                  alt="Ayurvedic box with brass mortar and herbs"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Floating Login Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-md rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 shadow-xl sm:shadow-2xl border border-[#E8DFC9] relative">
              
              {/* Top Motif */}
              <div className="flex justify-center mb-2 sm:mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl border shadow-inner ${
                  isAdminMode 
                    ? 'bg-[#183B2B] text-white border-[#2A523D]' 
                    : 'bg-[#FAF5EB] text-[#183B2B] border-[#E5D8BE]'
                }`}>
                  {isAdminMode ? '🛡️' : '🍃'}
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="text-center space-y-0.5 sm:space-y-1 mb-4 sm:mb-6">
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B]">
                  {isAdminMode 
                    ? 'Private Admin Portal' 
                    : isSignUp 
                      ? 'Create Your Account' 
                      : 'Welcome Back'}
                </h2>
                <p className="text-[11px] sm:text-sm text-[#738379]">
                  {isAdminMode 
                    ? 'Authorized personnel only • Enter master credentials' 
                    : isSignUp 
                      ? 'Join Veda Finder for authentic Ayurvedic care' 
                      : 'Sign in to access your orders and wellness history'}
                </p>
              </div>

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50/90 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{errorMessage}</div>
                </div>
              )}

              {success ? (
                <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#183B2B] text-white flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#183B2B]">
                    {userProfile?.displayName ? `Namaste, ${userProfile.displayName}!` : 'Welcome to Veda Finder!'}
                  </h3>
                  <p className="text-xs text-[#526659]">
                    {userProfile?.role === 'admin' 
                      ? 'Master Admin verified. Launching private dashboard...' 
                      : 'Login successful. Redirecting to store...'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  
                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-semibold text-[#2C3E35]">
                      {isAdminMode ? 'Administrator ID / Email' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder={isAdminMode ? "doctor@vedafinder.com" : "you@example.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] placeholder-[#8C9B92] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] transition-all"
                      />
                      <Mail className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-semibold text-[#2C3E35]">
                      {isAdminMode ? 'Master Password' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] placeholder-[#8C9B92] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] transition-all"
                      />
                      <Lock className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7E9186] hover:text-[#183B2B] focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  {!isSignUp && !isAdminMode && (
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <label className="flex items-center gap-1.5 text-[#4D6054] cursor-pointer text-[11px] sm:text-xs">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-[#D5C9B3] text-[#183B2B] focus:ring-[#183B2B] w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[#183B2B] font-semibold text-[11px] sm:text-xs hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#183B2B]/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#2B563F] mt-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Verifying Security Clearance...</span>
                      </span>
                    ) : (
                      <>
                        <span>
                          {isAdminMode 
                            ? 'Unlock Admin Dashboard' 
                            : isSignUp 
                              ? 'Create Account' 
                              : 'Sign In'}
                        </span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>

                  {/* Switch between Sign In / Sign Up for customers */}
                  {!isAdminMode && (
                    <div className="text-center pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setErrorMessage('');
                        }}
                        className="text-[11px] sm:text-xs text-[#8C682D] hover:text-[#183B2B] font-medium transition-colors"
                      >
                        {isSignUp 
                          ? 'Already have an account? Sign In' 
                          : "New to Veda Finder? Create an account"}
                      </button>
                    </div>
                  )}

                  {/* Divider & Google Login (only for customer mode) */}
                  {!isAdminMode && (
                    <>
                      <div className="relative my-2.5 sm:my-3 text-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#E8DFC9]" />
                        </div>
                        <span className="relative px-2.5 bg-white text-[9px] sm:text-[10px] text-[#7C8F84] uppercase tracking-wider">
                          OR
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm font-semibold text-[#2C3E35] flex items-center justify-center gap-2 shadow-sm hover:border-[#183B2B] transition-all disabled:opacity-75"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    </>
                  )}

                  {/* SLIGHTLY HIDDEN DISCREET TRIGGER FOR ADMIN PORTAL */}
                  <div className="pt-2 sm:pt-3 border-t border-[#F2ECE1] text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminMode(!isAdminMode);
                        setErrorMessage('');
                        setEmail('');
                        setPassword('');
                      }}
                      className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#A5B3AA] hover:text-[#183B2B] transition-colors py-1 px-2 rounded-md hover:bg-[#F2EADB]/60 group"
                      title="Staff & Administrative Access"
                    >
                      <KeyRound className="w-3 h-3 text-[#B0BFB5] group-hover:text-[#8C682D] transition-colors" />
                      <span>{isAdminMode ? '← Return to Customer Sign In' : 'Doctor & Staff Portal'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Footer Notice */}
      <div className="relative z-20 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-[#7A8C81] border-t border-[#EAE1D1] px-4">
        <p>© {new Date().getFullYear()} Veda Finder™ • Authentic Ayurvedic Formulations</p>
      </div>

    </div>
  );
}
