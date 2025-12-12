import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Hash, LogOut, Loader2, MapPin, Phone, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Detailed Address States
  const [editAddress1, setEditAddress1] = useState('');
  const [editAddress2, setEditAddress2] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editPincode, setEditPincode] = useState('');
  const [editCountry, setEditCountry] = useState('');

  const [editPhone, setEditPhone] = useState('');
  const [editAltPhone, setEditAltPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      setEditAddress1(user.address1 || '');
      setEditAddress2(user.address2 || '');
      setEditCity(user.city || '');
      setEditState(user.state || '');
      setEditPincode(user.pincode || '');
      setEditCountry(user.country || '');
      setEditPhone(user.phone_number || '');
      setEditAltPhone(user.alternate_phone_number || '');
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    const err = await updateProfile({
      address1: editAddress1,
      address2: editAddress2,
      city: editCity,
      state: editState,
      pincode: editPincode,
      country: editCountry,
      phone_number: editPhone,
      alternate_phone_number: editAltPhone
    });

    if (err) {
      setMessage({ type: 'error', text: err });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    if (user) {
      setEditAddress1(user.address1 || '');
      setEditAddress2(user.address2 || '');
      setEditCity(user.city || '');
      setEditState(user.state || '');
      setEditPincode(user.pincode || '');
      setEditCountry(user.country || '');
      setEditPhone(user.phone_number || '');
      setEditAltPhone(user.alternate_phone_number || '');
    }
    setIsEditing(false);
    setMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  if (!user) return null;

  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-black text-white p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400"></div>
             <div className="w-24 h-24 bg-white/10 rounded-full mx-auto flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                <span className="text-4xl font-heading font-black text-white">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
             </div>
             <h1 className="text-3xl md:text-4xl font-heading font-black mb-2 tracking-tight">
               {user.name || 'Valued Member'}
             </h1>
             <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Sdg Sneakers Insider</p>

             <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title={isEditing ? "Cancel Editing" : "Edit Profile"}
             >
                {isEditing ? <X size={20} /> : <Edit2 size={20} />}
             </button>
          </div>

          {/* Data Grid */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Account Details</h2>
              {isEditing && <span className="text-xs font-bold text-gold-500 animate-pulse">EDIT MODE</span>}
            </div>

            {message && (
              <div className={`p-4 rounded-2xl text-sm font-bold text-center ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {message.text}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#F5F5F7] p-6 rounded-3xl flex items-start gap-4 transition-colors">
                 <div className="p-3 bg-white rounded-full shadow-sm"><User size={20} /></div>
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="font-bold text-black">{user.name || 'Not set'}</p>
                 </div>
              </div>

              <div className="bg-[#F5F5F7] p-6 rounded-3xl flex items-start gap-4 transition-colors">
                 <div className="p-3 bg-white rounded-full shadow-sm"><Mail size={20} /></div>
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="font-bold text-black break-all">{user.email}</p>
                 </div>
              </div>

              {/* Editable Address */}
              <div className={`p-6 rounded-3xl flex items-start gap-4 transition-all col-span-1 md:col-span-2 ${isEditing ? 'bg-white border-2 border-black shadow-lg' : 'bg-[#F5F5F7] hover:bg-gray-100'}`}>
                 <div className="p-3 bg-white rounded-full shadow-sm h-fit"><MapPin size={20} /></div>
                 <div className="w-full">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Address</p>
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            value={editAddress1} 
                            onChange={(e) => setEditAddress1(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black md:col-span-2"
                            placeholder="Address Line 1"
                          />
                          <input 
                            type="text" 
                            value={editAddress2} 
                            onChange={(e) => setEditAddress2(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black md:col-span-2"
                            placeholder="Address Line 2 (Optional)"
                          />
                          <input 
                            type="text" 
                            value={editCity} 
                            onChange={(e) => setEditCity(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="City"
                          />
                           <input 
                            type="text" 
                            value={editPincode} 
                            onChange={(e) => setEditPincode(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="Pincode"
                          />
                          <input 
                            type="text" 
                            value={editState} 
                            onChange={(e) => setEditState(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="State"
                          />
                          <input 
                            type="text" 
                            value={editCountry} 
                            onChange={(e) => setEditCountry(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="Country"
                          />
                      </div>
                    ) : (
                      <p className="font-bold text-black leading-relaxed">{user.address || 'Not provided'}</p>
                    )}
                 </div>
              </div>

              {/* Editable Phone */}
               <div className={`p-6 rounded-3xl flex items-start gap-4 transition-all col-span-1 md:col-span-2 ${isEditing ? 'bg-white border-2 border-black shadow-lg' : 'bg-[#F5F5F7] hover:bg-gray-100'}`}>
                 <div className="p-3 bg-white rounded-full shadow-sm"><Phone size={20} /></div>
                 <div className="w-full">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</p>
                    {isEditing ? (
                       <div className="space-y-2">
                          <input 
                            type="tel" 
                            value={editPhone} 
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="Primary Phone"
                          />
                          <input 
                            type="tel" 
                            value={editAltPhone} 
                            onChange={(e) => setEditAltPhone(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-black"
                            placeholder="Alt Phone (Optional)"
                          />
                       </div>
                    ) : (
                      <>
                        <p className="font-bold text-black">{user.phone_number || 'Not provided'}</p>
                        {user.alternate_phone_number && (
                          <p className="text-xs text-gray-500 mt-1">Alt: {user.alternate_phone_number}</p>
                        )}
                      </>
                    )}
                 </div>
              </div>

              <div className="bg-[#F5F5F7] p-6 rounded-3xl flex items-start gap-4 transition-colors">
                 <div className="p-3 bg-white rounded-full shadow-sm"><Hash size={20} /></div>
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">User ID</p>
                    <p className="font-bold text-black text-xs font-mono">{user.id}</p>
                 </div>
              </div>

              <div className="bg-[#F5F5F7] p-6 rounded-3xl flex items-start gap-4 transition-colors">
                 <div className="p-3 bg-white rounded-full shadow-sm"><Calendar size={20} /></div>
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                    <p className="font-bold text-black">{joinDate}</p>
                 </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4">
               {isEditing ? (
                 <>
                   <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70"
                   >
                     {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} Save Changes
                   </button>
                   <button 
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-500 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                   >
                     Cancel
                   </button>
                 </>
               ) : (
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-white border-2 border-red-100 text-red-500 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;