import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    Spinner,
} from "@/components";
import { ProfileCard, useGetActiveUserProfile } from "@/features";
import { PinnedProjectsNav } from "@/features";

export function AppSidebar() {
    const { data: user, isLoading } = useGetActiveUserProfile();
    console.log(user)

    return (
        <Sidebar className="[grid-area:sidebar]">
            <SidebarHeader>Actions</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {isLoading ? (
                        <div className="flex items-center justify-center w-full, h-full">
                            <Spinner />
                        </div>
                    ) : (
                        <ProfileCard user={user} />
                    )}
                </SidebarGroup>
                <SidebarGroup>
                    <PinnedProjectsNav />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
