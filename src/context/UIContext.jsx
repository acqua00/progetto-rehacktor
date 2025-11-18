import { createContext, useState } from 'react';


const UiContext = createContext();

export function UiProvider({ children }) {

    const [resetGenres, setResetGenres] = useState(false);

    const triggerGenreReset = () => {
        setResetGenres(true);
        setTimeout(() => setResetGenres(false), 50);
    };

    return (
        <UiContext.Provider value={{
            resetGenres,
            triggerGenreReset
        }}>
            {children}
        </UiContext.Provider>
    );
}
export default UiContext;