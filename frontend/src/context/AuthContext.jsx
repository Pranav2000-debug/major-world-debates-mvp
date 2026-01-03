import { useEffect, useState, useContext, createContext } from "react";
import api from "@/api/axios";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res?.data?.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // runs ONCE on app load
  useEffect(() => {
    fetchMe();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        setUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
