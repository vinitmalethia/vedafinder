import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, AlertCircle, Sparkles, UserCheck } from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';
import { 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  resetPassword 
} from '../firebase/config';

export default function LoginPage({ onNavigate, onLoginSuccess }) {
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
      return 'No account found with this email address. Please sign up.';
    }
    if (code.includes('auth/email-already-in-use')) {
      return 'This email address is already registered. Please login instead.';
    }
    if (code.includes('auth/weak-password')) {
      return 'Password should be at least 6 characters.';
    }
    if (code.includes('auth/popup-closed-by-user')) {
      return 'Google sign-in popup was closed before completing.';
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

    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await registerWithEmail(email, password);
      } else {
        userCredential = await loginWithEmail(email, password);
      }

      const user = userCredential.user;
      setUserProfile({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        role: 'admin'
      });

      setSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            role: 'admin'
          });
        } else {
          onNavigate('Admin');
        }
      }, 900);
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
      
      setUserProfile({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Veda Admin',
        photoURL: user.photoURL,
        role: 'admin'
      });

      setSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Veda Admin',
            photoURL: user.photoURL,
            role: 'admin'
          });
        } else {
          onNavigate('Admin');
        }
      }, 900);
    } catch (err) {
      setErrorMessage(cleanFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address above to reset password.');
      return;
    }
    try {
      await resetPassword(email);
      alert(`A password reset link has been sent to ${email}. Please check your inbox.`);
    } catch (err) {
      setErrorMessage(cleanFirebaseError(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5EC] flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Top Bar with Back to Store Button */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-10 pt-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('Home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#183B2B] hover:text-[#8C682D] transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#DFD5C0] shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Veda Finder Store</span>
        </button>

        <span className="text-[11px] font-bold text-[#8C682D] uppercase tracking-widest bg-[#EFE6D2] px-3.5 py-1.5 rounded-full border border-[#DECFA8] shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>FIREBASE CONNECTED</span>
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT COLUMN: Brand, Typography & Ayurvedic Box & Brass Mortar Illustration */}
          <div className="lg:col-span-6 space-y-5 lg:pr-4 text-left">
            
            {/* Veda Finder Official Logo */}
            <div className="mb-4">
              <VedaFinderLogo size="md" showTagline={true} />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#231F1C] leading-[1.12] tracking-tight">
              Pure Ayurveda<br />
              for a <span className="text-[#183B2B]">Healthier</span><br />
              Tomorrow
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5D6B63] max-w-md font-normal leading-relaxed">
              Manage your products, live orders, customers, reviews, and inventory securely with Firebase Cloud Infrastructure.
            </p>

            {/* Ayurvedic Luxury Box & Brass Mortar Artwork */}
            <div className="pt-2 max-w-lg">
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
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-md rounded-[32px] p-8 sm:p-10 shadow-2xl border border-[#E8DFC9] relative">
              
              {/* Top Leaves Motif */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EB] flex items-center justify-center text-2xl border border-[#E5D8BE] shadow-inner">
                  🍃
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="text-center space-y-1 mb-6">
                <h2 className="font-serif font-bold text-3xl text-[#183B2B]">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-xs sm:text-sm text-[#738379]">
                  {isSignUp 
                    ? 'Register as a Veda Finder administrator' 
                    : 'Login to your Veda Finder admin portal'}
                </p>
              </div>

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{errorMessage}</div>
                </div>
              )}

              {success ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#183B2B] text-white flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#183B2B]">
                    {userProfile?.displayName ? `Namaste, ${userProfile.displayName}!` : 'Welcome to Veda Finder!'}
                  </h3>
                  <p className="text-xs text-[#526659]">Firebase authentication verified. Launching your admin console...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#2C3E35]">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="admin@vedafinder.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] placeholder-[#8C9B92] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] transition-all"
                      />
                      <Mail className="w-4 h-4 text-[#8C682D] absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#2C3E35]">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder={isSignUp ? 'Create a secure password (min 6 chars)' : 'Enter your password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 rounded-2xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] placeholder-[#8C9B92] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] transition-all"
                      />
                      <Lock className="w-4 h-4 text-[#8C682D] absolute left-4 top-1/2 -translate-y-1/2" />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E9186] hover:text-[#183B2B] focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password (Only in Login mode) */}
                  {!isSignUp && (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-[#4D6054] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-[#D5C9B3] text-[#183B2B] focus:ring-[#183B2B] w-4 h-4 cursor-pointer"
                        />
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[#183B2B] font-semibold hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#183B2B]/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#2B563F] mt-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Connecting to Firebase...</span>
                      </span>
                    ) : (
                      <>
                        <span>{isSignUp ? 'Create Admin Account' : 'Login to Dashboard'}</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>

                  {/* Switch between Sign In / Sign Up */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setErrorMessage('');
                      }}
                      className="text-xs text-[#8C682D] hover:text-[#183B2B] font-medium transition-colors"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign In' 
                        : "Don't have an account yet? Create one"}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E8DFC9]" />
                    </div>
                    <span className="relative px-3 bg-white text-[11px] text-[#7C8F84] uppercase tracking-wider">
                      OR AUTHENTICATE WITH
                    </span>
                  </div>

                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#D5C9B3] text-sm font-semibold text-[#2C3E35] flex items-center justify-center gap-3 shadow-sm hover:border-[#183B2B] transition-all disabled:opacity-75"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Footer Notice */}
      <div className="relative z-20 py-4 text-center text-xs text-[#7A8C81] border-t border-[#EAE1D1]">
        <p>© {new Date().getFullYear()} Veda Finder™ Ayurvedic Administrative Systems • Firebase Project: <span className="font-mono text-[#183B2B] font-semibold">vedafinder-6a228</span></p>
      </div>

    </div>
  );
}
