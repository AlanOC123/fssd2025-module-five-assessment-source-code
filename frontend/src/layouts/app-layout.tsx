import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { CreateProjectForm, SearchProjectModal } from "@/features";
import { AppNav } from "./app-nav";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components";
import { AppProvider } from "@/providers";
import { ProtectedRoute } from "@/components";

export function AppLayout() {
    return (
        <ProtectedRoute>
            <AppProvider>
                <SidebarProvider>
                    <div className="relative w-screen h-screen grid [grid-template-areas:'header_header'_'sidebar_main'] grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-background">
                        <AppHeader />
                        <AppSidebar />
                        <SearchProjectModal />
                        <CreateProjectForm />
                        <AppNav />
                        <main className="[grid-area:main] w-full h-full overflow-hidden">
                            <Outlet />
                        </main>
                    </div>
                </SidebarProvider>
            </AppProvider>
        </ProtectedRoute>
    );
}
