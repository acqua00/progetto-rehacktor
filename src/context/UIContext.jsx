import { createContext, useState } from "react";


const UIContext = createContext();


export function UIProvider({ children }) {
 
  const [resetGenres, setResetGenres] = useState(false);

 
  const triggerGenreReset = () => {
   
    setResetGenres(true);

  
    setTimeout(() => setResetGenres(false), 50);
  };

  return (
    <UIContext.Provider value={{ resetGenres, triggerGenreReset }}>
      {children}
    </UIContext.Provider>
  );
}

export default UIContext;
