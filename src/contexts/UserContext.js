import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../lib/api/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ isUserLoading, setisUserLoading ] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const user = await getUser();
        setIsLoggedIn(user.success);
        if(user.success) {
          const filteredUser = {
            email: user.data.email,
            id: user.data.id,
            name: user.data.name
          };
          setCurrentUser(filteredUser);
        }
      } catch (e) {
        console.log("ログイン情報の取得に失敗しました。");
      } finally {
        setisUserLoading(false);
      }
    };
    checkLoggedInStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);