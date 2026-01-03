import { createContext } from "react";

export interface AppContextType {
    currPath: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);