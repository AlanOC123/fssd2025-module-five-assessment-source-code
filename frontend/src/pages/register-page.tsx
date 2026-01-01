import { AuthLayout } from "@/layouts";
import { RegisterWizard } from "@/features";
import { PublicOnlyRoute } from "@/components";

function RegisterPage() {
    return (
        <PublicOnlyRoute>
            <AuthLayout title="Register">{<RegisterWizard />}</AuthLayout>;
        </PublicOnlyRoute>
    );
}

export { RegisterPage };
