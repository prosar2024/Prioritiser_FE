import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface AppContextType {
  
  name: string;
  email: string;
  token: string;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

// Default values for the context
const UserContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const clearUser = () => {
    setEmail('');
    setToken('');
    setName('');
  };

  return (
    <UserContext.Provider value={{ email, token, name, setEmail, setToken, setName, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContextData = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
