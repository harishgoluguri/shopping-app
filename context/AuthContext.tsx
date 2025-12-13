import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone_number: string;
  alternate_phone_number?: string;
  created_at: string;
  points: number; // Added points field
}

interface DBUser {
  id: string;
  gmail: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone_number: string;
  alternate_phone_number?: string;
  created_at: string;
  password?: string;
  points?: number; // Points column in custom_users
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (userData: Omit<User, 'id' | 'created_at' | 'address' | 'points'> & { password: string }) => Promise<string | null>;
  updateProfile: (updates: Partial<User>) => Promise<string | null>;
  addPoints: (amount: number) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to safely extract error message
  const getErrorMessage = (error: any): string => {
    if (!error) return "An unknown error occurred";
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.error_description) return error.error_description;
    return "Error processing request";
  };

  // Helper to map DB user to App user
  const mapUser = (dbUser: DBUser): User => {
    const fullAddress = [
        dbUser.address1, 
        dbUser.address2, 
        dbUser.city, 
        dbUser.state, 
        dbUser.country, 
        dbUser.pincode
    ].filter(Boolean).join(', ');

    return {
        id: dbUser.id,
        email: dbUser.gmail,
        name: dbUser.name,
        address: fullAddress,
        address1: dbUser.address1 || '',
        address2: dbUser.address2,
        city: dbUser.city || '',
        state: dbUser.state || '',
        pincode: dbUser.pincode || '',
        country: dbUser.country || '',
        phone_number: dbUser.phone_number,
        alternate_phone_number: dbUser.alternate_phone_number,
        created_at: dbUser.created_at,
        points: dbUser.points || 0
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('sdgUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          // Fetch fresh data from DB
          const { data: dbUser, error } = await supabase
            .from('custom_users')
            .select('*')
            .eq('id', parsedUser.id)
            .maybeSingle(); 

          if (dbUser && !error) {
            const mappedUser = mapUser(dbUser as DBUser);
            setUser(mappedUser);
            localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
          } else {
            // If DB fetch fails, fall back to local storage
             setUser({...parsedUser, points: parsedUser.points || 0});
          }
        } catch (e) {
          localStorage.removeItem('sdgUser');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('custom_users')
        .select('*')
        .eq('gmail', email)
        .eq('password', password)
        .maybeSingle(); 

      if (error) throw error;
      
      if (data) {
        const mappedUser = mapUser(data as DBUser);
        setUser(mappedUser);
        localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
        return null;
      } else {
        return "Invalid email or password";
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      return getErrorMessage(err);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'created_at' | 'address' | 'points'> & { password: string }) => {
    try {
      const { data, error } = await supabase
        .from('custom_users')
        .insert([{
          gmail: userData.email,
          password: userData.password, 
          name: userData.name,
          address1: userData.address1,
          address2: userData.address2 || null,
          city: userData.city,
          state: userData.state,
          pincode: userData.pincode,
          country: userData.country,
          phone_number: userData.phone_number,
          alternate_phone_number: userData.alternate_phone_number || null,
          points: 0 // Initialize points column
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') return "This email is already registered.";
        throw error;
      }

      if (data) {
        const mappedUser = mapUser(data as DBUser);
        setUser(mappedUser);
        localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
        return null;
      }
      return "Registration failed";
    } catch (err: any) {
       return getErrorMessage(err);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return "No user logged in";
    try {
      const dbUpdates: any = { ...updates };
      
      if (updates.email) {
          dbUpdates.gmail = updates.email;
          delete dbUpdates.email;
      }
      if ('address' in dbUpdates) delete dbUpdates.address;
      if ('points' in dbUpdates) delete dbUpdates.points; // Points handled separately via addPoints

      if (Object.keys(dbUpdates).length > 0) {
          const { data, error } = await supabase
            .from('custom_users')
            .update(dbUpdates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          if (data) {
            // Preserve existing points in state since updateProfile shouldn't touch them
            const currentPoints = user.points;
            const mappedUser = mapUser({ ...data, points: currentPoints } as DBUser);
            setUser(mappedUser);
            localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
            return null;
          }
      }
      return "Update failed";

    } catch (err: any) {
      return getErrorMessage(err);
    }
  };

  // Function to add points directly to custom_users table
  const addPoints = async (amount: number) => {
    if (!user) return;
    
    try {
      const currentPoints = user.points || 0;
      const newPoints = currentPoints + amount;

      // Update custom_users table
      const { error } = await supabase
        .from('custom_users')
        .update({ points: newPoints })
        .eq('id', user.id);

      if (error) {
        console.error("Failed to add points DB:", error);
        return;
      }

      // Update local state
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
      localStorage.setItem('sdgUser', JSON.stringify(updatedUser));
      
    } catch (e) {
      console.error("Error adding points:", e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sdgUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, addPoints, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};