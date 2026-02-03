import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function ProjectError() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
            <div className="bg-destructive/10 p-4 rounded-full">
                <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold">Project Not Found</h2>
                <p className="text-muted-foreground">
                    This project may have been deleted or you don't have
                    permission to view it.
                </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/projects")}>
                Return to Projects
            </Button>
        </div>
    );
}
