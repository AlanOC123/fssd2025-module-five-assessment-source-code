import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    UpdateActiveUserForm,
    ChangePasswordForm,
    DeleteAccountForm,
} from "@/features";

export function SettingsPage() {
    return (
        <div className="h-full w-full overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
            <div className="container mx-auto max-w-4xl py-6 space-y-8">
                {/* Page Header */}
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 max-w-100">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <UpdateActiveUserForm />
                    </TabsContent>

                    <TabsContent
                        className="flex flex-col gap-y-4"
                        value="account"
                    >
                        <ChangePasswordForm />
                        <DeleteAccountForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
