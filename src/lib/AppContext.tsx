import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  name: string;
  email: string;
  token: string;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setNameState] = useState<string>(() => localStorage.getItem('name') || '');
  const [email, setEmailState] = useState<string>(() => localStorage.getItem('email') || '');
  const [token, setTokenState] = useState<string>(() => localStorage.getItem('token') || '');

  const setName = (name: string) => {
    setNameState(name);
    localStorage.setItem('name', name);
  };

  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem('email', email);
  };

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem('token', token);
  };

  const clearUser = () => {
    setNameState('');
    setEmailState('');
    setTokenState('');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  };


  return (
    <UserContext.Provider value={{ name, email, token, setName, setEmail, setToken, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppContextData = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAppContextData must be used within an AppContextProvider');
  return context;
};
