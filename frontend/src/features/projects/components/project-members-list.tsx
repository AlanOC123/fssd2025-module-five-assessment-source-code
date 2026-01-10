import { User, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { UserProfile } from "@/features";

interface ProjectMembersListProps {
    members: UserProfile[];
    owner: UserProfile;
}

export function ProjectMembersList({
    members,
    owner,
}: ProjectMembersListProps) {
    // Combine owner and members, removing duplicates by ID just in case
    // (Assuming owner might not be in the members list API response)
    const allMembers = [owner, ...members.filter((m) => m.user_id !== owner.user_id)];

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3">
                {allMembers.map((member) => (
                    <div
                        key={member.user_id}
                        className="flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border bg-muted">
                                <AvatarImage src={member.avatar || undefined} />
                                <AvatarFallback className="text-xs text-muted-foreground">
                                    {member.first_name?.[0] || (
                                        <User className="h-4 w-4" />
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">
                                    {member.full_name || member.email}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {member.user_id === owner.user_id ? (
                                        <>
                                            <ShieldCheck className="h-3 w-3 text-primary" />
                                            <span>Owner</span>
                                        </>
                                    ) : (
                                        "Member"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {allMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No members assigned.
                    </p>
                )}
            </div>

            <Button variant="outline" className="w-full text-xs h-8">
                Manage Team
            </Button>
        </div>
    );
}
