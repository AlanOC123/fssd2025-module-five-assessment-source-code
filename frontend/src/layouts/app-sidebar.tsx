import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    Spinner
} from "@/components";
import { ProfileCard, useGetActiveUserProfile } from "@/features";
import { getActiveUserProfile } from "@/features";

export function AppSidebar() {
    const { data: user, isLoading} = useGetActiveUserProfile();

    return (
        <Sidebar className="[grid-area:sidebar]">
            <SidebarHeader>Actions</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <ProfileCard user={user} />
                    )}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
