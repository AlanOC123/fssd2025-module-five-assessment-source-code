import { Button, PageSection, PageItem, PageTitle } from "@/components";
import { useAuth } from "@/features";

export function SettingsPage() {
    const { logout } = useAuth();

    return (
        <>
            <PageSection>
                <PageItem colspan="full">
                    <PageTitle>Settings</PageTitle>
                </PageItem>
            </PageSection>
            <PageSection>
                <PageItem
                    className="flex items-center justify-center"
                    colspan="full"
                >
                    <Button variant={"destructive"} onClick={logout}>
                        Logout
                    </Button>
                </PageItem>
            </PageSection>
        </>
    );
}
