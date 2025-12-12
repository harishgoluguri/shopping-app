import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Loader2, AlertCircle, User, MapPin, Phone, Hash, Globe, Map } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Detailed Address State
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, register } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const err = await register({
      name: fullName,
      email: email,
      password: password,
      address1: addressLine1,
      address2: addressLine2,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
      phone_number: phoneNumber,
      alternate_phone_number: alternatePhoneNumber || undefined
    });

    if (err) {
      setError(err);
      setLoading(false);
    } else {
      // Success is handled by useEffect redirect
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left: Editorial Image (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black h-screen">
        <img 
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop" 
          alt="Register Editorial" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-16 text-white">
          <span className="inline-block px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6">
            Join the Club
          </span>
          <h2 className="text-6xl font-heading font-black tracking-tighter mb-6 leading-tight">
            DEFINE YOUR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-white">LEGACY.</span>
          </h2>
          <p className="text-gray-300 font-medium text-lg max-w-md leading-relaxed">
            Create an account to track orders, access exclusive drops, and experience luxury without limits.
          </p>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white h-screen overflow-y-auto relative">
        {/* Added pt-24 to content container to account for fixed navbar */}
        <div className="flex-grow flex items-center justify-center p-6 pt-24 lg:p-16">
          <div className="w-full max-w-md animate-fade-in-up my-auto py-10">
            
            <div className="text-center lg:text-left mb-10">
              {/* Removed duplicate mobile logo as Main Navbar is now visible and clean */}
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 mb-3 block">Start Your Journey</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-black tracking-tight mb-3">CREATE ACCOUNT</h1>
              <p className="text-gray-500 font-medium">Join the inner circle today.</p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                  <AlertCircle size={18} /> {error}
                </div>
              )}
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone</label>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                      placeholder="+91..."
                      required
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Alt Phone <span className="opacity-50">(Optional)</span></label>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      value={alternatePhoneNumber}
                      onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                      className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                      placeholder="+91..."
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="pt-4 pb-2">
                 <h3 className="text-xs font-black uppercase tracking-widest text-black border-b border-gray-100 pb-2 mb-4">Shipping Address</h3>
                 
                 <div className="space-y-4">
                    {/* Address Line 1 */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Address Line 1</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                          placeholder="Flat, House no., Building, Apartment"
                          required
                        />
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                      </div>
                    </div>

                    {/* Address Line 2 */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Address Line 2</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                          placeholder="Area, Colony, Street, Sector, Village"
                        />
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                      </div>
                    </div>

                    {/* City & Pincode */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                            placeholder="Zip Code"
                            required
                          />
                          <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">City</label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                            placeholder="City"
                            required
                          />
                          <Map className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        </div>
                      </div>
                    </div>

                    {/* State & Country */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">State</label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                            placeholder="State"
                            required
                          />
                          <Map className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Country</label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                            placeholder="Country"
                            required
                          />
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Login Details */}
              <div className="pt-4 border-t border-gray-100">
                  <div className="space-y-1.5 mb-5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <div className="relative group">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="name@example.com"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                    <div className="relative group">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="Create a password"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                    </div>
                  </div>

                   <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#F5F5F7] border-2 border-transparent rounded-2xl px-5 py-4 pl-12 font-bold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="Confirm password"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                    </div>
                  </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-500/20 hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>Creating Account <Loader2 className="animate-spin" size={20}/></>
                ) : (
                  <>Sign Up <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="relative border-t border-gray-100 pt-8 mt-8 text-center">
              <p className="text-sm font-medium text-gray-500 mb-6">Already a member?</p>
              <Link to="/login" className="inline-block border-2 border-black px-12 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all duration-300">
                Sign In
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;