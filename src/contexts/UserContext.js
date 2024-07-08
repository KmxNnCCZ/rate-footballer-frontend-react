import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../lib/api/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ userLoading, setUserLoading ] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const user = await getUser();
        setIsLoggedIn(user.isLogin);
        if(user.isLogin) {
          setCurrentUser(user.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setUserLoading(false);
      }
    };
    checkLoggedInStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);