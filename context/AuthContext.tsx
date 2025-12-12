import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  address: string; // Computed string for display
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone_number: string;
  alternate_phone_number?: string;
  created_at: string;
}

// Interface matching the actual database schema (using 'gmail' column and separated address)
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
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (userData: Omit<User, 'id' | 'created_at' | 'address'> & { password: string }) => Promise<string | null>;
  updateProfile: (updates: Partial<User>) => Promise<string | null>;
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
    
    // Supabase/Postgrest Error structure
    if (error.message) return error.message;
    if (error.error_description) return error.error_description;
    
    // Fallback for objects
    try {
      const json = JSON.stringify(error);
      if (json === '{}') return String(error);
      return json;
    } catch {
      return "Error processing request";
    }
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
        address: fullAddress, // Computed for display compatibility
        address1: dbUser.address1 || '',
        address2: dbUser.address2,
        city: dbUser.city || '',
        state: dbUser.state || '',
        pincode: dbUser.pincode || '',
        country: dbUser.country || '',
        phone_number: dbUser.phone_number,
        alternate_phone_number: dbUser.alternate_phone_number,
        created_at: dbUser.created_at
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('sdgUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Optimistically set from local storage first
          setUser(parsedUser);

          // Fetch fresh data from DB to ensure details are up to date
          const { data, error } = await supabase
            .from('custom_users')
            .select('*')
            .eq('id', parsedUser.id)
            .maybeSingle(); 

          if (data && !error) {
            const mappedUser = mapUser(data as DBUser);
            setUser(mappedUser);
            localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
          } else {
            console.warn("Could not refresh user session from DB");
          }
        } catch (e) {
          console.error("Error parsing stored user", e);
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
        .eq('gmail', email) // Map to DB column 'gmail'
        .eq('password', password)
        .maybeSingle(); 

      if (error) throw error;
      
      if (data) {
        const mappedUser = mapUser(data as DBUser);
        setUser(mappedUser);
        localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
        return null; // No error
      } else {
        return "Invalid email or password";
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      return getErrorMessage(err);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'created_at' | 'address'> & { password: string }) => {
    try {
      const { data, error } = await supabase
        .from('custom_users')
        .insert([{
          gmail: userData.email, // Map to DB column 'gmail'
          password: userData.password, 
          name: userData.name,
          address1: userData.address1,
          address2: userData.address2 || null,
          city: userData.city,
          state: userData.state,
          pincode: userData.pincode,
          country: userData.country,
          phone_number: userData.phone_number,
          alternate_phone_number: userData.alternate_phone_number || null 
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
            return "This email is already registered.";
        }
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
       console.error("Registration Error:", err);
       return getErrorMessage(err);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return "No user logged in";
    try {
      // Map updates back to DB schema if email is involved
      const dbUpdates: any = { ...updates };
      
      // Handle mappings
      if (updates.email) {
          dbUpdates.gmail = updates.email;
          delete dbUpdates.email;
      }

      // Remove computed 'address' from DB update
      if ('address' in dbUpdates) {
        delete dbUpdates.address;
      }

      // Only hit DB if there are fields to update
      if (Object.keys(dbUpdates).length > 0) {
          const { data, error } = await supabase
            .from('custom_users')
            .update(dbUpdates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          if (data) {
            const mappedUser = mapUser(data as DBUser);
            setUser(mappedUser);
            localStorage.setItem('sdgUser', JSON.stringify(mappedUser));
            return null;
          }
      }
      return "Update failed";

    } catch (err: any) {
      console.error("Update Error:", err);
      return getErrorMessage(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sdgUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};