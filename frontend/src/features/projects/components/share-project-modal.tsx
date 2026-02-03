import { useState } from "react";
import { UserX, Clock, Loader2 } from "lucide-react";
import { ResponsiveModal, Button, Input, Label } from "@/components"; // Adjust path if needed
import { UserAvatar } from "@/features/users";
import { useProjectWorkspace } from "../hooks/use-project-workspace";
import { useInviteMember, useRemoveProjectMember } from "../hooks";
import { useGetProjectMembers } from "../hooks/use-get-project-members";

export function ShareProjectModal({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { project, isOwner } = useProjectWorkspace();
    const projectId = project?.id ?? 0;

    const [email, setEmail] = useState("");

    // 1. Fetch members specifically for this modal to get 'status' fields
    const { data: members, isLoading: isLoadingMembers } =
        useGetProjectMembers(projectId);

    // 2. Setup hooks for actions
    const { mutate: invite, isPending: isInviting } =
        useInviteMember(projectId);
    const { mutate: remove, isPending: isRemoving } =
        useRemoveProjectMember(projectId);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        invite(email, { onSuccess: () => setEmail("") });
    };

    return (
        <ResponsiveModal
            title="Share Project"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="space-y-6 py-4">
                {/* --- INVITE SECTION --- */}
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        Invite via Email
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="colleague@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleInvite(e)
                            }
                            className="bg-muted/10 border-transparent focus:bg-background transition-all"
                        />
                        <Button
                            onClick={handleInvite}
                            disabled={isInviting || !email.includes("@")}
                            type="button"
                        >
                            {isInviting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Invite"
                            )}
                        </Button>
                    </div>
                </div>

                {/* --- MEMBERS LIST --- */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        Who has access
                    </Label>

                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                        {isLoadingMembers ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            members?.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <UserAvatar
                                            src={member.avatar}
                                            firstName={member.first_name}
                                            lastName={member.last_name}
                                            className="h-8 w-8"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium flex items-center gap-2">
                                                {member.first_name}{" "}
                                                {member.last_name}
                                                {/* Badge for Pending Status */}
                                                {member.status ===
                                                    "pending" && (
                                                    <span className="flex items-center gap-1 text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                                        <Clock className="w-3 h-3" />{" "}
                                                        Pending
                                                    </span>
                                                )}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {member.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Remove Button: Visible only if YOU are owner AND target is NOT you */}
                                    {isOwner &&
                                        member.access_level !== "admin" && (
                                            // Note: Adjust logic if you want owners to remove other admins,
                                            // or use member.user !== project.owner.id
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={isRemoving}
                                                onClick={() =>
                                                    remove(member.id)
                                                } // member.id is the Membership ID
                                                className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all"
                                            >
                                                {isRemoving ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <UserX className="w-4 h-4" />
                                                )}
                                            </Button>
                                        )}
                                </div>
                            ))
                        )}

                        {!isLoadingMembers && members?.length === 0 && (
                            <p className="text-center text-sm text-muted-foreground py-4">
                                No members yet. Invite someone!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </ResponsiveModal>
    );
}
