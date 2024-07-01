import { createContext, useContext, useState } from "react";
const UseFlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [isExistFlash, setIsExistFlash] = useState(false);
  const [flashMessage, setFlashMessage] = useState({type: "", message: ""});

  return (
    <UseFlashContext.Provider value={{ isExistFlash, setIsExistFlash, flashMessage, setFlashMessage }}>
      {children}
    </UseFlashContext.Provider>
  );
};

export const useFlash = () => useContext(UseFlashContext);