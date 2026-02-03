import { Check, X } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/features/users";
import type { ProjectListItem } from "../types";
import { useRespondToInvite } from "../hooks";

interface InviteCardProps {
    project: ProjectListItem;
}

export function InviteCard({ project }: InviteCardProps) {
    const { mutate: respond, isPending } = useRespondToInvite();

    return (
        <Card className="h-full border-dashed border-2 border-yellow-400/50 bg-yellow-50/10 flex flex-col relative overflow-hidden">
            {/* Visual Badge */}
            <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-500/20 text-yellow-700 text-[10px] font-bold uppercase rounded-bl-lg">
                Pending Invite
            </div>

            <CardHeader className="pb-2">
                <div className="space-y-1">
                    <CardTitle className="line-clamp-1 text-base mr-6">
                        {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">
                        Invited by {project.owner.full_name}
                    </CardDescription>
                </div>
            </CardHeader>

            <div className="flex-1 px-6 py-2">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-md border border-dashed text-xs text-muted-foreground">
                    <UserAvatar
                        src={project.owner.avatar}
                        firstName={project.owner.first_name}
                        className="w-8 h-8"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                            {project.owner.full_name}
                        </span>
                        <span>invited you to collaborate.</span>
                    </div>
                </div>
            </div>

            <CardFooter className="pt-2 pb-4 flex gap-2">
                <Button
                    variant="outline"
                    className="flex-1 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                    size="sm"
                    disabled={isPending}
                    onClick={() =>
                        respond({ projectId: project.id, accept: false })
                    }
                >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                </Button>
                <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                    disabled={isPending}
                    onClick={() =>
                        respond({ projectId: project.id, accept: true })
                    }
                >
                    <Check className="w-4 h-4 mr-2" />
                    Join
                </Button>
            </CardFooter>
        </Card>
    );
}
