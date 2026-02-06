import { Share2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useProjectWorkspace } from "../hooks";
import { useState } from "react";
import { ShareProjectModal } from "./share-project-modal";
import { APP_PATHS } from "@/router";

export function WorkspaceHeader() {
    const navigate = useNavigate();
    // Connect to the Provider
    const { project, isOwner, makeChanges } = useProjectWorkspace();
    const [isShareOpen, setShareOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        makeChanges({ field: "title", action: "sync", value: e.currentTarget.value })
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        makeChanges({ field: "title", action: "commit", value: e.currentTarget.value });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.currentTarget.blur();
        }
    };

    return (
        <header className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 gap-4">
            {/* Left Section: Navigation & Title */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 -ml-2"
                    onClick={() => navigate(APP_PATHS.app.root)}
                >
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </Button>

                {/* Click-to-Edit Title Input */}
                <div className="relative flex-1 max-w-md group">
                    <Input
                        value={project?.title || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        disabled={!isOwner}
                        className={`
                            h-9 px-2 text-lg font-semibold bg-transparent border-transparent 
                            truncate transition-colors shadow-none
                            ${
                                isOwner
                                    ? "hover:bg-muted/50 focus:bg-muted focus:border-input cursor-text"
                                    : "cursor-default opacity-100"
                            }
                        `}
                    />
                    {/* Visual hint for owners on hover */}
                    {isOwner && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-[10px] text-muted-foreground bg-background/80 px-1 rounded border">
                                Edit
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section: Global Actions */}
            <div className="flex items-center gap-2">
                {/* Share Button (Triggers Invite Modal) */}
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 hidden sm:flex"
                    onClick={() => setShareOpen(true)}
                >
                    <Share2 className="w-4 h-4" />
                    Collaborate
                </Button>

                <ShareProjectModal
                    open={isShareOpen}
                    onOpenChange={setShareOpen}
                />

                {/* Mobile Share Icon */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="sm:hidden text-primary"
                    onClick={() => setShareOpen(true)}
                >
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>
        </header>
    );
}
