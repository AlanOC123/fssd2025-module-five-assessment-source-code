import { AuthLayout } from "@/layouts";
import { PasswordResetWizard } from "@/features";

export function ResetPasswordPage() {
    return (
        <AuthLayout title="Forgot Password">
            <PasswordResetWizard />
        </AuthLayout>
    );
}
