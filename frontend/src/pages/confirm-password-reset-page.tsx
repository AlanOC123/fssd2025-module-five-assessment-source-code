import { AuthLayout } from "@/layouts";
import { PasswordConfirmWizard } from "@/features";

export function ConfirmPasswordResetPage() {
    return (
        <AuthLayout title="Reset Password">
            <PasswordConfirmWizard />
        </AuthLayout>
    );
}
