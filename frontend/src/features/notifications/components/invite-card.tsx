import { Check, X, UserPlus } from "lucide-react";
import { Button } from "@/components";
import { UserAvatar } from "@/features/users";
import type { Notification } from "../types";
import { useRespondToInvite } from "../hooks";

export function InviteCard({ notification }: { notification: Notification }) {
    const { mutate: respond, isPending } = useRespondToInvite();

    const projectId = notification.notification_data.project_id;
    const projectTitle = notification.notification_data.project_title;
    const inviter = notification.actor_detail;

    if (!projectId) return null;

    return (
        <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4 mb-3">
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <UserPlus className="h-5 w-5" />
                </div>

                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">
                        Project Invitation
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium text-foreground">
                            {inviter.first_name} {inviter.last_name}
                        </span>
                        invited you to join the project{" "}
                        <span className="font-medium text-primary">
                            {projectTitle}
                        </span>
                        .
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                        <Button
                            size="sm"
                            className="h-8 gap-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => respond({ projectId, accept: true })}
                            disabled={isPending}
                        >
                            <Check className="w-4 h-4" />
                            Accept
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-2 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                            onClick={() =>
                                respond({ projectId, accept: false })
                            }
                            disabled={isPending}
                        >
                            <X className="w-4 h-4" />
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
