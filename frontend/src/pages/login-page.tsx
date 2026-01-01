import { AuthLayout } from "@/layouts";
import { LoginWizard } from "@/features";
import { PublicOnlyRoute } from "@/components";

function LoginPage() {
return (
    <PublicOnlyRoute>
        <AuthLayout title="Login">{<LoginWizard />}</AuthLayout>;
    </PublicOnlyRoute>
);
}

export { LoginPage }