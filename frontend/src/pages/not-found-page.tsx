import { Link, useNavigate } from "react-router";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { APP_PATHS } from "@/router";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
            {/* Icon & Error Code */}
            <div className="space-y-2">
                <div className="flex justify-center">
                    <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                        <FileQuestion className="h-10 w-10 text-muted-foreground" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                    404
                </h1>
                <h2 className="text-xl font-semibold text-muted-foreground">
                    Page not found
                </h2>
            </div>

            {/* Message */}
            <p className="max-w-[500px] text-muted-foreground">
                Sorry, we couldn't find the page you're looking for. It might
                have been removed, renamed, or doesn't exist.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                </button>

                <Link
                    to={APP_PATHS.app.root}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
                >
                    <Home className="h-4 w-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
