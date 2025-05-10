import React, { createContext, useContext, useState } from 'react';
import { User, Address } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '001',
  name: 'John Wick',
  email: 'john.wick@xyz.com',
  phone: '1234567890',
  addresses: [
    {
      id: 'a1',
      type: 'Home',
      street: 'Sector V',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091'
    },
    {
      id: 'a2',
      type: 'Work',
      street: 'Sector III',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700092'
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id'>) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // In a real app, the backend would generate an ID
        setUser({ ...userData, id: 'new-user-id' } as User);
        resolve();
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};