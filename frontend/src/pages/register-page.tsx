import { AuthLayout } from "@/layouts";
import { RegisterWizard } from "@/features";

function RegisterPage() {
    return <AuthLayout title="Register">{<RegisterWizard />}</AuthLayout>;
}

export { RegisterPage };
