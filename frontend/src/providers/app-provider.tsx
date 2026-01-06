import { useState, type ReactNode } from "react";
import { AppContext } from "@/context";
import { useLocation } from "react-router";

export function AppProvider({ children }: { children: ReactNode }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDockOpen, setIsDockOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

    const currPath = location.pathname;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDock = () => setIsDockOpen(!isDockOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const toggleCreateProject = () =>
        setIsCreateProjectOpen(!isCreateProjectOpen);

    const openSidebar = () => setIsSidebarOpen(true);
    const openDock = () => setIsDockOpen(true);
    const openSearch = () => setIsSearchOpen(true);
    const closeCreateProject = () => setIsCreateProjectOpen(true);

    const closeSidebar = () => setIsSidebarOpen(false);
    const closeDock = () => setIsDockOpen(false);
    const closeSearch = () => setIsSearchOpen(false);
    const openCreateProject = () => setIsCreateProjectOpen(false);

    return (
        <AppContext.Provider
            value={{
                currPath,
                isSidebarOpen,
                isDockOpen,
                isSearchOpen,
                isCreateProjectOpen,
                toggleSidebar,
                toggleDock,
                toggleSearch,
                toggleCreateProject,
                openSidebar,
                openDock,
                openSearch,
                openCreateProject,
                closeSidebar,
                closeDock,
                closeSearch,
                closeCreateProject,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
