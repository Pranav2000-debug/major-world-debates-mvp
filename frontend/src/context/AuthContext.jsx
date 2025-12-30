import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/me", { withCredentials: true });
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
    await axios.post("http://localhost:4000/api/v1/auth/logout", null, { withCredentials: true });
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
