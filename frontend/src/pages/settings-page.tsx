import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageSection, PageItem } from "@/components"; // Adjust imports based on your index.ts
import { UpdateActiveUserForm, ChangePasswordForm, DeleteAccountForm } from "@/features";

// We'll import the Account Tab later when we build it.
// For now, you can either comment it out or create a temporary placeholder.
// import { AccountSettingsTab } from "@/features/auth/components/account-settings-tab";

export function SettingsPage() {
    return (
        <PageSection>
            <PageItem className="overflow-y-auto max-h-[85dvh] p-4 md:p-4 lg:p-2">
                <div className="container mx-auto max-w-4xl py-6 space-y-8">
                    {/* Page Header */}
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Settings
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your account settings and set e-mail
                            preferences.
                        </p>
                    </div>

                    <Tabs defaultValue="profile" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 max-w-70">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="account">Account</TabsTrigger>
                        </TabsList>

                        {/* --- Tab 1: Profile (Ready!) --- */}
                        <TabsContent value="profile">
                            <UpdateActiveUserForm />
                        </TabsContent>

                        {/* --- Tab 2: Account (Todo) --- */}
                        <TabsContent className="flex flex-col gap-y-4" value="account">
                            <ChangePasswordForm />
                            <DeleteAccountForm />
                        </TabsContent>  
                    </Tabs>
                </div>
            </PageItem>
        </PageSection>
    );
}
