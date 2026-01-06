import { createContext } from "react";

export interface AppContextType {
    currPath: string;
    isSidebarOpen: boolean;
    isDockOpen: boolean;
    isSearchOpen: boolean;
    isCreateProjectOpen: boolean;
    toggleSidebar: () => void;
    toggleDock: () => void;
    toggleSearch: () => void;
    toggleCreateProject: () => void;
    openSidebar: () => void;
    openDock: () => void;
    openSearch: () => void;
    openCreateProject: () => void;
    closeSidebar: () => void;
    closeDock: () => void;
    closeSearch: () => void;
    closeCreateProject: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
