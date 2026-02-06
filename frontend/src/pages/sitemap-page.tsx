import { Link } from "react-router";
import { Home, LayoutDashboard, Shield, User } from "lucide-react";
import { APP_PATHS } from "@/router";

export function SitemapPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Sitemap</h1>
                <p className="text-muted-foreground">
                    An overview of all available pages on Opus.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Section 1: General */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <Home className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg">General</h2>
                    </div>
                    <ul className="space-y-3 pl-2">
                        <li>
                            <Link
                                to={APP_PATHS.app.about}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={APP_PATHS.app.contact}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Contact Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 2: Application (Protected, must be signed in) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <LayoutDashboard className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg">Application</h2>
                    </div>
                    <ul className="space-y-3 pl-2">
                        <li>
                            <Link
                                to={APP_PATHS.app.root}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Workspace
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Account & Auth (Protected, must be signed in) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <User className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg">Account</h2>
                    </div>
                    <ul className="space-y-3 pl-2">
                        <li>
                            <Link
                                to={APP_PATHS.auth.login}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={APP_PATHS.auth.register}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Create Account
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={APP_PATHS.app.settings}
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Profile Settings
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 4: Legal (Doesnt actually go anywhere but simulate best practice) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <Shield className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg">Legal</h2>
                    </div>
                    <ul className="space-y-3 pl-2">
                        <li>
                            <Link
                                to="/terms"
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy"
                                className="text-muted-foreground hover:text-foreground hover:underline transition-all"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
