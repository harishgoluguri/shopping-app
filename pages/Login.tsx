import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WHATSAPP_NUMBER } from '../constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const err = await login(email, password);

    if (err) {
      setError(err);
      setLoading(false);
    } else {
      // Success is handled by useEffect
    }
  };

  const handleForgotPassword = () => {
    const emailText = email.trim() ? email.trim() : "[Insert Email Here]";
    const message = `*Forgot Password Request* 🔒\n\nHello Admin,\nI would like to request a password reset for my account associated with email: ${emailText}.\n\nPlease help me proceed.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left: Editorial (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
          alt="Login" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-16 text-white">
           <h2 className="text-6xl font-heading font-black leading-none mb-6">THE VAULT<br/>AWAITS.</h2>
           <p className="text-gray-300 font-medium max-w-md">Sign in to access exclusive drops, track your orders, and manage your wishlist.</p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-32 lg:p-24 bg-white relative">
        <div className="w-full max-w-sm animate-fade-in-up">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-heading font-black text-black mb-2 uppercase">Welcome Back</h1>
            <p className="text-gray-400 text-sm font-bold">Please enter your details</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl text-center">
                {error}
              </div>
            )}
            
            <div className="relative group">
               <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-full px-6 py-4 pl-12 font-bold text-sm text-black placeholder-gray-400 focus:bg-white focus:border-black outline-none transition-all"
                  placeholder="Email Address"
                  required
               />
               <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
            </div>

            <div className="relative group">
               <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-full px-6 py-4 pl-12 font-bold text-sm text-black placeholder-gray-400 focus:bg-white focus:border-black outline-none transition-all"
                  placeholder="Password"
                  required
               />
               <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
            </div>

            <div className="flex justify-end">
               <button 
                 type="button" 
                 onClick={handleForgotPassword}
                 className="text-xs font-bold text-gray-400 hover:text-black transition-colors"
               >
                 Forgot Password?
               </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20}/> : "Sign In"}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 font-bold mb-4">Don't have an account?</p>
            <Link to="/register" className="inline-block border-2 border-gray-200 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:border-black hover:bg-black hover:text-white transition-all">
              Create Free Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;