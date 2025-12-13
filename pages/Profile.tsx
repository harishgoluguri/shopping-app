import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, MapPin, Phone, LogOut, Loader2, 
  Package, LayoutDashboard, Settings, Heart, 
  ChevronRight, CreditCard, Edit2, Save, X, ShoppingBag, Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY } from '../constants';

type Tab = 'overview' | 'orders' | 'addresses' | 'settings' | 'wishlist';

const Profile: React.FC = () => {
  const { user, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Edit States
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Address Form State
  const [addrForm, setAddrForm] = useState({
    address1: '', address2: '', city: '', state: '', pincode: '', country: ''
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: '', phone: '', altPhone: ''
  });

  useEffect(() => {
    if (!loading && !user) navigate('/login');
    if (user) {
      setAddrForm({
        address1: user.address1 || '',
        address2: user.address2 || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        country: user.country || ''
      });
      setProfileForm({
        name: user.name || '',
        phone: user.phone_number || '',
        altPhone: user.alternate_phone_number || ''
      });
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveAddress = async () => {
    setSaving(true);
    setMessage(null);
    const err = await updateProfile({
      address1: addrForm.address1,
      address2: addrForm.address2,
      city: addrForm.city,
      state: addrForm.state,
      pincode: addrForm.pincode,
      country: addrForm.country
    });
    setSaving(false);
    if (err) setMessage({ type: 'error', text: err });
    else {
      setIsEditingAddress(false);
      setMessage({ type: 'success', text: 'Address updated successfully' });
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage(null);
    const err = await updateProfile({
      name: profileForm.name,
      phone_number: profileForm.phone,
      alternate_phone_number: profileForm.altPhone
    });
    setSaving(false);
    if (err) setMessage({ type: 'error', text: err });
    else {
      setIsEditingProfile(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    }
  };

  const getLevelInfo = (points: number = 0) => {
    if (points <= 1000) return { name: 'Silver', color: 'text-gray-400', bg: 'bg-gray-100', next: 1000 };
    if (points <= 3000) return { name: 'Gold', color: 'text-gold-500', bg: 'bg-gold-50', next: 3000 };
    if (points <= 5000) return { name: 'Platinum', color: 'text-cyan-500', bg: 'bg-cyan-50', next: 5000 };
    return { name: 'Diamond', color: 'text-purple-500', bg: 'bg-purple-50', next: null };
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-black" size={40} /></div>;
  if (!user) return null;

  const level = getLevelInfo(user.points);

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => { setActiveTab(id); setMessage(null); setIsEditingAddress(false); setIsEditingProfile(false); }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold uppercase tracking-wider text-xs ${activeTab === id ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-100 hover:text-black'}`}
    >
      <Icon size={18} />
      <span>{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-24 pb-24 lg:px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 px-4 lg:px-0">
           <div className="bg-white rounded-[2rem] p-8 shadow-xl sticky top-28">
              <div className="flex flex-col items-center mb-8">
                 <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-heading font-black text-gray-400 mb-4 border-2 border-white shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                 </div>
                 <h2 className="text-xl font-heading font-black uppercase text-center">{user.name}</h2>
                 <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${level.bg} px-3 py-1 rounded-full mt-2`}>
                    <Trophy size={12} className={level.color} />
                    <span className={level.color}>{level.name} Member</span>
                 </div>
              </div>
              
              <div className="space-y-2">
                 <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
                 <NavItem id="orders" icon={Package} label="Orders" />
                 <NavItem id="addresses" icon={MapPin} label="Addresses" />
                 <NavItem id="settings" icon={Settings} label="Settings" />
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold uppercase tracking-wider text-xs text-red-500 hover:bg-red-50 mt-4"
                 >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                 </button>
              </div>
           </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-9 px-4 lg:px-0">
           {message && (
              <div className={`mb-6 p-4 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-fade-in-up ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                 {message.type === 'success' ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                 {message.text}
              </div>
           )}

           {/* OVERVIEW TAB */}
           {activeTab === 'overview' && (
             <div className="space-y-8 animate-fade-in-up">
                {/* Welcome Card */}
                <div className="bg-black rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                   <div className={`absolute top-0 right-0 w-64 h-64 ${level.name === 'Gold' ? 'bg-gold-500' : level.name === 'Platinum' ? 'bg-cyan-500' : level.name === 'Diamond' ? 'bg-purple-500' : 'bg-gray-500'} rounded-full blur-[100px] opacity-20`}></div>
                   <div className="relative z-10">
                      <p className={`${level.color} text-xs font-bold uppercase tracking-[0.2em] mb-2`}>Membership Status</p>
                      <h1 className="text-4xl lg:text-6xl font-heading font-black uppercase mb-6 leading-none">The Vault <br/>Access Granted</h1>
                      <div className="flex gap-8">
                         <div>
                            <p className="text-3xl font-heading font-black">{user.points || 0}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Points Earned</p>
                         </div>
                         <div>
                            <p className={`text-3xl font-heading font-black ${level.color}`}>{level.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Current Level</p>
                         </div>
                      </div>
                      
                      {level.next && (
                          <div className="mt-8 max-w-sm">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">
                                <span>Progress to next tier</span>
                                <span>{level.next - (user.points || 0)} pts needed</span>
                             </div>
                             <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${level.name === 'Gold' ? 'bg-gold-500' : 'bg-white'}`} 
                                    style={{ width: `${Math.min(100, ((user.points || 0) / level.next) * 100)}%` }}
                                ></div>
                             </div>
                          </div>
                      )}
                   </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <button onClick={() => setActiveTab('orders')} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all text-left group">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                         <Package size={24} />
                      </div>
                      <h3 className="font-heading font-black text-xl mb-1">Orders</h3>
                      <p className="text-xs text-gray-400 font-bold">Track & Return</p>
                   </button>
                   <button onClick={() => setActiveTab('addresses')} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all text-left group">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                         <MapPin size={24} />
                      </div>
                      <h3 className="font-heading font-black text-xl mb-1">Addresses</h3>
                      <p className="text-xs text-gray-400 font-bold">Manage Shipping</p>
                   </button>
                   <button onClick={() => navigate('/shop')} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all text-left group">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                         <Heart size={24} />
                      </div>
                      <h3 className="font-heading font-black text-xl mb-1">Wishlist</h3>
                      <p className="text-xs text-gray-400 font-bold">Your Grails</p>
                   </button>
                </div>
             </div>
           )}

           {/* ORDERS TAB */}
           {activeTab === 'orders' && (
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl min-h-[500px] animate-fade-in-up">
                 <h2 className="text-2xl font-heading font-black uppercase mb-8">Order History</h2>
                 <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                       <ShoppingBag size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-heading font-black mb-2">No Orders Yet</h3>
                    <p className="text-gray-400 text-sm font-medium mb-8 max-w-xs">Looks like you haven't made your first purchase. The collection is waiting.</p>
                    <button onClick={() => navigate('/shop')} className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors">
                       Start Shopping
                    </button>
                 </div>
              </div>
           )}

           {/* ADDRESSES TAB */}
           {activeTab === 'addresses' && (
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl animate-fade-in-up">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-heading font-black uppercase">Saved Addresses</h2>
                    {!isEditingAddress && (
                       <button onClick={() => setIsEditingAddress(true)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gold-500 transition-colors">
                          <Edit2 size={16} /> Edit Address
                       </button>
                    )}
                 </div>

                 {isEditingAddress ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                       <div className="col-span-1 md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Address Line 1</label>
                          <input type="text" value={addrForm.address1} onChange={e => setAddrForm({...addrForm, address1: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="col-span-1 md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Address Line 2</label>
                          <input type="text" value={addrForm.address2} onChange={e => setAddrForm({...addrForm, address2: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">City</label>
                          <input type="text" value={addrForm.city} onChange={e => setAddrForm({...addrForm, city: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">State</label>
                          <input type="text" value={addrForm.state} onChange={e => setAddrForm({...addrForm, state: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Pincode</label>
                          <input type="text" value={addrForm.pincode} onChange={e => setAddrForm({...addrForm, pincode: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Country</label>
                          <input type="text" value={addrForm.country} onChange={e => setAddrForm({...addrForm, country: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black" />
                       </div>
                       <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
                          <button onClick={handleSaveAddress} disabled={saving} className="flex-1 bg-black text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-green-600 transition-colors flex justify-center items-center gap-2">
                             {saving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Save
                          </button>
                          <button onClick={() => setIsEditingAddress(false)} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors">Cancel</button>
                       </div>
                    </div>
                 ) : (
                    <div className="bg-[#F8F8F8] p-8 rounded-[2rem] border border-gray-100 relative group">
                       <div className="absolute top-8 right-8 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MapPin size={24} />
                       </div>
                       <h3 className="font-heading font-black text-lg mb-4">Default Shipping</h3>
                       <div className="space-y-1 text-sm font-medium text-gray-500">
                          <p className="text-black font-bold text-base mb-2">{user.name}</p>
                          <p>{user.address1}</p>
                          {user.address2 && <p>{user.address2}</p>}
                          <p>{user.city}, {user.state} {user.pincode}</p>
                          <p>{user.country}</p>
                          <p className="mt-4 text-black font-bold">Phone: {user.phone_number}</p>
                       </div>
                    </div>
                 )}
              </div>
           )}

           {/* SETTINGS TAB */}
           {activeTab === 'settings' && (
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl animate-fade-in-up">
                 <h2 className="text-2xl font-heading font-black uppercase mb-8">Profile Settings</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Form */}
                    <div className="col-span-2">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Personal Details</h3>
                           {!isEditingProfile && (
                              <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold uppercase tracking-widest hover:text-gold-500 transition-colors underline">Edit</button>
                           )}
                        </div>
                        
                        <div className="bg-[#F8F8F8] p-8 rounded-[2rem] space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Full Name</label>
                                 <input 
                                    type="text" 
                                    value={isEditingProfile ? profileForm.name : user.name} 
                                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                                    disabled={!isEditingProfile}
                                    className={`w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold ${isEditingProfile ? 'ring-1 ring-gray-200 focus:ring-black' : 'text-gray-500'}`} 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Email (Cannot Change)</label>
                                 <input 
                                    type="text" 
                                    value={user.email} 
                                    disabled 
                                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-400 cursor-not-allowed" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Phone</label>
                                 <input 
                                    type="text" 
                                    value={isEditingProfile ? profileForm.phone : user.phone_number} 
                                    onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                                    disabled={!isEditingProfile}
                                    className={`w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold ${isEditingProfile ? 'ring-1 ring-gray-200 focus:ring-black' : 'text-gray-500'}`} 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-gray-400 pl-2">Alt Phone</label>
                                 <input 
                                    type="text" 
                                    value={isEditingProfile ? profileForm.altPhone : (user.alternate_phone_number || 'Not Set')} 
                                    onChange={e => setProfileForm({...profileForm, altPhone: e.target.value})}
                                    disabled={!isEditingProfile}
                                    className={`w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold ${isEditingProfile ? 'ring-1 ring-gray-200 focus:ring-black' : 'text-gray-500'}`} 
                                 />
                              </div>
                           </div>

                           {isEditingProfile && (
                              <div className="flex gap-4 pt-2">
                                 <button onClick={handleSaveProfile} disabled={saving} className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-green-600 transition-colors flex items-center gap-2">
                                    {saving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Save Details
                                 </button>
                                 <button onClick={() => setIsEditingProfile(false)} className="bg-white border border-gray-200 text-gray-500 px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
                              </div>
                           )}
                        </div>
                    </div>

                    {/* Account Stats */}
                    <div className="col-span-2">
                       <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Account Meta</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#F8F8F8] p-6 rounded-[1.5rem] flex items-center gap-4">
                             <div className="p-3 bg-white rounded-full shadow-sm"><User size={20}/></div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">User ID</p>
                                <p className="font-bold text-xs truncate max-w-[150px]">{user.id}</p>
                             </div>
                          </div>
                          <div className="bg-[#F8F8F8] p-6 rounded-[1.5rem] flex items-center gap-4">
                             <div className="p-3 bg-white rounded-full shadow-sm"><Settings size={20}/></div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Joined</p>
                                <p className="font-bold text-xs">{new Date(user.created_at).toLocaleDateString()}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default Profile;