import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => { // Make sure props is passed here

    const value = {
        doctors
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* props.children should be accessible */}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
