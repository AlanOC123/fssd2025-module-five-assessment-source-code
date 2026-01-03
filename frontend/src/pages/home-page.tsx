import { Button, PageItem, PageSection, PageTitle } from "@/components";
import { useAuth } from "@/features";

export function HomePage() {
    const { logout } = useAuth();

    return (
        <>
            <PageSection>
                <PageItem colspan="full">
                    <PageTitle>Home</PageTitle>
                </PageItem>
            </PageSection>
            <PageSection>
                <PageItem className="flex items-center justify-center" colspan="full">
                    <Button variant={"destructive"} onClick={logout}>
                        Logout
                    </Button>
                </PageItem>
            </PageSection>
        </>
    );
}
